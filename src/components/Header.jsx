import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  X,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { useCart, INITIAL_PRODUCTS } from "../context/CartContext";
import "./Header.css";

export default function Header() {
  const { totalItems, setIsCartOpen, searchQuery, setSearchQuery } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K to toggle search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = INITIAL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.oem.toLowerCase().includes(query.toLowerCase()) ||
          p.models.some((m) => m.toLowerCase().includes(query.toLowerCase())),
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const navLinks = [
    { path: "/shop", label: "SHOP CATALOG" },
    { path: "/shop?category=exterior", label: "CARBON AERO" },
    { path: "/shop?sort=model", label: "BMW MODELS" },
    { path: "/about", label: "ABOUT US" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-tag">
            <span className="m-stripe-pill"></span> 100% Genuine BMW M
            Performance Hardware
          </span>
          <span className="announcement-info">
            Fast Worldwide Delivery | VIN Fitment Verification Guaranteed
          </span>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className={`header-main ${isScrolled ? "header-scrolled" : ""}`}>
        <div className="container header-container">
          {/* Logo */}
          <Link
            to="/"
            className="header-logo"
            aria-label="DP Motorhub Homepage"
          >
            <span className="logo-brand logo-text-premium">DP MOTORHUB</span>
            <div className="m-stripe"></div>
          </Link>

          {/* Navigation Links */}
          <nav className="header-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            <button
              className="action-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Search Modal (Press Ctrl+K)"
              title="Search Parts (Ctrl+K)"
            >
              <Search size={18} />
              <span className="kbd-shortcut">⌘K</span>
            </button>

            <button className="action-icon-btn" aria-label="User Account">
              <User size={18} />
            </button>

            <button
              className="action-icon-btn cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open Shopping Cart with ${totalItems} items`}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <Search size={20} color="var(--m-blue)" />
              <input
                type="text"
                placeholder="Search by part name, OEM #, or chassis (e.g. G80 M3)..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="search-modal-input"
              />
              <button
                className="search-modal-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search modal"
              >
                <X size={20} />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="search-results-container">
                <div className="search-results-count">
                  {searchResults.length} genuine parts found
                </div>
                <div className="search-results-list">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.id}`}
                      className="search-result-item"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="search-item-thumb"
                      />
                      <div className="search-item-info">
                        <div className="search-item-title">{item.name}</div>
                        <div className="search-item-oem">
                          OEM #{item.oem} • {item.models.join(", ")}
                        </div>
                      </div>
                      <div className="search-item-price price">
                        LKR {item.price.toLocaleString()}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
