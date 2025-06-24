import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


const MyDocument = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/documents/my`, {
        withCredentials: true,
      });
      setDocuments(res.data.documents);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-4 ">

      {/* Display Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">My Uploaded Documents</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading documents...</p>
        ) : documents.length === 0 ? (
          <p className="text-center text-gray-500">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc._id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md border">
                <div>
                  <p className="font-semibold text-gray-800">{doc.documentType}</p>
                  <p className="text-sm text-gray-500">Uploaded on: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                </div>
                <a
                  href={`${process.env.REACT_APP_BASE_URL}/${doc.filePath}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default MyDocument;
