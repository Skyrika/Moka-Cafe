import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Komponen pembungkus yang memeriksa autentikasi dan role sebelum mengizinkan akses ke halaman.
const ProtectedRoute = ({ children, requiredRole = "admin" }) => {
  // Mengambil status autentikasi dan data user dari context.
  const { isAuthenticated, user } = useContext(AuthContext);

  // Jika belum login, arahkan ke halaman login.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai, arahkan ke halaman utama.
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // Jika lolos semua pemeriksaan, tampilkan konten yang dilindungi.
  return children;
};

export default ProtectedRoute;
