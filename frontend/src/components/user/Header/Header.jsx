import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ searchValue, onSearch }) {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/admin");
  };

  return (
    <header className="header">
      <div className="header-title-box">
        <h1 className="header-brand">Moka Cafe</h1>
        <span className="header-divider">|</span>
        <h2 className="header-subtitle clickable" onClick={handleMenuClick}>
          Menu
        </h2>
      </div>

      <div className="header-search-box">
        <FaSearch className="header-search-icon" />
        <input
          className="header-search-input"
          placeholder="Cari item..."
          type="text"
          value={searchValue}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
    </header>
  );
}