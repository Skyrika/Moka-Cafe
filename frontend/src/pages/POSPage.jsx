import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import CategoryPills from '../components/pos/CategoryPills';
import ProductCard from '../components/pos/ProductCard';
import OrderSummary from '../components/pos/OrderSummary';

const categories = ["Semua Item", "Kopi", "Teh", "Kue", "Brunch", "Barang"];

const productsData = [
  {
    id: 1,
    name: "Espresso",
    price: 35000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlfIX2n8kmW2lIgMEHXI_EUG-eujYIzpQygKNZANY-Fs8itjgkhTgxiHOxdo6yDkCETR-sRBx7rSKdCOsQoECkLDZD9P4D7RHQ7kmSQbgm4_KHo6h45orviFMcrd013aU4a3fmdLIb4CsVJrAyWSOe7KLnN2MqM64Q1f6sGPM1OxGer9yf7RfQ-X0fd1vScrL0B7x3LX-6fa45U-6-TXaWokV8JPfywG36CGJJTIN0GuN7xzH9wX4XADvH4bjflua1wXU-WBkyKq0",
    isPopular: false,
  },
  {
    id: 2,
    name: "Signature Latte",
    price: 55000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm4GvVfZyYTcUNxtXzupG-cGkDfTeYD54PrX_wcAuqtnupz9QfzpdM9grvzBZnsMP5EMCw_4uwtLekinWRpGO1y_9TAdv8z5bZT31P1fDTl6Grja3MyoDGAKwnOKtaPKi7yveqqd9CjIUnIv7AXsLdcGq7EcnZKKNQX426lvyoKX0nn6V9RoGBt3U_X7-wNuHISx8gYSeA_i6g5nmSIufhb-EQfc6dOtR4j5yHKoN55pTD45L53zEmcmHQUgMeR0rCiAjd02K9EKA",
    isPopular: true,
  },
  {
    id: 3,
    name: "Butter Croissant",
    price: 40000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUg1OFcduX52ahoKIxBbiRO6AMdGC90Au_S4t-AYc80bYYx-U3ZQmjU11TJqTYq2By4E8W-qUZfngDVykdqv6H5NHYoRdaB9E21tF5SUOQCXOAJgUVvbOa75j_Em_9f-r1tGjg1cQ_65hR4xi_6Qra0aDWFSFpXqe49Y_kuz1I_c4Y1cbf1gl_M0uQgWEmWmrl796kkeVwzZ-2BIi4z_yAp2q9hP-jNR_BhSQuLudYuZXvAIf3P6ohMdAadrikYAHASMC2m8Ci_qo",
    isPopular: false,
  },
  {
    id: 4,
    name: "Matcha Latte",
    price: 50000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVUNCTvPzPL3fLFs4i5yRwm_utzlpj7kvLERcNbRDAmOWr1xeZx2ncNOxk1Q8zVdCbPYpvFzjebwp2Tf_12CE1h2T7st4wmQ2LaytN_UhNKxpMyEYVLaA2Fw7IYh2Ex6b5ziYp4ymGCvOdE_jKPE-RM7X9JTcIYLbRf8pme2vyYn2Xcns5-EbZQSJ7eux5ZPO9LDUnVRGJMMsOTTZBvFiUo_r_Bd0KoqnzQKwtWXhfgXDD2MnYtAPS5avoxc0FoBKWaURrmm57hRA",
    isPopular: false,
  },
];

const orderItemsData = [
  { name: "Signature Latte", price: 110000, notes: "Es, Susu Oat", quantity: 2 },
  { name: "Butter Croissant", price: 40000, notes: "Dihangatkan", quantity: 1 },
];

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua Item");

  return (
    <div className="bg-background text-on-surface w-[1920px] h-[1080px] overflow-hidden flex font-body-md mx-auto relative">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-[360px] flex-grow flex h-full bg-background relative overflow-hidden w-[calc(1920px-360px)]">
        <div className="flex-grow flex flex-col w-[calc(100%-540px)] border-r border-outline-variant bg-surface-bright">
          {/* Header Component */}
          <Header title="Menu" />

          {/* Category Filter Component */}
          <CategoryPills 
            categories={categories} 
            activeCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />

          {/* Product Grid */}
          <div className="flex-grow overflow-y-auto p-lg grid grid-cols-4 gap-lg content-start">
            {productsData.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Order Summary Component */}
        <OrderSummary 
          orderId="1042"
          items={orderItemsData}
          subtotal={150000}
          tax={12000}
          total={162000}
        />
      </main>
    </div>
  );
}