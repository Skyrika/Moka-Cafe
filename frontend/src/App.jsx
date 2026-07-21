import { BrowserRouter, Routes, Route } from "react-router-dom";
import Penjualan from "./pages/Admin/Penjualan/Penjualan";
import Login from "./pages/Login";
import Beli from "./pages/User/Pembelian/Beli";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          <Route path="/beli" element={<Beli />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;