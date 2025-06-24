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
  const [applications, setApplications] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await viewLeaveApplications({ applicantID: user.id });
      setApplications(res.data);
    };
    fetchData();
  }, []);

  const searchLeaveApplications = async () => {
    const obj = { applicantID: user.id };
    if (type) obj.type = type;
    if (status) obj.adminResponse = status;
    if (appliedDate) obj.appliedDate = appliedDate;

    const res = await viewLeaveApplications(obj);
    setApplications(res.data);
    setAppliedDate('');
    setType('');
    setStatus('');
  };

  return (
    <>
      {applications ? (
        <div className="min-h-screen  p-6">
          <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-xl shadow-md p-6 md:p-8 space-y-8">
            
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-3xl font-bold text-blue-900">Leave Applications</h2>
              <p className="text-sm text-gray-500 mt-1">Track and manage your submitted leave requests.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              <div>
                
                <select
  value={type}
  onChange={(e) => setType(e.target.value)}
  className="w-full px-4 py-2.5 mt-1 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                 className="w-full px-4 py-2.5 mt-1 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={searchLeaveApplications}
                  className="w-full bg-blue-900 text-white font-semibold py-2 rounded-md shadow-md transition-all"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left border-r">S.No</th>
                    <th className="px-4 py-3 text-left border-r">Type</th>
                    <th className="px-4 py-3 text-left border-r">Title</th>
                    <th className="px-4 py-3 text-left border-r">Applied Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {applications.length > 0 ? (
                    applications.map((application, idx) => (
                      <tr
                        key={application._id}
                        className="hover:bg-blue-50 cursor-pointer transition"
                        onClick={() => navigate(`userLeaveApplications/${application._id}`)}
                      >
                        <td className="px-4 py-3 border-r text-center font-medium">{idx + 1}</td>
                        <td className="px-4 py-3 border-r">{application.type}</td>
                        <td className="px-4 py-3 border-r">{application.title}</td>
                        <td className="px-4 py-3 border-r">{application.appliedDate}</td>
                        <td className={`px-4 py-3 font-semibold ${
                          application.adminResponse === 'Rejected'
                            ? 'text-red-600'
                            : application.adminResponse === 'Pending'
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`}>
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
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LeaveApplications;

