import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import SmartImage from '../common/SmartImage';

const CategoryTiles = () => {
  const { categories } = useData();

  return (
    <section className="section-padding bg-ivory border-bottom-line">
      <div className="site-container">
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <span className="roman-numeral">II — COLLEZIONI</span>
          <p className="subtitle">Curated Fine Jewellery</p>
          <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Explore by Category</h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="card"
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <SmartImage
                src={cat.image}
                alt={cat.name}
                aspectRatio="1/1"
                zoom
              />
              <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--white)' }}>
                <h3 className="h3" style={{ fontSize: '1.4rem', color: 'var(--ink)', margin: 0 }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                  {cat.description}
                </p>
                <span className="link-underline" style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                  Discover Pieces →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryTiles;
