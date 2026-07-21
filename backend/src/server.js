import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import { connectDB } from './config/database.js';
import { initDatabase } from './config/initDatabase.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

connectDB()
  .then(async () => {
    console.log('Database siap digunakan.');
    await initDatabase();
  })
  .catch((error) => {
    console.error('Koneksi PostgreSQL gagal:', error.message);
  });

app.get('/', (_req, res) => {
  res.json({ message: 'Moka Cafe API is running' });
});

app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', settingsRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;
