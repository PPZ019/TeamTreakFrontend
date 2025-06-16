import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const EmployeeRoute = () => {
  const { isAuth, user } = useSelector((state) => state.authSlice);

  if (!isAuth || !(user?.type === 'Employee' || user?.type === 'Leader')) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default EmployeeRoute;
