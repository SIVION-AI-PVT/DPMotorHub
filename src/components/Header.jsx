import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  X,
  Menu,
  ArrowUpRight,
  CheckCircle2,
  Sun,
  Moon,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const {
    totalItems,
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    products,
    siteSettings,
  } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Keyboard shortcut Cmd+K or Ctrl+K to toggle search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const filtered = (products || []).filter(
        (p) =>
          p.name?.toLowerCase().includes(query.toLowerCase()) ||
          p.oem?.toLowerCase().includes(query.toLowerCase()) ||
          p.models?.some((m) => m.toLowerCase().includes(query.toLowerCase())),
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const navLinks = [
    { path: "/shop", label: "SHOP CATALOG" },
    { path: "/about", label: "ABOUT US" },
    { path: "/contact", label: "CONTACT" },
  ];

  const isLinkActive = (linkPath) => {
    const currentFull = location.pathname + location.search;
    if (linkPath.includes("?")) {
      return currentFull === linkPath;
    }
    return location.pathname === linkPath && !location.search;
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-tag">
            <span className="m-stripe-pill"></span> {siteSettings?.announcementText || "100% Genuine BMW M Performance Hardware"}
          </span>
          <span className="announcement-info">
            {siteSettings?.announcementSubtext || "Fast Worldwide Delivery | VIN Fitment Verification Guaranteed"}
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
            <img
              src="/assets/Artboard 1 copy.png"
              alt="DP Emblem"
              className="header-logo-icon"
            />
            <div className="header-logo-text-wrapper">
              <span className="logo-brand logo-text-premium">{siteSettings?.siteName || "MOTORHUB"}</span>
              <div className="m-stripe"></div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="header-nav" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link ${active ? "active" : ""}`}
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
              <span className="kbd-shortcut">Ctrl K</span>
            </button>

            <button
              className="action-icon-btn theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} theme`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/admin"
              className="action-icon-btn"
              aria-label="Admin Management Console"
              title="Admin Console"
            >
              <User size={18} />
            </Link>

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

            {/* Mobile Menu Toggle */}
            <button
              className="action-icon-btn mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Mobile Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-links">
              {navLinks.map((link) => {
                const active = isLinkActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`mobile-nav-link ${active ? "active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={16} />
                  </Link>
                );
              })}
              <Link
                to="/admin"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>ADMIN CONSOLE</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        )}
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

            <div className="search-results-container">
              <div className="search-results-count">
                {searchQuery.trim()
                  ? `${searchResults.length} genuine parts found`
                  : "POPULAR M PERFORMANCE PARTS"}
              </div>
              <div className="search-results-list">
                {(searchQuery.trim() ? searchResults : (products || [])).map((item) => (
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
                        OEM #{item.oem} • {item.models?.join(", ")}
                      </div>
                    </div>
                    <div className="search-item-price price">
                      LKR {Number(item.price).toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
