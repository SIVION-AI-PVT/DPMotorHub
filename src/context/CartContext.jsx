import React, { createContext, useContext, useState, useEffect } from "react";
import initialSettings from "../data/settings.json";

const CartContext = createContext();

const productFiles = import.meta.glob("../data/products/*.json", {
  eager: true,
});
export const INITIAL_PRODUCTS = Object.values(productFiles)
  .map((mod) => (mod && mod.default ? mod.default : mod))
  .filter((p) => p && p.id);

const DEFAULT_ORDERS = [
  {
    id: "M-1048",
    customerName: "Nuwan Perera",
    customerEmail: "nuwan.p@gmail.com",
    customerPhone: "+94 77 234 5678",
    chassis: "G80 M3",
    vin: "WBS83AY000M89211",
    items: [
      { id: "1", name: "M Performance Carbon Fiber Front Splitter", price: 555000, quantity: 1 }
    ],
    totalAmount: 555000,
    status: "Verified",
    date: "2026-08-18",
    notes: "VIN fitment confirmed. Customer requested Saturday collection at Kadawatha showroom."
  },
  {
    id: "M-1047",
    customerName: "Dilshan Silva",
    customerEmail: "dilshan@autohub.lk",
    customerPhone: "+94 71 889 1234",
    chassis: "F90 M5",
    vin: "WBSJF01090B38472",
    items: [
      { id: "3", name: "Titanium Exhaust System with Carbon Tips", price: 1260000, quantity: 1 }
    ],
    totalAmount: 1260000,
    status: "Dispatched",
    date: "2026-08-17",
    notes: "Dispatched via insured express freight. Tracking #DP-LK-99214."
  },
  {
    id: "M-1046",
    customerName: "Kavinda Fernando",
    customerEmail: "kavinda@motorsport.lk",
    customerPhone: "+94 76 554 9988",
    chassis: "F87 M2",
    vin: "WBS1J51010V93811",
    items: [
      { id: "4", name: "Forged Lightweight Alloy Wheels 763M Set", price: 1140000, quantity: 1 }
    ],
    totalAmount: 1140000,
    status: "Delivered",
    date: "2026-08-15",
    notes: "Installation completed at DP Motorhub Kadawatha workshop."
  }
];

export function CartProvider({ children }) {
  // 1. Products Management with LocalStorage
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("dpmotorhub_products");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load products from localStorage", e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("dpmotorhub_products", JSON.stringify(products));
    } catch (e) {
      console.error("Failed to save products to localStorage", e);
    }
  }, [products]);

  // Product CRUD
  const addProduct = (newProduct) => {
    const id = newProduct.id ? String(newProduct.id) : String(Date.now());
    const completeProduct = {
      id,
      name: newProduct.name || "Untitled M Part",
      price: Number(newProduct.price) || 0,
      category: newProduct.category || "exterior",
      models: Array.isArray(newProduct.models) && newProduct.models.length > 0 ? newProduct.models : ["G80 M3"],
      image: newProduct.image || "/assets/front_splitter.jpg",
      isMPerformance: Boolean(newProduct.isMPerformance),
      oem: newProduct.oem || "OEM-GENUINE",
      material: newProduct.material || "Pre-preg Dry Carbon Fiber",
      stock: newProduct.stock || "In Stock",
      rating: Number(newProduct.rating) || 5.0,
      reviewsCount: Number(newProduct.reviewsCount) || 1,
      description: newProduct.description || "",
      ...newProduct,
    };
    setProducts((prev) => [completeProduct, ...prev]);
    showNotification(`Created product "${completeProduct.name}" (SKU: ${id})`);
    return completeProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (String(p.id) === String(id) ? { ...p, ...updatedFields } : p))
    );
    showNotification(`Updated product (SKU: ${id})`);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    showNotification(`Deleted product (SKU: ${id})`);
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem("dpmotorhub_products");
    showNotification("Restored default factory catalog");
  };

  // 2. Orders Management with LocalStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("dpmotorhub_orders");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load orders from localStorage", e);
    }
    return DEFAULT_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("dpmotorhub_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Failed to save orders to localStorage", e);
    }
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = {
      id: `M-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      notes: "Submitted via online inquiry form.",
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, status, notes) => {
    setOrders((prev) =>
      prev.map((o) =>
        String(o.id) === String(id)
          ? { ...o, status, ...(notes !== undefined ? { notes } : {}) }
          : o
      )
    );
    showNotification(`Order ${id} status updated to ${status}`);
  };

  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((o) => String(o.id) !== String(id)));
    showNotification(`Removed order ${id}`);
  };

  // 3. Site Settings Management with LocalStorage
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("dpmotorhub_site_settings");
      if (saved) {
        return { ...initialSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error("Failed to load settings from localStorage", e);
    }
    return {
      ...initialSettings,
      contactEmail: "hello@dpmotorhub.com",
      location: "325/1/A/3, Ihala Biyanwila, Kadawatha",
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem("dpmotorhub_site_settings", JSON.stringify(siteSettings));
    } catch (e) {
      console.error("Failed to save settings to localStorage", e);
    }
  }, [siteSettings]);

  const updateSiteSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification("Saved site & store settings successfully");
  };

  // 4. Cart Management
  const [cartItems, setCartItems] = useState(() => [
    { ...(INITIAL_PRODUCTS[0] || {}), quantity: 1 },
    { ...(INITIAL_PRODUCTS[1] || {}), quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => String(item.id) === String(product.id));
      if (existing) {
        return prev.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showNotification(`Added ${product.name} to your cart.`);
    setIsCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (String(item.id) === String(id) ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => String(item.id) !== String(id)));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        // Products
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        // Orders
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        // Settings
        siteSettings,
        updateSiteSettings,
        // Cart
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        notification,
        showNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
