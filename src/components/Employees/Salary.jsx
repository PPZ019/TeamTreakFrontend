import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { viewEmployeeSalary } from '../../http';
import { toast } from "react-toastify";
import Loading from '../Loading';

const Salary = () => {
  const { user } = useSelector(state => state.authSlice);
  const [salary, setSalary] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const obj = {
      "employeeID": user.id
    }
    
    const fetchData = async () => {
      try {
        const res = await viewEmployeeSalary(obj);
        const { success, data } = res;
        if (data.length > 0) {
          setSalary(res.data[0]);
        } else {
          toast.error(`${user.name}'s Salary not found`);
        }
      } catch (error) {
        toast.error("Failed to fetch salary data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [user.id, user.name]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-900 rounded-xl shadow-2xl mb-6 overflow-hidden">
          <div className="p-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Salary Information</h2>
            <p className="text-blue-100 opacity-90">
              {salary 
                ? `Updated salary details as of ${new Date(salary?.assignedDate).toLocaleDateString()}`
                : "Salary details not yet updated"}
            </p>
          </div>
        </div>

        {salary ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-1 transform transition-all hover:scale-[1.02] duration-300">
              <div className="p-4 bg-gradient-to-b from-blue-50 to-white">
                <img 
                  src={user.image} 
                  alt={user.name} 
                  className="w-full h-auto rounded-lg object-cover border-4 border-white shadow-md"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
                <p className="text-blue-600 font-medium">{user.designation || 'Employee'}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>{user.mobile}</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{user.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Details Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden md:col-span-3 transform transition-all hover:scale-[1.01] duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Compensation Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Base Salary */}
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Base Salary</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">₹{salary.salary}</p>
                      </div>
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Monthly gross salary</p>
                  </div>

                  {/* Bonus */}
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Bonus</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">₹{salary.bonus}</p>
                      </div>
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Additional compensation</p>
                  </div>

                  {/* Bonus Reason */}
                  <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Bonus Reason</p>
                        <p className="text-gray-700">{salary.reasonForBonus || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Total Compensation */}
                  <div className="md:col-span-2 bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 mt-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Monthly Compensation</p>
                        <p className="text-3xl font-bold text-blue-700 mt-1">
                          ₹{(parseInt(salary.salary) + parseInt(salary.bonus)).toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mt-4">Salary Not Configured</h3>
              <p className="text-gray-500 mt-2">Your salary details haven't been set up yet. Please contact HR for more information.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Salary;