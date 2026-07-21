import React from "react";

export default function Sidebar() {
  return (
    <nav className="hidden md:flex flex-col h-full py-5 px-4 border-r border-outline-variant bg-surface-container shadow-sm w-64 fixed left-0 top-0 z-40">
      <div className="mb-8 px-2">
        <h1 className="font-[family-name:var(--font-display-lg)] text-2xl font-bold text-primary tracking-tight">
          Moka Cafe
        </h1>
        <p className="text-sm text-on-surface-variant mt-0.5">
          Shift: Pagi
        </p>
      </div>

      <ul className="flex-1 space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-surface-variant text-primary font-bold border-r-4 border-primary transition-colors text-sm"
          >
            <span className="material-symbols-outlined !text-xl">point_of_sale</span>
            <span>Penjualan</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors text-sm"
          >
            <span className="material-symbols-outlined !text-xl">receipt_long</span>
            <span>Pesanan</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors text-sm"
          >
            <span className="material-symbols-outlined !text-xl">inventory_2</span>
            <span>Inventaris</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors text-sm"
          >
            <span className="material-symbols-outlined !text-xl">settings</span>
            <span>Pengaturan</span>
          </a>
        </li>
      </ul>

      <div className="mt-auto px-2 pt-4 border-t border-outline-variant">
        <div className="flex items-center gap-3 mb-4">
          <img
            alt="Barista Profile"
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoJW9XklBqMNQ08IjHO8gsn_0jfAPIcqBLC9cSVjzjnPY8ZJY8k1Apn_5v7wqLVqNLvDpkZVa9xOymsteLWJdHSx0TtQ8Kj5sAIXlziQ9EH7FKalbzRxj5fyJlmAbih0qjaRc5E8r28dzy_CCCMrXosGjxrvUNsObA5BLwrqpfs3hRTXm31m38qQUSDmX2DgyCea_UrDPpf5oMqtjZMEx9-fDYKehyJznzn2-iEULDCE8Pr5UyuLgVLVSQk0quoPscq9M-0uz7alk"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-on-surface truncate">
              Alex Rivera
            </p>
            <p className="text-xs text-on-surface-variant truncate">
              Manajer
            </p>
          </div>
        </div>
        <button className="w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-primary-container text-on-primary rounded-lg text-sm font-semibold hover:bg-primary transition-colors cursor-pointer soft-press">
          <span className="material-symbols-outlined !text-lg">add</span>
          Penjualan Baru
        </button>
      </div>
    </nav>
  );
}