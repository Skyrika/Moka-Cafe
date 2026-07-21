import { useEffect, useState, useMemo } from "react";
import { FaReceipt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import "./OrderSidebar.css";

// Sidebar pesanan untuk halaman user — menampilkan item, mengatur quantity, menghitung total, dan checkout.
export default function OrderSidebar({ orderItems: propOrderItems, setOrderItems: propSetOrderItems, productStockMap = {} }) {
  const [orderItems, setOrderItems] = useState([]);
  const [taxRate, setTaxRate] = useState(8);
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeItems = propOrderItems ?? orderItems;
  const setActiveItems = propSetOrderItems ?? setOrderItems;

  // Mengambil pengaturan pajak dari backend saat komponen dirender.
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

  // Memvalidasi stok frontend — memeriksa apakah quantity melebihi stok tersedia.
  const stockErrors = useMemo(() => {
    const errors = {};
    for (const item of activeItems) {
      const available = productStockMap[item.id];
      if (available !== undefined && item.quantity > available) {
        errors[item.id] = `Stok ${item.name} hanya tersedia ${available}`;
      }
    }
    return errors;
  }, [activeItems, productStockMap]);

  const hasStockErrors = Object.keys(stockErrors).length > 0;
  const isCheckoutDisabled = isSubmitting || activeItems.length === 0 || hasStockErrors;

  // Menambah atau mengurangi quantity item dalam pesanan.
  const updateQty = (id, delta) => {
    setActiveItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Menghitung subtotal, pajak, dan total berdasarkan pengaturan pajak.
  const subtotal = activeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = taxInclusive
    ? Math.round(subtotal - subtotal / (1 + taxRate / 100))
    : Math.round(subtotal * (taxRate / 100));
  const total = taxInclusive ? subtotal : subtotal + tax;

  // Mengirim pesanan ke backend (checkout).
  const handleCheckout = async () => {
    setCheckoutError("");

    // Validasi stok sebelum mengirim request.
    for (const item of activeItems) {
      const available = productStockMap[item.id];
      if (available !== undefined && item.quantity > available) {
        setCheckoutError(stockErrors[item.id]);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Mengirim request POST ke endpoint orders.
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: activeItems.map((item) => ({ id: item.id, name: item.name, quantity: item.quantity })),
          totalAmount: total,
          paidAmount: total,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Pesanan berhasil disimpan: ${data.data.orderId}`);
        setActiveItems([]);
        setCheckoutError("");
      } else {
        setCheckoutError(data.message || "Checkout gagal");
      }
    } catch {
      setCheckoutError("Tidak dapat menghubungkan ke backend");
    } finally {
      setIsSubmitting(false);
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
        {activeItems.length === 0 ? (
          <p>Belum ada item.</p>
        ) : (
          activeItems.map((item) => (
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

        {checkoutError && (
          <div className="checkout-error">
            <span>{checkoutError}</span>
          </div>
        )}

        <span className="payment-label">Pilih Metode Pembayaran</span>
        <PaymentMethods />

        <button
          className="pay-now-btn"
          onClick={handleCheckout}
          disabled={isCheckoutDisabled}
        >
          <span>{isSubmitting ? "Memproses..." : "Bayar Sekarang"}</span>
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
}

