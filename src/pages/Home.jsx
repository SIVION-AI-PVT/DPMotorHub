import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
import {
  ShieldCheck,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Award,
  Key,
  Truck,
  CheckSquare,
  Settings,
  Zap,
  Compass,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import GoogleMapEmbed from "../components/GoogleMapEmbed";
import { useCart } from "../context/CartContext";
import "./Home.css";

const M5_FEATURES = [
  {
    id: "01",
    name: "THE TRACK",
    detail: "635 HP, S63 4.4L V8 Twin-Turbo Engine",
  },
  {
    id: "02",
    name: "EXHAUST SYSTEM",
    detail: "Grade-1 Titanium Quad Acoustics",
  },
  {
    id: "03",
    name: "AERODYNAMICS",
    detail: "Pre-preg Carbon Fiber Hood & Splitter",
  },
  {
    id: "04",
    name: "ALCANTARA & TRIM",
    detail: "M Carbon Bucket Seats & Tricolor Stitch",
  },
];

export default function Home() {
  const container = useRef(null);

  useGSAP(
    () => {
      // Hero Animation
      const tl = gsap.timeline();
      tl.from(".stitch-hero-title", {
        y: 60,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.95,
        duration: 1,
        ease: "expo.out",
        delay: 0.2,
      })
        .from(
          ".stitch-hero-subtitle",
          {
            y: 30,
            opacity: 0,
            filter: "blur(5px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.7",
        )
        .from(
          ".stitch-hero-actions a",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".hero-finder-bar",
          {
            y: 50,
            opacity: 0,
            filter: "blur(10px)",
            duration: 1,
            ease: "back.out(1.5)",
          },
          "-=0.5",
        );

    },
    { scope: container },
  );

  const navigate = useNavigate();
  const { products } = useCart();
  const [selectedChassis, setSelectedChassis] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeModelTab, setActiveModelTab] = useState("all");
  const [vinInput, setVinInput] = useState("");
  const [vinVerified, setVinVerified] = useState(false);

  const handleFinderSearch = (e) => {
    e.preventDefault();
    let query = "/shop?";
    if (selectedChassis)
      query += `chassis=${encodeURIComponent(selectedChassis)}&`;
    if (selectedCategory)
      query += `category=${encodeURIComponent(selectedCategory)}`;
    navigate(query);
  };

  const handleVinVerify = (e) => {
    e.preventDefault();
    if (vinInput.trim().length >= 5) {
      setVinVerified(true);
    }
  };

  const inventoryProducts =
    activeModelTab === "all"
      ? products
      : products.filter((p) =>
          p.models?.some((m) =>
            m.toLowerCase().includes(activeModelTab.toLowerCase()),
          ),
        );

  return (
    <div className="home-stitch-ui" ref={container}>
      {/* 1. STITCH HERO: BORN ON THE TRACK */}
      <section className="stitch-hero">
        <div className="stitch-hero-bg">
          <img
            src="/assets/hero_bg.jpg"
            alt="BMW M5 Hero"
            className="hero-bg"
          />{" "}
          <div className="stitch-hero-overlay"></div>
        </div>

        <div className="container stitch-hero-container">
          <h1 className="stitch-hero-title">BORN ON THE TRACK</h1>

          <p className="stitch-hero-subtitle">
            Uncompromising dynamics. Precision engineering. Experience the
            pinnacle of motorsport performance where every detail is designed
            for velocity.
          </p>

          <div className="stitch-hero-actions">
            <Link to="/shop" className="wix-pill-btn dark">
              EXPLORE PARTS <ArrowUpRight size={18} />
            </Link>
            <Link to="/shop?sort=model" className="wix-pill-btn orange">
              CONFIGURE M-CAR <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Floating Vehicle Finder Bar */}
          <div className="hero-finder-bar">
            <form onSubmit={handleFinderSearch} className="hero-finder-form">
              <div className="finder-input-group">
                <label>CHASSIS / MODEL</label>
                <select
                  value={selectedChassis}
                  onChange={(e) => setSelectedChassis(e.target.value)}
                >
                  <option value="">
                    Select BMW Model (e.g. G80 M3, F90 M5)...
                  </option>
                  <option value="G80 M3">G80 M3 Sedan (2021+)</option>
                  <option value="G82 M4">G82 M4 Coupe (2021+)</option>
                  <option value="F80 M3">F80 M3 Sedan (2014-2018)</option>
                  <option value="F82 M4">F82 M4 Coupe (2014-2020)</option>
                  <option value="F90 M5">F90 M5 Sedan (2018+)</option>
                  <option value="F87 M2">F87 M2 Coupe (2016-2021)</option>
                </select>
              </div>

              <div className="finder-input-group">
                <label>PART CATEGORY</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories...</option>
                  <option value="engine">Engine & Performance</option>
                  <option value="brakes-suspension">Brakes & Suspension</option>
                  <option value="exterior">Exterior & Carbon Aero</option>
                  <option value="wheels">Wheels & Spacers</option>
                  <option value="interior">Interior & Trim</option>
                </select>
              </div>

              <button
                type="submit"
                className="wix-pill-btn accent finder-submit-btn"
              >
                FIND FITMENT <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* LUXURY MOTORSPORT STATS BAR */}
      <section className="luxury-stats-bar">
        <div className="container luxury-stats-grid">
          <div className="luxury-stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">GENUINE BMW M OEM</div>
          </div>
          <div className="stat-divider"></div>
          <div className="luxury-stat-item">
            <div className="stat-value">NÜRBURGRING</div>
            <div className="stat-label">TRACK-ENGINEERED</div>
          </div>
          <div className="stat-divider"></div>
          <div className="luxury-stat-item">
            <div className="stat-value">24-HOUR</div>
            <div className="stat-label">EXPRESS AIR FREIGHT</div>
          </div>
          <div className="stat-divider"></div>
          <div className="luxury-stat-item">
            <div className="stat-value">5,000+</div>
            <div className="stat-label">M CARS EQUIPPED</div>
          </div>
        </div>
      </section>

      {/* 2. STITCH FEATURE SHOWCASE: M5 CS THE PEAK OF PERFORMANCE */}
      <section className="section stitch-showcase-section">
        <div className="container">
          <div className="stitch-showcase-grid">
            {/* Left Image Showcase */}
            <div className="stitch-showcase-media">
              <img
                src="/assets/exhaust_system.jpg"
                alt="BMW M5 CS Titanium Exhaust System"
                className="w-full h-full object-cover"
              />
              <div className="stitch-showcase-badge">
                <Zap size={16} />
                <span>M5 CS SPECIFICATION</span>
              </div>
              <div className="stitch-media-title-overlay">
                <div className="caption">THE ALL-NEW</div>
                <h3 className="h1">BMW M5 CS</h3>
              </div>
            </div>

            {/* Right Specs List */}
            <div className="stitch-showcase-info">
              <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "10px" }}>
                ENGINEERING HIGHLIGHTS
              </div>
              <h2 className="wix-main-h2" style={{ marginBottom: "28px" }}>
                The Peak Of Performance
              </h2>

              <div className="stitch-specs-list">
                {M5_FEATURES.map((spec) => (
                  <div key={spec.id} className="stitch-spec-card">
                    <span className="stitch-spec-id">{spec.id}</span>
                    <div style={{ flex: 1 }}>
                      <h4 className="stitch-spec-name">{spec.name}</h4>
                      <p className="stitch-spec-detail">{spec.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "32px" }}>
                <Link to="/shop?chassis=F90" className="wix-pill-btn dark" style={{ width: "100%", justifyContent: "center" }}>
                  EXPLORE M5 CS PARTS <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STITCH SECTION: PRECISION VERIFICATION & VIN CHECKER */}
      <section className="section stitch-verification-section">
        <div
          className="container text-center"
          style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto" }}
        >
          <div
            className="eyebrow"
            style={{ justifyContent: "center", marginBottom: "12px" }}
          >
            VIN FITMENT SEARCH
          </div>
          <h2 className="wix-main-h2" style={{ marginBottom: "16px" }}>
            PRECISION VERIFICATION
          </h2>
          <p
            className="body-text"
            style={{ color: "var(--mid-gray)", marginBottom: "36px" }}
          >
            Select your M chassis code or enter your 17-digit VIN to unlock a
            bespoke catalog of genuine M Performance parts engineered
            specifically for your vehicle.
          </p>

          {/* VIN Form */}
          <form onSubmit={handleVinVerify} className="stitch-vin-form">
            <input
              type="text"
              placeholder="ENTER 17-DIGIT VIN HERE (e.g. WBS83AY000)..."
              value={vinInput}
              onChange={(e) => setVinInput(e.target.value)}
              maxLength={17}
              className="stitch-vin-input"
            />
            <button type="submit" className="wix-pill-btn orange">
              VERIFY <ArrowUpRight size={18} />
            </button>
          </form>

          {vinVerified && (
            <div className="stitch-vin-success">
              <CheckCircle2 size={18} color="var(--m-blue)" />
              <span>
                100% Guaranteed BMW OEM Fitment Verified for VIN:{" "}
                {vinInput.toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 4. STITCH SECTION: THE M COLLECTION | INVENTORY */}
      <section className="section stitch-inventory-section dark-section">
        <div className="container">
          <div className="wix-section-split-header">
            <div>
              <div
                className="eyebrow"
                style={{ color: "var(--m-blue)", marginBottom: "8px" }}
              >
                CATALOG SELECTION
              </div>
              <h2 className="wix-main-h2 dark">AVAILABLE M-INVENTORY</h2>
            </div>

            <div className="tab-buttons-container">
              {[
                { id: "all", label: "ALL MODELS" },
                { id: "G80", label: "G80 M3" },
                { id: "G82", label: "G82 M4" },
                { id: "F90", label: "F90 M5" },
                { id: "F87", label: "F87 M2" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-filter-btn ${activeModelTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveModelTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 shop-grid">
            {inventoryProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <Link to="/shop" className="wix-pill-btn dark">
              VIEW FULL INVENTORY <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY DP MOTORHUB? DARK GRID SECTION */}
      <section className="section wix-why-section dark-section">
        <div className="container">
          <h2 className="wix-main-h2 dark">
            Why DP
            <br />
            Motorhub?
          </h2>

          <div className="wix-why-grid">
            <div className="wix-why-card">
              <div className="wix-why-icon">
                <ShieldCheck size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">Only Certified Motors & OEM</h3>
              <p className="wix-why-desc">
                100% genuine BMW M parts and certified tuning components with
                factory warranties.
              </p>
            </div>

            <div className="wix-why-card">
              <div className="wix-why-icon">
                <Key size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">VIN Fitment Verification</h3>
              <p className="wix-why-desc">
                Enter your 17-digit VIN to confirm exact factory compatibility
                before ordering.
              </p>
            </div>

            <div className="wix-why-card">
              <div className="wix-why-icon">
                <Truck size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">Free Express Delivery</h3>
              <p className="wix-why-desc">
                Worldwide 24-hour dispatch on all in-stock carbon fiber and
                performance parts.
              </p>
            </div>

            <div className="wix-why-card">
              <div className="wix-why-icon">
                <CheckSquare size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">30 Days Money Back</h3>
              <p className="wix-why-desc">
                Full 30-day return policy for uninstalled components in original
                packaging.
              </p>
            </div>

            <div className="wix-why-card">
              <div className="wix-why-icon">
                <Award size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">Pre-Approved Quality</h3>
              <p className="wix-why-desc">
                Every part is inspected under high-intensity UV lighting for
                weave symmetry and finish.
              </p>
            </div>

            <div className="wix-why-card">
              <div className="wix-why-icon">
                <Settings size={22} color="var(--white)" />
              </div>
              <h3 className="wix-why-title">Extra Service & Support</h3>
              <p className="wix-why-desc">
                BMW Master Technicians on standby for torque specs, installation
                guides, and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP INSTANT SOURCING BANNER */}
      <section className="section wix-promo-banner-section">
        <div className="container text-center" style={{ textAlign: "center" }}>
          <h2 className="wix-promo-title">
            Need a rare M part?
            <br />
            We're here for you: 100% genuine
            <br />
            VIN fitment & express sourcing
          </h2>

          <div style={{ marginTop: "32px" }}>
            <a
              href="https://wa.me/15556769377"
              target="_blank"
              rel="noreferrer"
              className="wix-pill-btn orange"
            >
              Find Out More <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FULL BLEED MEDIA BREAK */}
      <section className="wix-media-break">
        <img
          src="/assets/rear_diffuser.jpg"
          alt="BMW M Performance Engineering"
          className="wix-why-bg"
        />
      </section>

      {/* 8. VISIT US & DRIVE AWAY WITH YOUR NEW CAR / CONTACT & MAP */}
      <section className="section wix-contact-map-section dark-section">
        <div className="container">
          <div
            className="grid grid-cols-2 wix-contact-grid"
            style={{ gap: "48px", alignItems: "center" }}
          >
            <div className="wix-contact-info-col">
              <div
                className="eyebrow"
                style={{ color: "var(--m-blue)", marginBottom: "8px" }}
              >
                SHOWROOM &amp; WORKSHOP
              </div>
              <h2 className="wix-main-h2 dark" style={{ marginBottom: "24px" }}>
                Visit us &amp; upgrade
                <br />
                your M car today!
              </h2>

              <div className="wix-contact-email">
                <a href="mailto:hello@dpmotorhub.com">hello@dpmotorhub.com</a>
              </div>

              <div className="wix-contact-address">
                <strong style={{ color: "var(--white)" }}>DP Motorhub Showroom &amp; Workshop</strong>
                <br />
                325/1/A/3, Ihala Biyanwila, Kadawatha
                <br />
                Western Province, Sri Lanka
              </div>

              <div className="wix-contact-phones">
                +1 555-676-9377
                <br />
                +1 555-M-POWER
              </div>

              <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="https://maps.app.goo.gl/8nHc8qSnCRHtKBfL6?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wix-pill-btn dark"
                  style={{ padding: "10px 22px", fontSize: "13px" }}
                >
                  Google Maps <ArrowUpRight size={15} />
                </a>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=6.998970,79.963791"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wix-pill-btn orange"
                  style={{ padding: "10px 22px", fontSize: "13px" }}
                >
                  Get Directions <Compass size={15} />
                </a>
              </div>
            </div>

            {/* Live Google Maps Embed Card */}
            <div className="wix-map-wrapper">
              <GoogleMapEmbed
                compact={true}
                height={420}
                title="DP Motorhub Showroom & Workshop"
                subtitle="325/1/A/3, Ihala Biyanwila, Kadawatha"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
