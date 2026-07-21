import "./InventoryTable.css";

// Komponen tabel untuk menampilkan daftar produk inventaris dengan tombol aksi.
function InventoryTable({ menus, hapusMenu, editMenu }) {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Nama</th>
          <th>Kategori</th>
          <th>Harga</th>
          <th>Stok</th>
          <th>Aksi</th>
        </tr>
      </thead>

      <tbody>
        {menus.map((menu) => (
          <tr key={menu.id}>
            <td>
              <img
                src={menu.imageUrl || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=100&q=80"}
                alt={menu.nama}
                className="inventory-thumbnail"
              />
            </td>
            <td>{menu.nama}</td>
            <td>{menu.kategori}</td>
            <td>Rp {menu.harga}</td>
            <td>{menu.stok}</td>

            <td>
              <button onClick={() => editMenu(menu)}>Edit</button>
              <button onClick={() => hapusMenu(menu.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
