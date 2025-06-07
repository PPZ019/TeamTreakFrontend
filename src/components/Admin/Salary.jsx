import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getEmployee, getLeader, updateSalary, viewAllSalaries } from '../../http';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import HeaderSection from "../../components/HeaderSection";

const SalaryView = () => {
    const {id} = useParams();
    const [salary, setSalary] = useState();
    const [employee, setEmployee] = useState();
    const [loading, setLoading] = useState(true);
    const initialState = {salary:'', bonus:'', reasonForBonus:''};
    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await viewAllSalaries({ "_id": id });
                if (!res.data || res.data.length === 0) {
                  toast.error("Salary record not found");
                  setLoading(false);
                  return;
                }
                setSalary(res.data[0]);

                const empRes = await getEmployee(res.data[0].employeeID);
                const leaderRes = await getLeader(res.data[0].employeeID);

                if(empRes.success) setEmployee(empRes.data);
                else if(leaderRes.success) setEmployee(leaderRes.data);
                else toast.error("Employee/Leader not found");

            } catch (error) {
                toast.error("Error fetching data");
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
      if (salary) {
        setFormData({
          salary: salary.salary || '',
          bonus: salary.bonus || '',
          reasonForBonus: salary.reasonForBonus || ''
        });
      }
    }, [salary]);

    const inputEvent = (e) => {
        const { name, value } = e.target;
        setFormData((old) => ({
            ...old,
            [name]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const {salary, bonus, reasonForBonus} = formData;
        if (!salary || !bonus || !reasonForBonus) return toast.error('All Fields Required');

        const payload = {
          ...formData,
          employeeID: employee._id,
          _id: salary._id  // Assuming you need to send the salary record ID to update
        };

        try {
          const res = await updateSalary(payload);
          if (res.success) {
            toast.success("Salary Updated!");
            setFormData(initialState);
          } else {
            toast.error("Failed to update salary");
          }
        } catch (err) {
          toast.error("Error updating salary");
        }
    };

    if (loading) return <Loading />;

    if (!employee) return <p className="text-center mt-10 text-red-500">Employee data not found.</p>;

    return (
      <div className="main-content" style={{ backgroundColor: '#1E201E', color: '#ECDFCC', padding: '1.5rem' }}>
        <section className="section">
          <div className="card" style={{ backgroundColor: '#3C3D37', padding: '1rem', borderRadius: '1rem', marginBottom: '1rem' }}>
            <div className="card-header d-flex justify-content-between">
              <h4>Updated Salary from {salary?.assignedDate}</h4>
            </div>
            <div className="col-md-9">
              <table className='table' style={{ width: '100%', color: '#ECDFCC' }}>
                <tbody>
                  <tr><th>Name</th><td>{employee?.name}</td></tr>
                  <tr><th>Email</th><td>{employee?.email}</td></tr>
                  <tr><th>Username</th><td>{employee?.username}</td></tr>
                  <tr><th>Mobile Number</th><td>{employee?.mobile}</td></tr>
                  <tr><th>Salary</th><td>{salary?.salary}</td></tr>
                  <tr><th>Bonus</th><td>{salary?.bonus}</td></tr>
                  <tr><th>Reason</th><td>{salary?.reasonForBonus}</td></tr>
                  <tr><th>Last Updated</th><td>{salary?.assignedDate}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="section">
          <HeaderSection title='Update Salary' />
          <div className="card" style={{ backgroundColor: '#3C3D37', padding: '1rem', borderRadius: '1rem' }}>
            <div className="card-body pr-5 pl-5 m-1">
              <form className='row' onSubmit={onSubmit} id='addUserForm'>
                <div className="form-group col-md-6" style={{ marginBottom: '1rem' }}>
                  <label>Enter Salary</label>
                  <input
                    onChange={inputEvent}
                    value={formData.salary}
                    type="number"
                    id='salary'
                    name='salary'
                    className="form-control"
                    style={{
                      backgroundColor: '#222831',
                      color: '#ECDFCC',
                      borderRadius: '0.75rem',
                      border: '1px solid #697565',
                      padding: '0.5rem'
                    }}
                  />
                </div>

                <div className="form-group col-md-6" style={{ marginBottom: '1rem' }}>
                  <label>Enter Bonus</label>
                  <input
                    onChange={inputEvent}
                    value={formData.bonus}
                    type="number"
                    id='bonus'
                    name='bonus'
                    className="form-control"
                    style={{
                      backgroundColor: '#222831',
                      color: '#ECDFCC',
                      borderRadius: '0.75rem',
                      border: '1px solid #697565',
                      padding: '0.5rem'
                    }}
                  />
                </div>

                <div className="form-group col-md-12" style={{ marginBottom: '1rem' }}>
                  <label>Enter Reason</label>
                  <input
                    onChange={inputEvent}
                    value={formData.reasonForBonus}
                    type="text"
                    id='reasonForBonus'
                    name='reasonForBonus'
                    className="form-control"
                    style={{
                      backgroundColor: '#222831',
                      color: '#ECDFCC',
                      borderRadius: '0.75rem',
                      border: '1px solid #697565',
                      padding: '0.5rem'
                    }}
                  />
                </div>

                <div className="form-group text-center col-md-12">
                  <button
                    className='btn btn-primary btn-lg'
                    type='submit'
                    style={{
                      width: '30vh',
                      backgroundColor: '#697565',
                      color: '#ECDFCC',
                      borderRadius: '9999px',
                      padding: '0.75rem',
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={e => (e.target.style.backgroundColor = '#ECDFCC', e.target.style.color = '#697565')}
                    onMouseLeave={e => (e.target.style.backgroundColor = '#697565', e.target.style.color = '#ECDFCC')}
                  >
                    Update Salary
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
};

export default SalaryView;
