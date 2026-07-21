import "./CategoryFilter.css";

function CategoryFilter() {
  return (
    <div className="category-filter">

      <button className="active">
        Semua Item
      </button>

      <button>Kopi</button>

      <button>Teh</button>

      <button>Kue</button>

      <button>Breakfast</button>

    </div>
  );
}

export default CategoryFilter;