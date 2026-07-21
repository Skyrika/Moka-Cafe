import "./ProductCard.css";

// Kartu produk untuk halaman user — menampilkan gambar, nama, harga, dan badge populer.
export default function ProductCard({ title, price, image, isPopular, onClick }) {
  return (
    <button type="button" className="product-card" onClick={onClick}>
      <div className="product-image-box">
        <img className="product-image" src={image} alt={title} />
        {isPopular && <div className="badge-popular">Populer</div>}
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-price-row">
          <span className="product-price">{price}</span>
        </div>
      </div>
    </button>
  );
}
