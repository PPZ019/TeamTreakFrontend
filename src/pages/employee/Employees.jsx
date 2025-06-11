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
      const res = await getEmployees();
      if (res.success) {
        setUsers(res.data);
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
    <div className="main-content">
      <section className="section">
        <HeaderSection title='Employees' />
        <div className="card" style={{ 
          border: 'none', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '8px'
        }}>
          <div className="card-header" style={{ 
            background: 'white', 
            borderBottom: '2px solid #211C84',
            padding: '1.5rem',
            borderRadius: '8px 8px 0 0'
          }}>
            <div className="flex justify-between items-center">
              <h4 style={{ 
                color: '#211C84', 
                fontSize: '1.25rem', 
                fontWeight: '600',
                margin: 0
              }}>
                All Employees
              </h4>
              <button
                onClick={() => navigate('/adduser')}
                className="btn-primary"
                style={{
                  background: '#211C84',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#4D55CC'}
                onMouseOut={(e) => e.currentTarget.style.background = '#211C84'}
              >
                + Add New Employee
              </button>
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by name, email or mobile..."
                style={{
                  width: '100%',
                  border: '2px solid #e2e8f0',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  outline: 'none',
                  fontSize: '0.875rem',
                  transition: 'border 0.3s ease'
                }}
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={(e) => e.target.style.border = '2px solid #211C84'}
                onBlur={(e) => e.target.style.border = '2px solid #e2e8f0'}
              />
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table" style={{ 
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0
              }}>
                <thead>
                  <tr style={{ 
                    color: '#211C84', 
                    textTransform: 'uppercase', 
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: '#f8fafc'
                  }}>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Number</th>
                    {/* <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Image</th> */}
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Name</th>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Email</th>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Mobile</th>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center'
                    }}>Status</th>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'left'
                    }}>Team</th>
                    <th style={{ 
                      padding: '1rem 0.75rem',
                      borderBottom: '1px solid #e2e8f0',
                      textAlign: 'center'
                    }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        color: '#64748b',
                        fontSize: '0.875rem'
                      }}>
                        Loading employees...
                      </td>
                    </tr>
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((data, index) => (
                      <RowEmployee key={index} index={index + 1} data={data} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" style={{ 
                        padding: '2rem', 
                        textAlign: 'center', 
                        color: '#64748b',
                        fontSize: '0.875rem'
                      }}>
                        No employees found matching your search
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