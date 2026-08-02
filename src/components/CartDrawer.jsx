import React from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div
        className="cart-drawer-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Shopping Cart"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <ShoppingBag size={20} color="var(--m-blue)" />
            <h2
              className="h3"
              style={{ fontSize: "18px", color: "var(--white)" }}
            >
              YOUR CART (
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            className="cart-drawer-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Shopping Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items List */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag
                size={56}
                color="var(--mid-gray)"
                style={{ opacity: 0.5 }}
              />
              <h3
                className="h3"
                style={{
                  color: "var(--white)",
                  marginTop: "16px",
                  marginBottom: "8px",
                }}
              >
                Your Cart is Empty
              </h3>
              <p
                className="body-text"
                style={{
                  color: "var(--mid-gray)",
                  fontSize: "14px",
                  marginBottom: "24px",
                }}
              >
                Explore our catalog of genuine M Performance components and
                hardware.
              </p>
              <button
                className="wix-pill-btn dark"
                onClick={() => setIsCartOpen(false)}
              >
                Explore Catalog <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <div className="cart-item-oem">
                      OEM #{item.oem || "51192475168"}
                    </div>
                    <div className="cart-item-price price">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-stepper">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="stepper-btn"
                        >
                          -
                        </button>
                        <span className="stepper-count">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                          className="stepper-btn"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal-row">
              <span className="subtotal-label">Subtotal</span>
              <span className="subtotal-value price">
                LKR {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="cart-guarantee-note">
              <ShieldCheck size={14} color="var(--m-blue)" />
              <span>100% Genuine BMW OEM Guaranteed</span>
            </div>

            <button
              className="wix-pill-btn dark cart-checkout-btn"
              onClick={() => alert("Proceeding to Secure Checkout...")}
            >
              Proceed To Checkout <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
