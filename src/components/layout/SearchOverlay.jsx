import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import SmartImage from '../common/SmartImage';
import { formatPrice } from '../../utils/formatPrice';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim().length > 1) {
      api.getProducts({ search: query }).then(res => setResults(res.slice(0, 5)));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(27, 23, 20, 0.85)',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '4rem 1.5rem',
        overflowY: 'auto'
      }}
    >
      <button
        onClick={onClose}
        style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--ivory)', background: 'none' }}
      >
        <X size={28} />
      </button>

      <div style={{ width: '100%', maxWidth: '750px', marginTop: '2rem' }}>
        <p className="subtitle text-center" style={{ color: 'var(--gold-light)' }}>Concierge Search</p>
        <h2 className="h2 text-center" style={{ color: 'var(--ivory)', marginBottom: '2rem' }}>
          Discover Italian Fine Jewellery
        </h2>

        <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search rings, necklaces, 18kt gold, solitaire, diamonds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '1.25rem 3.5rem 1.25rem 1.5rem',
              backgroundColor: 'var(--ivory)',
              color: 'var(--ink)',
              fontSize: '1.1rem',
              borderRadius: '2px',
              border: '1px solid var(--gold)'
            }}
          />
          <button
            type="submit"
            style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--bordeaux)' }}
          >
            <Search size={24} />
          </button>
        </form>

        {/* Results preview */}
        {results.length > 0 && (
          <div style={{ backgroundColor: 'var(--ivory)', marginTop: '1rem', padding: '1.5rem', borderRadius: '2px', border: '1px solid var(--line)' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone)', marginBottom: '1rem' }}>
              Matching Creations ({results.length})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {results.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => {
                    navigate(`/product/${prod.slug}`);
                    onClose();
                  }}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', paddingBottom: '0.75rem', borderBottom: '1px solid var(--line)' }}
                >
                  <div style={{ width: '60px' }}>
                    <SmartImage src={prod.images[0]} alt={prod.name} aspectRatio="1/1" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', margin: 0 }}>{prod.name}</h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{prod.category} • {prod.purity} {prod.metal}</p>
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--bordeaux)' }}>{formatPrice(prod.price)}</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleSearchSubmit}
              className="btn btn-primary btn-full"
              style={{ marginTop: '1rem' }}
            >
              View All Results <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
