import React, { useEffect, useState } from 'react';
import { viewLeaveApplications } from '../../http';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading';

const LeaveApplications = () => {
  const { user } = useSelector(state => state.authSlice);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await viewLeaveApplications({});
      setApplications(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchLeaveApplications = async () => {
    const obj = {};
    if (type) obj.type = type;
    if (status) obj.adminResponse = status;
    if (appliedDate) obj.appliedDate = appliedDate;

    try {
      setLoading(true);
      const res = await viewLeaveApplications(obj);
      setApplications(res?.data || []);
    } catch (err) {
      console.error(err);
      setError("Search failed.");
    } finally {
      setLoading(false);
      setType('');
      setStatus('');
      setAppliedDate('');
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white border rounded-xl shadow-md p-6 md:p-8 space-y-8">
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold text-blue-900">My Leave Applications</h2>
          <p className="text-sm text-gray-500 mt-1">Track your submitted leave requests</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="">All</option>
              <option>Sick Leave</option>
              <option>Casual Leave</option>
              <option>Emergency Leave</option>
            </select>
          </div>

          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-blue-500"
            >
              <option value="">All</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={searchLeaveApplications}
              className="w-full bg-blue-900 text-white py-2 rounded-md shadow-md"
            >
              Search
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Applied Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {applications.length > 0 ? (
                applications.map((application, idx) => (
                  <tr
                    key={application._id}
                    className="hover:bg-blue-50 cursor-pointer transition"
                    onClick={() => navigate(`/userLeaveApplications/${application._id}`)}
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{application.type}</td>
                    <td className="px-4 py-3">{application.title}</td>
                    <td className="px-4 py-3">{application.appliedDate}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        application.adminResponse === 'Rejected'
                          ? 'text-red-600'
                          : application.adminResponse === 'Pending'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {application.adminResponse}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No leave applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplications;
