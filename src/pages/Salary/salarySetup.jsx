import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getEmployees } from "../../http";
import axios from "axios";

const SalarySetup = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employeeId: "",
    basic: "",
    hra: "",
    allowance: "",
    deduction: "",
    date: new Date().toISOString().split("T")[0]  // ✅ Default to today's date
  });

  // Reset form on mount
  useEffect(() => {
    setForm({
      employeeId: "",
      basic: "",
      hra: "",
      allowance: "",
      deduction: "",
      date: new Date().toISOString().split("T")[0]
    });
  }, []);

  // Fetch employees
  useEffect(() => {
    (async () => {
      try {
        const res = await getEmployees();
        if (res.success) {
          setEmployees(res.employees);
        } else {
          toast.error("Failed to load employees");
        }
      } catch (err) {
        toast.error("Add employees to proceed with salary creation.");

      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Submitted form:", form);
      await axios.post("http://localhost:5500/api/salary/setup", form);
      toast.success("Salary setup successful!");

      // Reset form
      setForm({
        employeeId: "",
        basic: "",
        hra: "",
        allowance: "",
        deduction: "",
        date: new Date().toISOString().split("T")[0]
      });
    } catch (err) {
      console.error("❌ Error:", err?.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-xl font-bold mb-4 text-[#211C84]">Salary Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4" key={employees.length}>
        {/* Employee Selection */}
        <div>
          <label className="block mb-1 font-medium">Select Employee</label>
          <select
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
        </div>

        {/* Salary Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Basic Pay</label>
            <input
              type="number"
              name="basic"
              value={form.basic}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1">HRA</label>
            <input
              type="number"
              name="hra"
              value={form.hra}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Allowance</label>
            <input
              type="number"
              name="allowance"
              value={form.allowance}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Deduction</label>
            <input
              type="number"
              name="deduction"
              value={form.deduction}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Salary Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-[#211C84] text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Save Salary
          </button>
        </div>
      </form>
    </div>
  );
};

export default SalarySetup;
