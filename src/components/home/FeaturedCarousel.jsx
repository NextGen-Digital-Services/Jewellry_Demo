import React from 'react';
import { useData } from '../../context/DataContext';
import ProductCard from '../shop/ProductCard';

const FeaturedCarousel = () => {
  const { products } = useData();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <section className="section-padding bg-bone border-bottom-line">
      <div className="site-container">
        <div className="text-center" style={{ marginBottom: '3.5rem' }}>
          <span className="roman-numeral">III — ALTA GIOIELLERIA</span>
          <p className="subtitle">High Jewellery Spotlight</p>
          <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Featured Masterpieces</h2>
          <div className="gold-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
