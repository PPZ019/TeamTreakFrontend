import React, { useEffect, useState } from 'react';
import { getEmployees, getLeaders, viewLeaves } from '../../http';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const LeaveView = () => {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications, setApplications] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [leaveRes, empRes, leaderRes] = await Promise.all([
          viewLeaves({}),
          getEmployees(),
          getLeaders(),
        ]);
        const empList = empRes?.employees || [];

        const empObj = {};
        empList.forEach(emp => {
          empObj[emp._id] = {
            name: emp.name,
            email: emp.email
          };
        });
        // const empList = empRes?.employees || [];
        const leaderList = leaderRes?.data?.employees || [];
        const allEmployees = [...empList, ...leaderList];

        console.log("empList:", empRes.employees.map(emp => ({ name: emp.name, email: emp.email })));


        // console.log("leaderList:", empObj);
        // console.log("allEmployees:", allEmployees);
        const allEmpIds = allEmployees.map(e => e._id)
        {console.log("All Employee IDs:", allEmpIds)}
        

        // const empObj = {};
        // allEmployees.forEach((emp) => {
        //   empObj[emp._id] = {
        //     name: emp.name,
        //     email: emp.email,
        //   };
        // });
       
        
        setEmployeeMap(empObj);
        setEmployees(empList);
        setApplications(leaveRes?.data || []);
      } catch (err) {
        setError('Failed to fetch leave data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);



  const getStatusColor = (status) => {
    switch (status) {
      case 'Rejected':
        return 'text-red-600';
      case 'Pending':
        return 'text-yellow-600';
      case 'Approved':
        return 'text-green-600';
      default:
        return '';
    }
  };

  const searchLeaveApplications = async () => {
    try {
      const query = {};
      if (selectedEmployee) query.applicantID = selectedEmployee;
      if (type) query.type = type;
      if (status) query.adminResponse = status;
      if (appliedDate) query.appliedDate = appliedDate;

      setLoading(true);
      const res = await viewLeaves(query);
      setApplications(res?.data || []);
    } catch (err) {
      setError('Search failed.');
    } finally {
      setLoading(false);
      setAppliedDate('');
      setType('');
      setStatus('');
      setSelectedEmployee('');
    }
  };



  if (loading) return <Loading />;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-white text-blue-900">
      <section className="mb-6">
        <div className="p-4 mb-4 flex justify-between items-center">
          <h4 className="text-4xl font-bold">Leave Applications</h4>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center items-end mb-6 border p-4 rounded-lg shadow-sm">
          {/* Employee Filter */}
          <div className="w-48">
            <label htmlFor="employee" className="block mb-1 font-medium">Employee</label>
            <select
              id="employee"
              className="w-full rounded px-3 py-2 border border-blue-900"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>{emp.name}</option>
              ))}
            </select>
          </div>

          {/* Leave Type Filter */}
          <div className="w-48">
            <label htmlFor="type" className="block mb-1 font-medium">Leave Type</label>
            <select
              id="type"
              className="w-full rounded px-3 py-2 border border-blue-900"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select</option>
              {['Maternity Leave', 'Unpaid Leave', 'Sick Leave', 'Casual Leave', 'Emergency Leave'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-48">
            <label htmlFor="status" className="block mb-1 font-medium">Status</label>
            <select
              id="status"
              className="w-full rounded px-3 py-2 border border-blue-900"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select</option>
              {['Pending', 'Approved', 'Rejected'].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Applied Date Filter */}
          <div className="w-56">
            <label htmlFor="appliedDate" className="block mb-1 font-medium">Applied Date</label>
            <input
              id="appliedDate"
              type="date"
              className="w-full rounded px-3 py-2 border border-blue-900"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={searchLeaveApplications}
            className="px-6 py-2 font-semibold bg-blue-900 text-white rounded hover:bg-blue-800 transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* Applications Table */}
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
              applications
              .filter(app => employeeMap[app.applicantID]) // ✅ only show valid employees
              .map((app, idx) => (
                <tr
                  key={app._id}
                  onClick={() => navigate(`/leaves/${app._id}`)}
                  className="cursor-pointer hover:bg-blue-100 transition"
                >
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{employeeMap[app.applicantID]?.name || 'Unknown'}</td>
<td className="px-4 py-2">{employeeMap[app.applicantID]?.email || 'Unknown'}</td>
{console.log("Leave Applicant ID:", app.applicantID)}
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
