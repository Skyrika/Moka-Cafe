import React from "react";

const CATEGORIES = ["Semua Item", "Kopi", "Teh", "Kue", "Brunch", "Barang"];

export default function CategoryPills({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="px-6 py-3 flex gap-3 overflow-x-auto no-scrollbar shrink-0 border-b border-surface-variant bg-surface-container-lowest">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold shrink-0 cursor-pointer transition-colors ${
            selectedCategory === cat
              ? "bg-primary-container text-on-primary soft-press"
              : "bg-surface-variant text-on-surface-variant hover:bg-surface-dim"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}