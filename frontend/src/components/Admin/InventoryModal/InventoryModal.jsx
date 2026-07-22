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
  const [imageFile, setImageFile] = useState(null);

  // Mengisi form dengan data produk saat mode edit.
  useEffect(() => {
    if (menuEdit) {
      setNama(menuEdit.nama);
      setKategori(menuEdit.kategori);
      setHarga(menuEdit.harga);
      setStok(menuEdit.stok);
    } else {
      setNama("");
      setKategori("");
      setHarga("");
      setStok("");
    }

    setImageFile(null);
  }, [menuEdit]);

  // Menangani pemilihan file gambar.
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
  };

  // Memvalidasi data dan mengirim ke parent.
  const simpanData = () => {
    if (!nama || !kategori || !harga || !stok) {
      alert("Semua data harus diisi!");
      return;
    }

    tambahMenu({
      nama,
      kategori,
      harga: Number(harga),
      stok: Number(stok),
      imageFile,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{menuEdit ? "Edit Menu" : "Tambah Menu"}</h2>

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
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {imageFile && (
          <small>File: {imageFile.name}</small>
        )}

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