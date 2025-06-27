import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth-slice";
import { dLogout } from "../../http";
import { useNavigate } from "react-router-dom";
import {
  FaFire, FaUserClock, FaBook, FaPiggyBank,
  FaChartBar, FaFileInvoice, FaSignOutAlt, FaUsers, FaUsersCog,
  FaUserPlus, FaBullhorn, FaUserTag, FaCalendarAlt, FaTeamspeak

} from "react-icons/fa";

const Leader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline ${isActive
      ? 'bg-[#B5A8D5] text-[#211C84] font-semibold'
      : 'text-black hover:bg-[#F0F1FF] hover:text-[#211C84]'
    }`;

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate("/login");
  };

  return (
    <ul className="sidebar-menu space-y-2">
      <NavLink className={navLinkClass} to="/home"><FaFire />Dashboard</NavLink>
      <NavLink to="/employees" className={navLinkClass}><FaTeamspeak />Employees</NavLink>
      <NavLink className={navLinkClass} to="/attendance"><FaUserClock />Attendance</NavLink>
      <NavLink className={navLinkClass} to="/leaves"><FaBook />Leave Requests</NavLink>
      <NavLink className={navLinkClass} to="/salary-structure"><FaPiggyBank />Salary Setup</NavLink>
      <NavLink className={navLinkClass} to="/performance"><FaChartBar />Performance</NavLink>
      <NavLink className={navLinkClass} to="/HolidayCalendarView"><FaCalendarAlt />Holiday Calendar</NavLink>
      <NavLink className={navLinkClass} to="/announcement"><FaBullhorn />Announcements</NavLink>
      <NavLink className={navLinkClass} to="/form16" ><FaUsersCog />Form16</NavLink>
      <NavLink className={navLinkClass} to="/form24" ><FaUserTag />Form24Q</NavLink>
      <NavLink className={navLinkClass} to="/itDeclarationReview" ><FaUserTag />It Declaration</NavLink>
      <NavLink className={navLinkClass} to="/addusers"><FaUserPlus />Add User</NavLink>
      <NavLink className={navLinkClass} to="/employee-claims"><FaFileInvoice />Employee Claims</NavLink>
      <NavLink onClick={logout} className="flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline text-black hover:bg-[#F0F1FF] hover:text-[#211C84]" to="#">
        <FaSignOutAlt />Logout
      </NavLink>
    </ul>
  );
};

export default Leader;
