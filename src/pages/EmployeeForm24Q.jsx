import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeForm24Q = () => {
  const [myForms, setMyForms] = useState([]);
  const [modal, setModal] = useState({ show: false, content: '' });

  useEffect(() => {
    fetchMyForm24Q();
  }, []);

  const fetchMyForm24Q = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/form24q', {
        withCredentials: true,
      });
      setMyForms(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Error fetching Form 24Q for employee:', err);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl text-center text-blue-900 font-bold mb-8">
          📄 My Form 24Q Records
        </h1>

        {myForms.length === 0 ? (
          <p className="text-center text-gray-600">No records found.</p>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-2">Quarter</th>
                  <th className="p-2">FY</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Audit Trail</th>
                </tr>
              </thead>
              <tbody>
                {myForms.map((entry) => (
                  <tr key={entry._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2">{entry.quarter}</td>
                    <td className="p-2">{entry.financialYear}</td>
                    <td className="p-2">
                      {entry.status === 'submitted' ? (
                        <span className="text-green-600 font-medium">Submitted</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => setModal({ show: true, content: entry.auditTrail || 'No audit trail available' })}
                        className="text-blue-700 underline hover:text-blue-900"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {modal.show && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
              <button
                onClick={() => setModal({ show: false, content: '' })}
                className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-black"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Audit Trail</h2>
              <p className="text-gray-700">{modal.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm24Q;
