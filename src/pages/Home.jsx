import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Wrench, Settings, Star } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import './Home.css';

const featuredProducts = [
  { id: '1', name: 'M Performance Carbon Fiber Front Splitter', price: 1850, models: ['G80 M3', 'G82 M4'], image: 'https://images.unsplash.com/photo-1616788494707-1d897712df71?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
  { id: '2', name: 'M Performance Steering Wheel V2', price: 1250, models: ['F80 M3', 'F82 M4'], image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
  { id: '3', name: 'Titanium Exhaust System', price: 4200, models: ['F90 M5'], image: 'https://images.unsplash.com/photo-1632230159781-a8878b277dfd?auto=format&fit=crop&q=80&w=400', isMPerformance: false },
  { id: '4', name: 'Forged Alloy Wheels 763M', price: 3800, models: ['F87 M2'], image: 'https://images.unsplash.com/photo-1620986797534-19067b003a89?auto=format&fit=crop&q=80&w=400', isMPerformance: true },
];

export default function Home() {
  React.useEffect(() => {
    document.body.classList.add('home-page');
    return () => document.body.classList.remove('home-page');
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero dark-section">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1555353540-64fd3737b98d?auto=format&fit=crop&q=80&w=1920" alt="BMW M Engine Bay" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-content">
          <div className="eyebrow" style={{ color: '#fff', marginBottom: '16px' }}>GENUINE BMW M PERFORMANCE</div>
          <h1 className="h1 hero-title">ENGINEERED FOR THE LIMIT.</h1>
          <p className="hero-subtitle">Specialist retailer of premium aftermarket and genuine performance parts for BMW M enthusiasts.</p>
          <div className="hero-actions">
            <Button to="/shop" variant="primary">Shop Parts</Button>
            <Button to="/shop?sort=model" variant="outline" className="hero-outline-btn">Browse by Model</Button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container">
          <div className="grid grid-cols-4 trust-grid">
            <div className="trust-item">
              <Shield size={24} strokeWidth={1.5} />
              <span>Genuine Parts</span>
            </div>
            <div className="trust-item">
              <Clock size={24} strokeWidth={1.5} />
              <span>Fast Delivery</span>
            </div>
            <div className="trust-item">
              <Wrench size={24} strokeWidth={1.5} />
              <span>Warranty Included</span>
            </div>
            <div className="trust-item">
              <Settings size={24} strokeWidth={1.5} />
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="h2">FEATURED PARTS</h2>
            <Link to="/shop" className="view-all-link">View All Catalog</Link>
          </div>
          <div className="grid grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="brand-teaser dark-section">
        <div className="container">
          <div className="grid grid-cols-2">
            <div className="teaser-image">
              <img src="https://images.unsplash.com/photo-1596707323862-23c50953bf6c?auto=format&fit=crop&q=80&w=800" alt="Workshop" />
            </div>
            <div className="teaser-content">
              <h2 className="h2" style={{ marginBottom: '24px' }}>DRIVEN BY PASSION.</h2>
              <p className="body-text" style={{ marginBottom: '32px', color: '#A0A0A5' }}>
                We don't just sell parts; we understand the engineering behind them. DP Motorhub was founded by M-car enthusiasts to provide a curated selection of the highest quality upgrades available.
              </p>
              <Button to="/about" variant="outline">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <h2 className="h2 text-center" style={{ marginBottom: '48px', textAlign: 'center' }}>ENTHUSIAST APPROVED</h2>
          <div className="grid grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="testimonial-card">
                <div className="stars">
                  <Star size={16} fill="var(--m-blue)" color="var(--m-blue)" />
                  <Star size={16} fill="var(--m-blue)" color="var(--m-blue)" />
                  <Star size={16} fill="var(--m-blue)" color="var(--m-blue)" />
                  <Star size={16} fill="var(--m-blue)" color="var(--m-blue)" />
                  <Star size={16} fill="var(--m-blue)" color="var(--m-blue)" />
                </div>
                <p className="body-text">"Incredible service and fast shipping. The carbon fiber splitter fits my G80 perfectly, exactly as described. Genuine quality."</p>
                <div className="testimonial-author">
                  <div className="h3" style={{ fontSize: '16px' }}>Alex R.</div>
                  <div className="caption">G80 M3 Owner</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner dark-section" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ marginBottom: '16px' }}>CAN'T FIND WHAT YOU NEED?</h2>
          <p className="body-text" style={{ marginBottom: '32px', color: '#A0A0A5' }}>Contact our experts and we'll source it for you.</p>
          <Button to="/contact" variant="primary">Contact Us on WhatsApp</Button>
        </div>
      </section>
    </div>
  );
}
