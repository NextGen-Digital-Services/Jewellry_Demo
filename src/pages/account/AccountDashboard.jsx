import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, MapPin, Heart, LogOut, ShieldCheck } from 'lucide-react';

const AccountDashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      <SEO title="Privé Client Portal" description="Manage your orders, addresses, and wishlist in the Aurelia Privé portal." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Privé Portal', path: '/account' }]} />
          <div style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">PORTALE PRIVÈ</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Welcome, {user.name}</h1>
            <p style={{ color: 'var(--stone)', fontSize: '0.92rem' }}>Member since 2026 • Privé Gold Tier</p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>

            <Link to="/account/orders" className="card" style={{ padding: '2rem', textDecoration: 'none' }}>
              <ShoppingBag size={32} color="var(--bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 className="h3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>My Orders</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                Track dispatch timelines, view tax invoices, and hallmarking certificates.
              </p>
            </Link>

            <Link to="/account/addresses" className="card" style={{ padding: '2rem', textDecoration: 'none' }}>
              <MapPin size={32} color="var(--bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 className="h3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>Address Book</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                Manage home, office, and secondary shipping destinations.
              </p>
            </Link>

            <Link to="/wishlist" className="card" style={{ padding: '2rem', textDecoration: 'none' }}>
              <Heart size={32} color="var(--bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 className="h3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>Saved Wishlist</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                View saved 18kt gold creations and solitaire favorites.
              </p>
            </Link>

            <div className="card" style={{ padding: '2rem', cursor: 'pointer' }} onClick={logoutUser}>
              <LogOut size={32} color="var(--bordeaux)" style={{ marginBottom: '1rem' }} />
              <h3 className="h3" style={{ fontSize: '1.3rem', color: 'var(--ink)' }}>Sign Out</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                Safely exit your Aurelia Privé client account session.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AccountDashboard;
