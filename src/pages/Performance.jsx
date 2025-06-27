import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getEmployees } from "../http"; // Ensure this returns .data.data

const Performance = () => {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ employeeId: "", rating: "", feedback: "" });
  const [loading, setLoading] = useState(true);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res?.employees || []);
    } catch (error) {
      // toast.error("Failed to load employees");
      setEmployees([]);
    }
  };

  // Fetch performance records
  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/performance/all", {
        withCredentials: true, // ✅ important to send cookies
      });
      setRecords(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load performance records");
      setRecords([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchEmployees();
      await fetchRecords();
      setLoading(false);
    };
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5500/api/performance/add",
        {
          employeeId: form.employeeId,
          rating: form.rating,
          feedback: form.feedback,
        },
        {
          withCredentials: true, // ✅ Send token via cookies
        }
      );

      toast.success("Performance review added!");
      setForm({ employeeId: "", rating: "", feedback: "" });
      fetchRecords();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding performance review");
    }
  };

  if (loading) return <p className="text-center py-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-[#211C84] mb-6">Performance Reviews</h2>

      {/* Add Performance */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-xl mb-6 space-y-4">
        <select
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        <input
          type="number"
          min={1}
          max={5}
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          placeholder="Feedback"
          value={form.feedback}
          onChange={(e) => setForm({ ...form, feedback: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Submit Review
        </button>
      </form>

      {/* Records */}
      <div className="space-y-4">
        {records.map((r) => (
          <div key={r._id} className="border p-4 rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-blue-800">
                {r.employeeId?.name}
              </h3>
              <span className="text-yellow-600 font-bold">⭐ {r.rating}/5</span>
            </div>
            <p className="text-gray-700">{r.feedback}</p>
            <p className="text-sm text-gray-500 mt-2">
              Reviewed by: {r.reviewer?.name} |{" "}
              {new Date(r.reviewDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Performance;
