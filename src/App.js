import { Navigate, Routes, Route } from 'react-router-dom'
import Forgot from './pages/auth/Forgot'
import Home from './pages/Home'
import Invoice from './pages/Invoice'
import InvoiceCreate from './components/Invoice/InvoiceCreate'
import InvoiceRead from './components/Invoice/InvoiceRead'
import InvoiceRecord from './components/Invoice/InvoiceRecord'
import InvoiceUpdate from './components/Invoice/InvoiceUpdate'
import { useSelector } from 'react-redux';
import ChatPage from "./pages/ChatPages";
import { Outlet } from 'react-router-dom';
import GuestRoute from "./GuestRoute"
import SalarySetup from './pages/Salary/salarySetup'
import Announcement from "../src/pages/Announcement"
import RolePermission from '../src/pages/RolesPermissions'
import ViewAnnouncement from "../src/pages/ViewAnnouncement"
import Performance from "../src/pages/Performance"
import MyPerformance from "../src/pages/MyPerformance"
import '@popperjs/core';
import './App.css';
import Loading from './components/Loading';
import MainLayout from './layout/MainLayout'
import { useAutoLogin } from './hooks/useAutoLogin';
import Employees from './pages/employee/Employees';
import Admins from './pages/admin/Admins';
import Teams from './pages/team/Teams';
import AddUser from './pages/user/AddUser';
import AddUsers from './pages/user/AddUsers';
import AddTeam from './pages/team/AddTeam';
import Employee from './pages/employee/Employee';
import Team from './pages/team/team/Team';
import EditUser from './pages/user/EditUser';
import EditTeam from './pages/team/EditTeam';
import Admin from './pages/admin/Admin';
import './App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/components.css';
import Leaders from './pages/leader/Leaders';
import Members from './pages/leaderpage/Members';
import UserTeams from './components/Employees/UserTeams';
import Attendance from './components/Employees/Attendance';
import LeaveApplications from './components/Employees/LeaveApplications';
import Salary from './components/Employees/Salary';
import UploadDocument from './components/Employees/UploadDocument';
import MyDocument from './components/Employees/MyDocument';
import ApplyForLeave from './components/Employees/ApplyForLeave';
import EmployeeTeam from './pages/team/team/EmployeeTeam';
import LeaveApplication from './components/Employees/LeaveApplication';
import DashboardEmployee from './components/DashboardEmployee';
import AttendanceView from './components/Admin/AttendanceView';
import LeaveView from './components/Admin/LeaveView';
import Leave from './components/Admin/Leave';
import AssignSalary from './components/Admin/AssignSalary';
import Salaries from './components/Admin/Salaries';
import SalaryView from './components/Admin/Salary';
import ProtectedRoute from './ProtectedRoute'
import LeaderRoute from './LeaderRoute'
import EmployeeRoute from './EmployeeRoute'
import Template from './components/login/template'
import Company from '../src/components/Admin/companies/CompanyPage'
import Holiday from '../src/components/Admin/holidays/HolidayCalendar'
import HolidayCalendarView from '../src/components/Admin/holidays/HolidayCalendarView'
// import ChatPage from './pages/ChatPage'


const App = () => {
  const loading = useAutoLogin();

  return loading ?
    <Loading /> : (
      <>

        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/invoices" element={<Invoice />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/invoices/create" element={<InvoiceCreate />} />
              <Route path="/invoices/read/:id" element={<InvoiceRead />} />
              <Route path="/invoices/payment/:id" element={<InvoiceRecord />} />
              <Route path="/invoices/edit/:id" element={<InvoiceUpdate />} />
              {/* HRMS */}
              <Route path="/employees" element={<Employees />} />
              <Route path="/salary-structure" element={<SalarySetup />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/admins" element={<Admins />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/employees" element={<Employees />} />

              <Route path="/attendance" element={<AttendanceView />} />
              <Route path="/leaves" element={<LeaveView />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/assignSalary" element={<AssignSalary />} />
              <Route path="/salaries" element={<Salaries />} />
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/addusers" element={<AddUsers />} />
              <Route path="/leaves" element={<LeaveView />} />

              <Route path="/addteam" element={<AddTeam />} />
              <Route path="/company" element={<Company />} />
              <Route path="/holiday" element={<Holiday />} />
              <Route path="/HolidayCalendarView" element={<HolidayCalendarView />} />
              <Route path="/RolePermission" element={<RolePermission />} />
              <Route path="/leaves/:id" element={<Leave />} />


              <Route path="/view-announcements" element={<ViewAnnouncement />} />
              <Route path="/userAttendance" element={<Attendance />} />
    <Route path="/applyforleave" element={<ApplyForLeave />} />
    <Route path="/userLeaveApplications" element={<LeaveApplications />} />
    <Route path="/userLeaveApplications/:id" element={<LeaveApplication />} />
    <Route path="/userSalary" element={<Salary />} />
    <Route path="/invoices/read/:id" element={<InvoiceRead />} />


              <Route path="/contact" element={<div>Contact Us Page</div>} />
              <Route path="/about" element={<div>About Us Page</div>} />
            </Route>
          </Route>

          <Route element={<EmployeeRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/userTeams" element={<UserTeams />} />
              <Route path="/userteam/:id" element={<EmployeeTeam />} />
              <Route path="/view-announcements" element={<ViewAnnouncement />} />
              <Route path="/dashboardEmployee" element={<DashboardEmployee />} />
              <Route path="/invoices/read/:id" element={<InvoiceRead />} />
              <Route path="/invoices/payment/:id" element={<InvoiceRecord />} />
              <Route path="/my-performance" element={<MyPerformance />} />
              <Route path="/HolidayCalendarView" element={<HolidayCalendarView />} />
  


              <Route path="/userAttendance" element={<Attendance />} />
              <Route path="/applyforleave" element={<ApplyForLeave />} />
              <Route path="/userSalary" element={<Salary />} />
               <Route path="/documents" element={<UploadDocument />} />
               <Route path="/my-documents" element={<MyDocument />} />
              <Route path="/userLeaveApplications" element={<LeaveApplications />} />
              <Route path="/userLeaveApplications/:id" element={<LeaveApplication />} />
            </Route>

            {/* <Route path="/employees" element={<AdminRoute><Employees /></AdminRoute>} /> */}
           

          </Route>
          <Route element={<AdminRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/admins" element={<Admins />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/attendance" element={<AttendanceView />} />
              <Route path="/salary-structure" element={<SalarySetup />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/announcement" element={<Announcement />} />
              <Route path="/RolePermission" element={<RolePermission />} />
                <Route path="/leaves" element={<LeaveView />} />
              <Route path="/performance" element={<Performance />} />

                <Route path="/assignSalary" element={<AssignSalary />} />
                <Route path="/salaries" element={<Salaries />} />
                <Route path="/leaves/:id" element={<Leave />} />
                <Route path="/salary/:id" element={<SalaryView />} />
                <Route path="/addteam" element={<AddTeam />} />
                <Route path="/employee/:id" element={<Employee />} />
                <Route path="/team/:id" element={<Team />} />
                <Route path="/edituser/:id" element={<EditUser />} />
                <Route path="/editteam/:id" element={<EditTeam />} />
                <Route path="/admin/:id" element={<Admin />} />
                <Route path="/leaders" element={<Leaders />} />
              </Route>
            </Route>

            <Route element={<LeaderRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/members" element={<Members />} />
                
                
              </Route>
            </Route>
          <Route element={<GuestRoute />}>
            <Route path="/" element={<Template />} />
            <Route path="/login" element={<Template />} />
            <Route path="/forgot" element={<Forgot />} />

          </Route>
          <Route element={<FounderRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/founder-dashboard" element={<div>Founder Dashboard</div>} />
              {/* Add more founder-specific routes here */}
            </Route>
          </Route>

          <Route element={<CEORoute />}>
            <Route element={<MainLayout />}>
              <Route path="/ceo-dashboard" element={<div>CEO Dashboard</div>} />
            </Route>
          </Route>

          <Route element={<VPRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/vp-dashboard" element={<div>VP Dashboard</div>} />
            </Route>
          </Route>

          <Route element={<ManagerRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/manager-dashboard" element={<div>Manager Dashboard</div>} />
            </Route>
          </Route>

          <Route element={<TeamLeaderRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/teamleader-dashboard" element={<div>Team Leader Dashboard</div>} />
            </Route>
          </Route>
        </Routes>
      </>
    )
}

const AdminRoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  if (!user || !(user.type === 'Admin' || user.type === 'Leader')) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};


// const LeaderRoute = () => {
//   const { user } = useSelector((state) => state.authSlice);
//   return user && (user.type === 'Leader' || user.type === 'Employee')
//     ? <Outlet />
//     : <Navigate to="/" replace />;
// };


const CEORoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'CEO' ? <Outlet /> : <Navigate to="/" replace />;
};

const VPRoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'VP' ? <Outlet /> : <Navigate to="/" replace />;
};

const ManagerRoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'Manager' ? <Outlet /> : <Navigate to="/" replace />;
};

const TeamLeaderRoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'TeamLeader' ? <Outlet /> : <Navigate to="/" replace />;
};

const FounderRoute = () => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'Founder' ? <Outlet /> : <Navigate to="/" replace />;
};


export default App;