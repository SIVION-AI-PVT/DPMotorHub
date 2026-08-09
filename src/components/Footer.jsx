import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  Phone,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  Check,
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="glass-footer"
      style={{
        background: "rgba(8, 8, 12, 0.95)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.12)",
      }}
    >
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: DP MOTORHUB Logo, M Tri-Stripe, Description, Badge, Social Icons */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img
                src="/assets/Artboard 1 copy.png"
                alt="DP Emblem"
                className="footer-logo-icon"
              />
              <div className="footer-logo-text-wrapper">
                <span className="footer-logo-text logo-text-premium">
                  MOTORHUB
                </span>
                <div className="footer-m-stripe"></div>
              </div>
            </Link>
            <p className="footer-description">
              Specialist retailer of authentic BMW M Performance parts, dry
              carbon fiber aerodynamic components, and track-engineered
              upgrades.
            </p>

            <div className="footer-trust-badge">
              <ShieldCheck size={16} color="#008AC9" />
              <span>100% Genuine BMW OEM Guaranteed</span>
            </div>

            <div className="footer-social-row">
              <a
                href="https://wa.me/15556769377"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp Support"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="mailto:sales@dpmotorhub.com"
                className="social-icon-btn"
                aria-label="Email Support"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+15556769377"
                className="social-icon-btn"
                aria-label="Phone Support"
              >
                <Phone size={18} />
              </a>
              <a
                href="#"
                className="social-icon-btn"
                aria-label="Global Support"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: M PARTS CATALOG Heading & Links */}
          <div>
            <h4 className="footer-heading">M PARTS CATALOG</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/shop?category=engine" className="footer-nav-link">
                  Engine &amp; Performance
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=brakes-suspension"
                  className="footer-nav-link"
                >
                  Brakes &amp; Suspension
                </Link>
              </li>
              <li>
                <Link to="/shop?category=exterior" className="footer-nav-link">
                  Exterior &amp; Carbon Aero
                </Link>
              </li>
              <li>
                <Link to="/shop?category=wheels" className="footer-nav-link">
                  Wheels &amp; Spacers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=interior" className="footer-nav-link">
                  Interior &amp; Trim
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: BMW M CHASSIS Heading & Links */}
          <div>
            <h4 className="footer-heading">BMW M CHASSIS</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/shop?chassis=G80" className="footer-nav-link">
                  BMW G80 M3 / G82 M4
                </Link>
              </li>
              <li>
                <Link to="/shop?chassis=F80" className="footer-nav-link">
                  BMW F80 M3 / F82 M4
                </Link>
              </li>
              <li>
                <Link to="/shop?chassis=F90" className="footer-nav-link">
                  BMW F90 M5 Competition
                </Link>
              </li>
              <li>
                <Link to="/shop?chassis=F87" className="footer-nav-link">
                  BMW F87 M2 / G87 M2
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-nav-link">
                  About DP Motorhub
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-nav-link">
                  Technical Fitment Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: INSIDER ACCESS Heading, Glass Input, Pill Button */}
          <div>
            <h4 className="footer-heading">INSIDER ACCESS</h4>
            <p className="newsletter-subtext">
              Subscribe for limited M Performance part drops and technical
              fitment bulletins.
            </p>

            {subscribed ? (
              <div className="glass-subscribed-toast">
                <Check size={16} color="#008AC9" />
                <span>Thank you! You've been added to our M Insider list.</span>
              </div>
            ) : (
              <form
                className="glass-newsletter-form"
                onSubmit={handleSubscribe}
              >
                <div className="glass-input-wrapper">
                  <input
                    type="email"
                    className="glass-input"
                    placeholder="Enter your email address..."
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="glass-pill-btn"
                  style={{ borderRadius: "50px" }}
                >
                  <span>SUBSCRIBE</span>
                  <ArrowUpRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright, Payment Badges, Legal Links */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} DP Motorhub GmbH. All Rights
            Reserved. Not affiliated with BMW AG.
          </p>

          <div className="payment-badges-row">
            <span className="payment-chip-badge">VISA</span>
            <span className="payment-chip-badge">MASTERCARD</span>
            <span className="payment-chip-badge">APPLE PAY</span>
            <span className="payment-chip-badge">PAYPAL</span>
            <span className="payment-chip-badge">KLARNA</span>
          </div>

          <div className="footer-legal-links">
            <Link to="/contact" className="footer-legal-link">
              Privacy Policy
            </Link>
            <Link to="/contact" className="footer-legal-link">
              Terms of Service
            </Link>
            <Link to="/contact" className="footer-legal-link">
              Shipping &amp; Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
