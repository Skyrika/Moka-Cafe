import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid({ products = [] }) {
  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <div className="empty-state">Tidak ada produk yang cocok dengan filter.</div>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
}

export default ProductGrid;