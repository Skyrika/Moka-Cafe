import "./CategoryPills.css";

// Komponen filter kategori dalam bentuk tombol-tombol (pills) untuk halaman user.
export default function CategoryPills({ categories = [], activeCategory, onCategoryChange }) {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-pill ${category === activeCategory ? "active" : ""}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
