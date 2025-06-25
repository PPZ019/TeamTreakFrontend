import { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseClaimForm from '../../components/Employees/ExpenseClaimForm';
import ExpenseClaimList from '../../components/Employees/ExpenseClaimList';

export default function ExpenseClaimPage() {
  const [claims, setClaims] = useState([]);

  const fetchClaims = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/expense/claim', {
       withCredentials: true,
      });
      setClaims(res.data);
      console.log(res)
    } catch (err) {
      console.error('Error fetching claims:', err);
    }
  };

  const handleNewClaim = (claim) => {
    setClaims([claim, ...claims]);
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <ExpenseClaimForm onSuccess={handleNewClaim} />
      <ExpenseClaimList claims={claims} />
    </div>
  );
}
