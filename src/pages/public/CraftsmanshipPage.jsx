import React from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import { IMAGES } from '../../data/images';

const CraftsmanshipPage = () => {
  const steps = [
    { title: 'I. CAD & Wax Sculpting', desc: 'Every design starts with 3D CAD modeling and precise hand-carved wax prototypes to ensure perfect structural equilibrium.', img: IMAGES.ATELIER.DESIGN },
    { title: 'II. Lost-Wax Gold Casting', desc: '18kt and 22kt fine gold alloys are melted at 1,064°C and poured using vacuum-assisted Italian casting furnaces.', img: IMAGES.ATELIER.CASTING },
    { title: 'III. Florentine Burin Engraving', desc: 'Master artisans engrave silk-like micro-facets directly into gold using hardened steel burin blades.', img: IMAGES.ATELIER.SETTING },
    { title: 'IV. Micro-Pavé Diamond Setting', desc: 'Under 40x optical magnification, VVS diamonds are set with microscopic claws to maximize light reflection.', img: IMAGES.ATELIER.POLISHING },
    { title: 'V. Hand Polishing & BIS Hallmarking', desc: 'Pieces undergo high-lustre mirror buffing and official BIS laser hallmarking before final quality vault sealing.', img: IMAGES.ATELIER.HALLMARK }
  ];

  return (
    <>
      <SEO title="Craftsmanship & The Atelier" description="Explore the 5 steps of Italian goldsmithing from wax sculpting to lost-wax casting and hand burin engraving." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Craftsmanship & Atelier', path: '/craftsmanship' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">MAESTRIA ORAFA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>The Atelier Process</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--stone)', maxWidth: '600px', margin: '0 auto' }}>
              Step inside the workshop where raw gold and certified diamonds are transformed into fine jewellery.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {steps.map((step, idx) => (
              <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }} className="craft-step-grid">
                <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>
                  <SmartImage src={step.img} alt={step.title} aspectRatio="4/3" zoom />
                </div>
                <div style={{ order: idx % 2 === 0 ? 2 : 1 }}>
                  <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '0.75rem' }}>{step.title}</h3>
                  <div className="gold-divider-left" />
                  <p style={{ color: 'var(--stone)', fontSize: '1rem', lineHeight: 1.8 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 850px) {
          .craft-step-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default CraftsmanshipPage;
