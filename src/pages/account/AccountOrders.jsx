import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import SmartImage from '../../components/common/SmartImage';

const AccountOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOrders().then(res => {
      setOrders(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <SEO title="My Orders | Privé Portal" description="View your order history and live dispatch status." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Account', path: '/account' }, { label: 'My Orders' }]} />
          <div style={{ padding: '2rem 0 3.5rem 0' }}>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>My Order History</h1>
            <div className="gold-divider-left" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          {loading ? (
            <p style={{ color: 'var(--stone)' }}>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '3rem' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>No Orders Placed Yet</h3>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 1.5rem 0' }}>Discover your first piece of Italian fine jewellery.</p>
              <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {orders.map(order => (
                <div key={order.id} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 className="h3" style={{ fontSize: '1.2rem', color: 'var(--bordeaux)', margin: 0 }}>Order {order.id}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Placed {new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span>
                      <Link to={`/track-order?id=${order.id}`} className="btn btn-outline-gold btn-sm">
                        Track Shipment
                      </Link>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '60px' }}>
                          <SmartImage src={item.image} alt={item.name} aspectRatio="1/1" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--ink)' }}>{item.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--stone)' }}>Qty: {item.qty} • Size: {item.selectedSize}</span>
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--bordeaux)' }}>{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem', marginTop: '1rem', textAlign: 'right', fontWeight: 600, fontSize: '1.1rem', color: 'var(--ink)' }}>
                    Total: {formatPrice(order.totalAmount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AccountOrders;
