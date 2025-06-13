import React from 'react';
import { useSelector } from 'react-redux';

const Employee = () => {
  const { user } = useSelector((state) => state.authSlice);

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-pulse text-gray-500 text-lg">Loading user details...</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <section className="max-w-5xl mx-auto">
        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-lg mb-6 transform transition-all hover:scale-[1.01] duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-800 opacity-10"></div>
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg p-6 relative">
            <h4 className="text-xl md:text-2xl font-bold tracking-tight animate-fadeIn">
              <span className="relative inline-block">
                <span className="absolute -inset-1  opacity-50"></span>
                <span className="relative text-white">Welcome, {user?.name || 'Guest'}!</span>
              </span>
            </h4>
            <p className="text-sm mt-2 text-indigo-100 animate-slideUp">We're thrilled to have you here!</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  className="w-full h-48 md:h-64 object-cover rounded-lg border border-gray-200 transform transition-all hover:scale-105 duration-300"
                  src={user?.image || 'https://via.placeholder.com/150'}
                  alt={`${user?.name}'s profile`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>

              {/* Profile Details */}
              <div className="col-span-2">
                <table className="w-full text-sm md:text-base">
                  <tbody>
                    {[
                      { label: 'Name', value: user?.name || 'N/A' },
                      { label: 'Username', value: user?.username || 'N/A' },
                      { label: 'Email', value: user?.email || 'N/A' },
                      { label: 'Usertype', value: user?.type || 'N/A' },
                      {
                        label: 'Status',
                        value: (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user?.status === 'active'
                                ? 'bg-green-100 text-green-700 animate-slowBlink'
                                : 'bg-green-100 text-green-700 animate-slowBlink'
                            }`}
                          >
                            {user?.status || 'N/A'}
                          </span>
                        ),
                      },
                      { label: 'Mobile', value: user?.mobile || 'N/A' },
                      { label: 'Address', value: user?.address || 'N/A' },
                    ].map((item, index) => (
                      <tr
                        key={item.label}
                        className={`${
                          index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        } hover:bg-indigo-50 transition-colors duration-200`}
                      >
                        <th className="p-3 text-left font-semibold text-indigo-800 w-1/3">
                          {item.label}
                        </th>
                        <td className="p-3 text-gray-700">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employee;