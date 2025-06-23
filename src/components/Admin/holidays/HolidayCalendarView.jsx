import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";

const HolidayCalendarView = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchHolidays = async (year = selectedYear) => {
    try {
      const res = await axios.get(`http://localhost:5500/api/holidays/${year}`);
      setHolidays(res.data);
    } catch (err) {
      console.error("Error fetching holidays:", err);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, [selectedYear]);

  const isHoliday = (date) =>
    holidays.find(
      (h) => format(new Date(h.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* <h1 className="text-3xl font-bold text-center text-indigo-700">Company Holidays</h1> */}

      <div className="bg-white border border-gray-300 shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-4">
  <h2 className="text-xl font-semibold text-indigo-700">📆 Select a Date</h2>

  <Calendar
    onChange={setSelectedDate}
    value={selectedDate}
    className="REACT-CALENDAR"
    tileClassName={({ date, view }) => {
      if (view === "month") {
        const match = isHoliday(date);
        if (match) {
          if (match.type === "National") return "bg-red-500 text-white font-bold rounded-full";
          if (match.type === "Festival") return "bg-yellow-400 text-black font-semibold rounded-full";
          if (match.type === "Optional") return "bg-green-500 text-white font-semibold rounded-full";
        }
        if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
          return "ring-2 ring-indigo-500 rounded-full";
        }
      }
    }}
  />

  {/* Legend */}
  <div className="flex gap-4 mt-2 text-sm text-gray-600">
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-red-500 rounded-full"></span> National
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-yellow-400 rounded-full"></span> Festival
    </span>
    <span className="flex items-center gap-2">
      <span className="w-3 h-3 bg-green-500 rounded-full"></span> Optional
    </span>
  </div>
</div>


      <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Holidays in {selectedYear}
        </h2>

        {holidays.length === 0 ? (
          <p className="text-gray-500">No holidays added yet.</p>
        ) : (
          <ul className="space-y-4">
            {holidays.map((h) => (
              <li
                key={h._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-100 hover:shadow-sm transition"
              >
                <div className="text-gray-800">
                  <p className="font-medium">
                    {format(new Date(h.date), "PPP")} — {h.title}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${h.type === "National"
                    ? "bg-red-100 text-red-700"
                    : h.type === "Festival"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                    }`}
                >
                  {h.type}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HolidayCalendarView;
