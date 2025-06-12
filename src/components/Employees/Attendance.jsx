import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { markEmployeeAttendance, viewEmployeeAttendance } from "../../http";
import Loading from "../Loading";

const Attendance = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const monthDays = {
    January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30, December: 31,
  };

  const days = selectedMonth ? Array.from({ length: monthDays[selectedMonth] }, (_, i) => i + 1) : [];

  useEffect(() => {
    const stored = localStorage.getItem(user.id);
    if (stored) {
      const data = JSON.parse(stored);
      const today = new Date().toLocaleDateString("en-IN");
      const savedDate = `${data.date}/${data.month}/${data.year}`;
      if (savedDate === today) setIsAttendanceMarked(true);
      else localStorage.removeItem(user.id);
    }
  }, [user.id]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const now = new Date();
        const res = await viewEmployeeAttendance({
          employeeID: user.id,
          year: now.getFullYear(),
          month: now.getMonth() + 1,
        });
        setAttendance(res.data || []);
      } catch (err) {
        toast.error("Failed to fetch attendance.");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, [user.id]);

  const handleMarkAttendance = async () => {
    try {
      const res = await markEmployeeAttendance({ employeeID: user.id });
      if (res.success) {
        toast.success(res.message);
        localStorage.setItem(user.id, JSON.stringify(res.newAttendance));
        setIsAttendanceMarked(true);
        setAttendance((prev) => [...prev, res.newAttendance]);
      }
    } catch (err) {
      toast.error("Error marking attendance");
    }
  };

  const handleSearch = async () => {
    const filters = { employeeID: user.id };
    if (selectedYear) filters.year = selectedYear;
    if (selectedMonth) filters.month = months.indexOf(selectedMonth) + 1;
    if (selectedDay) filters.date = selectedDay;

    try {
      const res = await viewEmployeeAttendance(filters);
      setAttendance(res.data || []);
    } catch {
      toast.error("Search failed");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="main-content p-6">
      <section className="section">
        <div className="bg-white shadow rounded-md p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-800">Attendance</h2>
          <button
            disabled={isAttendanceMarked}
            onClick={handleMarkAttendance}
            className={`px-6 py-2 text-white rounded-md font-medium transition ${
              isAttendanceMarked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAttendanceMarked ? "Attendance Marked" : "Mark Attendance"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            className="border rounded-md px-3 py-2 text-sm focus:ring focus:outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-2 text-sm focus:ring focus:outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select
            className="border rounded-md px-3 py-2 text-sm focus:ring focus:outline-none"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            disabled={!selectedMonth}
          >
            <option value="">Select Day</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Day</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((a, idx) => (
                  <tr key={a._id || idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2">{`${a.date}/${a.month}/${a.year}`}</td>
                    <td className="px-4 py-2">{a.day}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          a.present
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.present ? "Present" : "Absent"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-gray-500">
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Attendance;

