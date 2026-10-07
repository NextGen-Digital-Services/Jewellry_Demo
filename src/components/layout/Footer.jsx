import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Lock, ArrowRight, Instagram, Facebook, Youtube } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { APP_CONFIG } from '../../config';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubmitting(true);
    const res = await api.subscribeNewsletter(email);
    setSubmitting(false);
    if (res.success) {
      addToast(res.message, 'success');
      setEmail('');
    }
  };

  return (
    <footer style={{ backgroundColor: 'var(--ink)', color: 'var(--ivory)', paddingTop: '5rem', paddingBottom: '3rem', borderTop: '2px solid var(--gold)' }}>
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

          {/* Brand Story Column */}
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold-light)', display: 'block', letterSpacing: '0.1em' }}>
              {APP_CONFIG.BRAND_NAME}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', margin: '0.3rem 0 1.25rem 0' }}>
              ALTA GIOIELLERIA ITALIANA DAL 1954
            </span>
            <p style={{ fontSize: '0.88rem', color: '#D8CFBD', lineHeight: 1.7, maxWidth: '420px', marginBottom: '1.5rem' }}>
              Handcrafted in Florence & Valenza, Italy. Master goldsmithing dedicated to Renaissance heritage, certified diamonds, and timeless 18kt gold creations.
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--gold-light)' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Collezioni Links */}
          <div>
            <h4 className="subtitle" style={{ color: 'var(--gold-light)' }}>Collezioni</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#D8CFBD' }}>
              <li><Link to="/shop?category=rings" className="link-underline">Rings & Solitaires</Link></li>
              <li><Link to="/shop?category=necklaces" className="link-underline">Necklaces & Chokers</Link></li>
              <li><Link to="/shop?category=earrings" className="link-underline">Earrings & Studs</Link></li>
              <li><Link to="/shop?category=bracelets" className="link-underline">Bracelets & Bangles</Link></li>
              <li><Link to="/bridal" className="link-underline">Bridal & Mangalsutra</Link></li>
              <li><Link to="/shop?category=gold-coins" className="link-underline">24kt Gold Coins & Bars</Link></li>
            </ul>
          </div>

          {/* Client Concierge Links */}
          <div>
            <h4 className="subtitle" style={{ color: 'var(--gold-light)' }}>Client Concierge</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#D8CFBD' }}>
              <li><Link to="/appointment" className="link-underline">Book Video Consultation</Link></li>
              <li><Link to="/bespoke" className="link-underline">Bespoke Custom Jewellery</Link></li>
              <li><Link to="/boutiques" className="link-underline">Find Boutique / Atelier</Link></li>
              <li><Link to="/track-order" className="link-underline">Track Your Order</Link></li>
              <li><Link to="/guides" className="link-underline">Ring Size & Purity Calculator</Link></li>
              <li><Link to="/contact" className="link-underline">Contact Atelier Concierge</Link></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="subtitle" style={{ color: 'var(--gold-light)' }}>Legal & Guarantees</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: '#D8CFBD' }}>
              <li><Link to="/faq" className="link-underline">Frequently Asked Questions</Link></li>
              <li><Link to="/shipping-returns" className="link-underline">30-Day Returns & Insured Delivery</Link></li>
              <li><Link to="/warranty" className="link-underline">Lifetime Service & Buyback</Link></li>
              <li><Link to="/privacy-policy" className="link-underline">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="link-underline">Terms & Conditions</Link></li>
              <li><Link to="/admin" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Admin Portal Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Banner */}
        <div style={{ backgroundColor: 'var(--bordeaux-dark)', border: '1px solid var(--gold)', borderRadius: '2px', padding: '2.5rem 2rem', marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <span className="subtitle" style={{ color: 'var(--gold-light)' }}>Privé Membership</span>
            <h3 className="h3" style={{ color: 'var(--ivory)', marginTop: '0.2rem' }}>
              Subscribe for Private Salon Invitations
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#D8CFBD', marginTop: '0.3rem' }}>
              Receive early access to high jewellery releases and a ₹15,000 welcome voucher.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '420px' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              style={{
                flex: 1,
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--ivory)',
                color: 'var(--ink)',
                fontSize: '0.88rem',
                border: 'none',
                borderRadius: '2px'
              }}
            />
            <button type="submit" className="btn btn-gold" disabled={submitting}>
              {submitting ? '...' : <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        {/* Trust & Hallmark Badge Bar */}
        <div style={{ borderTop: '1px solid rgba(216,207,189,0.2)', borderBottom: '1px solid rgba(216,207,189,0.2)', padding: '1.5rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={24} color="var(--gold-light)" />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)' }}>100% Insured Delivery</strong>
              <span style={{ fontSize: '0.7rem', color: '#D8CFBD' }}>Tamper-evident box</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Award size={24} color="var(--gold-light)" />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)' }}>BIS 750 & GIA Certified</strong>
              <span style={{ fontSize: '0.7rem', color: '#D8CFBD' }}>100% Hallmarked Gold</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Lock size={24} color="var(--gold-light)" />
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-light)' }}>30-Day Easy Returns</strong>
              <span style={{ fontSize: '0.7rem', color: '#D8CFBD' }}>100% Money Back</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: '#A09789' }}>
          <div>
            © {new Date().getFullYear()} {APP_CONFIG.BRAND_NAME}. Fatto a mano in Italia. All rights reserved.
          </div>
          <div>
            Firenze • Valenza • Milano • Roma • Mumbai
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
