import "./CategoryFilter.css";

// Komponen untuk menampilkan filter kategori produk dalam bentuk tombol-tombol.
function CategoryFilter({ categories = [], selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={category === selectedCategory ? "active" : ""}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
