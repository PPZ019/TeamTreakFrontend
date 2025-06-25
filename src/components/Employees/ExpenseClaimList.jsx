export default function ExpenseClaimList({ claims }) {
  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl text-blue-900 font-bold mb-4">My Expense Claims</h2>
      {claims.length === 0 ? (
        <p className="text-gray-600">No claims submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div key={claim.id} className="p-4 border rounded shadow bg-white">
              <p><strong>Category:</strong> {claim.category}</p>
              <p><strong>Amount:</strong> ₹{claim.amount}</p>
              <p><strong>Date:</strong> {claim.date}</p>
              <p><strong>Description:</strong> {claim.description}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`font-semibold ${claim.status === "Approved" ? "text-green-600" : claim.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {claim.status}
                </span>
              </p>
              {claim.receipt_url && (
                <a href={claim.receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
