import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome, FaUsers, FaUserFriends, FaUsersCog, FaUserClock,
  FaUserPlus, FaBook, FaMoneyBill, FaPiggyBank, FaBullhorn,
  FaTeamspeak, FaInfoCircle, FaFileInvoice, FaAddressCard,
  FaSignOutAlt
} from "react-icons/fa";
import { dLogout } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth-slice";
import LogoutModal from "../../components/logout/LogoutModal";

const Admin = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate("/login");
  };

  return (
    <div className="flex flex-col space-y-1 bg-white text-black h-[600px] overflow-y-auto">
      <NavLink to="/home" className={navLinkClass}><FaHome />Dashboard</NavLink>
      <NavLink to="/invoices" className={navLinkClass}><FaFileInvoice />Invoices</NavLink>
      <NavLink to="/leaders" className={navLinkClass}><FaUserFriends />Clients</NavLink>
      <NavLink to="/admins" className={navLinkClass}><FaUsersCog />Admins</NavLink>
      {/* <NavLink to="/attendance" className={navLinkClass}><FaUserClock />Attendance</NavLink> */}
      {/* <NavLink to="/leaves" className={navLinkClass}><FaBook />Leave Requests</NavLink> */}
      {/* <NavLink to="/salary-structure" className={navLinkClass}><FaMoneyBill />Salary Setup</NavLink> */}
      <NavLink to="/performance" className={navLinkClass}><FaPiggyBank />Performance</NavLink>
      <NavLink to="/roles" className={navLinkClass}><FaAddressCard />Roles & Permissions</NavLink>
      <NavLink to="/holiday" className={navLinkClass}><FaTeamspeak />Holiday Calendar</NavLink>
      {/* <NavLink to="/employees" className={navLinkClass}><FaTeamspeak />Holiday Calendar</NavLink> */}
      <NavLink to="/company" className={navLinkClass}><FaInfoCircle />Companies</NavLink>
      {/* <NavLink to="/announcement" className={navLinkClass}><FaBullhorn />Announcements</NavLink> */}
      
      {sectionHeading("Manage Users")}
      <NavLink to="/adduser" className={navLinkClass}><FaUserPlus />Add User</NavLink>

      <button
        onClick={() => setLogoutModalOpen(true)}
        className="flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline text-black hover:bg-[#F0F1FF] hover:text-[#211C84]"
      >
        <FaSignOutAlt />
        Logout
      </button>

      <LogoutModal
        isOpen={logoutModalOpen}
        onCancel={() => setLogoutModalOpen(false)}
        onConfirm={() => {
          setLogoutModalOpen(false);
          logout();
        }}
      />
    </div>
  );
};

export default Admin;
