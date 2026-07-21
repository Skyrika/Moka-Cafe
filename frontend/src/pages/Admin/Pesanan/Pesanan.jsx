import { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Pesanan.css";

// Halaman untuk menampilkan riwayat pesanan (admin).
function Pesanan() {
  // State untuk menyimpan daftar pesanan dari database.
  const [orders, setOrders] = useState([]);
  // State untuk indikator loading saat mengambil data.
  const [loading, setLoading] = useState(true);

  // Mengambil riwayat pesanan dari backend saat komponen pertama kali dirender.
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Mengirim request GET ke endpoint orders.
        const response = await fetch("/api/orders");
        const result = await response.json();
        if (result.success) {
          // Memperbarui state dengan data pesanan dari response.
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

  // Menampilkan daftar kartu pesanan atau pesan jika kosong.
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
          // Tampilan ketika belum ada pesanan.
          <div className="empty-state">
            <p>Belum ada pesanan tercatat.</p>
          </div>
        ) : (
          // Menampilkan daftar kartu pesanan dari database.
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
