import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HRITDeclarationReview = () => {
  const [declarations, setDeclarations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remarkModal, setRemarkModal] = useState({ show: false, id: null, remark: '' });

  useEffect(() => {
    fetchAllDeclarations();
  }, []);

  const fetchAllDeclarations = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/itDeclaration', {
        withCredentials: true,
      });
      setDeclarations(res.data.data || []);
    } catch (err) {
      console.error('Error fetching declarations:', err);
    }
  };

  const handleAction = async (id, status, remark = '') => {
    setLoading(true);
    try {
        const url =
          status === 'approved'
            ? `http://localhost:5500/api/itDeclaration/approve/${id}`
            : `http://localhost:5500/api/itDeclaration/reject/${id}`;
    
        await axios.post(
          url,
          { remark },
          { withCredentials: true }
        );
      fetchAllDeclarations(); // Refresh
    } catch (err) {
      console.error('Action failed:', err);
    } finally {
      setLoading(false);
      setRemarkModal({ show: false, id: null, remark: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">Review IT Declarations</h1>

        {declarations.length === 0 ? (
          <p className="text-center text-gray-500">No declarations submitted yet.</p>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-2">Employee</th>
                  <th className="p-2">LIC</th>
                  <th className="p-2">Health</th>
                  <th className="p-2">HRA</th>
                  <th className="p-2">LTA</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {declarations.map((dec) => (
                  <tr key={dec._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{dec.empId?.name || '—'}</td>
                    <td className="p-2">₹{dec.licAmount}</td>
                    <td className="p-2">₹{dec.healthInsurance}</td>
                    <td className="p-2">₹{dec.hra}</td>
                    <td className="p-2">₹{dec.lta}</td>
                    <td className="p-2 capitalize">
                      <span
                        className={`font-medium ${
                          dec.status === 'approved'
                            ? 'text-green-600'
                            : dec.status === 'rejected'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {dec.status}
                      </span>
                    </td>
                    <td className="p-2 flex flex-col gap-2">
                      {dec.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleAction(dec._id, 'approved')}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                            disabled={loading}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              setRemarkModal({ show: true, id: dec._id, remark: '' })
                            }
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className={`font-medium text-lg ${
                            dec.status === 'approved'
                              ? 'text-green-600'
                              : dec.status === 'rejected'
                              ? 'text-red-600'
                              : 'text-yellow-600'
                          }`}>
                            {dec.status === 'approved' && <span>✅</span>}
                            {dec.status === 'rejected' && <span>❌</span>}
                            {dec.status === 'pending' && <span>🕓</span>}
                          </span>
                          
                          
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reject with Remark Modal */}
        {remarkModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md">
              <h2 className="text-xl font-bold text-red-600 mb-4">Reject Declaration</h2>
              <textarea
                rows={3}
                className="w-full border p-2 rounded"
                placeholder="Enter rejection remark..."
                value={remarkModal.remark}
                onChange={(e) =>
                  setRemarkModal({ ...remarkModal, remark: e.target.value })
                }
              ></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setRemarkModal({ show: false, id: null, remark: '' })}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleAction(remarkModal.id, 'rejected', remarkModal.remark)
                  }
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  disabled={!remarkModal.remark}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRITDeclarationReview;
