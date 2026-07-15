import express from 'express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().catch((error) => {
  console.error('Database connection placeholder failed:', error.message);
});

app.get('/', (_req, res) => {
  res.json({ message: 'Moka Cafe API is running' });
});

app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

export default app;
