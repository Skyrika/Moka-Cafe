import React from "react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <button
      onClick={() => onAddToCart(product)}
      className="bg-[#F5F5DC] rounded-xl umbra-shadow flex flex-col text-left soft-press group border border-transparent hover:border-outline-variant overflow-hidden h-56 cursor-pointer"
    >
      <div className="h-32 w-full bg-surface-variant relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isPopular && (
          <div className="absolute top-2 right-2 bg-[#8A9A5B]/20 text-[#8A9A5B] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm">
            Populer
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow justify-between">
        <span className="font-[family-name:var(--font-headline-sm)] text-base leading-snug text-primary mb-1 line-clamp-2 font-semibold">
          {product.name}
        </span>
        <div className="mt-auto flex justify-between items-end">
          <span className="font-semibold text-secondary text-sm">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </button>
  );
}