import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Usage examples:
// 1) In route element: <Route path="/admin" element={<ProtectedRoute><AdminPage/></ProtectedRoute>} />
// 2) With role prop: <ProtectedRoute requiredRole="admin">...</ProtectedRoute>

const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    // not logged in -> redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // logged in but wrong role -> redirect to home or show message
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
