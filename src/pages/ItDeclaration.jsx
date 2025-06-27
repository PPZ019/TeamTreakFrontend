import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ITDeclaration = () => {
  const [form, setForm] = useState({
    licAmount: '',
    healthInsurance: '',
    hra: '',
    lta: '',
  });
  const [myDeclarations, setMyDeclarations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDeclarations();
  }, []);

  const fetchDeclarations = async () => {
    try {
      const res = await axios.get('http://localhost:5500/api/itDeclaration/me', {
        withCredentials: true,
      });
      setMyDeclarations(res.data.data || []);
    } catch (err) {
      console.error('Error fetching declarations', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5500/api/itDeclaration', form, {
        withCredentials: true,
      });
      setForm({ licAmount: '', healthInsurance: '', hra: '', lta: '' });
      fetchDeclarations();
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          IT Declaration Form
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl text-blue-800 font-semibold mb-4">Fill Declaration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="licAmount"
              placeholder="LIC Investment Amount"
              value={form.licAmount}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="healthInsurance"
              placeholder="Health Insurance Premium"
              value={form.healthInsurance}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              name="hra"
              placeholder="HRA Amount"
              value={form.hra}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="lta"
              placeholder="LTA Amount"
              value={form.lta}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Declaration'}
          </button>
        </form>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl text-blue-800 font-semibold mb-4">My Declarations</h2>
          {myDeclarations.length === 0 ? (
            <p className="text-gray-500">No declarations submitted yet.</p>
          ) : (
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-blue-100 text-blue-900">
                  <th className="p-2">LIC</th>
                  <th className="p-2">Health</th>
                  <th className="p-2">HRA</th>
                  <th className="p-2">LTA</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Remark</th>
                </tr>
              </thead>
              <tbody>
                {myDeclarations.map((dec) => (
                  <tr key={dec._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">₹{dec.licAmount}</td>
                    <td className="p-2">₹{dec.healthInsurance}</td>
                    <td className="p-2">₹{dec.hra}</td>
                    <td className="p-2">₹{dec.lta}</td>
                    <td className="p-2">
                      <span
                        className={`font-medium ${
                          dec.status === 'approved'
                            ? 'text-green-600'
                            : dec.status === 'rejected'
                            ? 'text-red-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {dec.status.charAt(0).toUpperCase() + dec.status.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="p-2">
  {dec.remark ? (
    <span className="bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded text-xs capitalize">
      {dec.remark.charAt(0).toUpperCase() + dec.remark.slice(1).toLowerCase()}
    </span>
  ) : (
    <span className="italic text-gray-400 text-sm">No remark</span>
  )}
</td>


                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ITDeclaration;
