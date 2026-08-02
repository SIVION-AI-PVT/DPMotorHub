import React from 'react';
import { ShieldCheck, Target, Zap, Users } from 'lucide-react';
import Button from '../components/Button';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero dark-section" style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <img src="https://images.unsplash.com/photo-1596707323862-23c50953bf6c?auto=format&fit=crop&q=80&w=1920" alt="Workshop Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11,11,13,0.7)' }}></div>
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: 'var(--white)', marginBottom: '16px' }}>OUR STORY</div>
          <h1 className="h1">BORN ON THE TRACK.<br/>BUILT FOR THE ROAD.</h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="h2" style={{ marginBottom: '32px' }}>THE PURSUIT OF PERFECTION</h2>
          <p className="body-text" style={{ fontSize: '18px', color: 'var(--mid-gray)', marginBottom: '24px' }}>
            DP Motorhub was established by a collective of BMW M enthusiasts who were tired of navigating through generic auto parts stores to find genuine performance upgrades. We wanted a dedicated space that matched the engineering precision of the cars we love.
          </p>
          <p className="body-text" style={{ fontSize: '18px', color: 'var(--mid-gray)' }}>
            Today, we are the premier destination for genuine M Performance parts and top-tier aftermarket components. Every part in our catalog has been carefully selected, tested, and approved by our in-house engineering team to ensure it meets the rigorous standards of the M badge.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="section" style={{ background: 'var(--light-gray)' }}>
        <div className="container">
          <div className="grid grid-cols-4">
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <ShieldCheck size={48} color="var(--charcoal)" style={{ margin: '0 auto 24px' }} strokeWidth={1.5} />
              <h3 className="h3" style={{ marginBottom: '16px', fontSize: '18px' }}>Authenticity</h3>
              <p className="body-text" style={{ color: 'var(--mid-gray)' }}>100% genuine parts and verified premium aftermarket components.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Target size={48} color="var(--charcoal)" style={{ margin: '0 auto 24px' }} strokeWidth={1.5} />
              <h3 className="h3" style={{ marginBottom: '16px', fontSize: '18px' }}>Expertise</h3>
              <p className="body-text" style={{ color: 'var(--mid-gray)' }}>Run by enthusiasts. We know what fits, how it works, and why it's better.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Zap size={48} color="var(--charcoal)" style={{ margin: '0 auto 24px' }} strokeWidth={1.5} />
              <h3 className="h3" style={{ marginBottom: '16px', fontSize: '18px' }}>Speed</h3>
              <p className="body-text" style={{ color: 'var(--mid-gray)' }}>Rapid fulfillment and fast international shipping to get you back on the road.</p>
            </div>
            <div style={{ textAlign: 'center', padding: '24px' }}>
              <Users size={48} color="var(--charcoal)" style={{ margin: '0 auto 24px' }} strokeWidth={1.5} />
              <h3 className="h3" style={{ marginBottom: '16px', fontSize: '18px' }}>Trust</h3>
              <p className="body-text" style={{ color: 'var(--mid-gray)' }}>Dedicated support, transparent return policies, and secure transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner dark-section" style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2" style={{ marginBottom: '24px' }}>READY TO UPGRADE?</h2>
          <Button to="/shop" variant="primary">Explore the Catalog</Button>
        </div>
      </section>
    </div>
  );
}
