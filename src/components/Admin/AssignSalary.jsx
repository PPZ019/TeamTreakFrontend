import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { assignSalary, getEmployees, getLeaders } from "../../http";

const AssignSalary = () => {
  const initialState = { salary: "", bonus: "", reasonForBonus: "" };
  const [formData, setFormData] = useState(initialState);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const emps = await getEmployees();
      const leaders = await getLeaders();
      setEmployees([...emps.data, ...leaders.data]);
    };
    fetchEmployees();
  }, []);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { salary, bonus, reasonForBonus } = formData;
    if (!salary || !bonus || !reasonForBonus)
      return toast.error("All fields are required");
    formData["employeeID"] = selectedEmployee;
    const res = await assignSalary(formData);
    const { success } = res;
    if (success) toast.success("Salary Assigned!");
    setFormData(initialState);
    setSelectedEmployee("");
  };

  return (
    <div className="main-content bg-white text-blue-900 font-bold min-h-screen">
      <section className="section px-4 py-8">
        <HeaderSection title="Assign Salary" />
        <div className="bg-slate-100 rounded-2xl shadow-xl p-8 max-w-5xl mx-auto mt-6">
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Employee Dropdown */}
            <div>
              <label className="block mb-1 font-semibold text-slate-800">
                Select Employee
              </label>
              <select
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white text-slate-800"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option value="">Choose an employee</option>
                {employees?.map((emp) => (
                  <option key={emp._id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Input */}
            <div>
              <label className="block mb-1 font-semibold text-slate-800">
                Salary Amount
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white text-slate-800"
                placeholder="Enter salary"
              />
            </div>

            {/* Bonus Input */}
            <div>
              <label className="block mb-1 font-semibold text-slate-800">
                Bonus Amount
              </label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white text-slate-800"
                placeholder="Enter bonus"
              />
            </div>

            {/* Reason Input */}
            <div className="md:col-span-2">
              <label className="block mb-1 font-semibold text-slate-800">
                Reason for Bonus
              </label>
              <input
                type="text"
                name="reasonForBonus"
                value={formData.reasonForBonus}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border border-slate-300 focus:outline-blue-900 bg-white text-slate-800"
                placeholder="Explain reason"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="px-10 py-3 rounded-full text-lg font-semibold bg-blue-900 text-white hover:bg-blue-800 hover:text-blue-900 border border-blue-900 transition-all duration-300 shadow-md"
              >
                Assign Salary
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AssignSalary;
