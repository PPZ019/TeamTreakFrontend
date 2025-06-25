import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBullhorn } from "react-icons/fa";
import { toast } from "react-toastify";

const ViewAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5500/api/announcements/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(res.data.data);
    } catch {
      toast.error("Failed to load announcements");
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl font-bold text-[#211C84]">Announcements</h1>
      </div>

      {announcements.length === 0 ? (
        <div className="text-center text-gray-500 py-12 text-lg">
          🚫 No announcements have been posted yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((a) => (
            <div
              key={a._id}
              className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-5 relative"
            >
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold text-blue-900">{a.title}</h3>
              </div>

              <p className="text-gray-700 whitespace-pre-line">{a.message}</p>

              <div className="mt-4 text-sm text-gray-500 border-t pt-3">
  <span className="font-medium">Posted on:</span>{" "}
  {new Date(a.createdAt).toLocaleDateString('en-GB')}
</div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAnnouncements;
