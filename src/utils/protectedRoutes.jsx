import { Navigate } from 'react-router-dom';

const ProtectedRouteByRole = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem('role'); 

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-found" replace />;
  }

  return children;
};

export default ProtectedRouteByRole;
