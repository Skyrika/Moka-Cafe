import "./InventoryTable.css";

function InventoryTable({ menus, hapusMenu, editMenu }) {
  return (
    <table className="inventory-table">
      <thead>
        <tr>
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
            <td>{menu.nama}</td>
            <td>{menu.kategori}</td>
            <td>Rp {menu.harga}</td>
            <td>{menu.stok}</td>

            <td>
              <button onClick={() => editMenu(menu)}>
                Edit
                </button>
              <button onClick={() => hapusMenu(menu.id)}>
                Hapus
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;