import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import ProductCard from '../shop/ProductCard';

const Bestsellers = () => {
  const { products } = useData();
  const bestsellers = products.filter(p => p.bestseller).slice(0, 4);

  return (
    <section className="section-padding bg-ivory border-bottom-line">
      <div className="site-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="roman-numeral">VI — I PIÙ AMATI</span>
            <p className="subtitle">Most Coveted Creations</p>
            <h2 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Iconic Bestsellers</h2>
          </div>
          <Link to="/shop?sort=popular" className="btn btn-outline-gold btn-sm">
            View All Bestsellers →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {bestsellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
