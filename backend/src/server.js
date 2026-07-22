// Mengimpor modul Express dan konfigurasi yang diperlukan.
import express from "express";
import path from "path";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import { connectDB } from "./config/database.js";
import { initDatabase } from "./config/initDatabase.js";

// Membuat instance aplikasi Express.
const app = express();
const PORT = process.env.PORT || 5050;

// Middleware global: mengizinkan CORS dan parsing JSON.
app.use(cors());
app.use(express.json());

// Menyediakan folder uploads agar gambar dapat diakses melalui browser.
app.use("/uploads", express.static(path.resolve("uploads")));

// Menghubungkan ke PostgreSQL dan menjalankan inisialisasi database.
connectDB()
  .then(async () => {
    console.log("Database siap digunakan.");
    await initDatabase();
  })
  .catch((error) => {
    console.error("Koneksi PostgreSQL gagal:", error.message);
  });

// Route utama untuk mengecek status server.
app.get("/", (_req, res) => {
  res.json({ message: "Moka Cafe API is running" });
});

// Mendaftarkan route untuk setiap modul API.
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", authRoutes);
app.use("/api", settingsRoutes);

// Menjalankan server pada port yang ditentukan.
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;