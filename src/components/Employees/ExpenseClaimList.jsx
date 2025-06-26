import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExpenseClaimList() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/expense/claim`, {
          withCredentials: true,
        });
        setClaims(res.data); // Assuming backend sends array
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">My Expense Claims</h2>

      {claims.length === 0 ? (
        <p className="text-gray-600 text-center">No claims submitted yet.</p>
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
