import { useEffect, useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Pesanan.css";

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