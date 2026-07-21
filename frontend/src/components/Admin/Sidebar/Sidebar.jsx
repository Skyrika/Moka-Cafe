import "./Sidebar.css";
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

          <li className="active">
            <FaCashRegister />
            <span>Penjualan</span>
          </li>

          <li>
            <FaClipboardList />
            <span>Pesanan</span>
          </li>

          <li>
            <FaBoxOpen />
            <span>Inventaris</span>
          </li>

          <li>
            <FaCog />
            <span>Pengaturan</span>
          </li>

        </ul>

      </div>

      <button className="new-sale">
        <FaPlus />
        Penjualan Baru
      </button>

    </div>
  );
}

export default Sidebar;