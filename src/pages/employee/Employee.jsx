import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getUser } from "../../http";

const Employee = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    image: "",
    address: "",
    status: "",
  });

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await getUser(id);
      if (res.success) setUser(res.data);
    })();
  }, [id]);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-blue-900">Employee Details</h2>
          <NavLink
            to={`/edituser/${id}`}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit User
          </NavLink>
        </div>
        <div className="flex flex-col md:flex-row items-start p-6 gap-6">
          <div className="md:w-1/3 w-full">
            <img
              src={user.image || "/default-user.png"}
              alt="User"
              className="w-full rounded-lg border border-gray-200"
            />
          </div>
          <div className="md:w-2/3 w-full">
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-semibold">Name:</th>
                  <td className="py-2">{user.name}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-semibold">Email:</th>
                  <td className="py-2">{user.email}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-semibold">Mobile:</th>
                  <td className="py-2">{user.mobile}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-semibold">Address:</th>
                  <td className="py-2">{user.address}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-semibold">Status:</th>
                  <td className="py-2 capitalize">{user.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
