// src/components/CompanyToolbar.jsx
import React from "react";

const CompanyToolbar = ({ onSearch, onAdd }) => {
  return (
    <div className="flex flex-wrap justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => onSearch(e.target.value)}
        className="border border-gray-300 rounded-md px-8 py-2 w-64"
      />
      <div className="flex gap-2 mt-2 md:mt-0">
        {/* <button
          className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
          onClick={() => window.location.reload()}
        >
          ⟳ Refresh
        </button> */}
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded-md text-sm hover:bg-blue-800"
          onClick={onAdd}
        >
        + Add New Company
        </button>
      </div>
    </div>
  );
};

export default CompanyToolbar;

