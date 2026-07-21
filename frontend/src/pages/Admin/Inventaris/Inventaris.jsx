import "./Inventaris.css";
import { useEffect, useState } from "react";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import InventoryTable from "../../../components/Admin/InventoryTable/InventoryTable";
import InventoryModal from "../../../components/Admin/InventoryModal/InventoryModal";

function Inventaris() {
  const [showModal, setShowModal] = useState(false);
  const [menuEdit, setMenuEdit] = useState(null);
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    try {
      const response = await fetch("/api/products");
      const result = await response.json();
      if (result.success) {
        setMenus(
          result.data.map((item) => ({
            id: item.id,
            nama: item.name,
            kategori: item.category,
            harga: item.price,
            stok: item.stock,
            imageUrl: item.image_url,
          }))
        );
      }
    } catch (error) {
      console.error("Gagal memuat produk", error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const simpanMenu = async (menuBaru) => {
    try {
      const payload = {
        name: menuBaru.nama,
        category: menuBaru.kategori,
        price: Number(menuBaru.harga),
        stock: Number(menuBaru.stok),
        image_url: menuBaru.imageUrl || null,
      };

      const method = menuEdit ? "PUT" : "POST";
      const url = menuEdit
        ? `/api/products/${menuEdit.id}`
        : "/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setShowModal(false);
        setMenuEdit(null);
        fetchMenus();
      }
    } catch (error) {
      console.error("Gagal menyimpan produk", error);
    }
  };

  const hapusMenu = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchMenus();
      }
    } catch (error) {
      console.error("Gagal menghapus produk", error);
    }
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

          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Tambah Menu
          </button>
        </div>

        <input type="text" placeholder="Cari menu..." className="search-menu" />

        <InventoryTable menus={menus} hapusMenu={hapusMenu} editMenu={editMenu} />
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