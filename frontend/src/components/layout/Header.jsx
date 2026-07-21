import React from "react";

export default function Header({ searchQuery, setSearchQuery }) {
  return (
    <header className="h-16 border-b border-surface-variant px-6 flex items-center justify-between bg-surface-bright shrink-0">
      <h2 className="font-[family-name:var(--font-headline-md)] text-xl font-semibold text-primary">
        Menu
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline !text-xl">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari item..."
            className="w-full pl-10 pr-4 py-1.5 rounded-lg border border-outline bg-background focus:border-primary-container focus:ring-1 focus:ring-primary-container text-sm text-on-surface transition-all outline-none"
          />
        </div>
      </div>
    </header>
  );
}