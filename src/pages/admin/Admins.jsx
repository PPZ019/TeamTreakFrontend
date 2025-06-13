import { useEffect, useState } from "react";
import HeaderSection from "../../components/HeaderSection";
import RowAdmin from "../../components/rows/row-admin";
import { getAdmins } from "../../http";

const AdminsPage = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAdmins();
        if (res.success) {
          setAdmins(res.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch admins:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Admins" />
        <div
          className="card"
          style={{
            border: "none",
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
            borderRadius: "8px",
          }}
        >
          <div
            className="card-header"
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <h4
              style={{
                color: "#211C84",
                fontSize: "1.25rem",
                fontWeight: "600",
                margin: 0,
              }}
            >
              All Admins
            </h4>
          </div>

          <div className="card-body p-0">
            <div className="table-responsive">
              <table
                className="table table-striped table-md"
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <thead>
                  <tr
                    style={{
                      color: "#211C84",
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <th style={{ padding: "1rem" }}>Number</th>
                    {/* <th style={{ padding: "1rem" }}>Image</th> */}
                    <th style={{ padding: "1rem" }}>Name</th>
                    <th style={{ padding: "1rem" }}>Email</th>
                    <th style={{ padding: "1rem" }}>Mobile</th>
                    <th style={{ padding: "1rem" }}>Status</th>
                    <th style={{ padding: "1rem" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "2rem",
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Loading admins...
                      </td>
                    </tr>
                  ) : admins.length > 0 ? (
                    admins.map((admin, index) => (
                      <RowAdmin key={admin.id || index} index={index + 1} data={admin} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "2rem",
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        No admins found.
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

export default AdminsPage;
