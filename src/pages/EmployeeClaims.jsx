import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeeClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchAllClaims = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/all-claims`, {
          withCredentials: true
        });
        setClaims(res.data.claims);
      } catch (err) {
        console.error("Error fetching employee claims", err);
      }
    };
    fetchAllClaims();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold text-blue-900 mb-4">Employee Expense Claims</h1>
      {claims.map((claim, i) => (
        <div key={i} className="border rounded p-4 mb-3 bg-white shadow-sm">
          <p><strong>Employee:</strong> {claim.user?.name || 'Unknown'}</p>
          <p><strong>Category:</strong> {claim.category}</p>
          <p><strong>Amount:</strong> ₹{claim.amount}</p>
          <p><strong>Date:</strong> {new Date(claim.date).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {claim.description}</p>
          {claim.receiptUrl && <a href={claim.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Receipt</a>}
        </div>
      ))}
    </div>
  );
}
