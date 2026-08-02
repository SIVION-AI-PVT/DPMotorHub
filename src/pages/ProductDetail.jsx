import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
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
} from "lucide-react";
import "./ProductDetail.css";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("description");
  const [vin, setVin] = useState("");

  const product = INITIAL_PRODUCTS.find(
    (p) => p.id === parseInt(id) || p.id === id,
  );

  const container = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(".breadcrumb", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".product-gallery",
          {
            x: -60,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "expo.out",
          },
          "-=0.2",
        )
        .from(
          ".product-info",
          {
            x: 60,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "expo.out",
          },
          "-=0.8",
        )
        .from(
          ".product-tabs",
          {
            y: 40,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );

      gsap.from(".related-grid > div", {
        scrollTrigger: { trigger: ".related-products", start: "top 80%" },
        y: 50,
        opacity: 0,
        filter: "blur(8px)",
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: container },
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  // related products
  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id,
  ).slice(0, 3);

  return (
    <div className="product-detail-container" ref={container}>
      {/* ambient background elements */}
      <div className="ambient-orb orb-1"></div>
      <div className="ambient-orb orb-2"></div>

      {/* Breadcrumbs */}
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Shop</Link>
        <ChevronRight size={14} />
        <span className="current">{product.name}</span>
      </nav>

      <div className="product-main">
        {/* Left: Image Gallery */}
        <div className="product-gallery">
          <div className="main-image-wrapper glass-card">
            <div className="genuine-badge">GENUINE M PERFORMANCE</div>
            <img
              src={product.image}
              alt={product.name}
              className="main-image"
            />
          </div>
          <div className="thumbnails">
            <div className="thumbnail active glass-card">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="thumbnail glass-card">
              <img src={product.image} alt="thumb" />
            </div>
            <div className="thumbnail glass-card">
              <img src={product.image} alt="thumb" />
            </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-info glass-card">
          <div className="stock-status">
            <CheckCircle2 size={16} color="var(--m-blue, #008AC9)" />{" "}
            <span>In Stock - Ready to Ship</span>
          </div>
          <h1 className="product-title">{product.name}</h1>
          <div className="reviews">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="star-icon filled" />
              ))}
            </div>
            <span className="review-count">12 Reviews</span>
          </div>

          <div className="product-price">
            LKR {product.price?.toLocaleString()}
          </div>

          <div className="vin-checker glass-card">
            <h4>VIN Fitment Guarantee</h4>
            <p>Enter your 17-digit VIN to ensure this part fits your BMW.</p>
            <div className="vin-input-group">
              <input
                type="text"
                placeholder="Enter VIN"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="vin-input"
              />
              <button className="vin-btn">Check</button>
            </div>
          </div>

          <div className="action-buttons">
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
            <button className="whatsapp-btn">
              <MessageCircle size={20} /> Enquire via WhatsApp{" "}
              <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="shipping-guarantees">
            <div className="guarantee-item">
              <Truck size={20} />
              <span>Free Express Shipping</span>
            </div>
            <div className="guarantee-item">
              <ShieldCheck size={20} />
              <span>2-Year BMW Warranty</span>
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
            Shipping
          </button>
        </div>
        <div className="tab-content glass-card">
          {activeTab === "description" && (
            <div className="tab-pane">
              <h3>About this product</h3>
              <p>
                Enhance the aerodynamic performance and aggressive styling of
                your BMW with this Genuine M Performance part. Manufactured from
                premium materials, it ensures a perfect fit and long-lasting
                durability.
              </p>
              <ul className="product-features">
                <li>
                  <CheckCircle2 size={16} /> 100% Genuine BMW Part
                </li>
                <li>
                  <CheckCircle2 size={16} /> Direct bolt-on installation
                </li>
                <li>
                  <CheckCircle2 size={16} /> Factory finish and clear coat
                </li>
              </ul>
            </div>
          )}
          {activeTab === "specs" && (
            <div className="tab-pane">
              <table className="specs-table">
                <tbody>
                  <tr>
                    <td>Material</td>
                    <td>Carbon Fiber / ABS</td>
                  </tr>
                  <tr>
                    <td>Installation</td>
                    <td>Professional recommended</td>
                  </tr>
                  <tr>
                    <td>Warranty</td>
                    <td>2 Years</td>
                  </tr>
                  <tr>
                    <td>Part Number</td>
                    <td>{product.id}M-PERF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "shipping" && (
            <div className="tab-pane">
              <h3>Shipping Information</h3>
              <p>
                All in-stock items are shipped within 24 hours. Express delivery
                takes 2-3 business days.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <div className="related-products">
        <h2>Complete The Look</h2>
        <div className="related-grid">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
