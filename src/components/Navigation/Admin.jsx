import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaUsers, FaUserFriends, FaUsersCog, FaFire, FaUser, FaBook, FaPen, FaPiggyBank,
  FaUserPlus, FaAddressCard, FaRegSquare, FaTeamspeak, FaInfoCircle, FaSignOutAlt,
  FaFileInvoice, FaMoneyBill, FaChevronDown, FaChevronUp
} from "react-icons/fa";

const Admin = () => {
  const [showSettings, setShowSettings] = useState(false);

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
      <NavLink to="/home" className={navLinkClass}><FaHome /><span>Dashboard</span></NavLink>
      <NavLink to="/invoices" className={navLinkClass}><FaFileInvoice /><span>Invoices</span></NavLink>
      {/* <NavLink to="/payments" className={navLinkClass}><FaMoneyBill /><span>Payments</span></NavLink> */}

      {/* HRMS Section */}
      <NavLink to="/employees" className={navLinkClass}><FaUsers /><span>Employees</span></NavLink>
      <NavLink to="/leaders" className={navLinkClass}><FaUserFriends /><span>Clients</span></NavLink>
      <NavLink to="/admins" className={navLinkClass}><FaUsersCog /><span>Admins</span></NavLink>
      {/* <NavLink to="/teams" className={navLinkClass}><FaFire /><span>Teams</span></NavLink> */}
       <NavLink to="/companies" className={navLinkClass}><FaUsersCog /><span>Companies</span></NavLink>
       <NavLink to="/holidays" className={navLinkClass}><FaUsersCog /><span>Holidays</span></NavLink>
      <NavLink to="/attendance" className={navLinkClass}><FaUser /><span>Attendance</span></NavLink>
      <NavLink to="/leaves" className={navLinkClass}><FaBook /><span>Leaves</span></NavLink>
      <NavLink to="/assignSalary" className={navLinkClass}><FaPen /><span>Assign Salary</span></NavLink>
      <NavLink to="/salaries" className={navLinkClass}><FaPiggyBank /><span>Salaries</span></NavLink>

      {/* Starter Section */}
      {sectionHeading("Starter")}
      <NavLink to="/adduser" className={navLinkClass}><FaUserPlus /><span>Add User</span></NavLink>
      <NavLink to="/addteam" className={navLinkClass}><FaAddressCard /><span>Add Team</span></NavLink>
      {/* <NavLink to="/blank" className={navLinkClass}><FaRegSquare /><span>Blank Page</span></NavLink> */}

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
          <NavLink to="/contact" className={navLinkClass}><FaTeamspeak /><span>Contact Us</span></NavLink>
          <NavLink to="/about" className={navLinkClass}><FaInfoCircle /><span>About Us</span></NavLink>
          <NavLink to="/logout" className={navLinkClass}><FaSignOutAlt /><span>Logout</span></NavLink>
        </>
      )}
    </div>
  );
};

export default Admin;
