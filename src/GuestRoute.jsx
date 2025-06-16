import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GuestRoute = () => {
  const { isAuth } = useSelector((state) => state.authSlice);
  const location = useLocation();

  return !isAuth ? (
    <Outlet />  // render nested routes here
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export default GuestRoute;
