import React from 'react';

const OrderItem = ({ name, price, notes, quantity }) => (
  <div className="p-md bg-surface-container rounded-xl flex items-start justify-between group">
    <div className="flex flex-col gap-sm flex-grow pr-md">
      <div className="flex justify-between items-baseline">
        <span className="font-headline-sm text-[18px] text-primary">{name}</span>
        <span className="font-label-md text-[16px] text-primary">Rp {price.toLocaleString('id-ID')}</span>
      </div>
      {notes && <span className="text-[14px] text-on-surface-variant">{notes}</span>}
      <div className="flex items-center gap-md mt-sm">
        <button className="w-8 h-8 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-outline transition-colors">
          <span className="material-symbols-outlined text-[20px]">remove</span>
        </button>
        <span className="font-label-md text-[16px] w-6 text-center">{quantity}</span>
        <button className="w-8 h-8 rounded-lg bg-surface border border-outline-variant flex items-center justify-center text-outline hover:text-primary hover:border-outline transition-colors">
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>
    </div>
  </div>
);

const OrderSummary = ({ orderId = "1042", items = [], subtotal = 0, tax = 0, total = 0 }) => {
  return (
    <aside className="w-[540px] h-full bg-surface-container-lowest flex flex-col flex-shrink-0 z-10 shadow-[-4px_0_15px_-3px_rgba(75,54,33,0.05)]">
      <header className="h-24 border-b border-surface-variant px-lg flex items-center justify-between shrink-0">
        <div className="flex items-center gap-md">
          <span className="material-symbols-outlined text-primary text-[32px]">receipt</span>
          <h3 className="font-headline-sm text-[24px] text-primary">Pesanan Saat Ini</h3>
        </div>
        <span className="text-on-surface-variant text-[16px]">#{orderId}</span>
      </header>

      {/* Item List */}
      <div className="flex-grow overflow-y-auto p-lg flex flex-col gap-sm">
        {items.map((item, index) => (
          <OrderItem key={index} {...item} />
        ))}
      </div>

      {/* Totals & Actions */}
      <div className="p-lg bg-surface-container-low border-t border-surface-variant shrink-0 flex flex-col gap-md">
        <div className="flex justify-between text-on-surface-variant font-label-md text-[16px]">
          <span>Subtotal</span>
          <span>Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between text-on-surface-variant font-label-md text-[16px]">
          <span>Pajak (8%)</span>
          <span>Rp {tax.toLocaleString('id-ID')}</span>
        </div>
        <div className="border-t border-outline-variant border-dashed my-sm"></div>
        <div className="flex justify-between items-end mb-md">
          <span className="font-headline-sm text-[24px] text-primary">Total</span>
          <span className="font-headline-md text-[40px] text-primary leading-none">
            Rp {total.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-md">
          <button className="bg-surface text-[#8B4513] border border-[#8B4513] py-lg rounded-xl font-label-md text-[18px] soft-press flex items-center justify-center gap-sm">
            <span className="material-symbols-outlined">save</span>
            Simpan
          </button>
          <button className="bg-[#4B3621] text-[#F5F5DC] py-lg rounded-xl font-label-md text-[18px] soft-press flex items-center justify-center gap-sm col-span-1">
            <span className="material-symbols-outlined">credit_card</span>
            Tagih
          </button>
        </div>
        <button className="w-full bg-[#4B3621] text-[#F5F5DC] py-lg rounded-xl font-label-md text-[20px] soft-press flex items-center justify-center gap-md mt-sm">
          Bayar Rp {total.toLocaleString('id-ID')}
          <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
};

export default OrderSummary;