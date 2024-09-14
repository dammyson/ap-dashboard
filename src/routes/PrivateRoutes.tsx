import React, { useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.pathname, { replace: true });
    } else {
      toast.warning('Your token is invalid or expired. Kindly login');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return isAuthenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to='/' state={{ from: location }} replace />
    </>
  );
};

export default ProtectedRoutes;
