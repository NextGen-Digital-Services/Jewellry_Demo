import React from 'react';
import { Instagram } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import { IMAGES } from '../../data/images';

const InstagramGrid = () => {
  const images = [
    IMAGES.PRODUCTS.RINGS[0],
    IMAGES.PRODUCTS.NECKLACES[0],
    IMAGES.PRODUCTS.EARRINGS[0],
    IMAGES.HERO.BRIDAL,
    IMAGES.COLLECTIONS.FIRENZE,
    IMAGES.PRODUCTS.BRACELETS[0]
  ];

  return (
    <section className="section-padding bg-bone border-bottom-line">
      <div className="site-container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <span className="roman-numeral">X — GALLERIA SOCIALE</span>
          <p className="subtitle">@AureliaVeneziaOfficial</p>
          <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Follow Our Atelier Journey</h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {images.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              style={{ position: 'relative', display: 'block', overflow: 'hidden' }}
              className="smart-image-wrapper zoom"
            >
              <SmartImage src={img} alt={`Instagram ${index + 1}`} aspectRatio="1/1" />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(91, 26, 36, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ivory)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <Instagram size={28} color="var(--gold-light)" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
