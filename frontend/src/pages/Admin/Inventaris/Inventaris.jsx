import "./Inventaris.css";
import { useEffect, useState } from "react";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import InventoryTable from "../../../components/Admin/InventoryTable/InventoryTable";
import InventoryModal from "../../../components/Admin/InventoryModal/InventoryModal";

// Halaman inventaris untuk mengelola produk (CRUD).
function Inventaris() {
  const [showModal, setShowModal] = useState(false);
  const [menuEdit, setMenuEdit] = useState(null);
  const [menus, setMenus] = useState([]);

  // Mengambil daftar produk dari backend.
  const fetchMenus = async () => {
    try {
      // Mengirim request GET ke endpoint produk.
      const response = await fetch("/api/products");
      const result = await response.json();

      if (result.success) {
        // Memformat data dari backend ke struktur yang digunakan frontend.
        setMenus(
          result.data.map((item) => ({
            id: item.id,
            nama: item.name,
            kategori: item.category,
            harga: item.price,
            stok: item.stock,
            imageUrl: item.image_url
              ? `http://localhost:5050${item.image_url}`
              : "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80",
          }))
        );
      }
    } catch (error) {
      console.error("Gagal memuat produk", error);
    }
  };

  // Memanggil fetchMenus saat komponen pertama kali dirender.
  useEffect(() => {
    fetchMenus();
  }, []);

  // Menyimpan produk baru atau memperbarui produk yang sudah ada.
  const simpanMenu = async (menuBaru) => {
    try {
      const formData = new FormData();

      formData.append("name", menuBaru.nama);
      formData.append("category", menuBaru.kategori);
      formData.append("price", Number(menuBaru.harga));
      formData.append("stock", Number(menuBaru.stok));

      if (menuBaru.imageFile) {
        formData.append("image", menuBaru.imageFile);
      }

      // Menentukan method dan URL berdasarkan mode (tambah atau edit).
      const method = menuEdit ? "PUT" : "POST";
      const url = menuEdit
        ? `/api/products/${menuEdit.id}`
        : "/api/products";

      // Mengirim request ke backend.
      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(false);
        setMenuEdit(null);
        fetchMenus();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Gagal menyimpan produk", error);
    }
  };

  // Menghapus produk berdasarkan ID.
  const hapusMenu = async (id) => {
    try {
      // Mengirim request DELETE ke endpoint produk.
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Memperbarui daftar produk setelah penghapusan.
        fetchMenus();
      }
    } catch (error) {
      console.error("Gagal menghapus produk", error);
    }
  };

  // Membuka modal edit dengan data produk yang dipilih.
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
            onClick={() => {
              setMenuEdit(null);
              setShowModal(true);
            }}
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