import React from 'react';

const ProductCard = ({ name, price, image, isPopular, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-[#F5F5DC] rounded-xl umbra-shadow flex flex-col text-left soft-press group border border-transparent hover:border-outline-variant overflow-hidden h-[300px]"
    >
      <div className="h-48 w-full bg-surface-variant relative overflow-hidden">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
          alt={name} 
        />
        {isPopular && (
          <div className="absolute top-sm right-sm bg-[#8A9A5B] bg-opacity-20 text-[#8A9A5B] text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            Populer
          </div>
        )}
      </div>
      <div className="p-md flex flex-col flex-grow justify-between">
        <span className="font-headline-sm text-[20px] leading-snug text-primary mb-xs line-clamp-2 font-semibold">
          {name}
        </span>
        <div className="mt-auto flex justify-between items-end">
          <span className="font-label-md text-secondary text-[16px]">
            Rp {price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProductCard;