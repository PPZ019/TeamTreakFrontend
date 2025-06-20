import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import LogoutModal from "../logout/LogoutModal";

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
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate("/login");
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
          onClick={() => setLogoutModalOpen(true)}
          className="flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline text-black hover:bg-[#F0F1FF] hover:text-[#211C84]"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

        <LogoutModal
          isOpen={logoutModalOpen}
          onCancel={() => setLogoutModalOpen(false)}
          onConfirm={() => {setLogoutModalOpen(false);
            logout();
          }}
        />
      </div>
    </div>
  );
};

export default Employee;
