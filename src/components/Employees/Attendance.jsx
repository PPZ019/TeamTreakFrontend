import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { markEmployeeAttendance, viewEmployeeAttendance } from '../../http';

const Attendance = () => {
  const { user } = useSelector((state) => state.authSlice);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [attendance, setAttendance] = useState(null);

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthDays = {
    January: 31, February: 28, March: 31, April: 30, May: 31,
    June: 30, July: 31, August: 31, September: 30,
    October: 31, November: 30, December: 31
  };
  const numOfDays = monthDays[selectedMonth] || 31;
  const days = Array.from({ length: numOfDays }, (_, index) => index + 1);

  useEffect(() => {
    const storedData = localStorage.getItem(user.id);
    if (storedData) {
      const data = JSON.parse(storedData);
      const dt = `${data.date}/${data.month}/${data.year}`;
      if (dt === new Date().toLocaleDateString()) {
        setIsAttendanceMarked(true);
      } else {
        localStorage.clear();
      }
    }
  }, [user.id]);

  useEffect(() => {
    const dt = new Date();
    const obj = { employeeID: user.id, year: dt.getFullYear(), month: dt.getMonth() + 1 };
    const fetchData = async () => {
      const res = await viewEmployeeAttendance(obj);
      if (res.success) setAttendance(res.data);
    };
    fetchData();
  }, [user.id]);

  const markAttendance = async () => {
    const res = await markEmployeeAttendance({ employeeID: user.id });
    if (res.success) {
      toast.success(res.message);
      localStorage.setItem(user.id, JSON.stringify(res.newAttendance));
      setIsAttendanceMarked(true);
      const dt = new Date();
      const obj = { employeeID: user.id, year: dt.getFullYear(), month: dt.getMonth() + 1 };
      const resData = await viewEmployeeAttendance(obj);
      if (resData.success) setAttendance(resData.data);
    }
  };

  const searchAttendance = async () => {
    const obj = { employeeID: user.id };
    if (selectedYear) obj.year = selectedYear;
    if (selectedMonth) obj.month = months.findIndex(m => m === selectedMonth) + 1;
    if (selectedDay) obj.date = selectedDay;

    const res = await viewEmployeeAttendance(obj);
    if (res.success) setAttendance(res.data);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-blue-900">Attendance Dashboard</h2>
           <button
  onClick={markAttendance}
  disabled={isAttendanceMarked}
  className={`px-4 py-2 rounded text-sm font-medium transition-all duration-200 ${
    isAttendanceMarked
      ? 'bg-gray-600 text-white cursor-not-allowed'
      : 'bg-green-600 text-white hover:bg-green-700'
  }`}
>
  {isAttendanceMarked ? 'Attendance Marked' : 'Mark Attendance'}
</button>

          </div>
         <div className="border border-blue-300 rounded-lg p-4 shadow-sm bg-white">
  <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="form-select border border-gray-300 rounded px-3 py-2">
      <option value="">Select Year</option>
      {years.map((y) => <option key={y} value={y}>{y}</option>)}
    </select>

    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="form-select border border-gray-300 rounded px-3 py-2">
      <option value="">Select Month</option>
      {months.map((m) => <option key={m} value={m}>{m}</option>)}
    </select>

    <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="form-select border border-gray-300 rounded px-3 py-2">
      <option value="">Select Day</option>
      {days.map((d) => <option key={d} value={d}>{d}</option>)}
    </select>

    <button
      onClick={searchAttendance}
      className="bg-blue-900 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      Search
    </button>
  </div>
</div>


          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-4 border">Serial No.</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Day</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance?.length > 0 ? (
                  attendance.map((att, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border text-center">{idx + 1}</td>
                      <td className="py-2 px-4 border">{`${att.date}/${att.month}/${att.year}`}</td>
                      <td className="py-2 px-4 border">{att.day || 'N/A'}</td>
                      <td className="py-2 px-4 border">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${att.present ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {att.present ? 'Present' : 'Absent'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">No attendance data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
