import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const documentsList = [
  { label: "Aadhaar Card", type: "Aadhaar" },
  { label: "PAN Card", type: "PAN" },
  { label: "Degree Certificate", type: "Degree" },
  { label: "Offer Letter", type: "OfferLetter" },
  { label: "10th Marksheet", type: "Marksheet10" },
  { label: "12th Marksheet", type: "Marksheet12" },
  { label: "Experience Letter", type: "Experience" }
];

const UploadDocument = () => {
  const [uploadingDoc, setUploadingDoc] = useState(null);
  const [messages, setMessages] = useState({});
  const [files, setFiles] = useState({});
  // const [documents, setDocuments] = useState([]);
  // const [loading, setLoading] = useState(true);

  // ✅ File type check (only PDF)
  const handleFileChange = (docType, file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.");
      return;
    }

    setFiles(prev => ({ ...prev, [docType]: file }));
  };

  const handleUpload = async (docType) => {
    const file = files[docType];
    if (!file) {
      setMessages(prev => ({ ...prev, [docType]: "Please select a file." }));
      return;
    }

    const formData = new FormData();
    formData.append("documentType", docType);
    formData.append("document", file);

    try {
      setUploadingDoc(docType);
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/documents/upload`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const msg = res.data.message || "Uploaded successfully!";
      setMessages(prev => ({ ...prev, [docType]: msg }));
      toast.success(msg);
      // fetchDocuments(); // Refresh list
    } catch (err) {
      console.error(err);
      setMessages(prev => ({ ...prev, [docType]: "Upload failed." }));
      toast.error("Upload failed.");
    } finally {
      setUploadingDoc(null);
    }
  };

  // const fetchDocuments = async () => {
  //   try {
  //     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/documents/my`, {
  //       withCredentials: true,
  //     });
  //     setDocuments(res.data.documents);
  //   } catch (err) {
  //     console.error("Failed to fetch documents", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDocuments();
  // }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-6 space-y-12">
      {/* Upload Section */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Upload Employee Documents</h2>
        <div className="grid gap-6">
          {documentsList.map((doc) => (
            <div
              key={doc.type}
              className="flex flex-col md:flex-row items-start md:items-center gap-4 border-b pb-4"
            >
              <label className="w-full md:w-1/4 font-semibold text-gray-700">{doc.label}</label>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(doc.type, e.target.files[0])}
                className="w-full md:w-auto flex-1 border rounded-md px-3 py-2 file:bg-blue-900 file:text-white file:rounded file:border-0 file:px-4 file:py-2"
              />

              <button
                onClick={() => handleUpload(doc.type)}
                disabled={uploadingDoc === doc.type}
                className={`px-5 py-2 rounded-md text-white transition font-semibold ${
                  uploadingDoc === doc.type ? 'bg-gray-400' : 'bg-blue-900 hover:bg-blue-700'
                }`}
              >
                {uploadingDoc === doc.type ? "Uploading..." : "Upload"}
              </button>

              {messages[doc.type] && (
                <p className={`text-sm mt-1 ${
                  messages[doc.type].toLowerCase().includes("success") || messages[doc.type].toLowerCase().includes("updated")
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {messages[doc.type]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Display Section */}
      {/* <div className="bg-white p-8 rounded-lg shadow-md">
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
      </div> */}

    </div>
  );
};

export default UploadDocument;
