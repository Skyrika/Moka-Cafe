import { useEffect, useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Gagal memuat pesanan. Silakan coba lagi.");
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.data || [];
        setOrders(payload);
      } catch (fetchError) {
        setError(fetchError.message || "Terjadi kesalahan saat memuat pesanan.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return orders
      .filter((order) => {
        if (selectedStatus !== "all") {
          const statusValue = String(order.status || "").toLowerCase();
          if (statusValue !== selectedStatus) return false;
        }

        if (selectedDate !== "all") {
          const orderDateValue = normalizeOrderDate(order);
          const diffDays = getDaysDifference(orderDateValue);

          if (diffDays === null) return true;
          if (selectedDate === "today" && diffDays !== 0) return false;
          if (selectedDate === "yesterday" && diffDays !== 1) return false;
          if (selectedDate === "last7" && (diffDays < 0 || diffDays > 6)) return false;
          if (selectedDate === "last30" && (diffDays < 0 || diffDays > 29)) return false;
        }

        if (!normalizedQuery) return true;

        const searchable = [
          order.orderId,
          order.customerName,
          ...(order.items || []).map((item) => item.name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .sort((a, b) => {
        const dateA = normalizeOrderDate(a);
        const dateB = normalizeOrderDate(b);
        if (dateA && dateB) {
          const diff = new Date(dateB).getTime() - new Date(dateA).getTime();
          if (diff !== 0) return diff;
        }
        return parseTimeToMinutes(b.time) - parseTimeToMinutes(a.time);
      });
  }, [orders, query, selectedDate, selectedStatus]);

  const totalOrders = filteredOrders.length;
  const lastPage = Math.max(1, Math.ceil(totalOrders / itemsPerPage));
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const startItem = totalOrders === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(totalOrders, currentPage * itemsPerPage);

  return (
    <div className="admin-page-shell">
      <Sidebar />

      <div className="pesanan-container">
        <div className="pesanan-header-row">
          <div className="pesanan-title-block">
            <h1>Pesanan</h1>
            <p className="pesanan-subtitle">Kelola dan lacak pemenuhan kafe.</p>
          </div>

          <div className="pesanan-controls">
            <div className="pesanan-search">
              <input
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari ID Pesanan..."
              />
            </div>

            <div className="pesanan-filter-group">
              <select
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(event) => {
                  setSelectedStatus(event.target.value);
                  setCurrentPage(1);
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="pesanan-card">
          <div className="pesanan-card-header">
            <div className="pesanan-list-title">
              <h2>Pesanan Terbaru</h2>
              <p>Urutkan berdasarkan waktu terbaru.</p>
            </div>
          </div>

          {loading ? (
            <div className="pesanan-state-card">Memuat pesanan...</div>
          ) : error ? (
            <div className="pesanan-state-card pesanan-error">{error}</div>
          ) : currentOrders.length === 0 ? (
            <div className="pesanan-state-card">
              <strong>Tidak ada pesanan ditemukan.</strong>
              <span>Coba ubah kata kunci atau filter untuk melihat lebih banyak hasil.</span>
            </div>
          ) : (
            <div className="pesanan-list">
              <div className="pesanan-list-head">
                <span>ID Pesanan</span>
                <span>Waktu</span>
                <span>Barang</span>
                <span>Status</span>
                <span>Total</span>
              </div>

              {currentOrders.map((order) => (
                <div key={order._id || order.orderId} className="pesanan-row">
                  <div className="pesanan-cell pesanan-cell-id">
                    <strong>{order.orderId}</strong>
                    {order.customerName ? <span className="pesanan-customer">{order.customerName}</span> : null}
                  </div>
                  <div className="pesanan-cell">{order.time}</div>
                  <div className="pesanan-cell pesanan-items">
                    {(order.items || []).map((item, index) => (
                      <span key={`${item.name}-${index}`} className="pesanan-item-line">
                        {item.qty}x {item.name}
                      </span>
                    ))}
                  </div>
                  <div className="pesanan-cell">
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="pesanan-cell pesanan-total">{formatCurrency(order.total)}</div>
                </div>
              ))}
            </div>
          )}

          <div className="pesanan-pagination-row">
            <span className="pesanan-pagination-info">
              Menampilkan {startItem}-{endItem} dari {totalOrders} pesanan
            </span>
            <div className="pesanan-pagination-buttons">
              <button onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} disabled={currentPage === 1}>
                Previous
              </button>
              <button onClick={() => setCurrentPage((prev) => Math.min(lastPage, prev + 1))} disabled={currentPage === lastPage}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pesanan;
