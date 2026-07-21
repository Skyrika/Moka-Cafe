import React, { useState } from "react";
import "./TaxConfigCard.css";

export default function TaxConfigCard() {
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [taxRate, setTaxRate] = useState(8.5);

  return (
    <section className="card card-span-12">
      {/* Header Card */}
      <div className="card-header">
        <h3 className="card-title">
          <span className="material-symbols-outlined card-icon">account_balance</span>
          Konfigurasi Pajak
        </h3>
      </div>

      {/* Card Body */}
      <div className="card-body">
        {/* Input Field Group */}
        <div className="tax-input-group">
          <label className="tax-input-label">Pajak Penjualan Default (%)</label>
          <div className="tax-input-wrapper">
            <input
              className="tax-input"
              type="number"
              step="0.1"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
            />
            <span className="tax-unit-suffix">%</span>
          </div>
        </div>

        {/* Toggle Switch Row */}
        <div className="tax-toggle-row">
          <div className="tax-toggle-info">
            <p className="tax-setting-label">Harga Termasuk Pajak</p>
            <p className="tax-setting-desc">Harga menu sudah termasuk pajak</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={taxInclusive}
              onChange={(e) => setTaxInclusive(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </section>
  );
}