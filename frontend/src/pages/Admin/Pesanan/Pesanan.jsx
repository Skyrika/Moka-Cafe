import { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Pesanan.css";

const statusMap = {
  pending: { label: "Tertunda", className: "status-pending" },
  diproses: { label: "Diproses", className: "status-processing" },
  processing: { label: "Diproses", className: "status-processing" },
  ready: { label: "Siap", className: "status-ready" },
  siap: { label: "Siap", className: "status-ready" },
  completed: { label: "Selesai", className: "status-completed" },
  selesai: { label: "Selesai", className: "status-completed" },
  canceled: { label: "Dibatalkan", className: "status-canceled" },
  dibatalkan: { label: "Dibatalkan", className: "status-canceled" },
};

const dateOptions = [
  { value: "all", label: "Semua" },
  { value: "today", label: "Hari Ini" },
  { value: "yesterday", label: "Kemarin" },
  { value: "last7", label: "7 Hari Terakhir" },
  { value: "last30", label: "30 Hari Terakhir" },
];

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "pending", label: "Tertunda" },
  { value: "processing", label: "Diproses" },
  { value: "ready", label: "Siap" },
  { value: "completed", label: "Selesai" },
  { value: "canceled", label: "Dibatalkan" },
];

const formatCurrency = (value) => {
  if (typeof value !== "number") return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace("Rp", "Rp ");
};

const parseTimeToMinutes = (time = "") => {
  const [hour, minute] = time.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return 0;
  return hour * 60 + minute;
};

const normalizeOrderDate = (order) => {
  return order.date || order.orderDate || order.createdAt || null;
};

const getDaysDifference = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  const today = new Date();
  const midnightToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const midnightOrder = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffMs = midnightToday.getTime() - midnightOrder.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
};

function StatusBadge({ status }) {
  const normalized = String(status || "").toLowerCase();
  const statusInfo = statusMap[normalized] || { label: status || "-", className: "status-default" };
  return <span className={`status-badge ${statusInfo.className}`}>{statusInfo.label}</span>;
}

function Pesanan() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const result = await response.json();
        if (result.success) {
          setOrders(result.data);
        }
      } catch (error) {
        console.error("Gagal memuat riwayat pesanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-page-shell">
      <Sidebar />

      <div className="pesanan-container">
        <div className="pesanan-header">
          <div>
            <h1>Riwayat Pesanan</h1>
            <p>Semua transaksi penjualan yang tersimpan.</p>
          </div>
        </div>

        {loading ? (
          <p>Memuat riwayat pesanan...</p>
        ) : orders.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada pesanan tercatat.</p>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card">
                <div className="order-card-header">
                  <div>
                    <h2>{order.orderId}</h2>
                    <p>{new Date(order.createdAt).toLocaleString("id-ID")}</p>
                  </div>
                  <div className="order-total">Total: Rp {order.totalAmount.toLocaleString("id-ID")}</div>
                </div>

                <div className="order-card-body">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.quantity}x {item.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pesanan;
