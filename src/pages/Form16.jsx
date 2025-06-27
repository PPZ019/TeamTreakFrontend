import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Form16 = () => {
  const [form16List, setForm16List] = useState([]);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ empId: '', name: '', financialYear: '' });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchForm16();
    fetchEmployees();
  }, []);

  useEffect(() => {
    const selectedEmp = employees.find(emp => emp._id === formData.empId);
    if (selectedEmp) {
      setFormData(prev => ({ ...prev, name: selectedEmp.name }));
    } else {
      setFormData(prev => ({ ...prev, name: '' }));
    }
  }, [formData.empId, employees]);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get('http://localhost:5500/api/admin/employees', {
        withCredentials: true,
      });
      if (Array.isArray(data.employees)) {
        setEmployees(data.employees);
      } else {
        console.error('Unexpected employee data format:', data);
      }
    } catch (err) {
      console.error('Error fetching employee list:', err);
    }
  };

  const fetchForm16 = async () => {
    try {
      const { data } = await axios.get('http://localhost:5500/api/form16');
      setForm16List(data);
    } catch (err) {
      console.error('Error fetching Form 16:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('file', file);
    payload.append('empId', formData.empId);
    payload.append('name', formData.name);
    payload.append('financialYear', formData.financialYear);

    try {
      await axios.post('http://localhost:5500/api/form16', payload);
      fetchForm16();
      setFormData({ empId: '', name: '', financialYear: '' });
      setFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="min-h-screen p-8 text-white">
      <h1 className="text-4xl text-blue-900 text-center font-bold mb-6">Employee Form 16 Records</h1>

      {/* Upload Form (Visible only for admin ideally) */}
      <form onSubmit={handleUpload} className="bg-white rounded-xl p-4 text-gray-800 shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload New Form 16</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={formData.empId}
            onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name} ({emp.email})
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Employee Name"
            value={formData.name}
            readOnly
            className="p-2 border rounded bg-gray-100"
            required
          />
          <input
            type="text"
            placeholder="Financial Year"
            value={formData.financialYear}
            onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mt-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
            required
          />
        </div>
        <button type="submit" className="mt-2 bg-blue-900 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {/* Record Table */}
      <div className="bg-white rounded-xl p-4 text-gray-800 shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-100 rounded-xl text-blue-900 text-center py-2">
              {/* <th className="p-2 text-left">Employee ID</th> */}
              <th className="p-3  text-center">Name</th>
              <th className="p-3  text-center">Financial Year</th>
              <th className="p-3  text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {form16List.map((entry) => (
              <tr key={entry._id} className="border-b border-gray-200 text-center">
                {/* <td className="p-2">{entry.empId}</td> */}
                <td className="p-3">{entry.name}</td>
                <td className="p-3">{entry.financialYear}</td>
                <td className="p-3">
                  <a
                    href={entry.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 border rounded-xl p-2"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form16;
