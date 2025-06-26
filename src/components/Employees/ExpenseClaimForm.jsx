import { useState } from 'react';
import axios from 'axios';

export default function ExpenseClaimForm() {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    receipt: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'receipt') {
      setFormData({ ...formData, receipt: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/expense/claim`,
        data,
        { withCredentials: true }
      );
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting claim:', err);
    }

    setFormData({
      category: '',
      amount: '',
      date: '',
      description: '',
      receipt: null,
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">Submit Expense Claim</h2>

      <div className="text-sm mb-4 text-center">
        {submitted && (
          <div className="text-green-600 font-medium mb-3">
            ✅ Claim submitted successfully!
          </div>
        )}
        <a
          href="/my-claims"
          className="inline-block bg-gray-100 border border-gray-300 hover:bg-gray-200 text-blue-800 font-medium px-4 py-2 rounded-lg transition duration-300"
        >
          📄 View All Claims
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Hotel">Hotel</option>
            <option value="Supplies">Supplies</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the expense..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Receipt</label>
          <input
            type="file"
            name="receipt"
            onChange={handleChange}
            className="w-full text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Submit Claim
        </button>
      </form>
    </div>
  );
}
