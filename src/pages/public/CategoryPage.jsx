import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductCard from '../../components/shop/ProductCard';
import SmartImage from '../../components/common/SmartImage';
import { api } from '../../services/api';

const CategoryPage = () => {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getCollections().then(cols => {
      const match = cols.find(c => c.slug === slug);
      setCollection(match || { name: slug.toUpperCase(), tagline: 'Italian High Jewellery', description: 'Exclusive collection forged by Aurelia Venezia master goldsmiths.' });
    });

    api.getProducts({ collection: slug }).then(res => {
      setProducts(res);
      setLoading(false);
    });
  }, [slug]);

  return (
    <>
      <SEO title={collection ? collection.name : 'Collection'} description={collection ? collection.description : ''} />

      {/* Hero Banner */}
      <div style={{ position: 'relative', width: '100%', height: '380px', backgroundColor: 'var(--ink)', color: 'var(--ivory)', overflow: 'hidden' }}>
        {collection?.image && (
          <img src={collection.image} alt={collection.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        )}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(27,23,20,0.4)' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <span className="roman-numeral" style={{ color: 'var(--gold-light)' }}>COLLEZIONE ESCLUSIVA</span>
          <h1 className="h1" style={{ color: 'var(--ivory)' }}>{collection?.name}</h1>
          <div className="gold-divider" style={{ backgroundColor: 'var(--gold-light)' }} />
          <p style={{ color: '#D8CFBD', maxWidth: '600px', fontSize: '1rem' }}>{collection?.description}</p>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Collections', path: '/collections' }, { label: collection?.name || slug }]} />

          {loading ? (
            <p className="text-center" style={{ color: 'var(--stone)', padding: '3rem' }}>Loading collection masterpieces...</p>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Creations Arriving Soon</h3>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 1.5rem 0' }}>Explore all fine jewellery in our main catalog.</p>
              <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
