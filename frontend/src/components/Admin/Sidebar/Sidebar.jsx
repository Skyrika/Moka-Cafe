import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaCashRegister,
  FaClipboardList,
  FaBoxOpen,
  FaCog,
} from "react-icons/fa";

// Sidebar navigasi untuk halaman admin — menampilkan menu navigasi utama.
function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        <div className="logo">
          <h1>Moka Cafe</h1>
          <p>Shift: Pagi</p>
        </div>

        <ul className="menu">
          <li>
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "") }>
              <FaCashRegister />
              <span>Penjualan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/pesanan" className={({ isActive }) => (isActive ? "active" : "") }>
              <FaClipboardList />
              <span>Pesanan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/inventaris" className={({ isActive }) => (isActive ? "active" : "") }>
              <FaBoxOpen />
              <span>Inventaris</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/pengaturan" className={({ isActive }) => (isActive ? "active" : "") }>
              <FaCog />
              <span>Pengaturan</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
