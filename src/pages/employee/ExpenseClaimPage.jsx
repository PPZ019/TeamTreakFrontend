import { useState } from 'react';
import ExpenseClaimForm from '../../components/Employees/ExpenseClaimForm';
import ExpenseClaimList from '../../components/Employees/ExpenseClaimList';

export default function ExpenseClaimPage() {
  const [claims, setClaims] = useState([]);

  const handleNewClaim = (claim) => {
    setClaims([claim, ...claims]);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <ExpenseClaimForm onSubmit={handleNewClaim} />
      <ExpenseClaimList claims={claims} />
    </div>
  );
}
