import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../components/user/Header/Header";
import CategoryPills from "../../../components/user/CategoryPills/CategoryPills";
import ProductCard from "../../../components/user/ProductCard/ProductCard";
import OrderSidebar from "../../../components/user/OrderSidebar/OrderSidebar";
import "./Beli.css";

export default function Beli() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Item");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const result = await response.json();

        if (result.success) {
          const mappedProducts = result.data.map((item) => ({
            id: item.id,
            title: item.name,
            priceValue: item.price,
            price: `Rp ${item.price.toLocaleString("id-ID")}`,
            image: item.image_url || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04",
            isPopular: item.stock > 20,
            category: item.category || "Umum",
          }));

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

  const categories = useMemo(() => {
    const categorySet = new Set(products.map((product) => product.category || "Umum"));
    return ["Semua Item", ...Array.from(categorySet)];
  }, [products]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "Semua Item" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, searchQuery, selectedCategory]
  );

  const addToOrder = (product) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.title, price: product.priceValue, quantity: 1 }];
    });
  };

  return (
    <div className="beli-layout">
      <main className="beli-main">
        <div className="content-left">
          <Header searchValue={searchQuery} onSearch={setSearchQuery} />
          <CategoryPills
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

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

        <OrderSidebar orderItems={orderItems} setOrderItems={setOrderItems} />
      </main>
    </div>
  );
}