import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { format } from "date-fns";

const HolidayCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [form, setForm] = useState({ title: "", type: "National" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newHoliday = {
      date: selectedDate,
      title: form.title,
      type: form.type,
    };

    try {
      await axios.post("http://localhost:5500/api/holidays", newHoliday);
      alert("✅ Holiday added!");
      setForm({ title: "", type: "National" });

      const year = new Date(newHoliday.date).getFullYear();
      setSelectedYear(year);
      fetchHolidays(year);
    } catch (err) {
      if (err.response?.data?.error?.code === 11000) {
        alert("❌ A holiday on this date already exists.");
      } else {
        console.error("Error adding holiday:", err);
        alert("Something went wrong while adding the holiday.");
      }
    }
  };

  const isHoliday = (date) =>
    holidays.find(
      (h) => format(new Date(h.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-indigo-700">📅 Holiday Calendar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="shadow-lg rounded-lg p-4 border border-gray-200 bg-white flex justify-center items-center">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view === "month") {
                const match = isHoliday(date);
                if (match) {
                  if (match.type === "National") return "bg-red-300 text-white rounded-full";
                  if (match.type === "Festival") return "bg-yellow-300 text-black rounded-full";
                  if (match.type === "Optional") return "bg-green-300 text-white rounded-full";
                }
                if (format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")) {
                  return "ring-2 ring-blue-400 rounded-full";
                }
              }
            }}
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 space-y-6"
        >
          <h2 className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
            <span>➕</span> Add a Holiday
          </h2>

          {/* Selected Date */}
          <div className="text-gray-700 text-sm">
            <label className="block font-medium mb-1">Selected Date</label>
            <div className="bg-gray-100 p-2 rounded-md">{format(selectedDate, "PPP")}</div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Title</label>
            <input
              type="text"
              placeholder="e.g. Independence Day"
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="National">🇮🇳 National</option>
              <option value="Festival">🎉 Festival</option>
              <option value="Optional">🌿 Optional</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            Add Holiday
          </button>
        </form>

      </div>


      {/* List */}
      <div className="bg-white shadow rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">
          Upcoming Holidays in {selectedYear}
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

export default HolidayCalendar;
