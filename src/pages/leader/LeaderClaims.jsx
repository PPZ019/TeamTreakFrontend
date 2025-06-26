import { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderClaims() {
  const [claims, setClaims] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/expense/leader/claims`,
          { withCredentials: true }
        );
        setClaims(res.data.claims);
        setFilteredClaims(res.data.claims);
      } catch (err) {
        console.error("Error fetching company claims", err);
      }
    };

    fetchClaims();
  }, []);

  useEffect(() => {
    let filtered = claims;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((claim) =>
        [claim.employeeId?.name, claim.employeeId?.email, claim.employeeId?._id]
          .some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(
        (claim) =>
          new Date(claim.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      );
    }

    setFilteredClaims(filtered);
  }, [searchTerm, selectedDate, claims]);

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      {/* Heading - Clean, bold, gradient */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 pb-2 border-b-4 border-indigo-500 w-fit">
        Expense Claims
      </h2>

      {/* Filters - Single horizontal line, neumorphic */}
      <div className="mb-8 bg-white p-4 rounded-md shadow-neumorphic flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full sm:w-auto flex-1">
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all placeholder-gray-500"
          />
          <svg
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedDate("");
            setFilteredClaims(claims);
          }}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-900 text-white text-sm font-medium rounded-md hover:from-indigo-700 hover:to-blue-700 transition-all"
        >
          Clear Filters
        </button>
      </div>

      {/* Claims Display - One card per row */}
      {filteredClaims.length === 0 ? (
        <p className="text-center text-gray-500 text-sm font-medium bg-white py-4 rounded-md shadow-sm">
          No claims found.
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredClaims.map((claim) => (
            <div
              key={claim._id}
              className="bg-white rounded-md border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="space-y-2 text-sm text-gray-800">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="font-bold text-gray-900">
                    {claim.employeeId?.name || "N/A"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span>{claim.employeeId?.email || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">ID:</span>
                  <span>{claim.employeeId?._id || "N/A"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Category:</span>
                  <span>{claim.category}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Amount:</span>
                  <span className="font-medium">₹{claim.amount}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Date:</span>
                  <span>{new Date(claim.date).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Description:</span>
                  <span>{claim.description}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-medium text-gray-600">Status:</span>
                  <span
                    className={`font-medium px-2 py-1 rounded-full text-xs ${
                      claim.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : claim.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
                {claim.receipt_url && (
                  <div className="pt-2">
                    <a
                      href={`${process.env.REACT_APP_BASE_URL}${claim.receipt_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-900 to-blue-900 text-white text-xs font-medium rounded-md hover:from-indigo-700 hover:to-blue-700 transition-all"
                    >
                      View Receipt
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}