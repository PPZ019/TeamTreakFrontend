import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";

import {
  FaFire,
  FaUsers,
  FaUser,
  FaPen,
  FaBook,
  FaPiggyBank,
  FaSignOutAlt
} from "react-icons/fa";

const Employee = () => {
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
    `flex items-center gap-4 px-4 py-3 rounded-lg transition duration-150 text-sm font-medium
    ${
      isActive
        ? "bg-[#B5A8D5] text-[#211C84] shadow-md"
        : "text-gray-700 hover:bg-[#F0F1FF] hover:text-[#211C84]"
    }`;

  return (
    <div className="w-full h-full bg-white text-black p-4 overflow-y-auto shadow-sm">
      <nav className="flex flex-col space-y-2">
        <NavLink to="/home" className={navLinkClass}>
          <FaFire className="text-lg" />
          Dashboard
        </NavLink>

        <NavLink to="/userTeams" className={navLinkClass}>
          <FaUsers className="text-lg" />
          Team
        </NavLink>

        <NavLink to="/userAttendance" className={navLinkClass}>
          <FaUser className="text-lg" />
          Attendance
        </NavLink>

        <NavLink to="/applyforleave" className={navLinkClass}>
          <FaPen className="text-lg" />
          Apply For Leave
        </NavLink>

        <NavLink to="/userLeaveApplications" className={navLinkClass}>
          <FaBook className="text-lg" />
          Leave Applications
        </NavLink>

        <NavLink to="/userSalary" className={navLinkClass}>
          <FaPiggyBank className="text-lg" />
          Salary
        </NavLink>
      </nav>

      <div className="mt-6 border-t pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-4 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition duration-150"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Employee;
