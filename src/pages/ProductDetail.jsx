import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Check, Truck } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1616788494707-1d897712df71?auto=format&fit=crop&q=80&w=800');

  const thumbnails = [
    'https://images.unsplash.com/photo-1616788494707-1d897712df71?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1549429532-6a75f850e051?auto=format&fit=crop&q=80&w=200',
    'https://images.unsplash.com/photo-1622384992985-021d74d32a32?auto=format&fit=crop&q=80&w=200'
  ];

  return (
    <div className="product-page">
      <div className="container">
        <div className="breadcrumb caption" style={{ marginBottom: '32px' }}>Home / Shop / Exterior / Carbon Fiber Front Splitter</div>
        
        <div className="product-layout">
          {/* Gallery */}
          <div className="product-gallery">
            <div className="main-image">
              <img src={mainImage} alt="Product" />
            </div>
            <div className="thumbnail-strip">
              {thumbnails.map((thumb, idx) => (
                <button key={idx} className={`thumb-btn ${mainImage === thumb.replace('w=200', 'w=800') ? 'active' : ''}`} onClick={() => setMainImage(thumb.replace('w=200', 'w=800'))}>
                  <img src={thumb} alt={`Thumbnail ${idx}`} />
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div className="product-details">
            <div className="stock-badge in-stock"><Check size={14} /> In Stock (Ships within 24h)</div>
            <h1 className="h2" style={{ marginBottom: '16px' }}>M Performance Carbon Fiber Front Splitter</h1>
            <p className="caption" style={{ marginBottom: '24px', fontSize: '14px' }}>Compatible Models: G80 M3, G82 M4, G83 M4</p>
            <div className="product-price h2" style={{ marginBottom: '32px' }}>$1,850.00</div>
            
            <div className="add-to-cart-section">
              <div className="qty-stepper large">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <Button variant="primary" style={{ flex: 1 }}>Add to Cart</Button>
            </div>
            
            <Button variant="outline" style={{ width: '100%', marginBottom: '32px' }}>Enquire via WhatsApp</Button>

            <div className="delivery-info">
              <Truck size={20} color="var(--mid-gray)" />
              <span className="caption">Free standard shipping on orders over $500.</span>
            </div>
            
            {/* Tabs */}
            <div className="tabs">
              <div className="tab-headers">
                <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Specifications</button>
                <button className={`tab-btn ${activeTab === 'desc' ? 'active' : ''}`} onClick={() => setActiveTab('desc')}>Description</button>
                <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping</button>
              </div>
              <div className="tab-content body-text">
                {activeTab === 'specs' && (
                  <table className="specs-table">
                    <tbody>
                      <tr><td>OEM Part No.</td><td>51192475168</td></tr>
                      <tr><td>Material</td><td>Carbon Fiber (CFRP)</td></tr>
                      <tr><td>Finish</td><td>Glossy Clear Coat</td></tr>
                      <tr><td>Installation</td><td>Professional recommended</td></tr>
                    </tbody>
                  </table>
                )}
                {activeTab === 'desc' && (
                  <p>The M Performance front splitter emphasizes the dynamic exclusivity of your BMW M. Hand-crafted from premium carbon fiber, it optimizes aerodynamic balance while dramatically increasing the aggressive stance of the front fascia.</p>
                )}
                {activeTab === 'shipping' && (
                  <p>In-stock items ship within 24 hours. Delivery takes 2-5 business days depending on location. 30-day return policy for uninstalled parts in original packaging.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Parts */}
        <section className="related-parts" style={{ marginTop: '96px' }}>
          <h2 className="h2" style={{ marginBottom: '32px' }}>COMPLETE THE LOOK</h2>
          <div className="grid grid-cols-4">
            <ProductCard id="6" name="Carbon Fiber Mirror Caps" price={450} models={['G80 M3', 'G82 M4']} image="https://images.unsplash.com/photo-1622384992985-021d74d32a32?auto=format&fit=crop&q=80&w=400" isMPerformance={true} />
            <ProductCard id="7" name="M Performance Rear Diffuser" price={1650} models={['G80 M3', 'G82 M4']} image="https://images.unsplash.com/photo-1549429532-6a75f850e051?auto=format&fit=crop&q=80&w=400" isMPerformance={true} />
            <ProductCard id="8" name="Carbon Side Skirts" price={1200} models={['G80 M3']} image="https://images.unsplash.com/photo-1632230159781-a8878b277dfd?auto=format&fit=crop&q=80&w=400" isMPerformance={false} />
            <ProductCard id="9" name="Performance Exhaust Tips" price={750} models={['G80 M3', 'G82 M4']} image="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=400" isMPerformance={true} />
          </div>
        </section>
      </div>
    </div>
  );
}
