import React from "react";

const RowLeader = ({ data, index }) => {
  return (
    <tr className="hover:bg-gray-50 text-sm text-gray-800">
      <td className="py-3 px-4 border-b">{index}</td>
      <td className="py-3 px-4 border-b">{data.name || "N/A"}</td>
      <td className="py-3 px-4 border-b">{data.email || "N/A"}</td>
      <td className="py-3 px-4 border-b">{data.mobile || "N/A"}</td>
      <td className="py-3 px-4 border-b">{data.company?.name || "N/A"}</td>
      <td className="py-3 px-4 border-b text-center">
        <span
          className={`inline-block px-3 py-1 rounded-full text-white text-xs font-medium ${
            data.status === "active" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {data.status}
        </span>
      </td>
      <td className="py-3 px-4 border-b">
        {data.team?.length || 0} teams
      </td>
      <td className="py-3 px-4 border-b text-center">
        {/* Placeholder for future actions */}
        <button className="text-sm text-blue-600 hover:underline">View</button>
      </td>
    </tr>
  );
};

export default RowLeader;
