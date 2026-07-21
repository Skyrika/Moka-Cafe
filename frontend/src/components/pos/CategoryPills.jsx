import React from 'react';

const CategoryPills = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="px-lg py-md flex gap-md overflow-x-auto no-scrollbar shrink-0 border-b border-surface-variant bg-surface-container-lowest">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-lg py-sm rounded-full font-label-md text-label-md text-[16px] shrink-0 transition-colors ${
            activeCategory === category
              ? "bg-primary-container text-on-primary soft-press"
              : "bg-surface-variant text-on-surface-variant hover:bg-surface-dim"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;