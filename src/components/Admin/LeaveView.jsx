import React, { useEffect, useState } from 'react'
import { getEmployees, getLeaders, viewLeaves } from '../../http';
import { useHistory } from "react-router-dom";
import Loading from '../Loading';

const LeaveView = () => {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [appliedDate, setAppliedDate] = useState('');
  const [applications,setApplications] = useState(null);
  const history = useHistory();
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');

  useEffect(() => {
    let empObj = {};
    const fetchData = async () => {
      const res = await viewLeaves({});
      setApplications(res.data);
    }

    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      emps.data.forEach(employee => empObj[employee.id] = [employee.name, employee.email]);
      leaders.data.forEach(leader => empObj[leader.id] = [leader.name, leader.email]);
      setEmployeeMap(empObj);
      setEmployees([...emps.data, ...leaders.data]);
    }

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
  }

  // Custom colors
  const colors = {
    background: '#1E201E',
    card: '#3C3D37',
    accent: '#697565',
    text: '#ECDFCC'
  }

  return (
    <>
      {applications ? (
        <div
          className="min-h-screen p-6"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
          <section className="mb-6">
            <div
              className="rounded-md shadow p-4 mb-6 flex justify-between items-center"
              style={{ backgroundColor: colors.card }}
            >
              <h4 className="text-4xl font-semibold" style={{ color: colors.text }}>
                Leave Applications
              </h4>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-end mb-6">
              {/* Employee select */}
              <div className="w-48">
                <label className="block mb-1 font-medium" style={{ color: colors.text }}>
                  Employee
                </label>
                <select
                  className="w-full rounded px-3 py-2 focus:outline-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.accent}`,
                    color: colors.text,
                  }}
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="" style={{ backgroundColor: colors.card, color: colors.text }}>
                    All Employees
                  </option>
                  {employees.map(emp => (
                    <option
                      key={emp._id}
                      value={emp.id}
                      style={{ backgroundColor: colors.card, color: colors.text }}
                    >
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Leave Type */}
              <div className="w-48">
                <label className="block mb-1 font-medium" style={{ color: colors.text }}>
                  Leave Type
                </label>
                <select
                  className="w-full rounded px-3 py-2 focus:outline-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.accent}`,
                    color: colors.text,
                  }}
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <option value="" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Select
                  </option>
                  <option value="Sick Leave" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Sick Leave
                  </option>
                  <option value="Casual Leave" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Casual Leave
                  </option>
                  <option value="Emergency Leave" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Emergency Leave
                  </option>
                </select>
              </div>

              {/* Status */}
              <div className="w-48">
                <label className="block mb-1 font-medium" style={{ color: colors.text }}>
                  Status
                </label>
                <select
                  className="w-full rounded px-3 py-2 focus:outline-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.accent}`,
                    color: colors.text,
                  }}
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Select
                  </option>
                  <option value="Pending" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Pending
                  </option>
                  <option value="Approved" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Approved
                  </option>
                  <option value="Rejected" style={{ backgroundColor: colors.card, color: colors.text }}>
                    Rejected
                  </option>
                </select>
              </div>

              {/* Applied Date */}
              <div className="w-56">
                <label className="block mb-1 font-medium" style={{ color: colors.text }}>
                  Applied Date
                </label>
                <input
                  type="date"
                  className="w-full rounded px-3 py-2 focus:outline-none"
                  style={{
                    backgroundColor: colors.card,
                    border: `1px solid ${colors.accent}`,
                    color: colors.text,
                  }}
                  value={appliedDate}
                  onChange={e => setAppliedDate(e.target.value)}
                />
              </div>

              {/* Search Button */}
              <button
                onClick={searchLeaveApplications}
                className="font-semibold px-6 py-2 rounded transition"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.text,
                  border: `1px solid ${colors.accent}`,
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = colors.text;
                  e.target.style.color = colors.accent;
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = colors.accent;
                  e.target.style.color = colors.text;
                }}
              >
                Search
              </button>
            </div>
          </section>

          {/* Table */}
          <div
            className="overflow-x-auto rounded-md shadow"
            style={{ backgroundColor: colors.card }}
          >
            <table className="min-w-full rounded-md" style={{ color: colors.text }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${colors.accent}` }}>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Applied Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, idx) => (
                  <tr
                    key={app._id}
                    onClick={() => history.push(`leaves/${app._id}`)}
                    className="cursor-pointer transition"
                    style={{
                      borderBottom: `1px solid ${colors.accent}`,
                      backgroundColor: colors.card,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = colors.accent)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = colors.card)}
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{employeeMap[app.applicantID]?.[0]}</td>
                    <td className="px-4 py-2">{employeeMap[app.applicantID]?.[1]}</td>
                    <td className="px-4 py-2">{app.type}</td>
                    <td className="px-4 py-2">{app.title}</td>
                    <td className="px-4 py-2">{app.appliedDate}</td>
                    <td
                      className="px-4 py-2 font-semibold"
                      style={{
                        color:
                          app.adminResponse === 'Rejected'
                            ? '#F87171' /* red-400 */
                            : app.adminResponse === 'Pending'
                            ? '#FBBF24' /* yellow-400 */
                            : '#34D399' /* green-400 */
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
  )
}

export default LeaveView;
