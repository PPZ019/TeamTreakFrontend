import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/documents/my`, {
        withCredentials: true, // 🟢 sends cookies to backend for auth
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

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading documents...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">My Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p className="text-center text-gray-500">No documents uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc) => (
            <div key={doc._id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
              <div>
                <p className="font-semibold">{doc.documentType}</p>
                <p className="text-sm text-gray-500">Uploaded on: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
              </div>
              <a
                href={`${process.env.REACT_APP_BASE_URL}/${doc.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDocuments;
