import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { APP_CONFIG } from '../../config';

const NotFoundPage = () => {
  return (
    <>
      <SEO title="Page Not Found (404)" description="The page you requested could not be found." />

      <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--ivory)', textAlign: 'center', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '600px' }}>
          <span className="roman-numeral">ERRORE 404</span>
          <h1 className="h1" style={{ color: 'var(--bordeaux)', fontSize: '4rem', margin: '0.5rem 0' }}>404</h1>
          <h2 className="h2" style={{ color: 'var(--ink)', marginBottom: '1rem' }}>Page Not Found</h2>
          <div className="gold-divider" />
          <p style={{ color: 'var(--stone)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            The luxury creation or page you are seeking is either unavailable or has been relocated to another gallery room.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">Return to Homepage</Link>
            <Link to="/shop" className="btn btn-outline-gold">Explore All Jewellery</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
