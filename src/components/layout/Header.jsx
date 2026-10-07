import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import MegaMenu from './MegaMenu';
import SearchOverlay from './SearchOverlay';
import CartDrawer from './CartDrawer';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { APP_CONFIG } from '../../config';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const { cart, setIsCartDrawerOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAdminLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsMegaMenuOpen(false);
  }, [location]);

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 900, backgroundColor: 'var(--ivory)', borderBottom: '1px solid var(--line)' }}>
        <AnnouncementBar />

        <div
          style={{
            height: 'var(--header-height)',
            transition: 'height 0.3s ease',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div className="site-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="mobile-nav-toggle"
              style={{ display: 'none', color: 'var(--ink)', padding: '0.4rem' }}
              aria-label="Toggle mobile menu"
            >
              {isMobileNavOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation Left */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                style={{ position: 'relative', height: 'var(--header-height)', display: 'flex', alignItems: 'center' }}
              >
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.82rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: 'var(--ink)'
                  }}
                >
                  Collezioni <ChevronDown size={14} />
                </button>
              </div>

              <Link to="/shop" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                All Jewellery
              </Link>
              <Link to="/bridal" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                Bridal & Engagement
              </Link>
              <Link to="/bespoke" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                Bespoke Atelier
              </Link>
            </nav>

            {/* Brand Logo */}
            <Link to="/" style={{ textAlign: 'center', textDecoration: 'none' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'var(--bordeaux)',
                  display: 'block',
                  lineHeight: 1
                }}
              >
                {APP_CONFIG.BRAND_NAME}
              </span>
              <span
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  display: 'block',
                  marginTop: '0.2rem'
                }}
              >
                FIRENZE • VALENZA
              </span>
            </Link>

            {/* Right Navigation & Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/craftsmanship" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Craftsmanship
                </Link>
                <Link to="/journal" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Journal
                </Link>
                <Link to="/boutiques" className="link-underline" style={{ fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>
                  Boutiques
                </Link>
              </nav>

              {/* Action Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                  style={{ color: 'var(--ink)' }}
                >
                  <Search size={20} />
                </button>

                <Link
                  to={user ? '/account' : '/login'}
                  aria-label="User Account"
                  style={{ color: 'var(--ink)', position: 'relative' }}
                >
                  <User size={20} />
                  {isAdminLoggedIn && (
                    <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--gold)', borderRadius: '50%' }} />
                  )}
                </Link>

                <Link
                  to="/wishlist"
                  aria-label="Wishlist"
                  style={{ color: 'var(--ink)', position: 'relative' }}
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-8px',
                        backgroundColor: 'var(--gold)',
                        color: 'var(--white)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setIsCartDrawerOpen(true)}
                  aria-label="Shopping Cart"
                  style={{ color: 'var(--ink)', position: 'relative' }}
                >
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-8px',
                        backgroundColor: 'var(--bordeaux)',
                        color: 'var(--ivory)',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MegaMenu Dropdown */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Responsive Styles Helper for Mobile Drawer */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
          .header-gold-rates { display: none !important; }
        }
      `}</style>

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'var(--ivory)',
            zIndex: 1050,
            padding: '2rem 1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--bordeaux)', fontWeight: 500 }}>
              {APP_CONFIG.BRAND_NAME}
            </span>
            <button onClick={() => setIsMobileNavOpen(false)}>
              <X size={26} />
            </button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>
            <Link to="/shop" onClick={() => setIsMobileNavOpen(false)}>All Jewellery</Link>
            <Link to="/shop?category=rings" onClick={() => setIsMobileNavOpen(false)}>Rings</Link>
            <Link to="/shop?category=necklaces" onClick={() => setIsMobileNavOpen(false)}>Necklaces</Link>
            <Link to="/shop?category=earrings" onClick={() => setIsMobileNavOpen(false)}>Earrings</Link>
            <Link to="/shop?category=bracelets" onClick={() => setIsMobileNavOpen(false)}>Bracelets & Bangles</Link>
            <Link to="/bridal" onClick={() => setIsMobileNavOpen(false)}>Bridal & Engagement</Link>
            <Link to="/bespoke" onClick={() => setIsMobileNavOpen(false)}>Bespoke Atelier</Link>
            <Link to="/collections" onClick={() => setIsMobileNavOpen(false)}>Collections</Link>
            <Link to="/craftsmanship" onClick={() => setIsMobileNavOpen(false)}>Craftsmanship</Link>
            <Link to="/journal" onClick={() => setIsMobileNavOpen(false)}>Journal</Link>
            <Link to="/boutiques" onClick={() => setIsMobileNavOpen(false)}>Boutiques</Link>
            <Link to="/admin" onClick={() => setIsMobileNavOpen(false)} style={{ color: 'var(--gold)', fontWeight: 600 }}>Admin Panel</Link>
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--line)', fontSize: '0.85rem', color: 'var(--stone)' }}>
            <p>Concierge: {APP_CONFIG.CONTACT.PHONE}</p>
            <p>{APP_CONFIG.CONTACT.EMAIL}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
