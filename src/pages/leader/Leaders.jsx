import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import RowLeader from "../../components/rows/row-leader";
import { getLeaders } from "../../http";

const Leaders = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await getLeaders();
      if (res.success) {
        setUsers(res.data || []);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="main-content px-4 md:px-8">
      <section className="section">
        <HeaderSection title="Leaders" />

        <div className="card shadow rounded-lg overflow-hidden">
          <div className="card-header bg-white border-b-2 border-[#211C84] px-6 py-4">
            <h4 className="text-[#211C84] text-xl font-semibold m-0">All Leaders</h4>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table w-full border-collapse">
                <thead className="bg-gray-50">
                  <tr className="text-[#211C84] text-sm uppercase">
                    <th className="text-left py-3 px-4 border-b text-center">Number</th>
                    {/* <th className="text-left py-3 px-4 border-b text-center">Image</th> */}
                    <th className="text-left py-3 px-4 border-b text-center">Name</th>
                    <th className="text-left py-3 px-4 border-b text-center">Email</th>
                    <th className="text-left py-3 px-4 border-b text-center">Mobile</th>
                    <th className="text-center py-3 px-4 border-b text-center">Status</th>
                    <th className="text-left py-3 px-4 border-b text-center">Leading Team</th>
                    <th className="text-center py-3 px-4 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="py-6 text-center text-gray-500 text-sm">
                        Loading leaders...
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((data, index) => (
                      <RowLeader key={data._id || index} index={index + 1} data={data} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-6 text-center text-gray-500 text-sm">
                        No leaders found.
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

export default Leaders;
