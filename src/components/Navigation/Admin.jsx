import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaUsers, FaUserFriends, FaUsersCog, FaFire, FaUser, FaBook, FaPen, FaPiggyBank,
  FaUserPlus, FaAddressCard, FaRegSquare, FaTeamspeak, FaInfoCircle, FaSignOutAlt,
  FaFileInvoice, FaMoneyBill, FaChevronDown, FaChevronUp
} from "react-icons/fa";
import { dLogout } from "../../http";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../components/logout/LogoutModal"; 

const Admin = () => {
  const [showSettings, setShowSettings] = useState(false);
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
    <div className="flex flex-col space-y-1 bg-white text-black h-[600px] overflow-r-auto">
      <NavLink to="/home" className={navLinkClass}><FaHome /><span>Dashboard</span></NavLink>
      <NavLink to="/invoices" className={navLinkClass}><FaFileInvoice /><span>Invoices</span></NavLink>
      <NavLink to="/leaders" className={navLinkClass}><FaUserFriends /><span>Clients</span></NavLink>
      <NavLink to="/admins" className={navLinkClass}><FaUsersCog /><span>Admins</span></NavLink>
      <NavLink to="/holiday" className={navLinkClass}><FaTeamspeak /><span>Holiday Calendar</span></NavLink>
      <NavLink to="/company" className={navLinkClass}><FaInfoCircle /><span>Companies</span></NavLink>

      {/* Logout with modal */}
      <button
        onClick={() => setLogoutModalOpen(true)}
        className="flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline text-black hover:bg-[#F0F1FF] hover:text-[#211C84]"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

      {sectionHeading("Starter")}
      <NavLink to="/adduser" className={navLinkClass}><FaUserPlus /><span>Add User</span></NavLink>

      {/* Logout Confirmation Modal */}
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
