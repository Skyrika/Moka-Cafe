import { BrowserRouter, Routes, Route } from "react-router-dom";

// Mengimpor halaman-halaman aplikasi.
import Login from "./pages/Login";
import Penjualan from "./pages/Admin/Penjualan/Penjualan";
import Inventaris from "./pages/Admin/Inventaris/Inventaris";
import Pesanan from "./pages/Admin/Pesanan/Pesanan";
import Pengaturan from "./pages/Admin/Pengaturan/Pengaturan";
import Beli from "./pages/User/Pembelian/Beli";

// Mengimpor context autentikasi dan komponen pelindung route.
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Komponen utama aplikasi yang mengatur routing dan context provider.
function App() {
  return (
    // Membungkus seluruh aplikasi dengan provider autentikasi.
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publik: halaman pembelian untuk pengguna */}
          <Route path="/" element={<Beli />} />
          <Route path="/login" element={<Login />} />

          {/* Route admin: hanya bisa diakses oleh user dengan role admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Penjualan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inventaris"
            element={
              <ProtectedRoute requiredRole="admin">
                <Inventaris />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pesanan"
            element={
              <ProtectedRoute requiredRole="admin">
                <Pesanan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/pengaturan"
            element={
              <ProtectedRoute requiredRole="admin">
                <Pengaturan />
              </ProtectedRoute>
            }
          />

          {/* Route user: hanya bisa diakses oleh user dengan role user */}
          <Route
            path="/beli"
            element={
              <ProtectedRoute requiredRole="user">
                <Beli />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
