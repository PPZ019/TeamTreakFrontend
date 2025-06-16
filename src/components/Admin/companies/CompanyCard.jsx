// src/components/CompanyTable.jsx
import React from "react";

const CompanyTable = ({ companies }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-blue-900 font-semibold">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">State/City</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Website</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company) => (
              <tr key={company.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{company.contact}</td>
                <td className="px-4 py-2">{company.country}</td>
                <td className="px-4 py-2">{company.phone}</td>
                <td className="px-4 py-2">{company.email}</td>
                <td className="px-4 py-2">{company.website}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-12 text-gray-400">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mb-2 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2"
                    />
                  </svg>
                  <p>No data</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;

