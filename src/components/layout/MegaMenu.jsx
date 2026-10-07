import React from 'react';
import { Link } from 'react-router-dom';
import SmartImage from '../common/SmartImage';
import { INITIAL_CATEGORIES, INITIAL_COLLECTIONS } from '../../data/seed';

const MegaMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'var(--ivory)',
        borderBottom: '1px solid var(--gold-light)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
        zIndex: 800,
        padding: '2.5rem 0'
      }}
    >
      <div className="site-container" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 3fr', gap: '3rem' }}>
        {/* Categories */}
        <div>
          <h4 className="subtitle" style={{ color: 'var(--bordeaux)' }}>Collezioni / Categories</h4>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            {INITIAL_CATEGORIES.map(cat => (
              <li key={cat.id}>
                <Link
                  to={`/shop?category=${cat.slug}`}
                  onClick={onClose}
                  style={{ fontSize: '0.88rem', color: 'var(--ink)' }}
                  className="link-underline"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* High Jewellery Collections */}
        <div>
          <h4 className="subtitle" style={{ color: 'var(--bordeaux)' }}>Named Collections</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
            {INITIAL_COLLECTIONS.map(col => (
              <li key={col.id}>
                <Link
                  to={`/collections/${col.slug}`}
                  onClick={onClose}
                  style={{ display: 'block' }}
                >
                  <span style={{ fontSize: '0.92rem', fontFamily: 'var(--font-serif)', fontWeight: 500, color: 'var(--ink)' }}>
                    {col.name}
                  </span>
                  <p style={{ fontSize: '0.72rem', color: 'var(--stone)' }}>{col.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Preview Tile */}
        <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '2rem' }}>
          <h4 className="subtitle">Craftsmanship Spotlight</h4>
          <div style={{ marginTop: '1rem' }}>
            <SmartImage
              src={INITIAL_COLLECTIONS[0].image}
              alt="Firenze Collection"
              aspectRatio="16/9"
            />
            <h4 style={{ fontFamily: 'var(--font-serif)', marginTop: '0.75rem', fontSize: '1.2rem' }}>
              Firenze 1954 Renaissance Gold
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--stone)', margin: '0.4rem 0 1rem 0' }}>
              Hand-chiselled 18kt gold with scalloped diamond bezels forged in our Florence atelier.
            </p>
            <Link to="/collections/firenze" onClick={onClose} className="btn btn-outline btn-sm">
              Discover Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
