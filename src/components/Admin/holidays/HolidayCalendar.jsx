import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from "date-fns";

const holidays = [
  { date: "2025-01-26", title: "Republic Day", type: "National" },
  { date: "2025-03-08", title: "Holi", type: "Festival" },
  { date: "2025-08-15", title: "Independence Day", type: "National" },
  { date: "2025-10-02", title: "Gandhi Jayanti", type: "National" },
  { date: "2025-12-25", title: "Christmas", type: "Optional" },
];

const getHolidayByDate = (date) =>
  holidays.find(
    (h) => format(new Date(h.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
  );

const HolidayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="bg-white shadow rounded-lg p-4 flex justify-center">
  <div>
    <h2 className="text-xl font-bold text-blue-900 mb-4 text-center">📅 Holiday Calendar</h2>
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      tileContent={({ date, view }) => {
        const holiday = getHolidayByDate(date);
        if (view === "month" && holiday) {
          return (
            <div
              className={`mt-1 text-xs rounded text-white px-1 ${
                holiday.type === "National"
                  ? "bg-red-500"
                  : holiday.type === "Festival"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            >
              {holiday.title}
            </div>
          );
        }
      }}
    />
  </div>
</div>


      {/* Holiday List */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">📋 Upcoming Holidays</h3>
        <ul className="divide-y">
          {holidays.map((h) => (
            <li key={h.date} className="py-2 flex justify-between items-center">
              <div>
                <div className="font-medium">{h.title}</div>
                <div className="text-sm text-gray-500">
                  {format(new Date(h.date), "dd MMM yyyy")}
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  h.type === "National"
                    ? "bg-red-100 text-red-700"
                    : h.type === "Festival"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {h.type}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HolidayCalendar;
