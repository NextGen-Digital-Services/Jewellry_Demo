import React from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import HeritageCounters from '../../components/home/HeritageCounters';
import { IMAGES } from '../../data/images';
import { APP_CONFIG } from '../../config';

const AboutUsPage = () => {
  return (
    <>
      <SEO title="About Us | Heritage dal 1954" description="Discover the history, founder story, and Florentine master goldsmithing heritage of Aurelia Venezia." />

      <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden' }}>
        <img src={IMAGES.HERO.ABOUT} alt="Florentine Heritage" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(27,23,20,0.4)' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <span className="roman-numeral" style={{ color: 'var(--gold-light)' }}>LA NOSTRA STORIA</span>
          <h1 className="h1" style={{ color: 'var(--ivory)' }}>The Heritage of Aurelia Venezia</h1>
          <div className="gold-divider" style={{ backgroundColor: 'var(--gold-light)' }} />
          <p style={{ color: '#E8E1D5', maxWidth: '650px', fontSize: '1.05rem' }}>
            Forging high jewellery in Florence & Valenza since 1954.
          </p>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'About Us', path: '/about' }]} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', margin: '3rem 0 5rem 0' }}>
            <div>
              <span className="subtitle">FOUNDER & MASTER GOLDSMITH</span>
              <h2 className="h2" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem' }}>
                Born on the Arno River
              </h2>
              <div className="gold-divider-left" />
              <p className="body-lead" style={{ marginBottom: '1rem' }}>
                “Jewellery is not merely gold or gemstone—it is memory sculpted for future generations.”
              </p>
              <p style={{ color: 'var(--stone)', lineHeight: 1.8 }}>
                In 1954, Maestro Aurelio Bernini established a modest goldsmith workshop beside the Ponte Vecchio in Florence. Armed with burins, hammers, and a passion for Renaissance symmetry, he began forging custom 18kt gold bands for nobility.
              </p>
              <p style={{ color: 'var(--stone)', lineHeight: 1.8, marginTop: '1rem' }}>
                Over seven decades later, Aurelia Venezia remains a family-controlled house. Today, our main ateliers in Florence and Valenza marry hand-engraved gold detailing with modern GIA diamond precision, shipping certified high jewellery worldwide.
              </p>
            </div>

            <div>
              <SmartImage src={IMAGES.HERO.CRAFT} alt="Atelier Craftsman" aspectRatio="4/3" />
            </div>
          </div>
        </div>
      </section>

      <HeritageCounters />
    </>
  );
};

export default AboutUsPage;
