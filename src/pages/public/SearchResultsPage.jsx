import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductCard from '../../components/shop/ProductCard';
import { api } from '../../services/api';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProducts({ search: query }).then(res => {
      setResults(res);
      setLoading(false);
    });
  }, [query]);

  return (
    <>
      <SEO title={`Search Results for "${query}"`} description="Search results for fine jewellery creations." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: `Search: "${query}"` }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">RISULTATI DELLA RICERCA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Search Results</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--stone)' }}>
              Showing matches for <strong style={{ color: 'var(--ink)' }}>"{query}"</strong>
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          {loading ? (
            <p className="text-center" style={{ color: 'var(--stone)' }}>Searching catalog...</p>
          ) : results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--white)', border: '1px solid var(--line)', borderRadius: '2px' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>No Creations Found for "{query}"</h3>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 2rem 0' }}>Try searching for "ring", "gold", "solitaire", "18kt", or "necklace".</p>
              <Link to="/shop" className="btn btn-primary">Browse All Jewellery</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {results.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
