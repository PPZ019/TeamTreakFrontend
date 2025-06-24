import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { applyforleave } from "../../http";

const ApplyForLeave = () => {
  const { user } = useSelector((state) => state.authSlice);
  const initialState = { title: '', type: '', period: '', startDate: null, endDate: null, reason: '' };
  const [formData, setFormData] = useState(initialState);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { title, type, startDate, endDate, reason, period } = formData;
    if (!title || !type || !startDate || !endDate || !period || !reason) {
      return toast.error('All Fields Required');
    }

    const formattedData = {
      ...formData,
      applicantID: user.id,
      appliedDate: new Date().toISOString().split('T')[0], 
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };

    const res = await applyforleave(formattedData);
    if (res.success) {
      toast.success("Leave Application Sent!");
      setFormData(initialState);
    } else {
      toast.error(res.message || "Failed to apply for leave");
    }
  };

  return (
    <>
      <style>{`
        .datepicker-input input {
          width: 100%;
          padding: 0.65rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.375rem;
          background-color: #f9fafb;
          transition: border-color 0.3s;
        }
        .datepicker-input input:focus {
          border-color: #2563eb;
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>

      <div className="min-h-screen p-4 md:p-8">
        <section className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Apply for Leave</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={onSubmit}>
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={inputEvent}
                  placeholder="e.g. Sick Leave"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Leave Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={inputEvent}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                >
                  <option value="">Select Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                </select>
              </div>

              {/* Period */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Leave Period (Days)</label>
                <input
                  type="number"
                  name="period"
                  value={formData.period}
                  onChange={inputEvent}
                  min="1"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Start Date */}
              <div className="datepicker-input">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                  className="w-full"
                  placeholderText="Select start date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* End Date */}
              <div className="datepicker-input">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                  className="w-full"
                  placeholderText="Select end date"
                  dateFormat="yyyy-MM-dd"
                />
              </div>

              {/* Reason */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={inputEvent}
                  placeholder="Briefly describe the reason"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 bg-white text-gray-800"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-blue-900 hover:bg-blue-900 text-white font-medium px-6 py-2 rounded-md transition duration-300"
                >
                  Apply for Leave
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplyForLeave;
