import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { formatPrice, formatDate } from '../../utils/formatPrice';
import SmartImage from '../../components/common/SmartImage';
import { APP_CONFIG } from '../../config';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.getOrder(id).then(res => setOrder(res));
  }, [id]);

  if (!order) return <div>Loading order details...</div>;

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="no-print">
        <Link to="/admin/orders" className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Back to Orders
        </Link>
        <button onClick={handlePrintInvoice} className="btn btn-gold btn-sm">
          <Printer size={16} /> Print Tax Invoice
        </button>
      </div>

      {/* Invoice Document Box */}
      <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '3rem', borderRadius: '2px' }} className="printable-invoice">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--gold)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--bordeaux)', letterSpacing: '0.1em' }}>
              {APP_CONFIG.BRAND_NAME}
            </span>
            <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', marginTop: '0.2rem' }}>
              TAX INVOICE & HALLMARK CERTIFICATE
            </span>
            <p style={{ fontSize: '0.78rem', color: 'var(--stone)', marginTop: '0.5rem' }}>{APP_CONFIG.CONTACT.ADDRESS}</p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h2 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>INVOICE</h2>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginTop: '0.4rem' }}>{order.id}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>Date: {formatDate(order.date)}</span>
          </div>
        </div>

        {/* Customer & Shipping */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', backgroundColor: 'var(--bone)', padding: '1.5rem', borderRadius: '2px' }}>
          <div>
            <strong style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: 'var(--stone)' }}>Billed To</strong>
            <h4 style={{ margin: '0.3rem 0 0 0', color: 'var(--ink)' }}>{order.customer.name}</h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>{order.customer.email}</span>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--stone)' }}>Phone: {order.customer.phone}</span>
          </div>

          <div>
            <strong style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', color: 'var(--stone)' }}>Insured Delivery Address</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink)', margin: '0.3rem 0 0 0' }}>{order.shippingAddress.addressLine}</p>
            <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>
              {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
            </span>
          </div>
        </div>

        {/* Items Table */}
        <table className="admin-table" style={{ marginBottom: '2rem' }}>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Karat / Purity</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <strong>{item.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>Size: {item.selectedSize}</span>
                </td>
                <td>18kt / 22kt BIS Hallmarked</td>
                <td>{item.qty}</td>
                <td>{formatPrice(item.price)}</td>
                <td><strong>{formatPrice(item.price * item.qty)}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--stone)', maxWidth: '350px' }}>
            <p><strong>Hallmark Guarantee:</strong> Certified 100% BIS hallmarked gold and IGI certified natural/lab diamonds.</p>
          </div>

          <div style={{ width: '280px', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span> <span>{formatPrice(order.subtotal)}</span></div>
            {order.discount > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--bordeaux)' }}><span>Discount:</span> <span>-{formatPrice(order.discount)}</span></div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST (3%):</span> <span>{formatPrice(order.tax)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 600, color: 'var(--bordeaux)', borderTop: '1px solid var(--line)', paddingTop: '0.5rem' }}>
              <span>Total Paid:</span> <span>{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print, .admin-sidebar, .admin-topbar { display: none !important; }
          .printable-invoice { border: none !important; padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminOrderDetail;
