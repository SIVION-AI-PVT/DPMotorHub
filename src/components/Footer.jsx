import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MessageCircle } from 'lucide-react';
import './Footer.css';
import Button from './Button';

export default function Footer() {
  return (
    <footer className="footer dark-section">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-col">
            <div className="footer-logo">
              DP MOTORHUB
              <div className="m-stripe"></div>
            </div>
            <p className="footer-brand-line">
              Premium genuine and aftermarket performance parts for BMW M-Series enthusiasts.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="Website"><Globe size={20} /></a>
              <a href="#" aria-label="Message"><MessageCircle size={20} /></a>
              <a href="#" aria-label="Email"><Mail size={20} /></a>
              <a href="#" aria-label="Phone"><Phone size={20} /></a>
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="eyebrow footer-heading">Shop</h4>
            <ul className="footer-links">
              <li><Link to="/shop?category=engine">Engine</Link></li>
              <li><Link to="/shop?category=brakes">Brakes & Suspension</Link></li>
              <li><Link to="/shop?category=exterior">Exterior</Link></li>
              <li><Link to="/shop?category=wheels">Wheels</Link></li>
              <li><Link to="/shop?category=interior">Interior</Link></li>
              <li><Link to="/shop?category=electronics">Electronics</Link></li>
            </ul>
          </div>
          
          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="eyebrow footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/warranty">Warranty Policy</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
            </ul>
          </div>
          
          {/* Column 4 */}
          <div className="footer-col">
            <h4 className="eyebrow footer-heading">Newsletter</h4>
            <p className="footer-text">Subscribe for new product drops and exclusive offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <Button variant="primary">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} DP Motorhub. All Rights Reserved.</p>
          <div className="footer-fineprint">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
