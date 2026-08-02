import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "M Performance Carbon Fiber Front Splitter",
    price: 555000,
    category: "exterior",
    models: ["G80 M3", "G82 M4"],
    image: "/assets/front_splitter.jpg",
    isMPerformance: true,
    oem: "51192475168",
    material: "Pre-preg Dry Carbon Fiber (CFRP)",
    stock: "In Stock",
    rating: 5.0,
    reviewsCount: 14,
  },
  {
    id: "2",
    name: "M Performance Steering Wheel V2 (Alcantara / Carbon)",
    price: 375000,
    category: "interior",
    models: ["F80 M3", "F82 M4", "F87 M2"],
    image: "/assets/steering_wheel.jpg",
    isMPerformance: true,
    oem: "32302413014",
    material: "Alcantara / Tricolor M Stitching",
    stock: "In Stock",
    rating: 4.9,
    reviewsCount: 22,
  },
  {
    id: "3",
    name: "Titanium Exhaust System with Carbon Tips",
    price: 1260000,
    category: "engine",
    models: ["F90 M5"],
    image: "/assets/exhaust_system.jpg",
    isMPerformance: false,
    oem: "18302456070",
    material: "Grade-1 Titanium & Dry Carbon",
    stock: "Low Stock (2 Left)",
    rating: 5.0,
    reviewsCount: 9,
  },
  {
    id: "4",
    name: "Forged Lightweight Alloy Wheels 763M Set",
    price: 1140000,
    category: "wheels",
    models: ["F87 M2", "F80 M3"],
    image: "/assets/alloy_wheels.jpg",
    isMPerformance: true,
    oem: "36112449763",
    material: "Forged Aluminum Alloy",
    stock: "In Stock",
    rating: 4.8,
    reviewsCount: 18,
  },
  {
    id: "5",
    name: "Carbon Ceramic Brake Package (Front & Rear)",
    price: 2550000,
    category: "brakes-suspension",
    models: ["G80 M3", "G82 M4", "F90 M5"],
    image: "/assets/brakes.jpg",
    isMPerformance: false,
    oem: "34112456071",
    material: "Carbon Fiber Reinforced Silicon Carbide",
    stock: "In Stock",
    rating: 5.0,
    reviewsCount: 7,
  },
  {
    id: "6",
    name: "M Performance Carbon Fiber Mirror Caps",
    price: 135000,
    category: "exterior",
    models: ["G80 M3", "G82 M4", "G87 M2"],
    image: "/assets/mirror_caps.jpg",
    isMPerformance: true,
    oem: "51162465741",
    material: "Autoclave Carbon Fiber",
    stock: "In Stock",
    rating: 4.9,
    reviewsCount: 31,
  },
  {
    id: "7",
    name: "M Performance Carbon Rear Diffuser",
    price: 495000,
    category: "exterior",
    models: ["G80 M3", "G82 M4"],
    image: "/assets/rear_diffuser.jpg",
    isMPerformance: true,
    oem: "51192475169",
    material: "Dry Carbon Fiber",
    stock: "In Stock",
    rating: 5.0,
    reviewsCount: 12,
  },
  {
    id: "8",
    name: "S58 High-Flow Cold Air Intake System",
    price: 345000,
    category: "engine",
    models: ["G80 M3", "G82 M4", "G87 M2"],
    image: "/assets/air_intake.jpg",
    isMPerformance: false,
    oem: "13712470088",
    material: "Gloss Carbon Fiber & Pleated Synthetic",
    stock: "In Stock",
    rating: 4.9,
    reviewsCount: 19,
  },
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 1 },
    { ...INITIAL_PRODUCTS[1], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
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
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        notification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
