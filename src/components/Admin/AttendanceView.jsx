import React, { useEffect, useState } from "react";
import { getAttendance, getEmployees, getLeaders } from "../../http";
import Loading from "../Loading";

const AttendanceView = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [attendance, setAttendance] = useState();
  const [employeeMap, setEmployeeMap] = useState();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const years = [2020, 2021, 2022, 2023, 2024,2025];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthDays = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  const numOfDays = monthDays[selectedMonth];
  const days = Array.from({ length: numOfDays || 0 }, (_, i) => i + 1);

  useEffect(() => {
    const dt = new Date();
    const obj = {
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
      date: dt.getDate(),
    };
    let empObj = {};
    const fetchData = async () => {
      const res = await getAttendance(obj);
      const { data } = res;
      setAttendance(data);
    };
    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      emps.data.forEach(
        (employee) => (empObj[employee.id] = [employee.name, employee.email])
      );
      leaders.data.forEach(
        (leader) => (empObj[leader.id] = [leader.name, leader.email])
      );
      setEmployeeMap(empObj);
      setEmployees([...emps.data, ...leaders.data]);
    };
    fetchEmployees();
    fetchData();
  }, []);

  const searchAttendance = async () => {
    const obj = {};
    if (selectedEmployee) obj.employeeID = selectedEmployee;
    if (selectedYear) obj.year = selectedYear;
    if (selectedMonth)
      obj.month = months.findIndex((month) => month === selectedMonth) + 1;
    if (selectedDay) obj.date = selectedDay;

    const res = await getAttendance(obj);
    const { data } = res;
    setAttendance(data);
  };

  return (
    <>
      {attendance ? (
      <div className="min-h-screen p-6 bg-white text-gray-800">
  <section className="max-w-7xl mx-auto">
    <div className="rounded-xl p-6 mb-6 border border-gray-300 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-900">Attendance</h2>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {/* Employee Select */}
        <select
          className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Employees</option>
          {employees?.map((employee) => (
            <option key={employee._id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>

        {/* Year Select */}
        <select
          className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

       {/* Month Select */}
<select
  className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
>
  <option value="">Month</option>
  {months.map((month) => (
    <option key={month} value={month}>
      {month}
    </option>
  ))}
</select>
        {/* Day Select */}
        <select
          className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium shadow-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>

        <button
  onClick={searchAttendance}
  className="px-6 py-2.5 rounded-xl bg-blue-900 600 text-white font-semibold shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
>
  Search
</button>

      </div>
    </div>

    {/* Attendance Table */}
    <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            {["Number", "Name", "Email", "Date", "Day", "Status"].map((heading) => (
              <th
                key={heading}
                className="py-3 px-6 border-b border-gray-300 font-medium"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {attendance?.map((att, idx) => (
            <tr
              key={att._id || idx}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="py-2 px-6 border-b border-gray-200">{idx + 1}</td>
              <td className="py-2 px-6 border-b border-gray-200">
                {employeeMap?.[att.employeeID]?.[0] || "N/A"}
              </td>
              <td className="py-2 px-6 border-b border-gray-200">
                {employeeMap?.[att.employeeID]?.[1] || "N/A"}
              </td>
              <td className="py-2 px-6 border-b border-gray-200">
                {att.date}/{att.month}/{att.year}
              </td>
              <td className="py-2 px-6 border-b border-gray-200">{att.day}</td>
              <td className="py-2 px-6 border-b border-gray-200">
                {att.present ? (
                  <span className="text-green-600 font-semibold">Present</span>
                ) : (
                  <span className="text-red-500 font-semibold">Absent</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
</div>

      ) : (
        <Loading />
      )}
    </>
  );
};

export default AttendanceView;
