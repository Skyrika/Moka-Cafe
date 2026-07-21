/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

// Penjelasan: Membuat context autentikasi agar data login dapat diakses di seluruh aplikasi.
export const AuthContext = createContext(null);

const STORAGE_KEY = "moka_auth_user";

// Penjelasan: Provider ini menyimpan state autentikasi dan membagikannya ke komponen lain.
export const AuthProvider = ({ children }) => {
  // Penjelasan: State ini menyimpan data pengguna yang sedang login.
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Penjelasan: Menjalankan proses saat state user berubah untuk menyimpan sesi.
  useEffect(() => {
    try {
      if (user) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  }, [user]);

  // Penjelasan: Fungsi ini bertugas menyimpan data login ke state aplikasi.
  const login = (userData) => {
    setUser(userData);
  };

  // Penjelasan: Fungsi ini bertugas menghapus data login saat pengguna keluar.
  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === "admin";

  return (
    // Penjelasan: Provider ini membagikan data autentikasi ke seluruh komponen anak.
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};