-- Tabel untuk menyimpan data produk (menu) kafe.
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'Umum',
  price INTEGER NOT NULL,
  stock INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Mencegah stok produk menjadi negatif di level database.
ALTER TABLE products DROP CONSTRAINT IF EXISTS stock_non_negative;
ALTER TABLE products ADD CONSTRAINT stock_non_negative CHECK (stock >= 0);

-- Tabel untuk menyimpan riwayat pesanan dengan items dalam format JSONB.
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  paid_amount INTEGER NOT NULL,
  change_amount INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk menyimpan pengaturan sistem (key-value store).
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(50) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menyisipkan pengaturan default pajak.
INSERT INTO settings (key, value) VALUES
  ('tax_rate', '11'),
  ('tax_inclusive', 'false')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Tabel untuk menyimpan data pengguna (admin dan user biasa).
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data awal produk (seed).
INSERT INTO products (name, category, price, stock, image_url) VALUES
  ('Espresso', 'Kopi', 18000, 25, 'https://images.unsplash.com/photo-1510627498534-cf7e9002facc'),
  ('Cappuccino', 'Kopi', 25000, 15, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'),
  ('Moka Latte', 'Kopi', 30000, 20, 'https://images.unsplash.com/photo-1511920170033-f8396924c348'),
  ('Brownies', 'Kue', 22000, 10, 'https://images.unsplash.com/photo-1551024734-6b6f5c63b24c')
ON CONFLICT DO NOTHING;

-- Data awal pengguna (seed) untuk login demo.
INSERT INTO users (username, password, role) VALUES
  ('admin', '123', 'admin'),
  ('user', '123', 'user')
ON CONFLICT (username) DO UPDATE SET password = EXCLUDED.password, role = EXCLUDED.role;
