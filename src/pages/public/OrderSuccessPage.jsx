import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, Package, Download, ArrowRight } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { api } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatPrice';
import SmartImage from '../../components/common/SmartImage';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOrder(orderId).then(res => {
      setOrder(res);
      setLoading(false);
    });
  }, [orderId]);

  if (loading) {
    return (
      <div className="site-container section-padding text-center">
        <p style={{ color: 'var(--stone)' }}>Fetching order confirmation receipt...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="site-container section-padding text-center">
        <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Order Record Not Found</h2>
        <p style={{ color: 'var(--stone)', margin: '1rem 0' }}>Please check your order confirmation email or track using Order ID.</p>
        <Link to="/track-order" className="btn btn-primary">Track Order</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={`Order Confirmed ${order.id}`} description="Thank you for your fine jewellery order with Aurelia Venezia." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Order Confirmation' }]} />
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '800px' }}>
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '3rem 2.5rem', borderRadius: '2px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--bone)', color: 'var(--bordeaux)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <CheckCircle size={36} />
            </div>

            <span className="subtitle" style={{ color: 'var(--gold)' }}>GRAZIE PER IL VOSTRO ORDINE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)', fontSize: '2.4rem', marginTop: '0.2rem' }}>
              Order Confirmed & Sealed
            </h1>
            <p style={{ color: 'var(--stone)', margin: '0.5rem 0 2rem 0', fontSize: '1rem' }}>
              Order Reference: <strong style={{ color: 'var(--ink)' }}>{order.id}</strong>
            </p>

            <div className="gold-divider" />

            <div style={{ backgroundColor: 'var(--bone)', padding: '1.5rem', borderRadius: '2px', textAlign: 'left', margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)', display: 'block' }}>Customer</strong>
                <span style={{ fontSize: '0.92rem', color: 'var(--ink)', fontWeight: 600 }}>{order.customer.name}</span>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--stone)' }}>{order.customer.email}</span>
              </div>
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--stone)', display: 'block' }}>Shipping To</strong>
                <span style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>{order.shippingAddress.addressLine}</span>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--stone)' }}>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <h4 className="subtitle" style={{ color: 'var(--bordeaux)' }}>Items in Shipment</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {order.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ width: '60px' }}>
                      <SmartImage src={item.image} alt={item.name} aspectRatio="1/1" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', margin: 0 }}>{item.name}</h5>
                      <span style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>Qty: {item.qty} • Size: {item.selectedSize}</span>
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--bordeaux)' }}>{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, color: 'var(--ink)', borderTop: '1px solid var(--line)', paddingTop: '1rem', marginBottom: '2.5rem' }}>
              <span>Total Paid ({order.paymentMethod})</span>
              <span style={{ color: 'var(--bordeaux)' }}>{formatPrice(order.totalAmount)}</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to={`/track-order?id=${order.id}`} className="btn btn-primary">
                Track Order Status Timeline <ArrowRight size={16} />
              </Link>
              <Link to="/shop" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccessPage;
