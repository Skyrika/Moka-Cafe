import "./Penjualan.css";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import SearchBar from "../../../components/Admin/SearchBar/SearchBar";
import CategoryFilter from "../../../components/Admin/CategoryFilter/CategoryFilter";
import ProductGrid from "../../../components/Admin/ProductGrid/ProductGrid";
import OrderList from "../../../components/Admin/OrderList/OrderList";

function Penjualan() {
  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <SearchBar />
        <CategoryFilter />
        <ProductGrid />
      </div>

      <OrderList />
    </div>
  );
}

export default Penjualan;