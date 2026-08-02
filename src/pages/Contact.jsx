import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '../components/Button';

export default function Contact() {
  return (
    <div className="contact-page" style={{ paddingTop: '120px', paddingBottom: '96px' }}>
      <div className="container">
        <h1 className="h1" style={{ marginBottom: '48px', textAlign: 'center' }}>GET IN TOUCH</h1>
        
        <div className="grid grid-cols-2" style={{ gap: '64px' }}>
          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className="h2" style={{ marginBottom: '8px' }}>Send a Message</h2>
            <p className="body-text" style={{ color: 'var(--mid-gray)', marginBottom: '32px' }}>Have a question about fitment, sourcing a specific part, or an existing order? Drop us a line.</p>
            
            <form className="contact-form" onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="grid grid-cols-2" style={{ gap: '24px' }}>
                <div>
                  <label className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                  <input type="text" placeholder="John Doe" required style={{ width: '100%', padding: '14px', background: 'var(--light-gray)', border: '1px solid transparent', outline: 'none' }} />
                </div>
                <div>
                  <label className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
                  <input type="email" placeholder="john@example.com" required style={{ width: '100%', padding: '14px', background: 'var(--light-gray)', border: '1px solid transparent', outline: 'none' }} />
                </div>
              </div>
              
              <div>
                <label className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>Phone (Optional)</label>
                <input type="text" placeholder="+1 (555) 000-0000" style={{ width: '100%', padding: '14px', background: 'var(--light-gray)', border: '1px solid transparent', outline: 'none' }} />
              </div>
              
              <div>
                <label className="eyebrow" style={{ display: 'block', marginBottom: '8px' }}>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required style={{ width: '100%', padding: '14px', background: 'var(--light-gray)', border: '1px solid transparent', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}></textarea>
              </div>
              
              <Button variant="primary" style={{ alignSelf: 'flex-start' }}>Send Message</Button>
            </form>
          </div>
          
          {/* Info Side */}
          <div className="contact-info-container">
            <div style={{ background: 'var(--light-gray)', width: '100%', height: '300px', marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Placeholder for map */}
              <span className="caption">[ Map Integration ]</span>
            </div>
            
            <div className="grid grid-cols-2" style={{ gap: '32px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <MapPin size={20} color="var(--m-blue)" />
                  <h3 className="h3" style={{ fontSize: '18px' }}>Headquarters</h3>
                </div>
                <p className="body-text" style={{ color: 'var(--mid-gray)' }}>
                  123 Performance Way<br/>
                  Munich District<br/>
                  CA 90210, USA
                </p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Clock size={20} color="var(--m-blue)" />
                  <h3 className="h3" style={{ fontSize: '18px' }}>Business Hours</h3>
                </div>
                <p className="body-text" style={{ color: 'var(--mid-gray)' }}>
                  Mon-Fri: 9:00 AM - 6:00 PM<br/>
                  Sat: 10:00 AM - 2:00 PM<br/>
                  Sun: Closed
                </p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Phone size={20} color="var(--m-blue)" />
                  <h3 className="h3" style={{ fontSize: '18px' }}>Phone / WhatsApp</h3>
                </div>
                <p className="body-text" style={{ color: 'var(--mid-gray)' }}>
                  +1 (555) M-POWER<br/>
                  (+1 555-676-9377)
                </p>
              </div>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Mail size={20} color="var(--m-blue)" />
                  <h3 className="h3" style={{ fontSize: '18px' }}>Email</h3>
                </div>
                <p className="body-text" style={{ color: 'var(--mid-gray)' }}>
                  sales@dpmotorhub.com<br/>
                  support@dpmotorhub.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
