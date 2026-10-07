import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import ProductCard from '../shop/ProductCard';

const GiftGuide = () => {
  const [activeTier, setActiveTier] = useState('under-100k');
  const { products } = useData();

  const tiers = [
    { id: 'under-100k', label: 'Under ₹1,00,000', max: 100000 },
    { id: '100k-300k', label: '₹1,00,000 – ₹3,00,000', min: 100000, max: 300000 },
    { id: '300k-plus', label: 'High Jewellery (₹3L+)', min: 300000 }
  ];

  const currentTierObj = tiers.find(t => t.id === activeTier);

  const filteredProducts = products.filter(p => {
    if (currentTierObj.min && p.price < currentTierObj.min) return false;
    if (currentTierObj.max && p.price > currentTierObj.max) return false;
    return true;
  }).slice(0, 4);

  return (
    <section className="section-padding bg-bone border-bottom-line">
      <div className="site-container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <span className="roman-numeral">VIII — GUIDA AI REGALI</span>
          <p className="subtitle">Curated Gift Concierge</p>
          <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Luxury Gifts by Budget</h2>
          <div className="gold-divider" />

          {/* Budget Filter Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {tiers.map(tier => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`btn ${activeTier === tier.id ? 'btn-bordeaux' : 'btn-outline'}`}
                style={{
                  backgroundColor: activeTier === tier.id ? 'var(--bordeaux)' : 'var(--white)',
                  color: activeTier === tier.id ? 'var(--ivory)' : 'var(--ink)'
                }}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftGuide;
