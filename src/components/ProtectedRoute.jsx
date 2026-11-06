import { Navigate } from "react-router-dom";
import { getRole } from "../utils/getRole";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = getRole();
  if (!token || !userRole) return <Navigate to="/" replace />;
  if (role && userRole !== role) return <Navigate to="/dashboard" replace />;
  return children;
};

export default ProtectedRoute;
