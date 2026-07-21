import React from "react";
import "./CategoryPills.css";

export default function CategoryPills() {
  return (
    <div className="category-container">
      <button className="category-pill active">Semua Item</button>
      <button className="category-pill">Kopi</button>
      <button className="category-pill">Teh</button>
      <button className="category-pill">Kue</button>
      <button className="category-pill">Brunch</button>
      <button className="category-pill">Barang</button>
    </div>
  );
}