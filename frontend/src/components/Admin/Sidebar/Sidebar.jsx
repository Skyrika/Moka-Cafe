import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import {
  FaCashRegister,
  FaClipboardList,
  FaBoxOpen,
  FaCog,
  FaPlus,
} from "react-icons/fa";

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
            <NavLink to="/">
              <FaCashRegister />
              <span>Penjualan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/pesanan">
              <FaClipboardList />
              <span>Pesanan</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/inventaris">
              <FaBoxOpen />
              <span>Inventaris</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/pengaturan">
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