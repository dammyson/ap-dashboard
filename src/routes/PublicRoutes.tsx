import { Outlet, Navigate } from 'react-router-dom';

interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoutes: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to='/dashboard' replace /> : <Outlet />;
};

export default PublicRoutes;
