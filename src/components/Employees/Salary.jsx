import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from "react-toastify";
import Loading from '../Loading';
import html2pdf from 'html2pdf.js';
import Default from "../../assets/img/defaultprofile.jpg";

const Salary = () => {
  const { user } = useSelector(state => state.authSlice);
  const [salary, setSalary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });
  const slipRef = useRef();
  console.log(user)

  const fetchCompany = async () => {
    if (!user?.company?._id) return;

    try {
      const res = await axios.get(`http://localhost:5500/api/company/${user.company._id}`);
      setCompanyName(res.data?.name || "Company");
      console.log(res.data?.name );
    } catch (err) {
      console.error("Company fetch error", err);
      setCompanyName("Company");
    }
  };

  const fetchSalary = async () => {
    if (!user?._id || !selectedMonth) {
      console.log("Missing user ID or selectedMonth");
      return;
    }

    setIsLoading(true);
    try {
      const [year, month] = selectedMonth.split("-");
      const res = await axios.get(
        `http://localhost:5500/api/salary/view/${user._id}?month=${parseInt(month)}&year=${year}`
      );

      const data = res.data?.data?.[0];

      if (data) {
        const total =
          (data.basic || 0) +
          (data.hra || 0) +
          (data.allowance || 0) -
          (data.deduction || 0);
        setSalary({ ...data, totalCompensation: total });
      } else {
        setSalary(null);
        toast.warning("No salary data found for selected month.");
      }
    } catch (err) {
      console.error(err);
      toast.error("No salary data found for selected month.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchSalary();
      fetchCompany();
    }
  }, [user, selectedMonth]);

  const downloadSlip = () => {
    if (!salary) return;
    const opt = {
      margin: 0.5,
      filename: `SalarySlip-${user.name}-${selectedMonth}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(slipRef.current).save();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="month"
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        />
        {salary && (
          <button
            onClick={downloadSlip}
            className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
          >
            Download Salary Slip
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left - Employee Info */}
        <div className="md:w-1/3 bg-gray-100 py-20 px-6 text-center border-r">
          <img
            src={user.image || Default}
            alt={user.name}
            className="w-32 h-32 mx-auto rounded-full object-cover shadow-md border"
            onError={(e) => (e.target.src = Default)}
          />
          <h2 className="text-xl font-semibold text-gray-800 mt-4">{user.name}</h2>
          <p className="text-blue-600 font-medium">{user.designation || 'Employee'}</p>
          <div className="mt-4 text-sm text-gray-600 space-y-1 text-left">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.mobile}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        </div>

        {/* Right - Salary Slip */}
        <div ref={slipRef} className="md:w-2/3 p-6 text-sm">
          {salary ? (
            <>
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{companyName}</h2>
                <p className="text-gray-500">Salary Slip</p>
                <p className="text-gray-400">{new Date(salary.createdAt).toLocaleDateString()}</p>
              </div>

              <table className="w-full mb-6 border border-gray-300">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Employee Name</td>
                    <td className="p-2">{user.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Email</td>
                    <td className="p-2">{user.email}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Designation</td>
                    <td className="p-2">{user.designation || 'Employee'}</td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">Component</th>
                    <th className="p-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <SalaryRow label="Basic" amount={salary.basic} />
                  <SalaryRow label="HRA" amount={salary.hra} />
                  <SalaryRow label="Allowance" amount={salary.allowance} />
                  <SalaryRow label="Deduction" amount={salary.deduction} isNegative />
                  <tr className="border-t font-semibold">
                    <td className="p-2 text-blue-700">Total Compensation</td>
                    <td className="p-2 text-right text-blue-700">
                      ₹{salary.totalCompensation.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div className="text-center text-gray-500 py-20">
              No salary details available for <strong>{selectedMonth}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SalaryRow = ({ label, amount, isNegative }) => (
  <tr className="border-b">
    <td className="p-2 text-gray-700">{label}</td>
    <td className={`p-2 text-right ${isNegative ? 'text-red-600' : 'text-gray-800'}`}>
      {isNegative ? `- ₹${amount}` : `₹${amount}`}
    </td>
  </tr>
);

export default Salary;
