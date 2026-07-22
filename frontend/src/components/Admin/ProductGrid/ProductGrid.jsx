import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";

// Komponen untuk menampilkan grid kartu produk yang sudah difilter.
function ProductGrid({ products = [], onEdit }) {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <div className="empty-state">
          Tidak ada produk yang cocok dengan filter.
        </div>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default ProductGrid;