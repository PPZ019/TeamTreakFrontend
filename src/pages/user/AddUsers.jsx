import { useState } from "react";
import { toast } from "react-toastify";
import HeaderSection from "../../components/HeaderSection";
import { addUser } from "../../http";
import Modal from "../../components/modal/Modal";
import { FaExclamationCircle } from "react-icons/fa";

const AddUsers = () => {
  const [imagePreview, setImagePreview] = useState("/assets/icons/user.png");
  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    type: "Employee",
    address: "",
    profile: "",
    adminPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const inputEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, mobile, password, address, profile, type, adminPassword } = formData;

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!mobile) newErrors.mobile = "Mobile number is required";
    if (!password) newErrors.password = "Password is required";
    if (!address) newErrors.address = "Address is required";
    if (!profile) newErrors.profile = "Profile image is required";
    if (type === "Admin" && !adminPassword) newErrors.adminPassword = "Admin password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the highlighted errors.");
      return;
    }

    if (formData.type === "Admin" && !showModal) {
      setShowModal(true);
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      const { success, message } = await addUser(fd);
      if (success) {
        toast.success(message);
        setFormData(initialState);
        setImagePreview("/assets/icons/user.png");
        setErrors({});
        setShowModal(false);
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (err) {
      toast.error(err.message || "Server error occurred");
    }
  };

  const captureImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, profile: file }));
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      {showModal && (
        <Modal close={() => setShowModal(false)} title="Confirm Admin Password" width="35%">
          <div className="p-5 bg-white text-black rounded space-y-4">
            <div className="flex gap-6">
              <img className="rounded w-28 h-28 object-cover border" src={imagePreview} alt="Preview" />
              <div className="text-sm">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>User Type:</strong> {formData.type}</p>
              </div>
            </div>
            <div>
              <label className="font-semibold text-sm mb-1 block">Admin Password</label>
              <input
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={inputEvent}
                className={`pl-3 py-2 w-full rounded border text-black ${errors.adminPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter password"
              />
              {errors.adminPassword && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.adminPassword}
                </p>
              )}
            </div>
            <div className="text-center">
              <button
                type="submit"
                form="addUserForm"
                className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
              >
                Add {formData.type}
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="p-6">
        <HeaderSection title="Add New User" />
        <form onSubmit={onSubmit} id="addUserForm" className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8 space-y-6">
          <div className="flex justify-center">
            <input
              type="file"
              id="profile"
              name="profile"
              className="hidden"
              onChange={captureImage}
              accept="image/*"
            />
            <label htmlFor="profile" className="cursor-pointer">
              <img
                className="rounded-full w-28 h-28 object-cover border-4 border-blue-900"
                src={imagePreview}
                alt="User"
              />
            </label>
          </div>
          {errors.profile && (
            <p className="text-red-600 text-sm text-center">
              <FaExclamationCircle className="inline mr-1" /> {errors.profile}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["name", "email", "mobile", "password", "address"].map((field) => (
              <div key={field} className={field === "address" ? "md:col-span-2" : ""}>
                <label className="block text-sm font-medium capitalize">Enter {field}</label>
                <input
                  name={field}
                  type={field === "email" ? "email" : field === "password" ? "password" : field === "mobile" ? "tel" : "text"}
                  value={formData[field]}
                  onChange={inputEvent}
                  className={`mt-1 w-full px-4 py-2 border rounded text-black ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <FaExclamationCircle /> {errors[field]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="md:w-1/2">
            <label className="block text-sm font-medium mb-1">User Type</label>
            <select
              name="type"
              onChange={inputEvent}
              value={formData.type}
              className="w-full border border-gray-300 rounded px-3 py-2 text-black"
            >
              <option>Employee</option>
              <option>Client</option>
              {/* <option>Admin</option> */}
            </select>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2 rounded-lg text-lg shadow"
            >
              Add {formData.type}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddUsers;
