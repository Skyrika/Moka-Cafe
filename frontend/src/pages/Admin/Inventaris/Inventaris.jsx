import "./Inventaris.css";
import { useState } from "react";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import InventoryTable from "../../../components/Admin/InventoryTable/InventoryTable";
import InventoryModal from "../../../components/Admin/InventoryModal/InventoryModal";

function Inventaris() {
  const [showModal, setShowModal] = useState(false);
  const [menuEdit, setMenuEdit] = useState(null);

  const [menus, setMenus] = useState([
    {
      id: 1,
      nama: "Espresso",
      kategori: "Kopi",
      harga: 18000,
      stok: 25,
    },
    {
      id: 2,
      nama: "Latte",
      kategori: "Kopi",
      harga: 25000,
      stok: 15,
    },
    {
      id: 3,
      nama: "Brownies",
      kategori: "Kue",
      harga: 22000,
      stok: 10,
    },
  ]);

  const simpanMenu = (menuBaru) => {

  if (menuEdit) {

    setMenus(
      menus.map((menu) =>
        menu.id === menuEdit.id
          ? { ...menu, ...menuBaru }
          : menu
      )
    );

  } else {

    setMenus([
      ...menus,
      {
        id: menus.length + 1,
        ...menuBaru,
      },
    ]);

  }

  setMenuEdit(null);
  setShowModal(false);
};
    
    const hapusMenu = (id) => {
  setMenus(menus.filter((menu) => menu.id !== id));
};

        const editMenu = (menu) => {
        setMenuEdit(menu);
        setShowModal(true);
};

  return (
    <div className="inventory-container">
      <Sidebar />

      <div className="inventory-content">
        <div className="inventory-header">
          <h1>Inventaris</h1>

          <button
            className="add-btn"
            onClick={() => setShowModal(true)}
          >
            + Tambah Menu
          </button>
        </div>

        <input
          type="text"
          placeholder="Cari menu..."
          className="search-menu"
        />

        <InventoryTable
        menus={menus}
        hapusMenu={hapusMenu}
        editMenu={editMenu}
        />
      </div>

      {showModal && (
        <InventoryModal
        closeModal={() => {
            setShowModal(false);
            setMenuEdit(null);
        }}
        tambahMenu={simpanMenu}
        menuEdit={menuEdit}
        />
)}
    </div>
  );
}

export default Inventaris;