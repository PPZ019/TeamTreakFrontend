import React, { useEffect, useState } from 'react'
import { getEmployees, getLeaders, viewAllSalaries } from '../../http';
import { useNavigate } from "react-router-dom";
import Loading from '../Loading';

const Salaries = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [employeeMap, setEmployeeMap] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [salaries, setSalaries] = useState(null);

  useEffect(() => {
    let empObj = {};
    const fetchData = async () => {
      const res = await viewAllSalaries({});
      setSalaries(res.data);
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

  const searchSalary = async () => {
    const obj = {};
    if (selectedEmployee) {
      obj["employeeID"] = selectedEmployee;
    }
    const res = await viewAllSalaries(obj);
    setSalaries(res.data);
  }

  // Theme colors
  const colors = {
    background: '#1E201E',
    card: '#3C3D37',
    accent: '#697565',
    text: '#ECDFCC'
  };

  return (
    <>
      {salaries ? (
        <div
          className="min-h-screen p-6"
          style={{ backgroundColor: colors.background, color: colors.text }}
        >
          <section className="mb-6">
            <div
              className="rounded-md shadow p-4 mb-6"
              style={{ backgroundColor: colors.card }}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-4xl font-semibold text-center" style={{ color: colors.text }}>
                  Salaries
                </h4>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-end mb-6">
              <div className="w-72">
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
                  <option
                    value=""
                    style={{ backgroundColor: colors.card, color: colors.text }}
                  >
                    Employees
                  </option>
                  {employees.map((employee) => (
                    <option
                      key={employee._id}
                      value={employee.id}
                      style={{ backgroundColor: colors.card, color: colors.text }}
                    >
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={searchSalary}
                className="font-semibold px-6 py-2 rounded transition"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.text,
                  border: `1px solid ${colors.accent}`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.text;
                  e.target.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.accent;
                  e.target.style.color = colors.text;
                }}
              >
                Search
              </button>
            </div>
          </section>

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
                  <th className="px-4 py-3 text-left">Salary</th>
                  <th className="px-4 py-3 text-left">Bonus</th>
                </tr>
              </thead>

              <tbody>
                {salaries.map((salary, idx) => (
                  <tr
                    key={salary._id}
                    onClick={() => navigate.push(`salary/${salary._id}`)}
                    className="cursor-pointer transition"
                    style={{
                      borderBottom: `1px solid ${colors.accent}`,
                      backgroundColor: colors.card,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.card)
                    }
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">
                      {employeeMap[salary.employeeID]?.[0]}
                    </td>
                    <td className="px-4 py-2">
                      {employeeMap[salary.employeeID]?.[1]}
                    </td>
                    <td className="px-4 py-2">{salary.salary}</td>
                    <td className="px-4 py-2">{salary.bonus}</td>
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

export default Salaries;
