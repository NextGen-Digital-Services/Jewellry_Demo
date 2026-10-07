import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../data/images';

const BridalBanner = () => {
  return (
    <section style={{ position: 'relative', width: '100%', padding: '6rem 0', backgroundColor: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={IMAGES.HERO.BRIDAL}
          alt="Alta Gioielleria Bridal"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        />
      </div>

      <div className="site-container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <span className="roman-numeral" style={{ color: 'var(--gold-light)' }}>VII — LE NOZZE</span>
        <p className="subtitle" style={{ color: 'var(--gold-light)' }}>Haute Couture Bridal</p>

        <h2 className="h2" style={{ color: 'var(--ivory)', fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', marginTop: '0.5rem', marginBottom: '1.25rem' }}>
          Royal Italian Bridal Sets & Diamond Solitaire Mangalsutras
        </h2>

        <div className="gold-divider" style={{ backgroundColor: 'var(--gold-light)' }} />

        <p className="body-lead" style={{ color: '#E8E1D5', marginBottom: '2.5rem' }}>
          Crafted to transform your sacred vows into enduring heirlooms. Explore our Venetian diamond chokers, uncut polki sets, and contemporary 18kt gold mangalsutras.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/bridal" className="btn btn-gold btn-lg">
            Explore Bridal Collection
          </Link>
          <Link to="/appointment" className="btn btn-outline-gold btn-lg" style={{ color: 'var(--ivory)', borderColor: 'var(--gold-light)' }}>
            Book Private Suite Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BridalBanner;
