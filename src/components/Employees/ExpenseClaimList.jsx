import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExpenseClaimList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/expense/claim`,
          {
            withCredentials: true, // ✅ send cookies (access token)
          }
        );
        setClaims(res.data);
      } catch (err) {
        console.error('Error fetching claims:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading claims...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl text-blue-900 font-bold mb-4">My Expense Claims</h2>
      {claims.length === 0 ? (
        <p className="text-gray-600">No claims submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim._id} className="p-4 border rounded shadow bg-white">
              <p><strong>Category:</strong> {claim.category}</p>
              <p><strong>Amount:</strong> ₹{claim.amount}</p>
              <p><strong>Date:</strong> {new Date(claim.date).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {claim.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-semibold ${claim.status === "Approved"
                  ? "text-green-600"
                  : claim.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                  }`}>
                  {claim.status}
                </span>
              </p>
              {claim.receipt_url && (
                <a
                  href={`${process.env.REACT_APP_BASE_URL}${claim.receipt_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
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


