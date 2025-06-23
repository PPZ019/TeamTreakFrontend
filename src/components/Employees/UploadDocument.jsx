import React, { useState } from 'react';
import axios from 'axios';

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

  const handleFileChange = (docType, file) => {
    setFiles(prev => ({ ...prev, [docType]: file }));
  };

  const handleUpload = async (docType) => {
    const file = files[docType];
    if (!file) {
      setMessages(prev => ({ ...prev, [docType]: " Please select a file." }));
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );
      setMessages(prev => ({ ...prev, [docType]: "Uploaded successfully!" }));
    } catch (err) {
      console.error(err);
      setMessages(prev => ({ ...prev, [docType]: "Upload failed." }));
    } finally {
      setUploadingDoc(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Upload Employee Documents</h2>

      <div className="space-y-5">
        {documentsList.map((doc) => (
          <div
            key={doc.type}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-4 rounded-md shadow-sm"
          >
            <label className="w-full md:w-1/3 font-medium">{doc.label}</label>

            <input
              type="file"
              onChange={(e) => handleFileChange(doc.type, e.target.files[0])}
              className="flex-1 file:px-4 file:py-2 file:border-0 file:rounded-md file:bg-blue-900 file:text-white file:cursor-pointer border rounded-md"
            />

            <button
              onClick={() => handleUpload(doc.type)}
              disabled={uploadingDoc === doc.type}
              className={`px-4 py-2 rounded-md text-white font-semibold ${
                uploadingDoc === doc.type ? 'bg-gray-400' : 'bg-blue-900 hover:bg-blue-700'
              }`}
            >
              {uploadingDoc === doc.type ? "Uploading..." : "Upload"}
            </button>

            {messages[doc.type] && (
              <p className="text-sm text-green-600 font-medium">{messages[doc.type]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDocument;
