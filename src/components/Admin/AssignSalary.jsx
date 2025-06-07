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

  // Theme colors
  const colors = {
    background: "#1E201E",
    card: "#3C3D37",
    accent: "#697565",
    text: "#ECDFCC",
  };

  return (
    <div
      className="main-content"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <section className="section px-4 py-8">
        <HeaderSection title="Assign Salary" />
        <div
          className="rounded-2xl shadow-xl p-8 max-w-5xl mx-auto mt-6"
          style={{ backgroundColor: colors.card }}
        >
          <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Employee Dropdown */}
            <div>
              <label
                className="block mb-1 font-semibold"
                style={{ color: colors.text }}
              >
                Select Employee
              </label>
              <select
                className="w-full p-3 rounded-xl border focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.accent,
                }}
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
              >
                <option
                  value=""
                  style={{ backgroundColor: colors.background, color: colors.text }}
                >
                  Choose an employee
                </option>
                {employees?.map((emp) => (
                  <option
                    key={emp._id}
                    value={emp.id}
                    style={{ backgroundColor: colors.background, color: colors.text }}
                  >
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary Input */}
            <div>
              <label
                className="block mb-1 font-semibold"
                style={{ color: colors.text }}
              >
                Salary Amount
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.accent,
                }}
                placeholder="Enter salary"
              />
            </div>

            {/* Bonus Input */}
            <div>
              <label
                className="block mb-1 font-semibold"
                style={{ color: colors.text }}
              >
                Bonus Amount
              </label>
              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.accent,
                }}
                placeholder="Enter bonus"
              />
            </div>

            {/* Reason Input */}
            <div className="md:col-span-2">
              <label
                className="block mb-1 font-semibold"
                style={{ color: colors.text }}
              >
                Reason for Bonus
              </label>
              <input
                type="text"
                name="reasonForBonus"
                value={formData.reasonForBonus}
                onChange={inputEvent}
                className="w-full p-3 rounded-xl border focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.accent,
                }}
                placeholder="Explain reason"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center">
              <button
                type="submit"
                className="px-10 py-3 rounded-full text-lg font-semibold shadow-md transition-all duration-300"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.text,
                  border: `1px solid ${colors.accent}`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.text;
                  e.target.style.color = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.accent;
                  e.target.style.color = colors.text;
                }}
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
