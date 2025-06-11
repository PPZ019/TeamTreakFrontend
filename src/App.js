
import {Navigate,Routes,Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Home from './pages/Home'
import Invoice from './pages/Invoice'
import InvoiceCreate from './components/Invoice/InvoiceCreate'
import InvoiceRead from './components/Invoice/InvoiceRead'
import InvoiceRecord from './components/Invoice/InvoiceRecord'
import InvoiceUpdate from './components/Invoice/InvoiceUpdate'
import {useSelector} from 'react-redux';
import '@popperjs/core';
import './App.css';
import Loading from './components/Loading';
import MainLayout from './layout/MainLayout'
import { useAutoLogin } from './hooks/useAutoLogin';
import Employees from './pages/employee/Employees';
import Admins from './pages/admin/Admins';
import Teams from './pages/team/Teams';
import AddUser from './pages/user/AddUser';
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
import SideBar from './components/sidebar';
import Navigation from './components/navigation';
import Members from './pages/leaderpage/Members';
import UserTeams from './components/Employees/UserTeams';
import Attendance from './components/Employees/Attendance';
import LeaveApplications from './components/Employees/LeaveApplications';
import Salary from './components/Employees/Salary';
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
import Template from './components/login/template'



// import './assets/css/asdfasdf';
// import './assets/css/asdfasdf';

const App = () =>
{
  const loading = useAutoLogin();

  return loading ? 
  <Loading/> : (
    <Routes>
      <Route element={<ProtectedRoute />}>
    <Route element={<MainLayout />}>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/invoices" element={<Invoice />} />
      <Route path="/invoices/create" element={<InvoiceCreate />} />
      <Route path="/invoices/read/:id" element={<InvoiceRead />} />
      <Route path="/invoices/payment/:id" element={<InvoiceRecord />} />
      <Route path="/invoices/edit/:id" element={<InvoiceUpdate />} />
      <Route path="/payments" element={<div>Payments Page</div>} />
      <Route path="/customers" element={<div>Customers Page</div>} />
      <Route path="/peoples" element={<div>Peoples Page</div>} />
      <Route path="/companies" element={<div>Companies Page</div>} />
      <Route path="/leads" element={<div>Leads Page</div>} />
      <Route path="/quotes-leads" element={<div>Quotes Leads Page</div>} />
      <Route path="/products" element={<div>Products Page</div>} />
      <Route path="/product-category" element={<div>Product Category Page</div>} />
      <Route path="/expenses" element={<div>Expenses Page</div>} />
      <Route path="/expense-category" element={<div>Expenses Category Page</div>} />
      <Route path="/report" element={<div>Report Page</div>} />
      <Route path="/quotes-customers" element={<div>Quotes For Customers Page</div>} />
      
      {/* HRMS */}
      <Route path="/employees" element={<Employees />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/admins" element={<Admins />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/attendance" element={<AttendanceView />} />
      <Route path="/leaves" element={<LeaveView />} />
      <Route path="/assignSalary" element={<AssignSalary />} />
      <Route path="/salaries" element={<Salaries />} />
      <Route path="/adduser" element={<AddUser />} />
      <Route path="/addteam" element={<AddTeam />} />
      <Route path="/contact" element={<div>Contact Us Page</div>} />
      <Route path="/about" element={<div>About Us Page</div>} />
      <Route path="/logout" element={<div>Logout Page</div>} />
    </Route>
  </Route>


  <Route path="/userTeams" element={<EmployeeRoute><UserTeams /></EmployeeRoute>} />
  <Route path="/userteam/:id" element={<EmployeeRoute><EmployeeTeam /></EmployeeRoute>} />
  <Route path="/dashboardEmployee" element={<EmployeeRoute><DashboardEmployee /></EmployeeRoute>} />
  <Route path="/userAttendance" element={<EmployeeRoute><Attendance /></EmployeeRoute>} />
  <Route path="/applyforleave" element={<EmployeeRoute><ApplyForLeave /></EmployeeRoute>} />
  <Route path="/userSalary" element={<EmployeeRoute><Salary /></EmployeeRoute>} />
  <Route path="/userLeaveApplications" element={<EmployeeRoute><LeaveApplications /></EmployeeRoute>} />
  <Route path="/userLeaveApplications/:id" element={<EmployeeRoute><LeaveApplication /></EmployeeRoute>} />

  <Route path="/" element={<GuestRoute><Template /></GuestRoute>} />
  <Route path="/login" element={<GuestRoute><Template /></GuestRoute>} />
  <Route path="/forgot" element={<GuestRoute><Forgot /></GuestRoute>} />

  
  <Route path="/employees" element={<AdminRoute><Employees /></AdminRoute>} />
  <Route path="/admins" element={<AdminRoute><Admins /></AdminRoute>} />
  <Route path="/teams" element={<AdminRoute><Teams /></AdminRoute>} />
  <Route path="/adduser" element={<AdminRoute><AddUser /></AdminRoute>} />
  <Route path="/attendance" element={<AdminRoute><AttendanceView /></AdminRoute>} />
  <Route path="/leaves" element={<AdminRoute><LeaveView /></AdminRoute>} />
  <Route path="/assignSalary" element={<AdminRoute><AssignSalary /></AdminRoute>} />
  <Route path="/salaries" element={<AdminRoute><Salaries /></AdminRoute>} />
  <Route path="/leaves/:id" element={<AdminRoute><Leave /></AdminRoute>} />
  <Route path="/salary/:id" element={<AdminRoute><SalaryView /></AdminRoute>} />
  <Route path="/addteam" element={<AdminRoute><AddTeam /></AdminRoute>} />
  <Route path="/employee/:id" element={<AdminRoute><Employee /></AdminRoute>} />
  <Route path="/team/:id" element={<AdminRoute><Team /></AdminRoute>} />
  <Route path="/edituser/:id" element={<AdminRoute><EditUser /></AdminRoute>} />
  <Route path="/editteam/:id" element={<AdminRoute><EditTeam /></AdminRoute>} />
  <Route path="/admin/:id" element={<AdminRoute><Admin /></AdminRoute>} />
  <Route path="/leaders" element={<AdminRoute><Leaders /></AdminRoute>} />

  <Route path="/members" element={<LeaderRoute><Members /></LeaderRoute>} />
</Routes>

  )
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.authSlice);
  return !isAuth ? children : <Navigate to="/" />;
};

// const ProtectedRoute = ({children,...rest}) =>
//   {
//     const {isAuth} = useSelector((state)=>state.authSlice);
//     return (
//       <Route {...rest} render={({location})=>{
//         return isAuth ? (
//           <>
//             <MainLayout>{children}</MainLayout>
//             {children}
//           </>) : (
//           <Navigate
//             to={{
//               pathname:'/',
//               state:{
//                 from:location
//               }
//             }}
//           />
//         );
//       }} />
//     );
//   }


const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'Admin' ? children : <Navigate to="/" />;
};

const LeaderRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  return user && user.type === 'Leader' ? children : <Navigate to="/" />;
};

const EmployeeRoute = ({ children }) => {
  const { user } = useSelector((state) => state.authSlice);
  return user && (user.type === 'Employee' || user.type === 'Leader') ? children : <Navigate to="/" />;
};

const AdminLeaderRouter = ({children,...rest}) =>
  {
    const {user} = useSelector((state)=>state.authSlice);
    return (
      <Route {...rest} render={({location})=>{
        return user && (user.type==='Admin' || user.type==='Leader') ? (
          <>
            <SideBar/>
            <Navigation/>
            {children}
          </>) : (
          <Navigate
            to={{
              pathname:'/',
              state:{
                from:location
              }
            }}
          />
        );
      }} />
    );
  }

export default App;