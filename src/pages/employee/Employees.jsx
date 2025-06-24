import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderSection from '../../components/HeaderSection';
import RowEmployee from '../../components/rows/row-employee';
import { getEmployees } from '../../http';

const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getEmployees();
        if (res.success && Array.isArray(res.employees)) {
          setUsers(res.employees);
        } else {
          console.warn("⚠️ Unexpected response format", res);
          setUsers([]);
        }
      } catch (error) {
        console.error("❌ Failed to fetch employees", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredUsers = users.filter((user) => {
    const lower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(lower) ||
      user.email?.toLowerCase().includes(lower) ||
      user.mobile?.toString().toLowerCase().includes(lower)
    );
  });

  return (
    <div className="main-content px-4 md:px-8">
      <section className="section">
        <HeaderSection title="Employees" />
        <div className="card shadow rounded-lg overflow-hidden">
          <div className="card-header bg-white border-b-2 border-[#211C84] px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h4 className="text-[#211C84] text-xl font-semibold m-0">All Employees</h4>
              <button
                onClick={() => navigate('/adduser')}
                className="bg-[#211C84] text-white px-4 py-2 rounded shadow hover:bg-[#4D55CC] transition"
              >
                + Add New Employee
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by name, email or mobile..."
                className="w-full border-2 border-blue-900 focus:border-[#211C84] rounded-md py-2 px-4 text-sm outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-blue-900 text-sm uppercase">
                    <th className="text-left py-3 px-4 border-b text-center">Number</th>
                    <th className="text-left py-3 px-4 border-b text-center">Name</th>
                    <th className="text-left py-3 px-4 border-b text-center">Email</th>
                    <th className="text-left py-3 px-4 border-b text-center">Mobile</th>
                    <th className="text-center py-3 px-4 border-b text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500 text-sm">
                        Loading employees...
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((data, index) => (
                      <RowEmployee key={data._id || index} index={index + 1} data={data} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500 text-sm">
                        No employees found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Employees;
