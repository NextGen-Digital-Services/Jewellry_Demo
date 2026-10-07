import React from 'react';
import { Link } from 'react-router-dom';
import SmartImage from '../common/SmartImage';
import { IMAGES } from '../../data/images';

const MaestriOrafi = () => {
  return (
    <section className="section-padding bg-ivory border-bottom-line">
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="roman-numeral">V — ATELIER DI FIRENZE</span>
            <p className="subtitle">Maestri Orafi Craftsmen</p>
            <h2 className="h2" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem' }}>
              Hand-Chiselled Italian Gold & Micro-Set Diamonds
            </h2>
            <div className="gold-divider-left" />

            <p className="body-lead" style={{ marginBottom: '1.25rem' }}>
              “Every hammer stroke, burin engraving, and claw setting carries the soul of Florence.”
            </p>

            <p style={{ color: 'var(--stone)', marginBottom: '2rem', lineHeight: 1.8 }}>
              At Aurelia Venezia, we reject industrial mass-production. Our master goldsmiths train for over a decade before forging our signature scallop settings. Combining 16th-century Renaissance goldsmithing with modern GIA diamond precision, each creation is individually hallmarked and stamped with our maker’s mark.
            </p>

            <Link to="/craftsmanship" className="btn btn-primary">
              Discover The Atelier Process
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ marginTop: '2rem' }}>
              <SmartImage
                src={IMAGES.ATELIER.CASTING}
                alt="Florentine Goldsmith at work"
                aspectRatio="3/4"
              />
            </div>
            <div>
              <SmartImage
                src={IMAGES.ATELIER.SETTING}
                alt="Micro-setting diamonds"
                aspectRatio="3/4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaestriOrafi;
