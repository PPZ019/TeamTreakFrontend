// Frontend: RolesPermissions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaPlus, FaUserShield, FaTimes, FaTrashAlt } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

const RolesPermissions = () => {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({ name: "", permissions: [] });
  const [permissionInput, setPermissionInput] = useState("");

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/roles/all");
      setRoles(res.data.roles);
    } catch (err) {
      toast.error("Failed to fetch roles");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.warning("Role name is required");
    try {
      await axios.post("http://localhost:5500/api/roles/create", form);
      toast.success("Role created successfully!");
      setForm({ name: "", permissions: [] });
      fetchRoles();
    } catch (err) {
      toast.error("Error creating role");
    }
  };

  const addPermission = () => {
    const perm = permissionInput.trim();
    if (!perm || form.permissions.includes(perm)) return;
    setForm((prev) => ({ ...prev, permissions: [...prev.permissions, perm] }));
    setPermissionInput("");
  };

  const removePermission = (perm) => {
    setForm((prev) => ({ ...prev, permissions: prev.permissions.filter((p) => p !== perm) }));
    toast.info(`Removed permission: ${perm}`);
  };

  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(`http://localhost:5500/api/roles/delete/${id}`);
      toast.success("Role deleted");
      fetchRoles();
    } catch {
      toast.error("Failed to delete role");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-[#211C84] mb-6 flex items-center gap-2">
        <FaUserShield className="text-blue-700" /> Roles & Permissions
      </h2>

      <form onSubmit={handleCreate} className="bg-white border border-gray-200 shadow p-6 rounded-xl space-y-5">
        <div>
          <label className="block font-semibold mb-1">Role Name</label>
          <input type="text" placeholder="e.g. HR, Manager" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
        </div>

        <div>
          <label className="block font-semibold mb-1">Add Permissions</label>
          <div className="flex gap-3">
            <input type="text" placeholder="e.g. manage-users, view-salary" value={permissionInput} onChange={(e) => setPermissionInput(e.target.value)} className="flex-1 border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <button type="button" onClick={addPermission} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center gap-2">
              <FaPlus /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {form.permissions.map((perm, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {perm}
                <button type="button" className="text-red-500" onClick={() => removePermission(perm)}>
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Create Role
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Existing Roles</h3>
        {roles.length === 0 ? (
          <p className="text-gray-500">No roles created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div key={role._id} className="bg-white shadow-md rounded-xl p-5 border hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <FaUserShield className="text-blue-600" /> {role.name}
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {role.permissions.map((perm, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-800 border px-3 py-1 rounded-full">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteRole(role._id)} title="Delete Role" className="text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPermissions;
