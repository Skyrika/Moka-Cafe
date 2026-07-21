import React from 'react';

const Sidebar = ({ shift = "Pagi", userName = "Alex Rivera", role = "Manajer" }) => {
  return (
    <nav aria-label="Sidebar" className="hidden md:flex flex-col h-full py-md px-md border-r border-outline-variant bg-surface-container shadow-sm w-[360px] fixed left-0 top-0 z-40">
      <div className="mb-lg px-sm">
        <h1 className="font-display-lg text-display-lg text-primary tracking-tight">Moka Cafe</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Shift: {shift}</p>
      </div>
      
      <ul className="flex-1 space-y-sm">
        <li>
          <a aria-current="page" className="flex items-center gap-md px-md py-sm rounded-lg bg-surface-variant text-primary font-bold border-r-4 border-primary hover:bg-surface-variant transition-colors active:scale-95 transition-transform duration-150" href="#">
            <span className="material-symbols-outlined" data-icon="point_of_sale" style={{ fontVariationSettings: "'FILL' 1" }}>point_of_sale</span>
            <span className="font-label-md text-label-md text-[16px]">Penjualan</span>
          </a>
        </li>
        <li>
          <a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-95 transition-transform duration-150" href="#">
            <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
            <span className="font-label-md text-label-md text-[16px]">Pesanan</span>
          </a>
        </li>
        <li>
          <a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-95 transition-transform duration-150" href="#">
            <span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
            <span className="font-label-md text-label-md text-[16px]">Inventaris</span>
          </a>
        </li>
        <li>
          <a className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-95 transition-transform duration-150" href="#">
            <span className="material-symbols-outlined" data-icon="settings">settings</span>
            <span className="font-label-md text-label-md text-[16px]">Pengaturan</span>
          </a>
        </li>
      </ul>

      <div className="mt-auto px-sm pt-md border-t border-outline-variant">
        <div className="flex items-center gap-md mb-md">
          <img 
            alt="Barista Profile" 
            className="w-12 h-12 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoJW9XklBqMNQ08IjHO8gsn_0jfAPIcqBLC9cSVjzjnPY8ZJY8k1Apn_5v7wqLVqNLvDpkZVa9xOymsteLWJdHSx0TtQ8Kj5sAIXlziQ9EH7FKalbzRxj5fyJlmAbih0qjaRc5E8r28dzy_CCCMrXosGjxrvUNsObA5BLwrqpfs3hRTXm31m38qQUSDmX2DgyCea_UrDPpf5oMqtjZMEx9-fDYKehyJznzn2-iEULDCE8Pr5UyuLgVLVSQk0quoPscq9M-0uz7alk" 
          />
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-label-md text-[16px] text-on-surface truncate">{userName}</p>
            <p className="font-body-md text-body-md text-on-surface-variant text-[14px] truncate">{role}</p>
          </div>
        </div>
        <button className="w-full flex justify-center items-center gap-sm py-sm px-md bg-primary-container text-on-primary rounded-lg font-label-md text-label-md text-[16px] hover:bg-primary transition-colors inner-press">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Penjualan Baru
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;