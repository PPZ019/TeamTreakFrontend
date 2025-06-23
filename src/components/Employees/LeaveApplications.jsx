import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ApplyForLeave = () => {
  const { user } = useSelector((state) => state.authSlice);
  const initialState = { title: '', type: '', period: '', startDate: null, endDate: null, reason: '' };
  const [formData, setFormData] = useState(initialState);
  const [showConfetti, setShowConfetti] = useState(false);

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
      return toast.error('All Fields Required', { theme: "colored" });
    }

    const formattedData = {
      ...formData,
      applicantID: user.id,
      appliedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      startDate: startDate ? startDate.toISOString().split('T')[0] : '',
      endDate: endDate ? endDate.toISOString().split('T')[0] : '',
    };

    try {
      const res = await fetch('/api/applyforleave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      }).then((res) => res.json());

      if (res.success) {
        toast.success("Leave Application Sent! 🎉", { theme: "colored" });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        setFormData(initialState);
      } else {
        toast.error(res.message || "Failed to apply for leave", { theme: "colored" });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { theme: "colored" });
    }
  };

  return (
    <>
      {/* Inline CSS for Animations */}
      <style>
        {`
          @keyframes slowBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.6; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseGlow {
            0% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.3); }
            50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.6); }
            100% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.3); }
          }
          .animate-slowBlink { animation: slowBlink 2s ease-in-out infinite; }
          .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
          .animate-slideUp { animation: slideUp 1s ease-out; }
          .animate-pulseGlow { animation: pulseGlow 2s ease-in-out infinite; }
          .react-datepicker-wrapper { width: 100%; }
          .react-datepicker__input-container input {
            width: 100%;
            padding: 0.75rem 0.75rem 0.75rem 2.5rem;
            border: 2px solid #e0e7ff;
            border-radius: 0.5rem;
            background: linear-gradient(to bottom right, white, #f0f9ff);
            transition: all 0.3s ease;
            font-size: 0.875rem;
            color: #374151;
          }
          .react-datepicker__input-container input:focus {
            border-color: #4f46e5;
            outline: none;
            box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.2);
          }
          .react-datepicker__input-container input::placeholder {
            color: #9ca3af;
          }
        `}
      </style>

      <div className="min-h-screen p-4 sm:p-6 md:p-8">
        <section className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-2xl mb-6 transform transition-all hover:scale-[1.02] duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-900  "></div>
            <div className="bg-gradient-to-r from-blue-900 via-blue-900 to-blue-900 text-white rounded-t-2xl p-6 sm:p-8 relative">
              <h4 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="relative inline-block">
                  <span className="relative text-white">Apply for Leave</span>
                </span>
              </h4>
              <p className="text-sm sm:text-base mt-2 text-blue-100 animate-slideUp font-medium">
                Request your time off with a touch of magic! 
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform transition-all hover:shadow-xl duration-300">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit} id="addUserForm">
              {/* Title */}
              <div className="relative">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Leave Title</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M9 11l3.536 3.536M19 5H9a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4z" />
                    </svg>
                  </span>
                  <input
                    onChange={inputEvent}
                    value={formData.title}
                    type="text"
                    id="title"
                    name="title"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md ${formData.title ? 'border-blue-500' : 'border-blue-200'}`}
                    placeholder="e.g., Medical Leave"
                  />
                </div>
              </div>

              {/* Leave Type */}
              <div className="relative">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Leave Type</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10M7 11h10M7 15h10" />
                    </svg>
                  </span>
                  <select
                    name="type"
                    onChange={inputEvent}
                    value={formData.type}
                    className={`w-full pl-10 pr-10 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md appearance-none ${formData.type ? 'border-blue-500' : 'border-blue-200'}`}
                  >
                    <option value="">Select Leave Type</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Emergency Leave">Emergency Leave</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Period */}
              <div className="relative">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Period (Days)</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    onChange={inputEvent}
                    value={formData.period}
                    type="number"
                    id="period"
                    name="period"
                    min="1"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md ${formData.period ? 'border-blue-500' : 'border-blue-200'}`}
                    placeholder="e.g., 3"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="relative">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Start Date</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <DatePicker
                    selected={formData.startDate}
                    onChange={(date) => setFormData((old) => ({ ...old, startDate: date }))}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md ${formData.startDate ? 'border-blue-500' : 'border-blue-200'}`}
                    placeholderText="Select Start Date"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="relative">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">End Date</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 z-10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <DatePicker
                    selected={formData.endDate}
                    onChange={(date) => setFormData((old) => ({ ...old, endDate: date }))}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md ${formData.endDate ? 'border-blue-500' : 'border-blue-200'}`}
                    placeholderText="Select End Date"
                    dateFormat="yyyy-MM-dd"
                  />
                </div>
              </div>

              {/* Reason */}
              <div className="relative md:col-span-2">
                <label className="block text-blue-800 font-semibold mb-2 text-sm sm:text-base">Reason for Leave</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-3 text-blue-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <input
                    onChange={inputEvent}
                    value={formData.reason}
                    type="text"
                    id="reason"
                    name="reason"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg bg-gradient-to-br from-white to-blue-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-300 transition-all duration-300 text-gray-700 font-medium text-sm sm:text-base hover:shadow-md ${formData.reason ? 'border-blue-500' : 'border-blue-200'}`}
                    placeholder="Describe the reason for your leave"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    {formData.reason.length}/100
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <button
                  className="bg-gradient-to-r from-blue-600 to-blue-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2 animate-slowBlink animate-pulseGlow"
                  type="submit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Apply Leave
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(initialState)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/50 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0" style={{ background: 'url(https://www.transparenttextures.com/patterns/confetti.png)', opacity: 0.3 }}></div>
          </div>
        )}
      </div>
    </>
  );
};

export default ApplyForLeave;