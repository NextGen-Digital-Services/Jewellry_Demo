import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductCard from '../../components/shop/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import { Heart } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <>
      <SEO title="My Wishlist" description="Your saved fine jewellery favorites from Aurelia Venezia." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'My Wishlist', path: '/wishlist' }]} />
          <div style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
            <span className="roman-numeral">PREFERITI</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Saved Wishlist Pieces</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--white)', border: '1px solid var(--line)', borderRadius: '2px' }}>
              <Heart size={56} color="var(--line)" style={{ margin: '0 auto 1.5rem auto' }} />
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Your Wishlist is Empty</h3>
              <p style={{ color: 'var(--stone)', margin: '0.75rem 0 2rem 0' }}>
                Save your favorite 18kt gold rings, chokers, and solitaire pieces while exploring.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Explore Catalog
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button onClick={clearWishlist} className="btn btn-outline btn-sm">
                  Clear Wishlist
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
                {wishlist.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default WishlistPage;
