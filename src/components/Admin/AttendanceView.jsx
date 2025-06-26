// ============================
// ✅ CLIENT - AttendanceView.jsx with IP & Location + View Button + IP Location Tracker
// ============================

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
  const [ipInfoMap, setIpInfoMap] = useState({});

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthDays = {
    January: 31, February: 28, March: 31, April: 30, May: 31,
    June: 30, July: 31, August: 31, September: 30,
    October: 31, November: 30, December: 31,
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

    const fetchData = async () => {
      const res = await getAttendance(obj);
      setAttendance(res.data);
    };

    const fetchEmployees = async () => {
      try {
        const emps = await getEmployees();
        const leaders = await getLeaders();
        let empObj = {};

        (emps.employees || []).forEach(emp => {
          empObj[emp._id] = [emp.name, emp.email];
        });

        (leaders.employees || []).forEach(lead => {
          empObj[lead._id] = [lead.name, lead.email];
        });

        setEmployeeMap(empObj);
        setEmployees([...(emps.employees || []), ...(leaders.employees || [])]);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
    fetchData();
  }, []);

  const searchAttendance = async () => {
    const obj = {};
    if (selectedEmployee) obj.employeeID = selectedEmployee;
    if (selectedYear) obj.year = selectedYear;
    if (selectedMonth) obj.month = months.indexOf(selectedMonth) + 1;
    if (selectedDay) obj.date = selectedDay;

    const res = await getAttendance(obj);
    setAttendance(res.data);
  };

  const openMap = (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    window.open(url, '_blank');
  };

  const fetchIPInfo = async (ip) => {
    if (!ip || ipInfoMap[ip]) return;
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      setIpInfoMap(prev => ({ ...prev, [ip]: data }));
    } catch (err) {
      console.error("IP info fetch error:", err);
    }
  };

  return (
    <>
      {attendance ? (
        <div className="min-h-screen p-6 bg-white text-gray-800">
          <section className="max-w-7xl mx-auto">
            <div className="rounded-xl p-6 mb-6 border border-gray-300 bg-gray-50">
              <h2 className="text-3xl font-semibold mb-6 text-center text-blue-900">Attendance</h2>

              <div className="flex flex-wrap gap-4 justify-center mb-6">
                <select
                  className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Employees</option>
                  {employees?.map(emp => (
                    <option key={emp._id} value={emp._id}>{emp.name}</option>
                  ))}
                </select>

                <select
                  className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <select
                  className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>

                <select
                  className="px-3 py-1 rounded-xl border border-gray-300 bg-white text-gray-800 font-medium"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                <button
                  onClick={searchAttendance}
                  className="px-6 py-2.5 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white">
              <table className="min-w-full text-left">
                <thead className="bg-gray-100 text-gray-700 text-center">
                  <tr>
                    {["Number", "Name", "Email", "Date", "Day", "Status", "Location"].map((heading) => (
                      <th key={heading} className="py-3 px-6 border-b border-gray-300 font-medium">{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {attendance?.filter(att => employeeMap?.[att.employeeID]).map((att, idx) => {
                    if (att.ip) fetchIPInfo(att.ip);
                    const ipDetails = ipInfoMap[att.ip];

                    return (
                      <tr key={att._id || idx} className="hover:bg-gray-50 text-center">
                        <td className="py-2 px-6 border-b border-gray-200">{idx + 1}</td>
                        <td className="py-2 px-6 border-b border-gray-200">{employeeMap?.[att.employeeID]?.[0] || "N/A"}</td>
                        <td className="py-2 px-6 border-b border-gray-200">{employeeMap?.[att.employeeID]?.[1] || "N/A"}</td>
                        <td className="py-2 px-6 border-b border-gray-200">{att.date}/{att.month}/{att.year}</td>
                        <td className="py-2 px-6 border-b border-gray-200">{att.day}</td>
                        <td className="py-2 px-6 border-b border-gray-200">
                          {att.present ? (
                            <span className="text-green-600 font-semibold">Present</span>
                          ) : (
                            <span className="text-red-500 font-semibold">Absent</span>
                          )}
                        </td>
                        {/* <td className="py-2 px-6 border-b border-gray-200">
                          {att.ip || "N/A"}
                          {ipDetails?.city && (
                            <div className="text-xs text-gray-500">{ipDetails.city}, {ipDetails.region}</div>
                          )}
                        </td> */}
                        <td className="py-2 px-6 border-b border-gray-200 text-center">
                          {att.location && att.location.latitude && att.location.longitude ? (
                            <button
                              onClick={() => openMap(att.location.latitude, att.location.longitude)}
                              className="text-blue-600 px-3 py-2 text-black border rounded-xl hover:text-blue-800"
                            >
                              View 
                            </button>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    );
                  })}
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