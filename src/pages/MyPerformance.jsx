import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";
import { BsStarFill } from "react-icons/bs";

const MyPerformance = () => {
  const [records, setRecords] = useState([]);

  const fetchMyPerformance = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/performance/employee", {
        withCredentials: true,
      });
      setRecords(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load your performance reviews");
    }
  };

  useEffect(() => {
    fetchMyPerformance();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-[#211C84] mb-6 text-center">My Performance Reviews</h2>

      {records.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No performance reviews yet.</div>
      ) : (
        <div className="grid gap-6">
          {records.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUserCircle className="text-xl text-[#211C84]" />
                  <span className="text-sm font-medium">
                    Reviewed by: <span className="text-blue-700">{r.reviewer?.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <BsStarFill /> {r.rating}/5
                </div>
              </div>

              <p className="text-gray-800 text-base leading-relaxed">{r.feedback}</p>

              <div className="mt-4 text-sm text-gray-500 text-right">
                Date: {new Date(r.reviewDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPerformance;
