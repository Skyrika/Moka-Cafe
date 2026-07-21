import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <div className="product-info">

        <h3>{product.name}</h3>

        <p>
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        <button>Edit</button>

      </div>

    </div>
  );
}

export default ProductCard;