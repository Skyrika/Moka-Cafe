import React from "react";
import "./CategoryPills.css";

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