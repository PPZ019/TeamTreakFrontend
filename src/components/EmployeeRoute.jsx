import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const EmployeeRoute = () => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === "employee" ? <Outlet /> : <Navigate to="/home" />;
};

export default EmployeeRoute;
