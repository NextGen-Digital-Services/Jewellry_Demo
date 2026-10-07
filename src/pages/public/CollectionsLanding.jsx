import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import { INITIAL_COLLECTIONS } from '../../data/seed';

const CollectionsLanding = () => {
  return (
    <>
      <SEO title="Editorial Named Collections" description="Explore Firenze 1954, Roma Imperial, Venezia Luce, Milano Moderne, and Capri Riviera." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Editorial Collections', path: '/collections' }]} />
          <div className="text-center" style={{ padding: '2.5rem 0 3.5rem 0' }}>
            <span className="roman-numeral">LE NOSTRE COLLEZIONI</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Named Collections</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--stone)', maxWidth: '650px', margin: '0 auto', fontSize: '0.95rem' }}>
              Each collection embodies the architectural beauty, coastlines, and Renaissance spirit of Italy.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {INITIAL_COLLECTIONS.map((col, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={col.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '3.5rem',
                    alignItems: 'center',
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--line)',
                    padding: '2.5rem',
                    borderRadius: '2px'
                  }}
                  className="collection-editorial-row"
                >
                  <div style={{ order: isEven ? 1 : 2 }}>
                    <SmartImage src={col.image} alt={col.name} aspectRatio="16/10" zoom />
                  </div>

                  <div style={{ order: isEven ? 2 : 1 }}>
                    <span className="subtitle" style={{ color: 'var(--gold)' }}>COLLEZIONE {idx + 1}</span>
                    <h2 className="h2" style={{ color: 'var(--bordeaux)', marginBottom: '0.5rem' }}>{col.name}</h2>
                    <p className="body-lead" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{col.tagline}</p>
                    <div className="gold-divider-left" />
                    <p style={{ color: 'var(--stone)', marginBottom: '1.75rem', lineHeight: 1.7 }}>{col.description}</p>
                    <Link to={`/collections/${col.slug}`} className="btn btn-primary">
                      Explore {col.name} Collection →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .collection-editorial-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default CollectionsLanding;
