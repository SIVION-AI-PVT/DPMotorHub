import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Eye, ShieldCheck } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({
  id,
  name,
  price,
  image,
  oem,
  models,
  inStock = true,
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, oem });
  };

  const handleCardClick = (e) => {
    // Only navigate if the click wasn't on a button
    if (e.target.closest('button')) return;
    navigate(`/product/${id}`);
  };

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/product/${id}`);
      }}
    >
      {/* Image */}
      <div className="product-card-image">
        <img src={image} alt={name} loading="lazy" />
        <div className="product-card-badge">
          <ShieldCheck size={12} /> GENUINE M
        </div>

        {/* Hover Action Overlay */}
        <div className="product-card-actions">
          <button
            className="quick-add-btn"
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingBag size={14} /> ADD TO CART
          </button>
          <button 
            className="quick-view-btn" 
            aria-label={`Quick view ${name}`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${id}`);
            }}
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card-body">
        <div className="product-card-models">
          {models ? models.join(" • ") : "BMW M Performance"}
        </div>
        <Link to={`/product/${id}`} className="product-card-name-link">
          <h3 className="product-card-name">{name}</h3>
        </Link>
        <div className="product-card-oem">OEM #{oem || "—"}</div>

        <div className="product-card-footer">
          <span className="product-card-price price">
            LKR {price?.toLocaleString()}
          </span>
          <span className="product-card-stock">
            <span className="stock-dot"></span>
            {inStock ? "IN STOCK" : "PRE-ORDER"}
          </span>
        </div>
      </div>
    </div>
  );
}
