import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";

import {
  FaTachometerAlt,
  FaBullseye,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
} from "react-icons/fa";

const VP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const logout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      await dLogout();
      dispatch(setAuth(null));
      navigate("/login");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline ${
      isActive
        ? "bg-[#B5A8D5] text-[#211C84] shadow-md"
        : "text-gray-700 hover:bg-[#F0F1FF] hover:text-[#211C84]"
    }`;

  return (
    <nav className="flex flex-col space-y-2">
      <NavLink to="/home" className={navLinkClass}>
        <FaTachometerAlt />
        Dashboard
      </NavLink>

      <NavLink to="/businessGoals" className={navLinkClass}>
        <FaBullseye />
        Business Goals
      </NavLink>

      <NavLink to="/projectReports" className={navLinkClass}>
        <FaClipboardList />
        Project Reports
      </NavLink>

      <NavLink to="/teamPerformance" className={navLinkClass}>
        <FaChartLine />
        Team Performance
      </NavLink>

      <NavLink to="/collaboration" className={navLinkClass}>
        <FaUsers />
        Collaboration
      </NavLink>

      <NavLink
        onClick={logout}
        to="#"
        className="flex items-center text-black hover:bg-[#F0F1FF] hover:text-[#211C84] gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </NavLink>
    </nav>
  );
};

export default VP;
