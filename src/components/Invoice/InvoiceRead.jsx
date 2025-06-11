import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const InvoiceRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/invoice/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch invoice');
        }
        const data = await response.json();
        setInvoice(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded shadow text-center text-[#211C84]">
        <p className="text-lg">Loading invoice details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded shadow text-center text-[#211C84]">
        <p className="text-lg text-red-500">Error: {error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded bg-[#211C84] text-white hover:bg-[#4D55CC] transition"
        >
          ← Back to List
        </button>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6 bg-white rounded shadow text-center text-[#211C84]">
        <p className="text-lg">Invoice not found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 rounded bg-[#211C84] text-white hover:bg-[#4D55CC] transition"
        >
          ← Back to List
        </button>
      </div>
    );
  }

  // Calculate remaining amount
  const remainingAmount = invoice.total - (invoice.credit || 0);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#211C84]">Invoice Details</h2>
        <div className="space-x-3">
          <button
            onClick={() => navigate(`/invoices/edit/${invoice._id}`)}
            className="bg-[#211C84] text-white px-4 py-2 rounded hover:bg-[#4D55CC] transition"
          >
            Edit
          </button>
          <button
            onClick={() => navigate(`/invoices/payment/${invoice._id}`)}
            className="bg-[#B5A8D5] text-[#211C84] px-4 py-2 rounded hover:bg-[#a497c8] transition"
          >
            Payment Record
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[#211C84] text-md">
        <div><strong>Invoice Number:</strong> {invoice.number}</div>
        <div><strong>Client Name:</strong> {invoice.client?.name || 'N/A'}</div>
        <div><strong>Date:</strong> {dayjs(invoice.date).format('DD/MM/YYYY')}</div>
        <div><strong>Due Date:</strong> {dayjs(invoice.expiredDate).format('DD/MM/YYYY')}</div>
        <div><strong>Tax Rate:</strong> {invoice.taxRate}%</div>
        <div><strong>Discount:</strong> ₹{invoice.discount || 0}</div>
        
        {/* Items section - handles multiple items */}
        {invoice.items?.length > 0 ? (
          <>
            <div className="sm:col-span-2 mt-4">
              <strong className="block mb-2">Items:</strong>
              <div className="border rounded overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{item.name || `Item ${index + 1}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{item.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="sm:col-span-2 text-gray-500">No items found</div>
        )}
        
        <div><strong>Subtotal:</strong> ₹{invoice.subtotal}</div>
        <div><strong>Tax Amount:</strong> ₹{(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}</div>
        <div><strong>Total Amount:</strong> ₹{invoice.total}</div>
        <div><strong>Amount Paid:</strong> ₹{invoice.credit || 0}</div>
        <div><strong>Amount Due:</strong> ₹{remainingAmount.toFixed(2)}</div>
        
        <div className="sm:col-span-2">
          <strong>Status:</strong>{' '}
          <span className={`ml-2 px-3 py-2 rounded text-sm font-semibold ${
            invoice.status === 'paid'
              ? 'bg-green-100 text-green-700'
              : invoice.status === 'pending'
              ? 'bg-yellow-100 text-yellow-600'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {invoice.status}
            {remainingAmount > 0 && invoice.status === 'paid' && ' (Partially)'}
          </span>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded bg-[#211C84] text-white hover:bg-[#4D55CC] transition"
        >
          ← Back to List
        </button>
      </div>
    </div>
  );
};

export default InvoiceRead;