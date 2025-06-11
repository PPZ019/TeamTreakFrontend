import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuth } = useSelector((state) => state.authSlice);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // 🔥 Only this
};

export default ProtectedRoute;
