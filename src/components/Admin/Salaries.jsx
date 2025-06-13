import React, { useEffect, useState } from 'react';
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

  const searchSalary = async () => {
    const obj = {};
    if (selectedEmployee) obj["employeeID"] = selectedEmployee;
    const res = await viewAllSalaries(obj);
    setSalaries(res.data);
  };

  return (
    <>
      {salaries ? (
        <div className="min-h-screen bg-white text-slate-800 p-6">
          <section className="mb-6">
            <div className="bg-slate-100 rounded-lg shadow p-6 mb-6">
              <h4 className="text-4xl font-semibold text-center text-blue-900">Salaries</h4>
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-end mb-6">
              {/* Dropdown */}
              <div className="w-72">
                <label className="block mb-1 font-medium text-slate-800">
                  
                </label>
                <select
                  className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-blue-900 bg-white"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button
                onClick={searchSalary}
                className="px-6 py-2 font-semibold rounded bg-blue-900 text-white border border-blue-900 hover:bg-white hover:text-blue-900 transition duration-200"
              >
                Search
              </button>
            </div>
          </section>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg shadow bg-slate-100">
            <table className="min-w-full text-left text-slate-800">
              <thead>
                <tr className="border-b border-blue-900">
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Bonus</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((salary, idx) => (
                  <tr
                    key={salary._id}
                    onClick={() => navigate(`salary/${salary._id}`)}
                    className="cursor-pointer border-b border-slate-300 hover:bg-blue-100 transition"
                  >
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{employeeMap[salary.employeeID]?.[0]}</td>
                    <td className="px-4 py-2">{employeeMap[salary.employeeID]?.[1]}</td>
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
