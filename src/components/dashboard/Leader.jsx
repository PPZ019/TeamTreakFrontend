import React from 'react';
import { useSelector } from 'react-redux';

const Leader = () => {
  const { user } = useSelector(state => state.authSlice);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <section className="">
        <div className="">
          <div className="">
            <h4>Welcome {user?.name}</h4>
          </div>
        </div>

        <div className="card">
          <div className="card-body row">
            <div className="col-md-3">
              <img
                className="img-fluid img-thumbnail"
                src={user?.image}
                alt={`${user?.name}'s profile`}
              />
            </div>
            <div className="col-md-9">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{user?.name}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{user?.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <th>Usertype</th>
                    <td>{user?.type}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{user?.status}</td>
                  </tr>
                  <tr>
                    <th>Mobile</th>
                    <td>{user?.mobile}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{user?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leader;
