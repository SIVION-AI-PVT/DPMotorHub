import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header({ onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          DP MOTORHUB
          <div className="m-stripe"></div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/shop" className="nav-link" onClick={() => setMobileMenuOpen(false)}>SHOP</Link>
          <div className="nav-dropdown-wrapper">
            <span className="nav-link">CATEGORIES</span>
            <div className="nav-dropdown">
              <Link to="/shop?category=engine">Engine</Link>
              <Link to="/shop?category=brakes-suspension">Brakes & Suspension</Link>
              <Link to="/shop?category=exterior">Exterior</Link>
              <Link to="/shop?category=wheels">Wheels</Link>
              <Link to="/shop?category=interior">Interior</Link>
              <Link to="/shop?category=electronics">Electronics</Link>
            </div>
          </div>
          <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>ABOUT</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>CONTACT</Link>
        </nav>

        {/* Right Icons */}
        <div className="header-actions">
          <button className="icon-btn"><Search size={20} strokeWidth={1.5} /></button>
          <button className="icon-btn"><User size={20} strokeWidth={1.5} /></button>
          <button className="icon-btn cart-btn" onClick={onOpenCart}>
            <ShoppingCart size={20} strokeWidth={1.5} />
            <span className="cart-badge">2</span>
          </button>
        </div>
      </div>
    </header>
  );
}
