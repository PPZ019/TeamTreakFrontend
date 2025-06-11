import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InvoiceRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Form state
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [generateReceipt, setGenerateReceipt] = useState(true);
  
  // Invoice data
  const [invoiceBalance, setInvoiceBalance] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch invoice data on mount
  useEffect(() => {
    fetch(`http://localhost:5500/api/invoice/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          setInvoiceBalance(data.result.total - (data.result.credit || 0));
          setInvoiceNumber(data.result.number);
        }
      })
      .catch(err => console.error('Error fetching invoice:', err));
  }, [id]);

  const handlePayment = async () => {
    // Validation
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (Number(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (Number(amount) > invoiceBalance) {
      setError(`Amount cannot exceed invoice balance of ₹${invoiceBalance.toFixed(2)}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5500/api/invoice/${id}/recordPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: Number(amount),
          paymentMethod,
          paymentDate,
          referenceNumber,
          notes,
          generateReceipt
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to record payment');
      }

      setShowSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#211C84]">Record Payment</h2>
          {invoiceNumber && (
            <p className="text-sm text-gray-600">Invoice: {invoiceNumber}</p>
          )}
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="text-[#211C84] hover:text-[#4D55CC] text-2xl"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Invoice Balance */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium">Invoice Balance:</span>
            <span className="font-bold">₹{invoiceBalance.toFixed(2)}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Amount (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg pl-8 focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84]"
              min="0.01"
              step="0.01"
            />
          </div>
          {amount && invoiceBalance > 0 && (
            <div className="text-sm text-gray-600 mt-1">
              {Number(amount) < invoiceBalance ? (
                <span>This will be a partial payment (₹{(invoiceBalance - amount).toFixed(2)} remaining)</span>
              ) : (
                <span className="text-green-600">This will fully pay the invoice</span>
              )}
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84]"
          >
            <option value="cash">Cash</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="credit_card">Credit Card</option>
            <option value="cheque">Cheque</option>
            <option value="upi">UPI</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Date
          </label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84]"
          />
        </div>

        {/* Reference Number */}
        {paymentMethod !== 'cash' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {paymentMethod === 'cheque' ? 'Cheque Number' : 
               paymentMethod === 'upi' ? 'UPI Transaction ID' : 
               'Reference Number'}
            </label>
            <input
              type="text"
              placeholder={
                paymentMethod === 'cheque' ? 'Enter cheque number' : 
                paymentMethod === 'upi' ? 'Enter UPI transaction ID' : 
                'Enter reference number'
              }
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84]"
            />
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            placeholder="Any additional notes about this payment"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#211C84] focus:border-[#211C84]"
            rows="3"
          />
        </div>

        {/* Receipt Generation */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="generateReceipt"
            checked={generateReceipt}
            onChange={(e) => setGenerateReceipt(e.target.checked)}
            className="h-4 w-4 text-[#211C84] focus:ring-[#211C84] border-gray-300 rounded"
          />
          <label htmlFor="generateReceipt" className="ml-2 block text-sm text-gray-700">
            Generate Receipt
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePayment}
            disabled={loading}
            className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-[#B5A8D5]' : 'bg-[#211C84] hover:bg-[#4D55CC]'} transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Record Payment'}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-3">Payment Recorded!</h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  ₹{amount} payment has been successfully recorded for Invoice {invoiceNumber}.
                </p>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccess(false);
                    navigate(`/invoices/${id}`);
                  }}
                  className="w-full bg-[#211C84] text-white py-2 rounded-lg hover:bg-[#4D55CC]"
                >
                  Back to Invoice
                </button>
                {generateReceipt && (
                  <button
                    type="button"
                    onClick={() => {
                      // Add your print receipt logic here
                      window.print();
                    }}
                    className="w-full bg-white border border-[#211C84] text-[#211C84] py-2 rounded-lg hover:bg-gray-50"
                  >
                    Print Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceRecord;