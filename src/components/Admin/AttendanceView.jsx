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

  const years = [2020, 2021, 2022, 2023, 2024];
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
        <div
          className="min-h-screen p-6"
          style={{ backgroundColor: "#1E201E", color: "#ECDFCC" }}
        >
          <section className="max-w-7xl mx-auto">
            <div
              className="rounded-2xl p-6 mb-6 shadow-lg"
              style={{ backgroundColor: "#3C3D37" }}
            >
              <h2 className="text-3xl font-semibold mb-4">Attendance</h2>
              <div className="flex flex-wrap gap-4 justify-center mb-4">
                {/* Employee Select */}
                <select
                  className="p-3 rounded-xl bg-transparent border"
                  style={{ borderColor: "#697565", color: "#ECDFCC" }}
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees?.map((employee) => (
                    <option
                      key={employee._id}
                      value={employee.id}
                      style={{ color: "#1E201E" }}
                    >
                      {employee.name}
                    </option>
                  ))}
                </select>

                {/* Year Select */}
                <select
                  className="p-3 rounded-xl bg-transparent border"
                  style={{ borderColor: "#697565", color: "#ECDFCC" }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                      style={{ color: "#1E201E" }}
                    >
                      {year}
                    </option>
                  ))}
                </select>

                {/* Month Select */}
                <select
                  className="p-3 rounded-xl bg-transparent border"
                  style={{ borderColor: "#697565", color: "#ECDFCC" }}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option
                      key={month}
                      value={month}
                      style={{ color: "#1E201E" }}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                {/* Day Select */}
                <select
                  className="p-3 rounded-xl bg-transparent border"
                  style={{ borderColor: "#697565", color: "#ECDFCC" }}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option
                      key={day}
                      value={day}
                      style={{ color: "#1E201E" }}
                    >
                      {day}
                    </option>
                  ))}
                </select>

                <button
                  onClick={searchAttendance}
                  className="px-6 py-3 rounded-full font-semibold shadow-md"
                  style={{
                    backgroundColor: "#697565",
                    color: "#ECDFCC",
                    minWidth: "140px",
                  }}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Attendance Table */}
            <div
              className="overflow-x-auto rounded-2xl shadow-lg"
              style={{ backgroundColor: "#3C3D37" }}
            >
              <table className="min-w-full text-left border-collapse border border-[#697565]">
                <thead>
                  <tr style={{ borderBottom: "2px solid #697565" }}>
                    {["#", "Name", "Email", "Date", "Day", "Status"].map(
                      (heading) => (
                        <th
                          key={heading}
                          className="py-3 px-6 font-semibold"
                          style={{ borderRight: "1px solid #697565" }}
                        >
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {attendance?.map((att, idx) => (
                    <tr
                      key={att._id || idx}
                      className="hover:bg-[#697565]/20 transition-colors"
                    >
                      <td className="py-2 px-6 border-r border-[#697565]">
                        {idx + 1}
                      </td>
                      <td className="py-2 px-6 border-r border-[#697565]">
                        {employeeMap && employeeMap[att.employeeID]
                          ? employeeMap[att.employeeID][0]
                          : "N/A"}
                      </td>
                      <td className="py-2 px-6 border-r border-[#697565]">
                        {employeeMap && employeeMap[att.employeeID]
                          ? employeeMap[att.employeeID][1]
                          : "N/A"}
                      </td>
                      <td className="py-2 px-6 border-r border-[#697565]">
                        {att.date}/{att.month}/{att.year}
                      </td>
                      <td className="py-2 px-6 border-r border-[#697565]">
                        {att.day}
                      </td>
                      <td className="py-2 px-6">
                        {att.present === true ? (
                          <span className="text-green-400 font-semibold">
                            Present
                          </span>
                        ) : (
                          <span className="text-red-400 font-semibold">
                            Absent
                          </span>
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
