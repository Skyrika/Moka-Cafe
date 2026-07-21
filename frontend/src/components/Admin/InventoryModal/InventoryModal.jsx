import "./InventoryModal.css";
import { useState, useEffect } from "react";

function InventoryModal({
  closeModal,
  tambahMenu,
  menuEdit,
}) {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");

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
  }, [menuEdit]);

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