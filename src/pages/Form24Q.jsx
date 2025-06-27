import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Form24Q = () => {
  const [tdsList, setTdsList] = useState([]);
  const [formData, setFormData] = useState({
    quarter: '',
    financialYear: '',
    auditTrail: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    fetchTDSData();
  }, []);

  const fetchTDSData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5500/api/form24q', {
        withCredentials: true,
      });
      setTdsList(data || []);
    } catch (err) {
      console.error('Error fetching Form 24Q:', err);
    }
  };

  const handleSubmit = async (id) => {
    try {
      await axios.post(`http://localhost:5500/api/form24q/submit/${id}`, {}, {
        withCredentials: true,
      });
      fetchTDSData();
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5500/api/form24q', formData, {
        withCredentials: true,
      });
      setFormData({ quarter: '', financialYear: '', auditTrail: '' });
      fetchTDSData();
    } catch (err) {
      console.error('Create failed:', err);
    }
  };

  const openModal = (content) => {
    setModalContent(content || 'No audit trail available');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Form 24Q - Company Quarterly TDS Returns</h1>

        {/* Create Form */}
        <form onSubmit={handleCreate} className="bg-white rounded-xl shadow p-4 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-blue-800 text-center">➕ Create New Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Quarter (e.g., Q1)"
              value={formData.quarter}
              onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
              className="p-2 border rounded text-center"
              required
            />
            <input
              type="text"
              placeholder="Financial Year (e.g., 2024-25)"
              value={formData.financialYear}
              onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
              className="p-2 border rounded text-center"
              required
            />
            <input
              type="text"
              placeholder="Audit Trail Note"
              value={formData.auditTrail}
              onChange={(e) => setFormData({ ...formData, auditTrail: e.target.value })}
              className="p-2 border rounded text-center"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
            >
              Create Entry
            </button>
          </div>
        </form>

        {/* Table Display */}
        {tdsList.length === 0 ? (
          <p className="text-center text-gray-600">No records found.</p>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-2">Quarter</th>
                  <th className="p-2">FY</th>
                  <th className="p-2">Generated</th>
                  <th className="p-2">Audit Trail</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tdsList.map((entry) => (
                  <tr key={entry._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-2">{entry.quarter}</td>
                    <td className="p-2">{entry.financialYear}</td>
                    <td className="p-2">{entry.generated ? 'Yes' : 'No'}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 hover:no-underline border px-2 py-1 rounded-xl"
                        onClick={() => openModal(entry.auditTrail)}
                      >
                        View
                      </button>
                    </td>
                    <td className="p-2">
                      {entry.status === 'submitted' ? (
                        <span className="text-green-600 font-medium">Submitted</span>
                      ) : (
                        <span className="text-yellow-600 font-medium">Pending</span>
                      )}
                    </td>
                    <td className="p-2">
                      {entry.status === 'submitted' ? (
                        '✅'
                      ) : (
                        <button
                          className="px-3 py-1 bg-blue-800 text-white rounded hover:bg-blue-900"
                          onClick={() => handleSubmit(entry._id)}
                        >
                          Submit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Audit Trail Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px] text-center">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">Audit Trail</h2>
              <p className="mb-6 text-gray-700">{modalContent}</p>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form24Q;
