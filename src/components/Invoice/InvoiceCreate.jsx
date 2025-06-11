import { useState } from 'react';

const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
};

const InvoiceCreate = () => {
  const [form, setForm] = useState({
    number: '',
    clientName: '', // Add this
    client: '',
    date: '',
    expiredDate: '',
    taxRate: 0,
    discount: 0,
    currency: 'USD',
    items: [{ name: '', price: 0, quantity: 1 }],
  });

  const symbol = currencySymbols[form.currency] || '$';

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { name: '', price: 0, quantity: 1 }],
    });
  };

  const deleteItem = (index) => {
    const newItems = form.items.filter((_, i) => i !== index);
    setForm({ ...form, items: newItems });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'taxRate' || name === 'discount' ? parseFloat(value) : value });
  };

  const subtotal = form.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = (subtotal * form.taxRate) / 100;
  const totalBeforeDiscount = subtotal + tax;
  const discountAmount = (totalBeforeDiscount * form.discount) / 100;
  const total = totalBeforeDiscount - discountAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5500/api/invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      alert('Invoice Created!');
    } else {
      alert(data.message || 'Error creating invoice');
    }
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-4xl mx-auto mt-6">
      <h2 className="text-3xl font-bold text-[#211C84] mb-6">Create Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Client Name', name: 'clientName', placeholder: 'Client Name..' },
            { label: 'Invoice Number', name: 'number', placeholder: 'e.g. INV-1002' },
            { label: 'Client ID', name: 'client', placeholder: 'Client Object ID' },
            { label: 'Invoice Date', name: 'date', type: 'date' },
            { label: 'Expiry Date', name: 'expiredDate', type: 'date' },
            { label: 'Tax Rate (%)', name: 'taxRate', type: 'number' },
            { label: 'Discount (%)', name: 'discount', type: 'number' },
          ].map(({ label, name, placeholder, type = 'text' }) => (<>
          
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                type={type}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#7A73D1]"
              />
            </div>
            </>))}

          {/* Currency Select */}
          <div>
            <label className="block text-sm font-medium mb-1">Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>

        {/* Invoice Items */}
        <div>
  <h3 className="text-xl font-semibold text-[#211C84] mb-2">Invoice Items</h3>
  {form.items.map((item, idx) => (
    <div
      key={idx}
      className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 items-center bg-[#f9f9ff] p-3 rounded-lg shadow-sm"
    >
      <div>
        <label htmlFor={`item-name-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
          Item Name
        </label>
        <input
          id={`item-name-${idx}`}
          placeholder="Item Name"
          value={item.name}
          onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor={`item-price-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
          Price
        </label>
        <input
          id={`item-price-${idx}`}
          placeholder="Price"
          type="number"
          value={item.price}
          onChange={(e) => handleItemChange(idx, 'price', parseFloat(e.target.value))}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div>
        <label htmlFor={`item-quantity-${idx}`} className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          id={`item-quantity-${idx}`}
          placeholder="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value))}
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
      </div>
      <div className="text-right pr-2 font-semibold">
        {symbol}
        {(item.quantity * item.price).toFixed(2)}
      </div>
      <button
        type="button"
        onClick={() => deleteItem(idx)}
        className="text-red-600 font-semibold hover:underline"
      >
        🗑
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={addItem}
    className="mt-2 px-4 py-2 bg-[#211C84] text-white rounded-md"
  >
    + Add Another Item
  </button>
</div>

        {/* Totals */}
        <div className="mt-10 border-t pt-6 max-w-md ml-auto space-y-3 text-sm text-gray-700">
  <div className="flex justify-between">
    <span className="font-medium">Subtotal</span>
    <span className="">{symbol}{subtotal.toFixed(2)}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Tax ({form.taxRate}%)</span>
    <span>{symbol}{tax.toFixed(2)}</span>
  </div>
  <div className="flex justify-between">
    <span className="font-medium">Discount ({form.discount}%)</span>
    <span className="text-red-600">- {symbol}{discountAmount.toFixed(2)}</span>
  </div>
  <div className="flex justify-between border-t pt-4 mt-4 text-lg font-bold text-[#211C84]">
    <span>Total</span>
    <span>{symbol}{total.toFixed(2)}</span>
  </div>
</div>


        {/* Submit Button */}
        <div className="text-right mt-6">
          <button
            type="submit"
            className="bg-[#211C84] hover:bg-[#4D55CC] text-white px-6 py-2 rounded-lg shadow-md"
          >
            Save Invoice
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvoiceCreate;
