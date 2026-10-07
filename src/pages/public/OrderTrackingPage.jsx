import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { Search, CheckCircle, Clock, Truck, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';

const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (idToSearch) => {
    const id = idToSearch || orderId;
    if (!id.trim()) return;

    setLoading(true);
    setSearched(true);
    api.getOrder(id.trim()).then(res => {
      setOrder(res);
      setLoading(false);
    });
  };

  return (
    <>
      <SEO title="Order Tracking & Status" description="Track your Aurelia Venezia luxury fine jewellery order in real-time." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Order Tracking', path: '/track-order' }]} />
          <div style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
            <span className="roman-numeral">TRACCIAMENTO ORDINE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Live Order Tracking</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '750px' }}>
          {/* Search Form */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px', marginBottom: '2.5rem' }}>
            <label className="form-label">Enter Order Reference ID</label>
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. ORD-2026-8812"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-gold">
                <Search size={18} /> Track
              </button>
            </form>
          </div>

          {/* Result View */}
          {loading ? (
            <p className="text-center" style={{ color: 'var(--stone)' }}>Retrieving live dispatch records...</p>
          ) : searched && !order ? (
            <div style={{ textAlign: 'center', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '3rem', borderRadius: '2px' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>No Order Record Found</h3>
              <p style={{ color: 'var(--stone)', marginTop: '0.5rem' }}>
                Please verify the Order ID format (e.g. ORD-2026-XXXX) from your confirmation receipt.
              </p>
            </div>
          ) : order ? (
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '2.5rem', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="h3" style={{ color: 'var(--bordeaux)', margin: 0 }}>Order {order.id}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Placed on {new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className={`status-pill ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              {order.trackingNumber && (
                <div style={{ backgroundColor: 'var(--bone)', padding: '0.75rem 1rem', borderRadius: '2px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--ink)' }}>
                  <strong>Courier Tracking AWB:</strong> {order.trackingNumber}
                </div>
              )}

              {/* Status Timeline */}
              <h4 className="subtitle" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem' }}>Atelier & Dispatch Timeline</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', paddingLeft: '1.5rem' }}>
                <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '7px', width: '2px', backgroundColor: 'var(--line)' }} />

                {order.timeline.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'absolute', left: '-1.5rem', top: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: step.completed ? 'var(--bordeaux)' : 'var(--line)', border: '3px solid var(--white)' }} />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: step.completed ? 'var(--ink)' : 'var(--stone)' }}>{step.status}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{step.time}</span>
                    </div>
                    {step.completed && <CheckCircle size={16} color="var(--gold)" />}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default OrderTrackingPage;
