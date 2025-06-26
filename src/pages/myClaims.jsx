import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/expense/my-claims`, {
          withCredentials: true,
        });
        setClaims(res.data.claims); // Backend sends: { claims: [...] }
      } catch (err) {
        console.error('Error fetching claims:', err);
      }
    };
    fetchClaims();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">My Expense Claims</h2>

      {claims.length === 0 ? (
        <p className="text-gray-600 text-center">No claims found.</p>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim._id} className="bg-white border rounded-xl shadow p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Category:</strong> {claim.category}</p>
                  <p><strong>Amount:</strong> ₹{claim.amount}</p>
                  <p><strong>Date:</strong> {new Date(claim.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {claim.description}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${claim.status === "Approved" ? "bg-green-100 text-green-700" :
                      claim.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"}`}>
                    {claim.status}
                  </span>
                </div>
              </div>

              {claim.receipt_url && (
                <a
                  href={`${process.env.REACT_APP_BASE_URL}${claim.receipt_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-blue-600 hover:underline text-sm"
                >
                  📎 View Receipt
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
