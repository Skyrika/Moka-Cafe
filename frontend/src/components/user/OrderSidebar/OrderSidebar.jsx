import React, { useEffect, useState } from "react";
import { FaReceipt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import "./OrderSidebar.css";

export default function OrderSidebar({ orderItems: propOrderItems, setOrderItems: propSetOrderItems }) {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: "Espresso", price: 18000, quantity: 1 },
    { id: 2, name: "Brownies", price: 22000, quantity: 1 },
  ]);
  const [taxRate, setTaxRate] = useState(8);
  const [taxInclusive, setTaxInclusive] = useState(false);

  const useOrderItems = propOrderItems ?? orderItems;
  const useSetOrderItems = propSetOrderItems ?? setOrderItems;

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const result = await response.json();

        if (result.success) {
          setTaxRate(Number(result.data.taxRate ?? 8));
          setTaxInclusive(Boolean(result.data.taxInclusive));
        }
      } catch (error) {
        console.error("Gagal memuat pengaturan pajak:", error);
      }
    };

    fetchSettings();
  }, []);

  const updateQty = (id, delta) => {
    useSetOrderItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = useOrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = taxInclusive
    ? Math.round(subtotal - subtotal / (1 + taxRate / 100))
    : Math.round(subtotal * (taxRate / 100));
  const total = taxInclusive ? subtotal : subtotal + tax;

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: useOrderItems.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity })),
          totalAmount: total,
          paidAmount: total,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Pesanan berhasil disimpan: ${data.data.orderId}`);
        useSetOrderItems([]);
      } else {
        alert(data.message || "Checkout gagal");
      }
    } catch (error) {
      alert("Tidak dapat menghubungkan ke backend");
    }
  };

  return (
    <aside className="sidebar-order">
      <header className="sidebar-header">
        <div className="sidebar-title-box">
          <FaReceipt />
          <h3>Pesanan Saat Ini</h3>
        </div>
        <span className="order-number">#1042</span>
      </header>

      <div className="order-items-list">
        {useOrderItems.length === 0 ? (
          <p>Belum ada item.</p>
        ) : (
          useOrderItems.map((item) => (
            <div key={item.id} className="order-item-card">
              <div className="order-item-details">
                <div className="order-item-top">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">Rp {item.price.toLocaleString("id-ID")}</span>
                </div>
                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>
                    <FaMinus />
                  </button>
                  <span className="qty-count">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="summary-row">
          <span>Pajak ({taxRate}%)</span>
          <span>Rp {tax.toLocaleString("id-ID")}</span>
        </div>
        <div className="summary-divider"></div>
        <div className="total-row">
          <span className="total-label">Total</span>
          <span className="total-amount">Rp {total.toLocaleString("id-ID")}</span>
        </div>

        <span className="payment-label">Pilih Metode Pembayaran</span>
        <PaymentMethods />

        <button className="pay-now-btn" onClick={handleCheckout}>
          <span>Bayar Sekarang</span>
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
}