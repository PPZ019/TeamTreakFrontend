import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LeaderRoute = () => {
    const { user } = useSelector((state) => state.authSlice);
    return user && (user.type === 'Client' || user.type === 'Employee')
      ? <Outlet />
      : <Navigate to="/" replace />;
  };
  
  export default LeaderRoute;