import React from 'react';
import { useSelector } from 'react-redux';
import Default from "../../assets/img/defaultprofile.jpg"; 

const Employee = () => {
  const { user } = useSelector((state) => state.authSlice);

  const getImageUrl = (imgPath) => {
    if (!imgPath || imgPath === "null" || imgPath === "undefined") return Default;
    return imgPath.startsWith('http') ? imgPath : `http://localhost:5500/${imgPath}`;
  };

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-md shadow text-gray-600 text-lg animate-pulse">
          Loading employee details...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 md:p-6 ">
      <section className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg border border-blue-100 shadow-md">
          {/* Header Section */}
          <div className="flex items-center gap-6 border-b border-gray-200 p-6">
            <img
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow-md"
              src={getImageUrl(user?.image)}
              alt="Profile"
              onError={(e) => {
                e.target.src = Default;
              }}
            />
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Welcome, {user?.name || 'Employee'}</h1>
              <p className="text-sm text-gray-600 mt-1">Here’s your profile information in detail.</p>
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm md:text-base">
              <tbody>
                {[
                  { label: 'Employee ID', value: user?.employeeId },
                  { label: 'Full Name', value: user?.name },
                  { label: 'Username', value: user?.username },
                  { label: 'Email', value: user?.email },
                  { label: 'Mobile', value: user?.mobile },
                  { label: 'Address', value: user?.address },
                  { label: 'User Type', value: user?.type },
                  {
                    label: 'Status',
                    value: (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                          user?.status?.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user?.status || 'N/A'}
                      </span>
                    ),
                  },
                ].map(({ label, value }, index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <th className="text-left px-4 py-3 border font-medium text-blue-900 w-1/3">
                      {label}
                    </th>
                    <td className="px-4 py-3 border text-gray-800">
                      {value || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employee;
