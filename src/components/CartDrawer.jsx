import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import './CartDrawer.css';
import Button from './Button';

export default function CartDrawer({ isOpen, onClose }) {
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="h3">Your Cart</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className="cart-items">
          {/* Example Item */}
          <div className="cart-item">
            <img src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=200" alt="M Performance Steering Wheel" className="cart-item-image" />
            <div className="cart-item-details">
              <h4 className="cart-item-name">M Performance Steering Wheel V2</h4>
              <div className="cart-item-price price">$1,250.00</div>
              <div className="cart-item-actions">
                <div className="qty-stepper">
                  <button><Minus size={14} /></button>
                  <span>1</span>
                  <button><Plus size={14} /></button>
                </div>
                <button className="remove-link">Remove</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="cart-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <span className="price">$1,250.00</span>
          </div>
          <p className="caption" style={{ marginBottom: '16px' }}>Shipping & taxes calculated at checkout</p>
          <Button variant="primary" className="checkout-btn" style={{ width: '100%' }}>
            Proceed to Checkout
          </Button>
          <button className="continue-shopping" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
