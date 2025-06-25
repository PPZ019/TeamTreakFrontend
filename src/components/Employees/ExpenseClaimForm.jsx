import { useState } from 'react';

export default function ExpenseClaimForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    receipt: null,
  });

  const handleChange = (e) => {
    if (e.target.name === 'receipt') {
      setFormData({ ...formData, receipt: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClaim = {
      id: Date.now(),
      ...formData,
      status: "Pending",
      receipt_url: formData.receipt ? URL.createObjectURL(formData.receipt) : null,
    };

    onSubmit(newClaim);

    // Reset form
    setFormData({
      category: '',
      amount: '',
      date: '',
      description: '',
      receipt: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-4">
      <h2 className="text-xl text-blue-900 font-semibold">Submit Expense Claim</h2>

      <select name="category" value={formData.category} onChange={handleChange} required className="w-full border p-2 rounded">
        <option value="">Select Category</option>
        <option value="Travel">Travel</option>
        <option value="Food">Food</option>
        <option value="Hotel">Hotel</option>
        <option value="Supplies">Supplies</option>
      </select>

      <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required className="w-full border p-2 rounded" />

      <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded" />

      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />

      <input type="file" name="receipt" onChange={handleChange} className="w-full" />

      <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded w-full">Submit</button>
    </form>
  );
}
