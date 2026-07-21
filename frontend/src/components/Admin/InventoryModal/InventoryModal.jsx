import "./InventoryModal.css";
import { useState, useEffect } from "react";

// Modal untuk menambah atau mengedit produk inventaris.
function InventoryModal({
  closeModal,
  tambahMenu,
  menuEdit,
}) {
  // State untuk menyimpan input form.
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Mengisi form dengan data produk saat mode edit.
  useEffect(() => {
    if (menuEdit) {
      setNama(menuEdit.nama);
      setKategori(menuEdit.kategori);
      setHarga(menuEdit.harga);
      setStok(menuEdit.stok);
      setImageUrl(menuEdit.imageUrl || "");
    } else {
      setNama("");
      setKategori("");
      setHarga("");
      setStok("");
      setImageUrl("");
    }
  }, [menuEdit]);

  // Memvalidasi data dan mengirim ke fungsi tambahMenu dari parent.
  const simpanData = () => {
    if (!nama || !kategori || !harga || !stok) {
      alert("Semua data harus diisi!");
      return;
    }

    tambahMenu({
      nama,
      kategori,
      harga,
      stok,
      imageUrl,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>
          {menuEdit ? "Edit Menu" : "Tambah Menu"}
        </h2>

        <input
          type="text"
          placeholder="Nama Menu"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <input
          type="text"
          placeholder="Kategori"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL Gambar (opsional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />

        <div className="modal-button">

          <button
            className="cancel-btn"
            onClick={closeModal}
          >
            Batal
          </button>

          <button
            className="save-btn"
            onClick={simpanData}
          >
            {menuEdit ? "Update" : "Simpan"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default InventoryModal;
