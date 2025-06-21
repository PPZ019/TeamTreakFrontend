import React from 'react';
import { useSelector } from 'react-redux';

const Leader = () => {
  const { user } = useSelector(state => state.authSlice);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Loading user details...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <section className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h4 className="text-2xl font-bold text-blue-900 mb-6">
          Welcome, {user?.name}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              src={user?.image || 'https://picsum.photos/150'}
              alt={`${user?.name}'s profile`}
              className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white"
              onError={(e) => {
                console.log("❌ Image failed to load, fallback triggered");
                e.target.src = 'https://picsum.photos/150';
              }}
            />
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2">
            <table className="w-full text-sm md:text-base">
              <tbody>
                {[
                  { label: 'Name', value: user?.name || 'N/A' },
                  { label: 'Username', value: user?.username || 'N/A' },
                  { label: 'Email', value: user?.email || 'N/A' },
                  { label: 'Usertype', value: user?.type || 'N/A' },
                  { label: 'Status', value: user?.status || 'N/A' },
                  { label: 'Mobile', value: user?.mobile || 'N/A' },
                  { label: 'Address', value: user?.address || 'N/A' },
                ].map((item, index) => (
                  <tr
                    key={item.label}
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-50`}
                  >
                    <th className="text-left px-4 py-2 text-blue-800 font-medium w-1/3">
                      {item.label}
                    </th>
                    <td className="px-4 py-2 text-gray-700">{item.value}</td>
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

export default Leader;
