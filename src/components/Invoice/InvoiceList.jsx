
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5500/api/invoice') // Adjust this to your backend
      .then(res => res.json())
      .then(data => setInvoices(data.result || []));
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const lower = searchTerm.toLowerCase();
    return (
      invoice.number?.toString().toLowerCase().includes(lower) ||
      invoice.client?.name?.toLowerCase().includes(lower)
    );
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-900">Invoice List</h2>
        <button
          onClick={() => navigate('/invoices/create')}
          className="bg-[#211C84] text-white px-4 py-2 rounded shadow hover:bg-[#4D55CC] transition"
        >
          + Add New Invoice
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by client or number..."
          className="w-full border-2 border-[#211C84] p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#7A73D1]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="w-full text-sm text-left border border-gray-300">
        <thead className="text-[#211C84] uppercase text-sm">
          <tr>
            <th className="p-3 border text-center">Invoice Number</th>
            <th className="p-3 border text-center">Client Name</th>
            <th className="p-3 border text-center">Date</th>
            <th className="p-3 border text-center">Expiry</th>
            <th className="p-3 border text-center">Total</th>
            <th className="p-3 border text-center">Paid</th>
            <th className="p-3 border text-center">Status</th>
            <th className="p-3 border text-center"></th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map((invoice) => (
            <tr key={invoice._id} className="border-t text-md font-light">
              <td className="p-3 border text-center">{invoice.number}</td>
              <td className="p-3 border text-center">{invoice.client?.name}</td>
              <td className="p-3 border text-center">{dayjs(invoice.date).format('DD/MM/YYYY')}</td>
              <td className="p-3 border text-center">{dayjs(invoice.expiredDate).format('DD/MM/YYYY')}</td>
              <td className="p-3 border text-center">{invoice.total?.toFixed(2)}</td>
              <td className="p-3 border text-center">{invoice.credit?.toFixed(2)}</td>
              <td className="p-3 border text-center">
              <div className="flex justify-center">
              <span className={`px-3 py-2 rounded text-xs font-semibold ${
  invoice.status === 'paid'
    ? 'bg-green-100 text-green-700'
    : invoice.status === 'pending'
    ? 'bg-yellow-100 text-yellow-600'
    : 'bg-gray-100 text-gray-700'
}`}>
  {invoice.status}
</span>
</div>
              </td>
              <td>
              <div className="flex justify-center">

  <button
    className="bg-[#F0F1FF] hover:bg-[#B5A8D5] text-[#211C84] px-3 py-1 rounded font-semi"
    onClick={() => navigate(`/invoices/read/${invoice._id}`)}
  >
    Details
  </button>
  </div>
</td>


            </tr>
          ))}
          {filteredInvoices.length === 0 && (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-500">
                No Invoices Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
