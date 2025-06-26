import { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/expense/leader/claims`,
          { withCredentials: true }
        );
        setClaims(res.data.claims);
      } catch (err) {
        console.error("Error fetching company claims", err);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        Employee Expense Claims
      </h2>

      {claims.length === 0 ? (
        <p>No claims submitted by employees.</p>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim._id}
              className="border rounded p-4 bg-white shadow-sm"
            >
              <p><strong>Employee:</strong> {claim.employeeId.name}</p>
              <p><strong>Email:</strong> {claim.employeeId.email}</p>
              <p><strong>Category:</strong> {claim.category}</p>
              <p><strong>Amount:</strong> ₹{claim.amount}</p>
              <p><strong>Date:</strong> {new Date(claim.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {claim.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={
                  claim.status === "Approved"
                    ? "text-green-600"
                    : claim.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }>
                  {claim.status}
                </span>
              </p>
              {claim.receipt_url && (
                <a
                  href={`${process.env.REACT_APP_BASE_URL}${claim.receipt_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Receipt
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
