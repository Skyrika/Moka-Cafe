import { useEffect, useMemo, useState } from "react";
import "./Penjualan.css";

import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import SearchBar from "../../../components/Admin/SearchBar/SearchBar";
import CategoryFilter from "../../../components/Admin/CategoryFilter/CategoryFilter";
import ProductGrid from "../../../components/Admin/ProductGrid/ProductGrid";

// Halaman penjualan untuk admin — menampilkan katalog produk dengan pencarian dan filter.
function Penjualan() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Item");

  // Mengambil data produk dari backend saat komponen dirender.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();
        if (result.success) {
          // Memformat data produk dari backend ke state.
          setProducts(
            result.data.map((item) => ({
              id: item.id,
              name: item.name,
              category: item.category || "Umum",
              price: item.price,
              image: item.image_url || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80",
            }))
          );
        }
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mengekstrak daftar kategori unik dari produk untuk filter.
  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category || "Umum"));
    return ["Semua Item", ...Array.from(categorySet)];
  }, [products]);

  // Memfilter produk berdasarkan pencarian dan kategori yang dipilih.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "Semua Item" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <p className="loading-text">Memuat produk...</p>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

export default Penjualan;
