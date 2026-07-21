import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import CategoryPills from "../components/pos/CategoryPills";
import ProductCard from "../components/pos/ProductCard";
import OrderSummary from "../components/pos/OrderSummary";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Espresso",
    category: "Kopi",
    price: 35000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlfIX2n8kmW2lIgMEHXI_EUG-eujYIzpQygKNZANY-Fs8itjgkhTgxiHOxdo6yDkCETR-sRBx7rSKdCOsQoECkLDZD9P4D7RHQ7kmSQbgm4_KHo6h45orviFMcrd013aU4a3fmdLIb4CsVJrAyWSOe7KLnN2MqM64Q1f6sGPM1OxGer9yf7RfQ-X0fd1vScrL0B7x3LX-6fa45U-6-TXaWokV8JPfywG36CGJJTIN0GuN7xzH9wX4XADvH4bjflua1wXU-WBkyKq0",
  },
  {
    id: 2,
    name: "Signature Latte",
    category: "Kopi",
    price: 55000,
    isPopular: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm4GvVfZyYTcUNxtXzupG-cGkDfTeYD54PrX_wcAuqtnupz9QfzpdM9grvzBZnsMP5EMCw_4uwtLekinWRpGO1y_9TAdv8z5bZT31P1fDTl6Grja3MyoDGAKwnOKtaPKi7yveqqd9CjIUnIv7AXsLdcGq7EcnZKKNQX426lvyoKX0nn6V9RoGBt3U_X7-wNuHISx8gYSeA_i6g5nmSIufhb-EQfc6dOtR4j5yHKoN55pTD45L53zEmcmHQUgMeR0rCiAjd02K9EKA",
  },
  {
    id: 3,
    name: "Butter Croissant",
    category: "Kue",
    price: 40000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUg1OFcduX52ahoKIxBbiRO6AMdGC90Au_S4t-AYc80bYYx-U3ZQmjU11TJqTYq2By4E8W-qUZfngDVykdqv6H5NHYoRdaB9E21tF5SUOQCXOAJgUVvbOa75j_Em_9f-r1tGjg1cQ_65hR4xi_6Qra0aDWFSFpXqe49Y_kuz1I_c4Y1cbf1gl_M0uQgWEmWmrl796kkeVwzZ-2BIi4z_yAp2q9hP-jNR_BhSQuLudYuZXvAIf3P6ohMdAadrikYAHASMC2m8Ci_qo",
  },
  {
    id: 4,
    name: "Matcha Latte",
    category: "Teh",
    price: 50000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVUNCTvPzPL3fLFs4i5yRwm_utzlpj7kvLERcNbRDAmOWr1xeZx2ncNOxk1Q8zVdCbPYpvFzjebwp2Tf_12CE1h2T7st4wmQ2LaytN_UhNKxpMyEYVLaA2Fw7IYh2Ex6b5ziYp4ymGCvOdE_jKPE-RM7X9JTcIYLbRf8pme2vyYn2Xcns5-EbZQSJ7eux5ZPO9LDUnVRGJMMsOTTZBvFiUo_r_Bd0KoqnzQKwtWXhfgXDD2MnYtAPS5avoxc0FoBKWaURrmm57hRA",
  },
];

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Item");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([
    {
      id: 2,
      name: "Signature Latte",
      price: 55000,
      quantity: 2,
      note: "Es, Susu Oat",
    },
    {
      id: 3,
      name: "Butter Croissant",
      price: 40000,
      quantity: 1,
      note: "Dihangatkan",
    },
  ]);

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          note: "-",
        },
      ];
    });
  };

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCat =
      selectedCategory === "Semua Item" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-background text-on-surface w-full h-screen overflow-hidden flex font-body">
      {/* Sidebar Navigasi */}
      <Sidebar />

      {/* Konten Utama */}
      <main className="ml-64 flex-1 flex h-full bg-background overflow-hidden">
        {/* Area Produk & Header */}
        <div className="flex-1 flex flex-col border-r border-outline-variant bg-surface-bright overflow-hidden">
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryPills
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 content-start">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Panel Ringkasan Pesanan */}
        <OrderSummary cart={cart} onUpdateQuantity={handleUpdateQuantity} />
      </main>
    </div>
  );
}