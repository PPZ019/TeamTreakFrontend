import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm16 = () => {
  const [form16List, setForm16List] = useState([]);

  useEffect(() => {
    fetchMyForm16();
  }, []);

  const fetchMyForm16 = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/form16/me', {
        withCredentials: true,
      });

      console.log('✅ My Form16 Data:', res.data);
      if (res.data.success && Array.isArray(res.data.data)) {
        setForm16List(res.data.data);
      }
    } catch (err) {
      console.error('❌ Error fetching Form 16:', err);
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl text-center font-bold text-blue-900 mb-8">
          My Form 16 Documents
        </h1>

        {form16List.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No Form 16 uploaded yet.
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-3 text-center">Financial Year</th>
                  <th className="p-3 text-center">Download</th>
                </tr>
              </thead>
              <tbody>
                {form16List.map((entry) => (
                  <tr
                    key={entry._id}
                    className="border-b border-gray-200 transition duration-150"
                  >
                    <td className="p-3 text-center">{entry.financialYear}</td>
                    <td className="p-3 text-center">
                      <a
                        href={entry.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 border px-2 py-2 hover:no-underline rounded-xl font-medium"
                      >
                        Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm16;
