import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth-slice";
import { dLogout } from "../../http";
import { useNavigate } from "react-router-dom";


const Leader = () =>
{
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dLogout(); 
    dispatch(setAuth(null)); 
    navigate("/login");
  };

    return(
    <ul className="sidebar-menu">
      <NavLink className="nav-link" to="/home"><i className="fas fa-fire"></i> <span>Dashboard</span></NavLink>
      <NavLink className="nav-link" to="/members"><i className="fas fa-fire"></i> <span>Members</span></NavLink>
      <NavLink className="nav-link" to="/userAttendance"><i className="fas fa-user"></i> <span>Attendance</span></NavLink>
      <NavLink className="nav-link" to="/applyforleave"><i className="fas fa-pen"></i> <span>Apply For Leave</span></NavLink>
      <NavLink className="nav-link" to="/userLeaveApplications"><i className="fas fa-book"></i> <span>Leave Applications</span></NavLink>
      <NavLink className="nav-link" to="/userSalary"><i class="fas fa-piggy-bank"></i> <span>Salary</span></NavLink>

      <li className="menu-header">Settings</li>
        <NavLink onClick={logout} className="nav-link" to="/home"><i className="fas fa-sign-out-alt"></i> <span>Logout</span></NavLink>
    </ul>
    )
}

export default Leader;