import React, { useState } from "react";

const countries = {
  India: ["Delhi", "Mumbai", "Bangalore", "Chennai"],
  USA: ["New York", "California", "Texas", "Florida"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
};

const AddCompanyModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    country: "",
    state: "",
    phone: "",
    email: "",
    website: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9+\- ]{8,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.contact.trim()) newErrors.contact = "Contact is required.";
    if (!formData.country) newErrors.country = "Country is required.";
    if (!formData.state) newErrors.state = "State/City is required.";
    if (!formData.phone || !phoneRegex.test(formData.phone))
      newErrors.phone = "Invalid phone number.";
    if (!formData.email || !emailRegex.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.website || !urlRegex.test(formData.website))
      newErrors.website = "Invalid website URL.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      onClose(); // Close modal after success
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-blue-900 font-semibold">Add New Company</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block font-medium">Name *</label>
            <input
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block font-medium">Contact *</label>
            <input
              name="contact"
              className="w-full border px-3 py-2 rounded"
              value={formData.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium">Country *</label>
            <select
              name="country"
              className="w-full border px-3 py-2 rounded"
              value={formData.country}
              onChange={(e) => {
                handleChange(e);
                setFormData((prev) => ({ ...prev, state: "" })); // Reset state when country changes
              }}
            >
              <option value="">Select Country</option>
              {Object.keys(countries).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block font-medium">State/City *</label>
            <select
              name="state"
              className="w-full border px-3 py-2 rounded"
              value={formData.state}
              onChange={handleChange}
              disabled={!formData.country}
            >
              <option value="">Select State/City</option>
              {(countries[formData.country] || []).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium">Phone *</label>
            <input
              name="phone"
              className="w-full border px-3 py-2 rounded"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium">Email *</label>
            <input
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Website */}
          <div>
            <label className="block font-medium">Website *</label>
            <input
              name="website"
              className="w-full border px-3 py-2 rounded"
              value={formData.website}
              onChange={handleChange}
            />
            {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;
