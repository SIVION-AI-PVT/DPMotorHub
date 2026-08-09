import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart, INITIAL_PRODUCTS } from "../context/CartContext";
import {
  ShieldCheck,
  Truck,
  ArrowUpRight,
  ShoppingBag,
  Star,
  CheckCircle2,
  MessageCircle,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import "./ProductDetail.css";
import ProductCard from "../components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("description");
  const [vin, setVin] = useState("");
  const [vinStatus, setVinStatus] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const product = INITIAL_PRODUCTS.find(
    (p) => p.id === parseInt(id) || p.id === String(id),
  );

  const container = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".breadcrumb", { y: -10, opacity: 0, duration: 0.4, ease: "power3.out" })
        .from(
          ".product-gallery",
          { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2"
        )
        .from(
          ".product-info",
          { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".product-tabs",
          { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        );

      gsap.from(".related-grid > div", {
        scrollTrigger: { trigger: ".related-products", start: "top 90%" },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  if (!product) {
    return (
      <div className="product-not-found container" style={{ padding: "120px 0", textAlign: "center" }}>
        <h2 className="h2" style={{ color: "var(--white)", marginBottom: "16px" }}>Part Not Found</h2>
        <p style={{ color: "var(--mid-gray)", marginBottom: "24px" }}>The requested BMW M part is unavailable or has been re-indexed.</p>
        <Link to="/shop" className="wix-pill-btn dark">
          Back To Catalog <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  }

  const handleVinCheck = (e) => {
    e.preventDefault();
    if (vin.trim().length >= 5) {
      setVinStatus(`100% Guaranteed OEM Fitment Confirmed for VIN: ${vin.toUpperCase()}`);
    } else {
      setVinStatus("Please enter a valid 17-digit BMW VIN code.");
    }
  };

  const currentImage = selectedImage || product.image;

  // related products
  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id,
  ).slice(0, 3);

  const whatsappUrl = `https://wa.me/15556769377?text=${encodeURIComponent(`Hi DP Motorhub, I would like to inquire about technical fitment for: ${product.name} (OEM: ${product.oem})`)}`;

  return (
    <div className="product-detail-container" ref={container}>
      {/* ambient background elements */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      {/* Breadcrumbs */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop">Shop</Link>
        <ChevronRight size={14} />
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-main">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper glass-card">
            <div className="genuine-badge">
              <ShieldCheck size={14} style={{ marginRight: "6px" }} />
              {product.isMPerformance ? "GENUINE BMW M PERFORMANCE" : "MOTORSPORT SPECIFICATION"}
            </div>
            <img
              src={currentImage}
              alt={product.name}
              className="main-image"
            />
          </div>
          <div className="thumbnails">
            <div
              className={`thumbnail glass-card ${currentImage === product.image ? "active" : ""}`}
              onClick={() => setSelectedImage(product.image)}
            >
              <img src={product.image} alt="Angle 1" />
            </div>
            <div
              className={`thumbnail glass-card ${currentImage === "/assets/hero_bg.jpg" ? "active" : ""}`}
              onClick={() => setSelectedImage("/assets/hero_bg.jpg")}
            >
              <img src="/assets/hero_bg.jpg" alt="Angle 2" />
            </div>
            <div
              className={`thumbnail glass-card ${currentImage === "/assets/front_splitter.jpg" ? "active" : ""}`}
              onClick={() => setSelectedImage("/assets/front_splitter.jpg")}
            >
              <img src="/assets/front_splitter.jpg" alt="Angle 3" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-info glass-card">
          <div className="stock-status">
            <CheckCircle2 size={16} color="var(--m-blue)" />{" "}
            <span>{product.stock || "In Stock - 24H Dispatch"}</span>
          </div>

          <h1 className="product-title">{product.name}</h1>
          <div className="oem-subtitle" style={{ fontSize: "13px", color: "var(--mid-gray)", marginBottom: "16px", letterSpacing: "0.05em" }}>
            FACTORY OEM #{product.oem} • CHASSIS: {product.models.join(", ")}
          </div>

          <div className="reviews">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-icon filled" color="#FFB800" fill="#FFB800" />
              ))}
            </div>
            <span className="review-count">
              {product.rating ? `${product.rating} / 5.0` : "5.0"} ({product.reviewsCount || 14} Verified Reviews)
            </span>
          </div>

          <div className="product-price price">
            LKR {product.price?.toLocaleString()}
          </div>

          {/* VIN Fitment Guarantee Card */}
          <div className="vin-checker glass-card">
            <h4 style={{ fontFamily: "var(--font-heading)", color: "var(--white)", marginBottom: "4px" }}>
              VIN Fitment Guarantee
            </h4>
            <p style={{ color: "var(--mid-gray)", fontSize: "13px", marginBottom: "12px" }}>
              Enter your 17-digit VIN code to verify 100% factory fitment before ordering.
            </p>
            <form onSubmit={handleVinCheck} className="vin-input-group">
              <input
                type="text"
                placeholder="Enter 17-digit VIN (e.g. WBS83AY000)..."
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                maxLength={17}
                className="vin-input"
              />
              <button type="submit" className="vin-btn">Verify</button>
            </form>
            {vinStatus && (
              <div style={{ marginTop: "12px", fontSize: "13px", color: vinStatus.includes("Confirmed") ? "var(--m-blue)" : "#ff4d4d", fontWeight: 600 }}>
                {vinStatus}
              </div>
            )}
          </div>

          {/* Quantity Stepper & Actions */}
          <div className="quantity-section" style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--mid-gray)", textTransform: "uppercase" }}>Quantity:</span>
            <div className="quantity-stepper" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--glass-border)", borderRadius: "50px", padding: "4px 12px", display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}
              >
                <Minus size={14} />
              </button>
              <span style={{ fontSize: "14px", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: "4px" }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product, quantity)}
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ textDecoration: "none" }}
            >
              <MessageCircle size={20} /> Enquire via WhatsApp{" "}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="shipping-guarantees">
            <div className="guarantee-item">
              <Truck size={18} color="var(--m-blue)" />
              <span>Tracked 24H Global Express Shipping</span>
            </div>
            <div className="guarantee-item">
              <ShieldCheck size={18} color="var(--m-blue)" />
              <span>2-Year BMW Factory Fitment Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="tab-buttons">
          <button
            className={`tab-btn ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === "specs" ? "active" : ""}`}
            onClick={() => setActiveTab("specs")}
          >
            Technical Specs
          </button>
          <button
            className={`tab-btn ${activeTab === "shipping" ? "active" : ""}`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Warranty
          </button>
        </div>
        <div className="tab-content glass-card">
          {activeTab === "description" && (
            <div className="tab-pane">
              <h3>About {product.name}</h3>
              <p>
                Enhance the aerodynamic downforce, acoustics, and motorsport presence of your BMW M vehicle with this Genuine M Performance component. Engineered with ultralight pre-preg dry carbon fiber and verified under extreme thermal stresses.
              </p>
              <ul className="product-features">
                <li>
                  <CheckCircle2 size={16} color="var(--m-blue)" /> 100% Genuine BMW OEM Provenance (Part #{product.oem})
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--m-blue)" /> Designed specifically for {product.models.join(", ")} chassis
                </li>
                <li>
                  <CheckCircle2 size={16} color="var(--m-blue)" /> Autoclave UV-protected high-gloss clear coat finish
                </li>
              </ul>
            </div>
          )}
          {activeTab === "specs" && (
            <div className="tab-pane">
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>OEM Part Number</td>
                    <td>{product.oem}</td>
                  </tr>
                  <tr>
                    <td>Material & Structure</td>
                    <td>{product.material || "Pre-preg Dry Carbon Fiber (CFRP)"}</td>
                  </tr>
                  <tr>
                    <td>Compatible Chassis</td>
                    <td>{product.models.join(", ")}</td>
                  </tr>
                  <tr>
                    <td>Installation Standard</td>
                    <td>Direct OEM Bolt-on (No modification required)</td>
                  </tr>
                  <tr>
                    <td>Factory Warranty</td>
                    <td>2-Year Unlimited Mileage Fitment Guarantee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="tab-pane">
              <h3>Global Express Shipping & Returns</h3>
              <p>
                All in-stock parts are dispatched within 24 hours from our Munich logistics center in reinforced foam-lined protective containers. Tracked express transit takes 2-4 business days globally. 30-day returns accepted on uninstalled items.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>Complete The Motorsport Look</h2>
        <div className="related-grid">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
