import React, { useState, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Filter,
  X,
  ChevronDown,
  Check,
  RefreshCw,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { INITIAL_PRODUCTS } from "../context/CartContext";
import "./Shop.css";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialChassis = searchParams.get("chassis") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChassis, setSelectedChassis] = useState(
    initialChassis ? [initialChassis] : [],
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory] : [],
  );
  const [mPerformanceOnly, setMPerformanceOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(3000000);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const chassisOptions = [
    { id: "G80 / G82 (M3/M4)", label: "G80 / G82 (M3/M4)" },
    { id: "F80 / F82 (M3/M4)", label: "F80 / F82 (M3/M4)" },
    { id: "F90 (M5)", label: "F90 (M5)" },
    { id: "F87 / G87 (M2)", label: "F87 / G87 (M2)" },
  ];

  const categoryOptions = [
    { id: "engine", label: "Engine & Performance" },
    { id: "brakes-suspension", label: "Brakes & Suspension" },
    { id: "exterior", label: "Exterior & Carbon Aero" },
    { id: "wheels", label: "Wheels & Spacers" },
    { id: "interior", label: "Interior & Trim" },
  ];

  const handleChassisToggle = (id) => {
    setSelectedChassis((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleCategoryToggle = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedChassis([]);
    setSelectedCategories([]);
    setMPerformanceOnly(false);
    setMaxPrice(3000000);
    setSortBy("featured");
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return INITIAL_PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesOem = product.oem.toLowerCase().includes(q);
        if (!matchesName && !matchesOem) return false;
      }

      // Chassis
      if (selectedChassis.length > 0) {
        const matches = product.models.some((m) =>
          selectedChassis.some(
            (sc) =>
              sc.toLowerCase().includes(m.toLowerCase()) ||
              m.toLowerCase().includes(sc.split(" ")[0].toLowerCase()),
          ),
        );
        if (!matches) return false;
      }

      // Category
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }

      // M Performance Only
      if (mPerformanceOnly && !product.isMPerformance) {
        return false;
      }

      // Price
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [
    searchQuery,
    selectedChassis,
    selectedCategories,
    mPerformanceOnly,
    maxPrice,
    sortBy,
  ]);

  const container = useRef(null);
  useGSAP(
    () => {
      // Clean mount
    },
    { scope: container },
  );

  useGSAP(
    () => {
      // Products Grid Animation on mount or filter change
      if (filteredProducts.length > 0) {
        gsap.fromTo(
          ".shop-grid > div",
          { y: 40, opacity: 0, filter: "blur(8px)", scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      }
    },
    { dependencies: [filteredProducts], scope: container },
  );

  return (
    <div className="shop-page" ref={container}>
      <div className="container">
        {/* Header */}
        <div
          className="wix-section-split-header"
          style={{ marginBottom: "40px" }}
        >
          <div>
            <div className="eyebrow" style={{ marginBottom: "8px" }}>
              BMW MOTORSPORT CATALOG
            </div>
            <h1 className="wix-main-h2">M PERFORMANCE CATALOG</h1>
          </div>
          <p
            className="body-text"
            style={{
              color: "var(--mid-gray)",
              maxWidth: "420px",
              fontSize: "14px",
            }}
          >
            Explore genuine BMW M components, dry carbon fiber aerodynamic kits,
            and track-engineered upgrades verified for Nürburgring performance.
          </p>
        </div>

        {/* Active Filter Chips */}
        {(selectedChassis.length > 0 ||
          selectedCategories.length > 0 ||
          mPerformanceOnly ||
          searchQuery) && (
          <div className="active-filter-chips">
            <span className="chips-label">ACTIVE FILTERS:</span>
            {searchQuery && (
              <span className="filter-chip">
                Search: "{searchQuery}"{" "}
                <X size={14} onClick={() => setSearchQuery("")} />
              </span>
            )}
            {selectedChassis.map((c) => (
              <span key={c} className="filter-chip">
                {c} <X size={14} onClick={() => handleChassisToggle(c)} />
              </span>
            ))}
            {selectedCategories.map((c) => (
              <span key={c} className="filter-chip">
                {c} <X size={14} onClick={() => handleCategoryToggle(c)} />
              </span>
            ))}
            {mPerformanceOnly && (
              <span className="filter-chip">
                Genuine M Only{" "}
                <X size={14} onClick={() => setMPerformanceOnly(false)} />
              </span>
            )}
            <button className="clear-chips-btn" onClick={clearAllFilters}>
              Clear All
            </button>
          </div>
        )}

        <div className="shop-layout">
          {/* Sidebar Filters */}
          <aside className={`shop-sidebar ${isFilterDrawerOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <div className="sidebar-title">
                <SlidersHorizontal size={18} />
                <span>FILTERS</span>
              </div>
              <button
                className="sidebar-close-btn"
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-label="Close Filter Drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search Input */}
            <div className="filter-group">
              <label className="filter-label">Search Catalog</label>
              <input
                type="text"
                placeholder="Part name or OEM #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-search-input"
              />
            </div>

            {/* Chassis Filter */}
            <div className="filter-group">
              <label className="filter-label">BMW Chassis / Model</label>
              <div className="checkbox-list">
                {chassisOptions.map((option) => (
                  <label key={option.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedChassis.includes(option.id)}
                      onChange={() => handleChassisToggle(option.id)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Categories</label>
              <div className="checkbox-list">
                {categoryOptions.map((option) => (
                  <label key={option.id} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(option.id)}
                      onChange={() => handleCategoryToggle(option.id)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* M Performance Only Toggle */}
            <div className="filter-group">
              <label className="filter-label">Brand Specification</label>
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  checked={mPerformanceOnly}
                  onChange={(e) => setMPerformanceOnly(e.target.checked)}
                />
                <span>Genuine M Performance Only</span>
              </label>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <div className="filter-label-row">
                <label className="filter-label">Max Price</label>
                <span className="price-value price">
                  LKR {maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="150000"
                max="3000000"
                step="50000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-slider"
              />
            </div>

            <button
              className="wix-pill-btn dark clear-all-sidebar-btn"
              onClick={clearAllFilters}
            >
              Reset Filters <RefreshCw size={14} />
            </button>
          </aside>

          {/* Main Grid Area */}
          <main className="shop-main-content">
            <div className="shop-controls-bar">
              <button
                className="mobile-filter-trigger wix-pill-btn dark"
                onClick={() => setIsFilterDrawerOpen(true)}
              >
                <Filter size={16} /> Filters
              </button>

              <div className="results-count">
                Showing <strong>{filteredProducts.length}</strong> genuine parts
              </div>

              <div className="sort-dropdown-container">
                <label htmlFor="sort-select" className="sort-label">
                  Sort By:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured & Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-state">
                <Filter size={48} color="var(--mid-gray)" />
                <h3
                  className="h3"
                  style={{ marginTop: "16px", marginBottom: "8px" }}
                >
                  No Parts Match Your Selection
                </h3>
                <p
                  className="body-text"
                  style={{
                    color: "var(--mid-gray)",
                    fontSize: "14px",
                    marginBottom: "24px",
                  }}
                >
                  Try resetting your price range or chassis filter to view
                  available inventory.
                </p>
                <button className="wix-pill-btn dark" onClick={clearAllFilters}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 shop-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
