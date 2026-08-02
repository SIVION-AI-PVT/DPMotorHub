import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const MOCK_PRODUCTS = [
  { id: '1', name: 'M Performance Carbon Fiber Front Splitter', price: 1850, models: ['G80 M3', 'G82 M4'], image: 'https://images.unsplash.com/photo-1616788494707-1d897712df71?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
  { id: '2', name: 'M Performance Steering Wheel V2', price: 1250, models: ['F80 M3', 'F82 M4'], image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
  { id: '3', name: 'Titanium Exhaust System', price: 4200, models: ['F90 M5'], image: 'https://images.unsplash.com/photo-1632230159781-a8878b277dfd?auto=format&fit=crop&q=80&w=400', isMPerformance: false },
  { id: '4', name: 'Forged Alloy Wheels 763M', price: 3800, models: ['F87 M2'], image: 'https://images.unsplash.com/photo-1620986797534-19067b003a89?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
  { id: '5', name: 'Carbon Ceramic Brake Kit', price: 8500, models: ['G80 M3', 'F90 M5'], image: 'https://images.unsplash.com/photo-1549429532-6a75f850e051?auto=format&fit=crop&q=80&w=400', isMPerformance: false },
  { id: '6', name: 'Carbon Fiber Mirror Caps', price: 450, models: ['G80 M3', 'G82 M4'], image: 'https://images.unsplash.com/photo-1622384992985-021d74d32a32?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
];

export default function Shop() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="shop-page container">
      {/* Breadcrumb & Header */}
      <div className="shop-header">
        <div className="breadcrumb caption">Home / Shop</div>
        <h1 className="h1">M PERFORMANCE PARTS</h1>
        <p className="body-text" style={{ color: 'var(--mid-gray)', marginTop: '8px' }}>Showing {MOCK_PRODUCTS.length} results</p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-group">
            <h3 className="h3 filter-title" style={{ fontSize: '18px' }}>Chassis / Model</h3>
            <label className="checkbox-label"><input type="checkbox" /> G80 / G82 (M3/M4)</label>
            <label className="checkbox-label"><input type="checkbox" /> F80 / F82 (M3/M4)</label>
            <label className="checkbox-label"><input type="checkbox" /> F90 (M5)</label>
            <label className="checkbox-label"><input type="checkbox" /> F87 / G87 (M2)</label>
          </div>
          <div className="filter-group">
            <h3 className="h3 filter-title" style={{ fontSize: '18px' }}>Category</h3>
            <label className="checkbox-label"><input type="checkbox" /> Engine & Performance</label>
            <label className="checkbox-label"><input type="checkbox" /> Brakes & Suspension</label>
            <label className="checkbox-label"><input type="checkbox" /> Exterior & Aero</label>
            <label className="checkbox-label"><input type="checkbox" /> Wheels & Spacers</label>
            <label className="checkbox-label"><input type="checkbox" /> Interior</label>
          </div>
          <button className="clear-filters-btn">Clear all filters</button>
        </aside>

        {/* Product Grid Area */}
        <main className="shop-main">
          <div className="shop-controls">
            <button className="mobile-filter-toggle btn btn-outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              Filters
            </button>
            <div className="sort-dropdown">
              <span className="caption">Sort by:</span>
              <select>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 shop-grid">
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="pagination">
            <button className="btn btn-outline" style={{ width: '100%', maxWidth: '300px', margin: '48px auto 0' }}>Load More Parts</button>
          </div>
        </main>
      </div>
    </div>
  );
}
