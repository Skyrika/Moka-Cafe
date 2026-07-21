import "./Penjualan.css";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import SearchBar from "../../../components/Admin/SearchBar/SearchBar";
import CategoryFilter from "../../../components/Admin/CategoryFilter/CategoryFilter";
import ProductGrid from "../../../components/Admin/ProductGrid/ProductGrid";

// Penjelasan: Komponen utama halaman admin yang menampilkan area penjualan.
function Penjualan() {
  // Penjelasan: Menampilkan struktur halaman penjualan untuk admin.
  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <SearchBar />
        <CategoryFilter />
        <ProductGrid />
      </div>
    </div>
  );
}

export default Penjualan;