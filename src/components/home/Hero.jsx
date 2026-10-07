import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Hero = () => {
  const { homeContent } = useData();

  return (
    <section style={{ position: 'relative', width: '100%', height: 'calc(100vh - 120px)', minHeight: '600px', backgroundColor: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden' }}>
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={homeContent?.heroImage || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1800&q=80&auto=format&fit=crop'}
          alt="Alta Gioielleria Italiana"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(27,23,20,0.35)' }} />
      </div>

      {/* Hero Content */}
      <div className="site-container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '750px' }}
        >
          <div className="roman-numeral">I — DAL 1954</div>
          <p className="subtitle" style={{ color: 'var(--gold-light)' }}>
            FIRENZE • VALENZA • MILANO
          </p>

          <h1 className="h1" style={{ color: 'var(--ivory)', marginTop: '0.5rem', marginBottom: '1.25rem', lineHeight: 1.08 }}>
            {homeContent?.heroHeadline || 'Alta Gioielleria Italiana'}
          </h1>

          <p className="body-lead" style={{ color: '#E8E1D5', marginBottom: '2.5rem', maxWidth: '620px' }}>
            {homeContent?.heroSubheadline || 'Handcrafted in Florence & Valenza since 1954. Timeless 18kt gold, certified diamonds, and Renaissance master craftsmanship.'}
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-gold btn-lg">
              {homeContent?.heroCtaPrimary || 'Explore Collections'}
            </Link>
            <Link to="/appointment" className="btn btn-outline-gold btn-lg" style={{ color: 'var(--ivory)', borderColor: 'var(--gold-light)' }}>
              {homeContent?.heroCtaSecondary || 'Book Video Consultation'}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hallmark bar badge overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(27,23,20,0.9)',
          borderTop: '1px solid var(--gold)',
          padding: '1rem 0'
        }}
      >
        <div className="site-container" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)' }}>
          <span>✦ 100% BIS Hallmarked 18kt/22kt Gold</span>
          <span>✦ GIA & IGI Certified Diamonds</span>
          <span>✦ Hand-Forged in Florence Atelier</span>
          <span>✦ Lifetime Craftsmanship Guarantee</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
