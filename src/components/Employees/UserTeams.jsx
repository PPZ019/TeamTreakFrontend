import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getEmployeeTeam } from '../../http';
import { setTeam } from '../../store/team-slice';
import { setTeamMembers } from '../../store/user-slice';
import Loading from '../Loading';

const UserTeams = () => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userteam, setUserTeam] = useState(null);

  useEffect(() => {
    dispatch(setTeam(null));
    dispatch(setTeamMembers(null));
    (async () => {
      if (user?.team?.id) {
        const res = await getEmployeeTeam(user?.team?.id);
        if (res.success) {
          setUserTeam(res.data);
          setLoading(false);
        } else {
          setLoading(false); // Handle error case
        }
      } else {
        setLoading(false); // No team ID, stop loading
      }
    })();
  }, [user?.team?.id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <section className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg p-6">
            <h4 className="text-xl md:text-2xl font-bold tracking-tight animate-fadeIn">
              Your Team
            </h4>
          </div>
          <div className="p-6">
            {user?.team?.id && userteam ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-50 text-blue-800">
                      <th className="p-4 text-left font-semibold">#</th>
                      <th className="p-4 text-left font-semibold">Image</th>
                      <th className="p-4 text-left font-semibold">Name</th>
                      <th className="p-4 text-left font-semibold">Leader</th>
                      <th className="p-4 text-left font-semibold">Status</th>
                      <th className="p-4 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-indigo-50 transition-colors duration-200">
                      <td className="p-4 text-gray-700">1</td>
                      <td className="p-4">
                        <img
                          className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          src={userteam.image || 'https://via.placeholder.com/50'}
                          alt={userteam.name || 'Team image'}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/50';
                          }}
                        />
                      </td>
                      <td className="p-4 text-gray-700">{userteam.name || 'N/A'}</td>
                      <td className="p-4">
                        {userteam.leader ? (
                          <NavLink
                            to="/"
                            className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors duration-200"
                          >
                            <img
                              className="w-6 h-6 rounded-full mr-2 object-cover"
                              src={userteam.leader.image || 'https://via.placeholder.com/30'}
                              alt={userteam.leader.name || 'Leader'}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/30';
                              }}
                            />
                            <span className="text-sm font-semibold">{userteam.leader.name}</span>
                          </NavLink>
                        ) : (
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                            <img
                              className="w-6 h-6 rounded-full mr-2"
                              src="/assets/icons/user.png"
                              alt="No leader"
                            />
                            <span className="text-sm font-semibold">No Leader</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            userteam.status === 'Active'
                              ? 'bg-green-100 text-green-700 animate-slowBlink'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {userteam.status === 'Active' && (
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                          {userteam.status || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4">
                        <NavLink
                          to={`/userteam/${userteam.id}`}
                          className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Detail
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-6">
                You are not assigned to any team.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserTeams;