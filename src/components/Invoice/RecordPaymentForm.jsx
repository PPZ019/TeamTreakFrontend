import { useState } from 'react';

const RecordPaymentForm = ({ invoiceId, invoiceBalance, invoiceNumber, onSuccess, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [generateReceipt, setGenerateReceipt] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    if (!amount || isNaN(amount)) return setError('Please enter a valid amount');
    if (Number(amount) <= 0) return setError('Amount must be greater than 0');
    if (Number(amount) > invoiceBalance) return setError(`Amount cannot exceed invoice balance of ₹${invoiceBalance.toFixed(2)}`);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5500/api/invoice/${invoiceId}/recordPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          paymentMethod,
          paymentDate,
          referenceNumber,
          notes,
          generateReceipt,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to record payment');

      onSuccess({ amount, invoiceNumber, generateReceipt });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Amount */}
      <div>
        <label>Payment Amount (₹)</label>
        <input
          type="number"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        {amount && invoiceBalance > 0 && (
          <p className="text-sm text-gray-600 mt-1">
            {Number(amount) < invoiceBalance ? (
              <span>Partial payment (₹{(invoiceBalance - amount).toFixed(2)} remaining)</span>
            ) : (
              <span className="text-green-600">Fully pays the invoice</span>
            )}
          </p>
        )}
      </div>

      {/* Payment Method */}
      <div>
        <label>Payment Method</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="input">
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
        <label>Payment Date</label>
        <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} className="input" />
      </div>

      {/* Reference Number */}
      {paymentMethod !== 'cash' && (
        <div>
          <label>
            {paymentMethod === 'cheque' ? 'Cheque Number' :
              paymentMethod === 'upi' ? 'UPI Transaction ID' :
              'Reference Number'}
          </label>
          <input
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            className="input"
          />
        </div>
      )}

      {/* Notes */}
      <div>
        <label>Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="input" rows="3" />
      </div>

      {/* Receipt Checkbox */}
      <div className="flex items-center">
        <input type="checkbox" checked={generateReceipt} onChange={(e) => setGenerateReceipt(e.target.checked)} />
        <label className="ml-2">Generate Receipt</label>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
        <button onClick={handlePayment} disabled={loading} className="btn-primary">
          {loading ? 'Processing...' : 'Record Payment'}
        </button>
      </div>
    </div>
  );
};

export default RecordPaymentForm;
