import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/store';

const ProtectedRoute = () => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  if (token === undefined || user === undefined) {
    return <div>Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to='/' replace state={{ from: location }} />;
};

export default ProtectedRoute;
