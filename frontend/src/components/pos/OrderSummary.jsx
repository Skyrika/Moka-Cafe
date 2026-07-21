import React from "react";

export default function OrderSummary({ cart, onUpdateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  return (
    <aside className="w-80 lg:w-96 h-full bg-surface-container-lowest flex flex-col shrink-0 z-10 shadow-[-4px_0_15px_-3px_rgba(75,54,33,0.05)]">
      <header className="h-16 border-b border-surface-variant px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary !text-2xl">
            receipt
          </span>
          <h3 className="font-[family-name:var(--font-headline-sm)] text-lg font-semibold text-primary">
            Pesanan Saat Ini
          </h3>
        </div>
        <span className="text-on-surface-variant text-sm">#1042</span>
      </header>

      {/* List Item */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-surface-container rounded-lg flex items-start justify-between group"
          >
            <div className="flex flex-col gap-1 flex-grow pr-2">
              <div className="flex justify-between items-baseline">
                <span className="font-[family-name:var(--font-headline-sm)] text-sm font-semibold text-primary">
                  {item.name}
                </span>
                <span className="font-semibold text-xs text-primary">
                  Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                </span>
              </div>
              <span className="text-xs text-on-surface-variant">
                {item.note}
              </span>
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="w-6 h-6 rounded bg-surface border border-outline-variant flex items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined !text-sm">remove</span>
                </button>
                <span className="font-semibold text-xs w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="w-6 h-6 rounded bg-surface border border-outline-variant flex items-center justify-center text-outline hover:text-primary transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined !text-sm">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rincian & Action Button */}
      <div className="p-4 bg-surface-container-low border-t border-surface-variant shrink-0 flex flex-col gap-3">
        <div className="flex justify-between text-on-surface-variant font-semibold text-sm">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant font-semibold text-sm">
          <span>Pajak (8%)</span>
          <span>Rp {tax.toLocaleString("id-ID")}</span>
        </div>

        <div className="border-t border-outline-variant border-dashed my-1"></div>

        <div className="flex justify-between items-end mb-2">
          <span className="font-[family-name:var(--font-headline-sm)] text-lg font-semibold text-primary">
            Total
          </span>
          <span className="font-[family-name:var(--font-headline-md)] text-2xl font-semibold text-primary leading-none">
            Rp {total.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="bg-surface text-[#8B4513] border border-[#8B4513] py-2.5 rounded-lg font-semibold text-sm soft-press flex items-center justify-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined !text-lg">save</span>
            Simpan
          </button>
          <button className="bg-[#4B3621] text-[#F5F5DC] py-2.5 rounded-lg font-semibold text-sm soft-press flex items-center justify-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined !text-lg">credit_card</span>
            Tagih
          </button>
        </div>

        <button className="w-full bg-[#4B3621] text-[#F5F5DC] py-3 rounded-lg font-semibold text-base soft-press flex items-center justify-center gap-3 cursor-pointer">
          Bayar Rp {total.toLocaleString("id-ID")}
          <span className="material-symbols-outlined !text-xl">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
}