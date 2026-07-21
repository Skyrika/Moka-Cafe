import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Pesanan.css";

function Pesanan() {
  return (
    <div className="admin-page-shell">
      <Sidebar />

      <div className="pesanan-container">
        <h1>Pesanan</h1>
        <p>Kelola daftar pesanan pelanggan di sini.</p>
      </div>
    </div>
  );
}

export default Pesanan;