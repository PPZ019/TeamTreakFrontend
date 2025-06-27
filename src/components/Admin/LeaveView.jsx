import React, { useEffect, useState } from 'react';
import { viewLeaves } from '../../http';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';
import { useSelector } from 'react-redux';

const LeaveView = () => {
  const { user } = useSelector(state => state.authSlice);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications, setApplications] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Rejected': return 'text-red-600';
      case 'Pending': return 'text-yellow-600';
      case 'Approved': return 'text-green-600';
      default: return '';
    }
  };

  const fetchLeaves = async () => {
    try {
      const query = {};
      if (selectedEmployee) query.applicantID = selectedEmployee;
      if (type) query.type = type;
      if (status) query.adminResponse = status;
      if (appliedDate) query.appliedDate = appliedDate;

      const res = await viewLeaves(query);
      setApplications(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-white text-blue-900">
      <div className="p-4 mb-4 flex justify-between items-center">
        <h4 className="text-4xl font-bold">Leave Applications</h4>
      </div>

      <div className="overflow-x-auto border border-blue-900 rounded-md">
        <table className="min-w-full text-center text-blue-900">
          <thead>
            <tr className="border-b border-blue-900 bg-blue-100">
              <th className="px-4 py-3">S No</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Applied Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-gray-500">No applications found.</td>
              </tr>
            ) : (
              applications.map((app, idx) => (
                <tr
                  key={app._id}
                  onClick={() => navigate(`/leaves/${app._id}`)}
                  className="cursor-pointer hover:bg-blue-100 transition"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{app.applicantID?.name || 'Unknown'}</td>
                  <td className="px-4 py-2">{app.applicantID?.email || 'Unknown'}</td>
                  <td className="px-4 py-2">{app.type}</td>
                  <td className="px-4 py-2">{app.title}</td>
                  <td className="px-4 py-2">{app.appliedDate}</td>
                  <td className={`px-4 py-2 font-semibold ${getStatusColor(app.adminResponse)}`}>
                    {app.adminResponse}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveView;
