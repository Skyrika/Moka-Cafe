// Penjelasan: Mengimpor React Router untuk mengatur perpindahan halaman.
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Penjualan from "./pages/Admin/Penjualan/Penjualan";
import Inventaris from "./pages/Admin/Inventaris/Inventaris";
import Pesanan from "./pages/Admin/Pesanan/Pesanan";
import Pengaturan from "./pages/Admin/Pengaturan/Pengaturan";
import Beli from "./pages/User/Pembelian/Beli";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

// Penjelasan: Komponen utama aplikasi yang menyiapkan provider dan routing.
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Penjelasan: Menentukan rute halaman sesuai URL yang diakses. */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

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

          {/* User */}
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