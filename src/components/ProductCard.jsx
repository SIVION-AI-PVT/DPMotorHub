import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import './ProductCard.css';

export default function ProductCard({ id, name, price, models, image, isMPerformance }) {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        {isMPerformance && (
          <div className="badge m-performance-badge">
            <div className="badge-stripe"></div>
            M Performance
          </div>
        )}
        <button className="quick-add-btn" aria-label="Quick add to cart" onClick={(e) => {
          e.preventDefault();
          // Add to cart logic
        }}>
          <Plus size={20} />
        </button>
      </Link>
      <div className="product-info">
        <div className="product-models">{models.join(', ')}</div>
        <Link to={`/product/${id}`} className="product-name">
          <h3 className="h3" style={{ fontSize: '18px', marginBottom: '8px' }}>{name}</h3>
        </Link>
        <div className="product-price price">${price.toFixed(2)}</div>
      </div>
    </div>
  );
}
