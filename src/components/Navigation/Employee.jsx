import { useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { dLogout } from "../../http";
import { setAuth } from "../../store/auth-slice";
import {
  FaFire, FaUsers, FaUser, FaPen, FaBook, FaPiggyBank, FaUserTag,
  FaBullhorn, FaFileInvoice, FaCalendarAlt, FaFileAlt, FaSignOutAlt
} from "react-icons/fa";

const Employee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await dLogout();
    dispatch(setAuth(null));
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline ${
      isActive
        ? "bg-[#B5A8D5] text-[#211C84] shadow-md"
        : "text-gray-700 hover:bg-[#F0F1FF] hover:text-[#211C84]"
    }`;

  return (
    <nav className="flex flex-col space-y-2">
      <NavLink to="/home" className={navLinkClass}><FaFire />Dashboard</NavLink>
      <NavLink to="/userAttendance" className={navLinkClass}><FaUser /> My Attendance</NavLink>
      <NavLink to="/applyforleave" className={navLinkClass}><FaPen />Apply For Leave</NavLink>
      <NavLink to="/userLeaveApplications" className={navLinkClass}><FaBook />My Leave Applications</NavLink>
      <NavLink to="/my-performance" className={navLinkClass}><FaPiggyBank />My Performance</NavLink>
      <NavLink to="/userSalary" className={navLinkClass}><FaPiggyBank />My Salary</NavLink>
      <NavLink to="/reimbursements" className={navLinkClass}><FaFileInvoice />Expense Claims</NavLink>
      <NavLink to="/documents" className={navLinkClass}><FaFileAlt />Upload Documents</NavLink>
      <NavLink className={navLinkClass} to="/itDeclaration"><FaUsers />It Declaration</NavLink>
      <NavLink to="/my-documents" className={navLinkClass}><FaFileAlt />My Documents</NavLink>
      <NavLink to="/EmployeeForm16" className={navLinkClass}><FaFileAlt />Form16</NavLink>
      <NavLink className={navLinkClass} to="/employeeform24" ><FaUserTag />Form24Q</NavLink>
      <NavLink to="/HolidayCalendarView" className={navLinkClass}><FaCalendarAlt />Holiday Calendar</NavLink>
      <NavLink to="/view-announcements" className={navLinkClass}><FaBullhorn />Announcements</NavLink>
      <NavLink onClick={logout} to="#" className="flex items-center text-black hover:bg-[#F0F1FF] hover:text-[#211C84] gap-3 px-3 py-2 text-md rounded-md transition hover:no-underline"><FaSignOutAlt />Logout</NavLink>
    </nav>
  );
};

export default Employee;

