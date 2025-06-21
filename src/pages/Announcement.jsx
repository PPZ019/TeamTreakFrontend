import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBullhorn, FaTrashAlt } from "react-icons/fa";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", audience: "all" });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/announcements/all");
      setAnnouncements(res.data.data);
    } catch {
      toast.error("Failed to load announcements");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/announcements/create", form);
      toast.success("Announcement posted");
      setForm({ title: "", message: "", audience: "all" });
      fetchData();
    } catch {
      toast.error("Error creating announcement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`http://localhost:5500/api/announcements/delete/${id}`);
      toast.success("Deleted");
      fetchData();
    } catch {
      toast.error("Error deleting");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#211C84] flex items-center gap-2">
          Announcements
        </h1>
      </div>

      {/* Create Form */}
      <form
        onSubmit={handleCreate}
        className="bg-gradient-to-r from-white via-blue-50 to-white border border-gray-200 shadow-sm rounded-xl p-6 space-y-4"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Audience</label>
            <select
              name="audience"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All</option>
              <option value="employee">Employees</option>
            </select>
          </div>
          <div className="flex items-end justify-end">
            <button
              type="submit"
              className="bg-[#211C84] hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Post
            </button>
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter message"
            required
          />
        </div>
      </form>

      {/* Announcements List */}
      <div className="mt-10 space-y-6">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="relative bg-white border border-gray-200 shadow-sm rounded-xl p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-blue-800">{a.title}</h3>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{a.message}</p>
                <p className="mt-3 text-sm text-gray-500">
                  To: <span className="font-medium">{a.audience.toUpperCase()}</span> |{" "}
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(a._id)}
                title="Delete"
                className="text-red-500 hover:text-red-700 text-lg"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div className="text-center text-gray-500 text-sm mt-8">No announcements yet.</div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
