// import React, { useEffect, useState } from 'react';
// import { viewEmployeeAttendance } from '../../http';
// import { toast } from 'react-toastify';

// const ClientAttendance = () => {
//   const [attendance, setAttendance] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await viewEmployeeAttendance({});
//       if (res.success) setAttendance(res.data);
//       else toast.error("Failed to load attendance data.");
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4 text-blue-900">Client Attendance Logs</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200 text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="py-2 px-4 border">#</th>
//                 <th className="py-2 px-4 border">Employee</th>
//                 <th className="py-2 px-4 border">Date</th>
//                 <th className="py-2 px-4 border">Day</th>
//                 <th className="py-2 px-4 border">Status</th>
//                 <th className="py-2 px-4 border">IP Address</th>
//                 <th className="py-2 px-4 border">Latitude</th>
//                 <th className="py-2 px-4 border">Longitude</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendance?.length > 0 ? (
//                 attendance.map((att, idx) => (
//                   <tr key={att._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border text-center">{idx + 1}</td>
//                     <td className="py-2 px-4 border">{att.employeeID?.name || 'N/A'}</td>
//                     <td className="py-2 px-4 border">{`${att.date}/${att.month}/${att.year}`}</td>
//                     <td className="py-2 px-4 border">{att.day}</td>
//                     <td className="py-2 px-4 border">
//                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                         att.present ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                       }`}>
//                         {att.present ? 'Present' : 'Absent'}
//                       </span>
//                     </td>
//                     <td className="py-2 px-4 border">{att.ip || 'N/A'}</td>
//                     <td className="py-2 px-4 border">{att.location?.latitude || 'N/A'}</td>
//                     <td className="py-2 px-4 border">{att.location?.longitude || 'N/A'}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center py-6 text-gray-500">
//                     No attendance records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientAttendance;
