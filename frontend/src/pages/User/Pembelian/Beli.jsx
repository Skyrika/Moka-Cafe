import React from "react";
// Naik 3 tingkat: Pembelian -> User -> pages -> src, lalu masuk ke components/user/
import Header from "../../../components/user/Header/Header";
import CategoryPills from "../../../components/user/CategoryPills/CategoryPills";
import ProductCard from "../../../components/user/ProductCard/ProductCard";
import OrderSidebar from "../../../components/user/OrderSidebar/OrderSidebar";
import "./Beli.css";

// Penjelasan: Komponen utama halaman pembelian untuk pengguna.
export default function Beli() {
  const products = [
    {
      id: 1,
      title: "Espresso",
      price: "Rp 35.000",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
      isPopular: false,
    },
    {
      id: 2,
      title: "Signature Latte",
      price: "Rp 55.000",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213",
      isPopular: true,
    },
    {
      id: 3,
      title: "Butter Croissant",
      price: "Rp 40.000",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a",
      isPopular: false,
    },
    {
      id: 4,
      title: "Matcha Latte",
      price: "Rp 50.000",
      image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a",
      isPopular: false,
    },
  ];

  // Penjelasan: Menampilkan daftar produk dan sidebar pesanan pada halaman pembelian.
  return (
    <div className="beli-layout">
      <main className="beli-main">
        <div className="content-left">
          <Header />
          <CategoryPills />
          <div className="product-grid">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                isPopular={item.isPopular}
              />
            ))}
          </div>
        </div>

        <OrderSidebar />
      </main>
    </div>
  );
}