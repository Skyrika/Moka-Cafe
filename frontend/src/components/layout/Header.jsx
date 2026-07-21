import React from 'react';

const Header = ({ title = "Menu" }) => {
  return (
    <header className="h-24 border-b border-surface-variant px-lg flex items-center justify-between bg-surface-bright shrink-0">
      <h2 className="font-headline-md text-headline-md text-primary">{title}</h2>
      <div className="flex items-center gap-md">
        <div className="relative w-[480px]">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[24px]">search</span>
          <input 
            className="w-full pl-[56px] pr-md py-sm rounded-lg border border-outline bg-background focus:border-primary-container focus:ring-1 focus:ring-primary-container font-label-md text-[16px] text-on-surface transition-all outline-none" 
            placeholder="Cari item..." 
            type="text" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;