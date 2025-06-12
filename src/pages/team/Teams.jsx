import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderSection from "../../components/HeaderSection";
import RowTeam from "../../components/rows/team-row";
import { getTeams } from "../../http";
import { setTeam } from "../../store/team-slice";
import { setTeamMembers } from "../../store/user-slice";

const Teams = () => {
  const dispatch = useDispatch();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset selected team and members on mount
    dispatch(setTeam(null));
    dispatch(setTeamMembers(null));

    const fetchTeams = async () => {
      try {
        const res = await getTeams();
        if (res.success && Array.isArray(res.data)) {
          setTeams(res.data);
        } else {
          setTeams([]);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [dispatch]);

  return (
    <div className="main-content">
      <section className="section">
        <HeaderSection title="Teams" />
        <div className="card">
          <div className="card-header"
          style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "8px 8px 0 0",
            }}>
             <h4
              style={{
                color: "#211C84",
                fontSize: "1.25rem",
                fontWeight: "600",
                margin: 0,
              }}
            >
              All Teams
            </h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-md center-text">
                <thead>
                  <tr style={{
                      color: "#211C84",
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      backgroundColor: "#f8fafc",
                    }}>
                    <th>Number</th>
                    {/* <th>Image</th> */}
                    <th>Name</th>
                    <th>Leader</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Loading teams...
                      </td>
                    </tr>
                  ) : teams.length > 0 ? (
                    teams.map((team, index) => (
                      <RowTeam key={team.id || index} index={index + 1} data={team} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No teams available.
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

export default Teams;
