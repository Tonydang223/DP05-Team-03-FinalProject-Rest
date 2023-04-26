import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice/userSlice';

export default function ProtectedRoute({ children, role }) {
  const { isAuth } = useSelector((state) => state.auth);
  // const { userRole } = useSelector((state) => state.auth.user.role);
  // console.log('🚀 ~ file: protectedRoute.route.jsx:33 ~ ProtectedRoute ~ userRole:', userRole);
  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');
  if (accessToken && role === userRole) {
    return <Outlet />;
  }
  if (accessToken && role !== userRole) {
    if (userRole === 'Admin') {
      return <Navigate to='/dashboard' />;
    }
    if (userRole === 'Manager') {
      return <Navigate to='/dashboard' />;
    }
    if (userRole === 'Staff') {
      return <Navigate to='/dashboard' />;
    }
  }

  if (!accessToken) {
    dispatch(logout());
  }

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
