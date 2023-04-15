import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

