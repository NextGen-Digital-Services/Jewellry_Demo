import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductCard from '../../components/shop/ProductCard';
import SmartImage from '../../components/common/SmartImage';
import BespokeFormModal from '../../components/product/BespokeFormModal';
import { api } from '../../services/api';
import { IMAGES } from '../../data/images';

const BridalPage = () => {
  const [bridalProducts, setBridalProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    api.getProducts({ category: 'Bridal & Mangalsutra' }).then(res => setBridalProducts(res));
  }, []);

  return (
    <>
      <SEO title="Bridal & Engagement | High Jewellery Sets & Mangalsutra" description="Haute Couture Italian bridal diamond chokers, uncut polki sets, and 18kt solitaire mangalsutras." />

      {/* Hero */}
      <div style={{ position: 'relative', width: '100%', height: '450px', backgroundColor: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden' }}>
        <img src={IMAGES.HERO.BRIDAL} alt="Haute Couture Bridal" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(91, 26, 36, 0.4)' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <span className="roman-numeral" style={{ color: 'var(--gold-light)' }}>COLLEZIONE SPOSA</span>
          <h1 className="h1" style={{ color: 'var(--ivory)' }}>Royal Italian Bridal & Mangalsutra</h1>
          <div className="gold-divider" style={{ backgroundColor: 'var(--gold-light)' }} />
          <p style={{ color: '#E8E1D5', maxWidth: '650px', fontSize: '1.05rem' }}>
            Transforming sacred union into timeless Italian craftsmanship. Tailored bridal chokers, certified diamond sets, and solitaire mangalsutras.
          </p>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-gold btn-lg" style={{ marginTop: '1.5rem' }}>
            Book Private Bridal Suite Session
          </button>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Bridal & Engagement', path: '/bridal' }]} />

          <div className="text-center" style={{ margin: '2rem 0 3.5rem 0' }}>
            <span className="subtitle">Curated Heirloom Sets</span>
            <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>The Bridal Gallery</h2>
            <div className="gold-divider" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {bridalProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      <BespokeFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productName="Haute Couture Bridal Suite" />
    </>
  );
};

export default BridalPage;
