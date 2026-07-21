// Penjelasan: Mengimpor React Router untuk mengatur perpindahan halaman.
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Penjualan from "./pages/Admin/Penjualan/Penjualan";
import Login from "./pages/Login";
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
          {/* Login */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <Penjualan />
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