import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { markEmployeeAttendance, viewEmployeeAttendance } from '../../http';
import Loading from '../Loading';

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
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthDays = {
    January: 31,
    February: 28, // Simplified; leap year logic can be added if needed
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
    const obj = {
      employeeID: user.id,
      year: dt.getFullYear(),
      month: dt.getMonth() + 1,
    };
    const fetchData = async () => {
      const res = await viewEmployeeAttendance(obj);
      if (res.success) {
        setAttendance(res.data);
      }
    };
    fetchData();
  }, [user.id]);

  const markAttendance = async () => {
    const res = await markEmployeeAttendance({ employeeID: user.id });
    if (res.success) {
      toast.success(res.message);
      const { newAttendance } = res;
      localStorage.setItem(user.id, JSON.stringify(newAttendance));
      setIsAttendanceMarked(true);
      const dt = new Date();
      const obj = {
        employeeID: user.id,
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
      };
      const resData = await viewEmployeeAttendance(obj);
      if (resData.success) {
        setAttendance(resData.data);
      }
    }
  };

  const searchAttendance = async () => {
    const obj = { employeeID: user.id };
    if (selectedYear) obj.year = selectedYear;
    if (selectedMonth) obj.month = months.findIndex((month) => month === selectedMonth) + 1;
    if (selectedDay) obj.date = selectedDay;

    const res = await viewEmployeeAttendance(obj);
    if (res.success) {
      setAttendance(res.data);
    }
  };

  return (
    <>
      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes slowBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slowBlink { animation: slowBlink 2s ease-in-out infinite; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-slideUp { animation: slideUp 1s ease-out; }
        `}
      </style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100 p-4 md:p-8">
        {attendance ? (
          <section className="max-w-5xl mx-auto">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-2xl mb-6 transform transition-all hover:scale-[1.02] duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-800 opacity-10 animate-pulse"></div>
              <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-800 text-white rounded-t-xl p-6 relative">
                <h4 className="text-2xl md:text-3xl font-extrabold tracking-tight animate-fadeIn">
                  <span className="relative inline-block">
                    <span className="relative text-white">Attendance Dashboard</span>
                  </span>
                </h4>
                <p className="text-sm mt-2 text-indigo-100 animate-slideUp font-medium">
                  Stay on top of your attendance with style! 🚀
                </p>
                <button
                  className={`mt-4 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-110 flex items-center gap-2 ${
                    isAttendanceMarked
                      ? 'bg-gray-500/80 text-gray-100 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-green-500/50'
                  }`}
                  onClick={markAttendance}
                  disabled={isAttendanceMarked}
                >
                  {isAttendanceMarked ? (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Attendance Marked
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Mark Attendance
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 transform transition-all hover:shadow-xl duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { value: selectedYear, onChange: setSelectedYear, options: years, placeholder: 'Select Year' },
                  { value: selectedMonth, onChange: setSelectedMonth, options: months, placeholder: 'Select Month' },
                  { value: selectedDay, onChange: setSelectedDay, options: days, placeholder: 'Select Day' },
                ].map(({ value, onChange, options, placeholder }, idx) => (
                  <select
                    key={idx}
                    className="border-2 border-indigo-200 rounded-lg p-3 bg-gradient-to-br from-white to-indigo-50 focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition-all duration-300 hover:shadow-md text-gray-700 font-medium"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  >
                    <option value="">{placeholder}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ))}
                <button
                  onClick={searchAttendance}
                  className="bg-gradient-to-r from-blue-600 to-indigo-400 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-indigo-500/50 flex items-center justify-center gap-2"
                >
                  
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
                    />
                  
                  Search
                </button>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl duration-300">
              <div className="overflow-x-auto p-6">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                      <th className="p-4 text-left font-semibold">#</th>
                      <th className="p-4 text-left font-semibold">Date</th>
                      <th className="p-4 text-left font-semibold">Day</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance?.length > 0 ? (
                      attendance.map((attendance, idx) => (
                        <tr
                          key={attendance._id || idx}
                          className="border-b border-indigo-100 hover:bg-indigo-50/50 transition-all duration-200"
                        >
                          <td className="p-4 text-gray-700 font-medium">{idx + 1}</td>
                          <td className="p-4 text-gray-700">{`${attendance.date}/${attendance.month}/${attendance.year}`}</td>
                          <td className="p-4 text-gray-700">{attendance.day || 'N/A'}</td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${
                                attendance.present
                                  ? 'bg-green-100 text-green-700 animate-slowBlink'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {attendance.present && (
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                              {attendance.present ? 'Present' : 'Absent'}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-6 text-center text-gray-500 font-medium">
                          No attendance records found. Start marking your attendance! 😊
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full w-max-2xl space-y-4">
              <div className="h-6 bg-indigo-100 rounded w-1/4 animate-pulse mx-auto"></div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 bg-indigo-100 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex space-x-4 p-4 animate-pulse">
                    <div className="h-4 bg-indigo-100 rounded w-1/12"></div>
                    <div className="h-4 bg-indigo-100 rounded w-1/4"></div>
                    <div className="h-4 bg-indigo-100 rounded w-1/6"></div>
                    <div className="h-4 bg-indigo-100 rounded w-1/6"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Attendance;