import React from "react";
import { FaReceipt, FaMinus, FaPlus, FaArrowRight } from "react-icons/fa";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import "./OrderSidebar.css";

export default function OrderSidebar() {
  return (
    <aside className="sidebar-order">
      <header className="sidebar-header">
        <div className="sidebar-title-box">
          <FaReceipt />
          <h3>Pesanan Saat Ini</h3>
        </div>
        <span className="order-number">#1042</span>
      </header>

      {/* Item List */}
      <div className="order-items-list">
        {/* Item 1 */}
        <div className="order-item-card">
          <div className="order-item-details">
            <div className="order-item-top">
              <span className="item-name">Signature Latte</span>
              <span className="item-price">Rp 110.000</span>
            </div>
            <span className="item-notes">Es, Susu Oat</span>
            <div className="quantity-controls">
              <button className="qty-btn"><FaMinus /></button>
              <span className="qty-count">2</span>
              <button className="qty-btn"><FaPlus /></button>
            </div>
          </div>
        </div>

        {/* Item 2 */}
        <div className="order-item-card">
          <div className="order-item-details">
            <div className="order-item-top">
              <span className="item-name">Butter Croissant</span>
              <span className="item-price">Rp 40.000</span>
            </div>
            <span className="item-notes">Dihangatkan</span>
            <div className="quantity-controls">
              <button className="qty-btn"><FaMinus /></button>
              <span className="qty-count">1</span>
              <button className="qty-btn"><FaPlus /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Total & Payment */}
      <div className="order-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>Rp 150.000</span>
        </div>
        <div className="summary-row">
          <span>Pajak (8%)</span>
          <span>Rp 12.000</span>
        </div>
        <div className="summary-divider"></div>
        <div className="total-row">
          <span className="total-label">Total</span>
          <span className="total-amount">Rp 162.000</span>
        </div>

        <span className="payment-label">Pilih Metode Pembayaran</span>
        <PaymentMethods />

        <button className="pay-now-btn">
          <span>Bayar Sekarang</span>
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
}