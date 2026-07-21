import "./ProductCard.css";

// Komponen kartu produk untuk menampilkan informasi singkat produk di grid admin.
function ProductCard({ product }) {
  const imageSrc = product.image || "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="product-card">
      <img src={imageSrc} alt={product.name} />

      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Rp {product.price.toLocaleString("id-ID")}</p>
        <button type="button">Edit</button>
      </div>
    </div>
  );
}

export default ProductCard;
