import React from "react";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-title-box">
        <h1 className="header-brand">Moka Cafe</h1>
        <span className="header-divider">|</span>
        <h2 className="header-subtitle">Menu</h2>
      </div>
      
      <div className="header-search-box">
        <FaSearch className="header-search-icon" />
        <input
          className="header-search-input"
          placeholder="Cari item..."
          type="text"
        />
      </div>
    </header>
  );
}