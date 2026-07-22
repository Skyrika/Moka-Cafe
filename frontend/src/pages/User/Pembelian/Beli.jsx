import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/user/Header/Header";
import CategoryPills from "../../../components/user/CategoryPills/CategoryPills";
import ProductCard from "../../../components/user/ProductCard/ProductCard";
import OrderSidebar from "../../../components/user/OrderSidebar/OrderSidebar";
import "./Beli.css";

// Halaman pembelian untuk pengguna (user) — memilih produk dan melakukan pemesanan.
export default function Beli() {
  // State untuk menyimpan data produk, status loading, pencarian, filter, dan keranjang.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Item");
  const [orderItems, setOrderItems] = useState([]);

  // Membuat mapping ID produk ke stok untuk validasi jumlah pesanan di sidebar.
  const productStockMap = useMemo(() => {
    const map = {};

    products.forEach((p) => {
      map[p.id] = p.stock;
    });

    return map;
  }, [products]);

  // Mengambil data produk dari backend saat komponen pertama kali dirender.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Mengirim request GET ke endpoint produk.
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Gagal mengambil data produk");
        }

        const result = await response.json();

        if (result.success) {
          // Memformat data dari backend untuk ditampilkan di kartu produk.
          const mappedProducts = result.data
            .map((item) => ({
              id: item.id,
              title: item.name,
              priceValue: item.price,
              price: `Rp ${Number(item.price).toLocaleString("id-ID")}`,
              image: item.image_url
                ? `http://localhost:5050${item.image_url}`
                : "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80",
              isPopular: Number(item.stock) > 20,
              stock: item.stock,
              category: item.category || "Umum",
            }))
            .sort((a, b) => a.title.localeCompare(b.title));

          // Menyimpan data produk ke state.
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mengekstrak daftar kategori unik dari data produk untuk filter.
  const categories = useMemo(() => {
    const categorySet = new Set(
      products.map((product) => product.category || "Umum")
    );

    return ["Semua Item", ...Array.from(categorySet)];
  }, [products]);

  // Memfilter produk berdasarkan pencarian dan kategori yang dipilih.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua Item" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Menambahkan produk ke keranjang pesanan. Jika sudah ada, tambah quantity-nya.
  const addToOrder = (product) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.title,
          price: product.priceValue,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className="beli-layout">
      <main className="beli-main">
        <div className="content-left">
          {/* Header dengan search bar */}
          <Header
            searchValue={searchQuery}
            onSearch={setSearchQuery}
          />

          {/* Filter kategori produk */}
          <CategoryPills
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Menampilkan produk yang sudah difilter atau indikator loading */}
          {loading ? (
            <p>Memuat produk...</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  isPopular={item.isPopular}
                  onClick={() => addToOrder(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar untuk melihat dan mengelola pesanan */}
        <OrderSidebar
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          productStockMap={productStockMap}
        />
      </main>
    </div>
  );
}