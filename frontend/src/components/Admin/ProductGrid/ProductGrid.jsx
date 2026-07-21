import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";

const products = [
  {
    id: 1,
    name: "Espresso",
    price: 35000,
    image: "https://picsum.photos/200/250?1",
  },
  {
    id: 2,
    name: "Signature Latte",
    price: 55000,
    image: "https://picsum.photos/200/250?2",
  },
  {
    id: 3,
    name: "Butter Croissant",
    price: 40000,
    image: "https://picsum.photos/200/250?3",
  },
  {
    id: 4,
    name: "Matcha Latte",
    price: 50000,
    image: "https://picsum.photos/200/250?4",
  },
];

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductGrid;