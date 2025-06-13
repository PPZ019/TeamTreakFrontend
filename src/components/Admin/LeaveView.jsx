import React, { useEffect, useState } from 'react';
import { getEmployees, getLeaders, viewLeaves } from '../../http';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading';

const LeaveView = () => {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications, setApplications] = useState(null);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    let empObj = {};
    const fetchData = async () => {
      const res = await viewLeaves({});
      setApplications(res.data);
    };

    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      emps.data.forEach(employee => empObj[employee.id] = [employee.name, employee.email]);
      leaders.data.forEach(leader => empObj[leader.id] = [leader.name, leader.email]);
      setEmployeeMap(empObj);
      setEmployees([...emps.data, ...leaders.data]);
    };

    fetchData();
    fetchEmployees();
  }, []);

  const searchLeaveApplications = async () => {
    const obj = {};
    if (selectedEmployee) obj.applicantID = selectedEmployee;
    if (type) obj.type = type;
    if (status) obj.adminResponse = status;
    if (appliedDate) obj.appliedDate = appliedDate;

    const res = await viewLeaves(obj);
    setApplications(res.data);

    setAppliedDate('');
    setType('');
    setStatus('');
    setSelectedEmployee('');
  };

  return (
    <>
      {applications ? (
        <div className="min-h-screen p-6 bg-white text-blue-900">
          <section className="mb-6">
            <div className="rounded-md p-4 mb-0 flex justify-between items-center bg-white">
              <h4 className="text-4xl font-semibold">Leave Applications</h4>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-end mb-6 border p-4 rounded-lg">
              {/* Employee */}
              <div className="w-48">
                <label className="block mb-1 font-medium">Employee</label>
                <select
                  className="w-full rounded px-3 py-2 border border-blue-900"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">All Employees</option>
                  {employees.map(emp => (
                    <option key={emp._id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>

              {/* Leave Type */}
              <div className="w-48">
                <label className="block mb-1 font-medium">Leave Type</label>
                <select
                  className="w-full rounded px-3 py-2 border border-blue-900"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>

              {/* Status */}
              <div className="w-48">
                <label className="block mb-1 font-medium">Status</label>
                <select
                  className="w-full rounded px-3 py-2 border border-blue-900"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {/* Applied Date */}
              <div className="w-56">
                <label className="block mb-1 font-medium">Applied Date</label>
                <input
                  type="date"
                  className="w-full rounded px-3 py-2 border border-blue-900"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                />
              </div>

              {/* Search */}
              <button
                onClick={searchLeaveApplications}
                className="font-semibold px-6 py-2 rounded border border-blue-900 bg-blue-900 text-white transition"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1E3A8A';
                  e.target.style.color = '#1E3A8A'; // blue-900
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#1E3A8A';
                  e.target.style.color = 'white';
                }}
              >
                Search
              </button>
            </div>
          </section>

          {/* Table */}
          <div className="overflow-x-auto rounded-md border border-blue-900 bg-white">
            <table className="min-w-full rounded-md text-blue-900">
              <thead>
                <tr className="border-b border-blue-900">
                  <th className="px-4 py-3 text-center">S No</th>
                  <th className="px-4 py-3 text-center">Name</th>
                  <th className="px-4 py-3 text-center">Email</th>
                  <th className="px-4 py-3 text-center">Type</th>
                  <th className="px-4 py-3 text-center">Title</th>
                  <th className="px-4 py-3 text-center">Applied Date</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr
                    key={app._id}
                    onClick={() => navigate(`/leaves/${app._id}`)}
                    className="cursor-pointer transition text-center"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#DBEAFE')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                  >
                    <td className="px-4 py-2 text-center">{idx + 1}</td>
                    <td className="px-4 py-2 text-center">{employeeMap[app.applicantID]?.[0]}</td>
                    <td className="px-4 py-2 text-center">{employeeMap[app.applicantID]?.[1]}</td>
                    <td className="px-4 py-2 text-center">{app.type}</td>
                    <td className="px-4 py-2 text-center">{app.title}</td>
                    <td className="px-4 py-2 text-center">{app.appliedDate}</td>
                    <td
                      className="px-4 py-2 text-center font-semibold"
                      style={{
                        color:
                          app.adminResponse === 'Rejected'
                            ? '#DC2626' // red-600
                            : app.adminResponse === 'Pending'
                            ? '#CA8A04' // yellow-600
                            : '#059669' // green-600
                      }}
                    >
                      {app.adminResponse}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LeaveView;
