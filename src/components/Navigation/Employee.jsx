import { useState } from "react";
import { NavLink } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaFire,
  FaUsers,
  FaUser,
  FaPen,
  FaBook,
  FaPiggyBank,
  FaTeamspeak,
  FaInfoCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline ${
      isActive
        ? 'bg-[#B5A8D5] text-[#211C84] font-semibold'
        : 'text-black hover:bg-[#F0F1FF] hover:text-[#211C84]'
    }`;

  const sectionHeading = (label) => (
    <div className="mt-4 px-3 py-2 text-[#211C84] uppercase text-sm font-bold tracking-widest select-none">
      {label}
    </div>
  );

  return (
    <div className="flex flex-col space-y-1 bg-white text-black h-[600px] overflow-r-auto">
      {/* Main Links */}
      <NavLink to="/home" className={navLinkClass}><FaFire /><span>Dashboard</span></NavLink>
      <NavLink to="/userTeams" className={navLinkClass}><FaUsers /><span>Team</span></NavLink>
      <NavLink to="/userAttendance" className={navLinkClass}><FaUser /><span>Attendance</span></NavLink>
      <NavLink to="/applyforleave" className={navLinkClass}><FaPen /><span>Apply For Leave</span></NavLink>
      <NavLink to="/userLeaveApplications" className={navLinkClass}><FaBook /><span>Leave Applications</span></NavLink>
      <NavLink to="/userSalary" className={navLinkClass}><FaPiggyBank /><span>Salary</span></NavLink>

      {/* Settings Section (dropdown) */}
      <div
        onClick={() => setShowSettings(!showSettings)}
        className="mt-4 px-2 flex justify-between items-center text-[#211C84] uppercase text-md font-semibold tracking-widest cursor-pointer select-none"
      >
        <span>Settings</span>
        {showSettings ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
      </div>
      {showSettings && (
        <>
          {/* <NavLink to="/contact" className={navLinkClass}><FaTeamspeak /><span>Contact me</span></NavLink>
          <NavLink to="/about" className={navLinkClass}><FaInfoCircle /><span>About me</span></NavLink> */}
          <NavLink onClick={logout} to="#" className="flex items-center text-black hover:bg-[#F0F1FF] hover:text-[#211C84] gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline "><FaSignOutAlt /><span>Logout</span></NavLink>
        </>
      )}
    </div>
  );
};

export default Employee;