import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Settings,
  Database,
  Download,
  Upload,
  RefreshCw,
  Eye,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  X,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Tag,
  DollarSign,
  BarChart3,
  Lock,
  Unlock,
  MessageCircle,
  FileText,
  Truck,
  Check,
  Filter,
  Save,
} from "lucide-react";
import { useCart, INITIAL_PRODUCTS } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import "./Admin.css";

const PRESET_IMAGES = [
  { label: "Front Splitter", path: "/assets/front_splitter.jpg" },
  { label: "Steering Wheel", path: "/assets/steering_wheel.jpg" },
  { label: "Titanium Exhaust", path: "/assets/exhaust_system.jpg" },
  { label: "763M Wheels", path: "/assets/alloy_wheels.jpg" },
  { label: "Carbon Brakes", path: "/assets/brakes.jpg" },
  { label: "Mirror Caps", path: "/assets/mirror_caps.jpg" },
  { label: "Rear Diffuser", path: "/assets/rear_diffuser.jpg" },
  { label: "Cold Air Intake", path: "/assets/air_intake.jpg" },
  { label: "Hero Motorsport", path: "/assets/hero_bg.jpg" },
];

const CHASSIS_OPTIONS = [
  "G80 M3",
  "G82 M4",
  "F80 M3",
  "F82 M4",
  "F90 M5",
  "F87 M2",
  "G87 M2",
  "G81 M3 Touring",
];

const CATEGORY_OPTIONS = [
  { id: "exterior", label: "Exterior & Carbon Aero" },
  { id: "interior", label: "Interior & Cockpit" },
  { id: "engine", label: "Engine & Performance" },
  { id: "wheels", label: "Wheels & Fitment" },
  { id: "brakes-suspension", label: "Brakes & Suspension" },
];

const STOCK_STATUSES = [
  "In Stock",
  "Low Stock (2 Left)",
  "Low Stock (3 Left)",
  "Pre-Order (7-10 Days)",
  "Out of Stock",
];

const ADMIN_PIN = "1972"; // Founded year of BMW M Motorsport

export default function Admin() {
  const { theme, toggleTheme } = useTheme();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    siteSettings,
    updateSiteSettings,
    showNotification,
  } = useCart();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("dpmotorhub_admin_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Navigation
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, products, orders, settings, backup

  // Product Filter & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedChassis, setSelectedChassis] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [viewMode, setViewMode] = useState("table"); // table, cards

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Product Form State
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    price: 500000,
    category: "exterior",
    models: ["G80 M3"],
    image: "/assets/front_splitter.jpg",
    isMPerformance: true,
    oem: "51192475168",
    material: "Pre-preg Dry Carbon Fiber (CFRP)",
    stock: "In Stock",
    rating: 5.0,
    reviewsCount: 12,
    description: "",
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(siteSettings || {});

  // Handle Login
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN || pinInput === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("dpmotorhub_admin_auth", "true");
      setPinError("");
      showNotification("Welcome back, Master Admin");
    } else {
      setPinError("Invalid Admin PIN code. Try default: 1972");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("dpmotorhub_admin_auth");
    showNotification("Signed out from Admin console");
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setProductForm({
      id: String(Date.now()).slice(-5),
      name: "",
      price: 450000,
      category: "exterior",
      models: ["G80 M3", "G82 M4"],
      image: "/assets/front_splitter.jpg",
      isMPerformance: true,
      oem: `5119${Math.floor(1000000 + Math.random() * 9000000)}`,
      material: "Pre-preg Dry Carbon Fiber",
      stock: "In Stock",
      rating: 5.0,
      reviewsCount: 8,
      description: "Authentic BMW M Performance engineered component.",
    });
    setIsProductModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setProductForm({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category || "exterior",
      models: product.models || ["G80 M3"],
      image: product.image || "/assets/front_splitter.jpg",
      isMPerformance: Boolean(product.isMPerformance),
      oem: product.oem || "",
      material: product.material || "",
      stock: product.stock || "In Stock",
      rating: product.rating || 5.0,
      reviewsCount: product.reviewsCount || 1,
      description: product.description || "",
    });
    setIsProductModalOpen(true);
  };

  // Duplicate Product
  const handleDuplicate = (product) => {
    const newId = String(Date.now()).slice(-5);
    const duplicated = {
      ...product,
      id: newId,
      name: `${product.name} (Copy)`,
      oem: `${product.oem}-CPY`,
    };
    addProduct(duplicated);
    showNotification(`Duplicated part as SKU: ${newId}`);
  };

  // Save Product (Create / Update)
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productForm);
    } else {
      addProduct(productForm);
    }
    setIsProductModalOpen(false);
  };

  // Toggle Chassis in Modal
  const toggleModelSelection = (chassis) => {
    setProductForm((prev) => {
      const exists = prev.models.includes(chassis);
      if (exists) {
        return { ...prev, models: prev.models.filter((m) => m !== chassis) };
      }
      return { ...prev, models: [...prev.models, chassis] };
    });
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.oem?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(p.id).includes(searchQuery);

      const matchesCat =
        selectedCategory === "all" || p.category === selectedCategory;

      const matchesChassis =
        selectedChassis === "all" ||
        (Array.isArray(p.models) && p.models.includes(selectedChassis));

      const matchesStock =
        selectedStock === "all" ||
        (selectedStock === "in" && p.stock?.toLowerCase().includes("in stock")) ||
        (selectedStock === "low" && p.stock?.toLowerCase().includes("low")) ||
        (selectedStock === "out" && p.stock?.toLowerCase().includes("out"));

      return matchesSearch && matchesCat && matchesChassis && matchesStock;
    });
  }, [products, searchQuery, selectedCategory, selectedChassis, selectedStock]);

  // Statistics
  const stats = useMemo(() => {
    const totalCount = products.length;
    const totalInventoryValue = products.reduce(
      (sum, p) => sum + (Number(p.price) || 0),
      0
    );
    const inStockCount = products.filter(
      (p) => p.stock?.toLowerCase().includes("in stock")
    ).length;
    const lowStockCount = products.filter((p) =>
      p.stock?.toLowerCase().includes("low")
    ).length;
    const outOfStockCount = products.filter((p) =>
      p.stock?.toLowerCase().includes("out")
    ).length;
    const mPerformanceCount = products.filter((p) => p.isMPerformance).length;

    return {
      totalCount,
      totalInventoryValue,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      mPerformanceCount,
      totalOrders: orders.length,
      pendingOrders: orders.filter((o) => o.status === "Pending").length,
    };
  }, [products, orders]);

  // JSON Export / Download
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dpmotorhub-catalog-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification("Downloaded catalog JSON backup");
  };

  // JSON Import
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed)) {
            parsed.forEach((item) => addProduct(item));
            showNotification(`Successfully imported ${parsed.length} parts`);
          } else if (parsed.products && Array.isArray(parsed.products)) {
            parsed.products.forEach((item) => addProduct(item));
            showNotification(`Successfully imported ${parsed.products.length} parts`);
          } else {
            alert("Invalid JSON format. Expected an array of products.");
          }
        } catch (err) {
          alert("Failed to parse JSON file: " + err.message);
        }
      };
    }
  };

  // Handle Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
  };

  // 1. PIN Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-lock-screen">
        <div className="admin-lock-card">
          <div className="admin-lock-badge">
            <ShieldCheck size={28} color="#008AC9" />
          </div>
          <div className="stitch-hero-eyebrow" style={{ justifyContent: "center", marginBottom: "8px" }}>
            <span className="m-stripe-pill"></span> DP MOTORHUB MANAGEMENT
          </div>
          <h2 className="admin-lock-title">Admin Console Access</h2>
          <p className="admin-lock-subtitle">
            Enter authorized master PIN to access catalog editor, inventory controller, and store settings.
          </p>

          <form onSubmit={handlePinSubmit} className="admin-pin-form">
            <div className="admin-pin-input-wrap">
              <Lock size={18} className="pin-icon" />
              <input
                type="password"
                placeholder="Enter 4-Digit PIN..."
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                maxLength={8}
                autoFocus
                className="admin-pin-input"
              />
            </div>

            {pinError && <div className="admin-pin-error">{pinError}</div>}

            <button type="submit" className="wix-pill-btn orange admin-auth-btn">
              Unlock Console <Unlock size={16} />
            </button>

            <button
              type="button"
              className="admin-demo-unlock-btn"
              onClick={() => {
                setPinInput("1972");
                setIsAuthenticated(true);
                sessionStorage.setItem("dpmotorhub_admin_auth", "true");
                showNotification("Signed in via Demo Access (PIN: 1972)");
              }}
            >
              🚀 1-Click Quick Demo Sign-In (PIN: 1972)
            </button>
          </form>

          <div className="admin-lock-footer">
            <Link to="/" className="admin-back-store-link">
              ← Return to DP Motorhub Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Top Admin Navigation Bar */}
      <header className="admin-navbar">
        <div className="admin-navbar-inner">
          <div className="admin-brand-wrap">
            <Link to="/admin" className="admin-brand-link">
              <img
                src="/assets/Artboard 1 copy.png"
                alt="DP Motorhub"
                className="admin-brand-icon"
              />
              <div className="admin-brand-text-col">
                <span className="admin-brand-title">MOTORHUB ADMIN</span>
                <span className="admin-brand-badge">PRO V2.5</span>
              </div>
            </Link>
          </div>

          {/* Center Tabs */}
          <nav className="admin-nav-tabs">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <BarChart3 size={16} />
              <span>Overview</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <Package size={16} />
              <span>Parts Catalog</span>
              <span className="admin-count-pill">{products.length}</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FileText size={16} />
              <span>Inquiries &amp; Orders</span>
              {stats.pendingOrders > 0 && (
                <span className="admin-count-pill warning">{stats.pendingOrders}</span>
              )}
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={16} />
              <span>Store Settings</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "backup" ? "active" : ""}`}
              onClick={() => setActiveTab("backup")}
            >
              <Database size={16} />
              <span>Sync &amp; Backup</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="admin-nav-right">
            <Link
              to="/shop"
              target="_blank"
              rel="noopener noreferrer"
              className="admin-ghost-btn"
              title="Open Live Shop"
            >
              <Eye size={15} />
              <span>Live Shop</span>
              <ExternalLink size={12} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="admin-logout-btn"
              title="Lock Admin Console"
            >
              <Lock size={14} />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="admin-main-container">
        {/* ══════════════════════════════════════════════════════════
            TAB 1: DASHBOARD OVERVIEW
           ══════════════════════════════════════════════════════════ */}
        {activeTab === "dashboard" && (
          <div className="admin-dashboard-view">
            {/* Top Bar */}
            <div className="admin-view-header">
              <div>
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  SYSTEM STATUS: OPERATIONAL
                </div>
                <h1 className="admin-view-title">Motorsport Inventory Overview</h1>
              </div>

              <div className="admin-view-actions">
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="wix-pill-btn orange admin-btn-sm"
                >
                  <Plus size={16} />
                  <span>Add New Part</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="wix-pill-btn dark admin-btn-sm"
                >
                  <Download size={15} />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card">
                <div className="kpi-icon-wrap" style={{ background: "rgba(0, 138, 201, 0.15)", color: "#008AC9" }}>
                  <Package size={22} />
                </div>
                <div className="kpi-data">
                  <span className="kpi-label">Active M Catalog Parts</span>
                  <div className="kpi-value">{stats.totalCount}</div>
                  <span className="kpi-badge positive">100% Genuine Provenance</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="kpi-icon-wrap" style={{ background: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                  <DollarSign size={22} />
                </div>
                <div className="kpi-data">
                  <span className="kpi-label">Total Inventory Value</span>
                  <div className="kpi-value">
                    LKR {(stats.totalInventoryValue / 1000000).toFixed(2)}M
                  </div>
                  <span className="kpi-badge">LKR {stats.totalInventoryValue.toLocaleString()}</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="kpi-icon-wrap" style={{ background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b" }}>
                  <CheckCircle2 size={22} />
                </div>
                <div className="kpi-data">
                  <span className="kpi-label">In-Stock Fulfillment</span>
                  <div className="kpi-value">
                    {Math.round((stats.inStockCount / (stats.totalCount || 1)) * 100)}%
                  </div>
                  <span className="kpi-badge warning">{stats.lowStockCount} items low stock</span>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="kpi-icon-wrap" style={{ background: "rgba(168, 85, 247, 0.15)", color: "#a855f7" }}>
                  <FileText size={22} />
                </div>
                <div className="kpi-data">
                  <span className="kpi-label">Inquiries &amp; Orders</span>
                  <div className="kpi-value">{stats.totalOrders}</div>
                  <span className="kpi-badge highlight">{stats.pendingOrders} pending action</span>
                </div>
              </div>
            </div>

            {/* Middle Section: Breakdown & Quick Actions */}
            <div className="admin-split-grid">
              {/* Left: Category Distribution */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Category Distribution</h3>
                  <span className="admin-card-subtitle">Parts per system</span>
                </div>

                <div className="admin-category-bars">
                  {CATEGORY_OPTIONS.map((cat) => {
                    const count = products.filter((p) => p.category === cat.id).length;
                    const percent = Math.round((count / (products.length || 1)) * 100);
                    return (
                      <div key={cat.id} className="category-bar-row">
                        <div className="category-bar-labels">
                          <span className="cat-name">{cat.label}</span>
                          <span className="cat-count">{count} parts ({percent}%)</span>
                        </div>
                        <div className="category-bar-track">
                          <div
                            className="category-bar-fill"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Quick Actions & Live Contacts */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Store &amp; Location Config</h3>
                  <span className="admin-card-subtitle">Active verified details</span>
                </div>

                <div className="admin-store-status-list">
                  <div className="store-status-item">
                    <Mail size={16} color="var(--m-blue)" />
                    <div>
                      <div className="status-item-label">Unified Store Email</div>
                      <div className="status-item-val">{siteSettings.contactEmail || "hello@dpmotorhub.com"}</div>
                    </div>
                  </div>

                  <div className="store-status-item">
                    <MapPin size={16} color="var(--m-blue)" />
                    <div>
                      <div className="status-item-label">Showroom Location</div>
                      <div className="status-item-val">{siteSettings.location || "325/1/A/3, Ihala Biyanwila, Kadawatha"}</div>
                    </div>
                  </div>

                  <div className="store-status-item">
                    <Phone size={16} color="var(--m-blue)" />
                    <div>
                      <div className="status-item-label">WhatsApp Hotline</div>
                      <div className="status-item-val">{siteSettings.contactPhone || "+94 77 123 4567"}</div>
                    </div>
                  </div>
                </div>

                <div className="admin-card-actions" style={{ marginTop: "20px" }}>
                  <button
                    type="button"
                    onClick={() => setActiveTab("products")}
                    className="wix-pill-btn dark"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Manage Inventory ({products.length} items) <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 2: PRODUCT CATALOG (FULL CRUD)
           ══════════════════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <div className="admin-products-view">
            {/* Header */}
            <div className="admin-view-header">
              <div>
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  CATALOG CONTROLLER
                </div>
                <h1 className="admin-view-title">M Performance Hardware Catalog</h1>
              </div>

              <div className="admin-view-actions">
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="wix-pill-btn orange admin-btn-sm"
                >
                  <Plus size={16} />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="admin-filter-bar">
              <div className="admin-search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by part name, SKU, OEM #..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="clear-search-btn"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="admin-filter-group">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="all">All Categories</option>
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedChassis}
                  onChange={(e) => setSelectedChassis(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="all">All Chassis Models</option>
                  {CHASSIS_OPTIONS.map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value)}
                  className="admin-select-filter"
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="in">In Stock Only</option>
                  <option value="low">Low Stock Only</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Results Count & View Options */}
            <div className="admin-results-header">
              <span className="results-counter">
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                <strong>{products.length}</strong> genuine components
              </span>

              {(searchQuery || selectedCategory !== "all" || selectedChassis !== "all" || selectedStock !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedChassis("all");
                    setSelectedStock("all");
                  }}
                  className="admin-reset-filters-btn"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Products Table */}
            <div className="admin-table-container">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Part Details</th>
                    <th>Category</th>
                    <th>Chassis Compatibility</th>
                    <th>Price (LKR)</th>
                    <th>Stock Status</th>
                    <th>OEM Number</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="admin-table-empty">
                        <Package size={36} color="var(--mid-gray)" style={{ margin: "0 auto 12px" }} />
                        <p>No products match your current search &amp; filter criteria.</p>
                        <button
                          type="button"
                          onClick={handleOpenCreate}
                          className="wix-pill-btn orange"
                          style={{ marginTop: "12px" }}
                        >
                          <Plus size={14} /> Add Product Now
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id}>
                        {/* Part Details (Image + Name + SKU) */}
                        <td>
                          <div className="table-product-cell">
                            <div className="table-thumb-wrap">
                              <img
                                src={product.image || "/assets/front_splitter.jpg"}
                                alt={product.name}
                                className="table-thumb-img"
                              />
                              {product.isMPerformance && (
                                <span className="table-m-badge" title="Genuine M Performance">
                                  M
                                </span>
                              )}
                            </div>
                            <div className="table-product-info">
                              <Link
                                to={`/product/${product.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="table-product-name"
                              >
                                {product.name}
                              </Link>
                              <span className="table-product-sku">SKU: {product.id}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td>
                          <span className={`cat-pill cat-${product.category}`}>
                            {product.category}
                          </span>
                        </td>

                        {/* Chassis Models */}
                        <td>
                          <div className="table-models-wrap">
                            {Array.isArray(product.models) &&
                              product.models.map((m) => (
                                <span key={m} className="chassis-tag">
                                  {m}
                                </span>
                              ))}
                          </div>
                        </td>

                        {/* Price */}
                        <td>
                          <span className="table-price">
                            LKR {Number(product.price).toLocaleString()}
                          </span>
                        </td>

                        {/* Stock */}
                        <td>
                          <span
                            className={`stock-badge ${
                              product.stock?.toLowerCase().includes("in stock")
                                ? "in-stock"
                                : product.stock?.toLowerCase().includes("low")
                                ? "low-stock"
                                : "out-of-stock"
                            }`}
                          >
                            {product.stock || "In Stock"}
                          </span>
                        </td>

                        {/* OEM */}
                        <td>
                          <code className="table-oem-code">{product.oem || "N/A"}</code>
                        </td>

                        {/* Actions */}
                        <td style={{ textAlign: "right" }}>
                          <div className="table-action-btn-group">
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(product)}
                              className="table-action-btn edit"
                              title="Edit Part"
                            >
                              <Edit2 size={14} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDuplicate(product)}
                              className="table-action-btn copy"
                              title="Duplicate Part"
                            >
                              <Copy size={14} />
                            </button>

                            <Link
                              to={`/product/${product.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="table-action-btn view"
                              title="View in Storefront"
                            >
                              <ExternalLink size={14} />
                            </Link>

                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(product.id)}
                              className="table-action-btn delete"
                              title="Delete Part"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 3: ORDERS & FITMENT INQUIRIES
           ══════════════════════════════════════════════════════════ */}
        {activeTab === "orders" && (
          <div className="admin-orders-view">
            <div className="admin-view-header">
              <div>
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  CUSTOMER INBOX &amp; LOGISTICS
                </div>
                <h1 className="admin-view-title">Inquiries &amp; Orders Pipeline</h1>
              </div>

              <div className="admin-view-actions">
                <button
                  type="button"
                  onClick={() => {
                    const sample = addOrder({
                      customerName: "Sample Customer",
                      customerEmail: "hello@dpmotorhub.com",
                      customerPhone: "+94 77 999 8888",
                      chassis: "G80 M3",
                      vin: "WBS83AY000M12345",
                      items: [{ id: "1", name: "M Performance Front Splitter", price: 555000, quantity: 1 }],
                      totalAmount: 555000,
                      status: "Pending",
                      notes: "Fitment inquiry submitted via contact form.",
                    });
                    showNotification(`Added sample inquiry ${sample.id}`);
                  }}
                  className="wix-pill-btn dark admin-btn-sm"
                >
                  <Plus size={14} /> Add Test Inquiry
                </button>
              </div>
            </div>

            <div className="admin-orders-grid">
              {orders.length === 0 ? (
                <div className="admin-card text-center" style={{ padding: "40px", textAlign: "center" }}>
                  <FileText size={40} color="var(--mid-gray)" style={{ margin: "0 auto 12px" }} />
                  <h3>No Orders or Inquiries Recorded</h3>
                  <p style={{ color: "var(--mid-gray)", fontSize: "14px", marginTop: "4px" }}>
                    Customer technical inquiries from the Contact page will appear here.
                  </p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="admin-order-card">
                    <div className="order-card-header">
                      <div>
                        <span className="order-id-badge">{order.id}</span>
                        <span className="order-date-text">{order.date}</span>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`order-status-select status-${order.status?.toLowerCase()}`}
                      >
                        <option value="Pending">Pending Review</option>
                        <option value="Verified">VIN Verified</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="order-card-customer">
                      <div className="customer-name">{order.customerName}</div>
                      <div className="customer-meta">
                        <span>{order.customerEmail}</span> • <span>{order.customerPhone}</span>
                      </div>
                      {order.chassis && (
                        <div className="order-chassis-badge">
                          Chassis: <strong>{order.chassis}</strong>
                          {order.vin && ` | VIN: ${order.vin}`}
                        </div>
                      )}
                    </div>

                    <div className="order-items-list">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="order-item-row">
                          <span>{item.name} × {item.quantity}</span>
                          <span className="order-item-price">
                            LKR {Number(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <div className="order-total-amount">
                        Total: <strong>LKR {Number(order.totalAmount).toLocaleString()}</strong>
                      </div>

                      <div className="order-quick-actions">
                        <a
                          href={`https://wa.me/${order.customerPhone?.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="order-action-icon-btn whatsapp"
                          title="Chat via WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </a>

                        <a
                          href={`mailto:${order.customerEmail}?subject=DP Motorhub Update for Order ${order.id}`}
                          className="order-action-icon-btn email"
                          title="Send Email"
                        >
                          <Mail size={15} />
                        </a>

                        <button
                          type="button"
                          onClick={() => deleteOrder(order.id)}
                          className="order-action-icon-btn delete"
                          title="Delete Order Record"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 4: STORE & SITE SETTINGS
           ══════════════════════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div className="admin-settings-view">
            <div className="admin-view-header">
              <div>
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  GLOBAL CONFIGURATION
                </div>
                <h1 className="admin-view-title">Storefront &amp; Contact Settings</h1>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="admin-settings-form">
              <div className="admin-card">
                <h3 className="admin-card-title" style={{ marginBottom: "20px" }}>
                  Store Identity &amp; Contact Info
                </h3>

                <div className="admin-form-grid">
                  <div className="form-group">
                    <label>Official Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.siteName || "MOTORHUB"}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, siteName: e.target.value })
                      }
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline || "Genuine BMW M Performance Parts"}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, tagline: e.target.value })
                      }
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Sole Contact Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail || "hello@dpmotorhub.com"}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, contactEmail: e.target.value })
                      }
                      className="admin-input"
                      required
                    />
                    <small className="form-help-text">
                      Primary email displayed across Contact page, Home, and Footer.
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Official Address</label>
                    <input
                      type="text"
                      value={
                        settingsForm.location ||
                        "325/1/A/3, Ihala Biyanwila, Kadawatha"
                      }
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, location: e.target.value })
                      }
                      className="admin-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Contact Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={settingsForm.contactPhone || "+94 77 123 4567"}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, contactPhone: e.target.value })
                      }
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Business Operating Hours</label>
                    <input
                      type="text"
                      value={
                        settingsForm.businessHours ||
                        "Mon - Fri: 9:00 AM - 6:00 PM | Sat: 10:00 AM - 4:00 PM"
                      }
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, businessHours: e.target.value })
                      }
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-card" style={{ marginTop: "24px" }}>
                <h3 className="admin-card-title" style={{ marginBottom: "20px" }}>
                  Top Announcement Bar
                </h3>

                <div className="admin-form-grid">
                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>Announcement Bar Title</label>
                    <input
                      type="text"
                      value={
                        settingsForm.announcementText ||
                        "100% Genuine BMW M Performance Hardware"
                      }
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          announcementText: e.target.value,
                        })
                      }
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>Announcement Bar Subtitle</label>
                    <input
                      type="text"
                      value={
                        settingsForm.announcementSubtext ||
                        "Fast Worldwide Delivery | VIN Fitment Verification Guaranteed"
                      }
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          announcementSubtext: e.target.value,
                        })
                      }
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="wix-pill-btn orange">
                  <Save size={16} /> Save All Store Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            TAB 5: SYNC & BACKUP
           ══════════════════════════════════════════════════════════ */}
        {activeTab === "backup" && (
          <div className="admin-backup-view">
            <div className="admin-view-header">
              <div>
                <div className="eyebrow" style={{ color: "var(--m-blue)", marginBottom: "4px" }}>
                  DATABASE &amp; SYNC CONTROLLER
                </div>
                <h1 className="admin-view-title">Backup, Restore &amp; PagesCMS Integration</h1>
              </div>
            </div>

            <div className="admin-split-grid">
              {/* Backup Card */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">JSON Data Backup</h3>
                  <span className="admin-card-subtitle">Export or import catalog data</span>
                </div>
                <p style={{ color: "var(--mid-gray)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                  Download a complete copy of your product catalog and store configurations, or restore from a previously exported JSON backup.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="wix-pill-btn orange admin-btn-sm"
                  >
                    <Download size={15} />
                    <span>Download Backup (.json)</span>
                  </button>

                  <label className="wix-pill-btn dark admin-btn-sm" style={{ cursor: "pointer" }}>
                    <Upload size={15} />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                <hr style={{ borderColor: "var(--border-color)", margin: "24px 0" }} />

                <h4 style={{ fontSize: "15px", marginBottom: "8px" }}>Factory Catalog Reset</h4>
                <p style={{ color: "var(--mid-gray)", fontSize: "13px", marginBottom: "14px" }}>
                  Reset catalog back to the original 8 BMW M Performance flagship parts.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to reset all products back to default factory catalog?")) {
                      resetProducts();
                    }
                  }}
                  className="admin-reset-btn"
                >
                  <RefreshCw size={14} /> Restore Default Factory Catalog
                </button>
              </div>

              {/* PagesCMS Cloud Sync Card */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">PagesCMS GitHub Integration</h3>
                  <span className="admin-card-subtitle">Cloud Git CMS bridge</span>
                </div>
                <p style={{ color: "var(--mid-gray)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
                  DP Motorhub is connected with PagesCMS. You can manage Markdown &amp; JSON files directly via GitHub commits.
                </p>

                <div className="pagescms-status-badge">
                  <span className="pulse-dot"></span>
                  <span>Repository Connected: <strong>SIVION-AI-PVT/DPMotorHub</strong></span>
                </div>

                <div style={{ marginTop: "24px" }}>
                  <a
                    href="https://app.pagescms.org/SIVION-AI-PVT/DPMotorHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wix-pill-btn dark"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Open PagesCMS Cloud Dashboard <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════
          ADD / EDIT PRODUCT MODAL
         ══════════════════════════════════════════════════════════ */}
      {isProductModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div>
                <span className="eyebrow" style={{ color: "var(--m-blue)" }}>
                  {editingProduct ? "EDIT PART" : "NEW M COMPONENT"}
                </span>
                <h2 className="admin-modal-title">
                  {editingProduct ? `Edit SKU #${editingProduct.id}` : "Create New M Part"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="admin-modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="admin-modal-form">
              <div className="admin-form-grid">
                {/* SKU / ID */}
                <div className="form-group">
                  <label>SKU / Part ID *</label>
                  <input
                    type="text"
                    value={productForm.id}
                    onChange={(e) =>
                      setProductForm({ ...productForm, id: e.target.value })
                    }
                    className="admin-input"
                    required
                    disabled={Boolean(editingProduct)}
                  />
                </div>

                {/* Price */}
                <div className="form-group">
                  <label>Price in LKR *</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="admin-input"
                    required
                  />
                </div>

                {/* Product Name */}
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label>Product Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. M Performance Carbon Fiber Front Splitter"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="admin-input"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    className="admin-input"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock Status */}
                <div className="form-group">
                  <label>Stock Status</label>
                  <select
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: e.target.value })
                    }
                    className="admin-input"
                  >
                    {STOCK_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* OEM Part Number */}
                <div className="form-group">
                  <label>OEM Part Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 51192475168"
                    value={productForm.oem}
                    onChange={(e) =>
                      setProductForm({ ...productForm, oem: e.target.value })
                    }
                    className="admin-input"
                  />
                </div>

                {/* Material */}
                <div className="form-group">
                  <label>Construction Material</label>
                  <input
                    type="text"
                    placeholder="e.g. Pre-preg Dry Carbon Fiber (CFRP)"
                    value={productForm.material}
                    onChange={(e) =>
                      setProductForm({ ...productForm, material: e.target.value })
                    }
                    className="admin-input"
                  />
                </div>

                {/* Chassis Multi Selector */}
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label>Compatible BMW Chassis Codes *</label>
                  <div className="admin-chassis-picker">
                    {CHASSIS_OPTIONS.map((ch) => {
                      const isSelected = productForm.models?.includes(ch);
                      return (
                        <button
                          key={ch}
                          type="button"
                          onClick={() => toggleModelSelection(ch)}
                          className={`chassis-picker-chip ${isSelected ? "selected" : ""}`}
                        >
                          {isSelected && <Check size={12} />}
                          <span>{ch}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Image Selection */}
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label>Product Image Asset Path</label>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) =>
                      setProductForm({ ...productForm, image: e.target.value })
                    }
                    className="admin-input"
                    style={{ marginBottom: "10px" }}
                  />

                  {/* Preset image chips */}
                  <div className="admin-preset-images">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img.path}
                        type="button"
                        onClick={() =>
                          setProductForm({ ...productForm, image: img.path })
                        }
                        className={`preset-img-chip ${
                          productForm.image === img.path ? "active" : ""
                        }`}
                      >
                        <img src={img.path} alt={img.label} />
                        <span>{img.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Genuine M Badge Toggle */}
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={productForm.isMPerformance}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          isMPerformance: e.target.checked,
                        })
                      }
                    />
                    <span>Flag as 100% Genuine BMW M Performance OEM Badge</span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="wix-pill-btn dark"
                >
                  Cancel
                </button>

                <button type="submit" className="wix-pill-btn orange">
                  <Save size={16} />
                  <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          DELETE CONFIRMATION MODAL
         ══════════════════════════════════════════════════════════ */}
      {deleteConfirmId && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: "440px" }}>
            <div className="admin-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AlertTriangle size={22} color="#f11a22" />
                <h3 className="admin-modal-title">Delete Product</h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="admin-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: "var(--mid-gray)", fontSize: "14px", lineHeight: 1.6, margin: "16px 0 24px" }}>
              Are you sure you want to remove part SKU #{deleteConfirmId} from your catalog? This action will immediately remove it from your live shop.
            </p>

            <div className="admin-modal-actions">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="wix-pill-btn dark"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="wix-pill-btn accent"
                style={{ background: "var(--m-red)", borderColor: "var(--m-red)" }}
              >
                <Trash2 size={16} /> Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
