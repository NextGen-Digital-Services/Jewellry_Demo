import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { isValidEmail, isValidPhone, isValidPincode } from '../../utils/validators';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, CreditCard, Smartphone, Banknote, ArrowRight } from 'lucide-react';

const CheckoutPage = () => {
  const { cart, subtotal, discountAmount, giftWrapFee, shippingFee, tax, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: user?.addresses?.[0]?.addressLine || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Maharashtra',
    pincode: user?.addresses?.[0]?.pincode || '',
    country: 'India',
    paymentMethod: 'Credit Card'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    navigate('/shop');
    return null;
  }

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!isValidEmail(formData.email)) errs.email = 'Valid email address is required.';
    if (!isValidPhone(formData.phone)) errs.phone = 'Valid 10-digit phone number is required.';
    if (!formData.addressLine.trim()) errs.addressLine = 'Street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!isValidPincode(formData.pincode)) errs.pincode = 'Valid 6-digit Indian postal code is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please fix errors in the shipping address form.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customer: { name: formData.name, email: formData.email, phone: formData.phone },
        shippingAddress: {
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country
        },
        items: cart.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          qty: item.qty,
          image: item.product.images[0],
          selectedSize: item.selectedSize
        })),
        subtotal,
        discount: discountAmount,
        giftWrapFee,
        shippingFee,
        tax,
        totalAmount,
        paymentMethod: formData.paymentMethod
      };

      const newOrder = await api.createOrder(orderPayload);
      clearCart();
      addToast(`Order placed successfully! Order ID: ${newOrder.id}`, 'success');
      navigate(`/order-success/${newOrder.id}`);
    } catch (err) {
      addToast('Error creating order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Secure Checkout | Aurelia Venezia" description="Complete your luxury fine jewellery purchase with 100% insured delivery." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Bag', path: '/cart' }, { label: 'Secure Checkout' }]} />
          <div style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
            <span className="roman-numeral">CASSA SICURA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Checkout & Order Review</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }} className="checkout-grid">

            {/* Address & Payment Form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address Box */}
              <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
                <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  1. Shipping & Delivery Address
                </h3>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Singhania"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address (Order Updates)</label>
                    <input
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number (10-Digit)</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="9876543210"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address & Flat / Suite</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.addressLine}
                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    placeholder="e.g. 42 Altamount Road, Malabar Hill"
                  />
                  {errors.addressLine && <span className="form-error">{errors.addressLine}</span>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode (6-Digit)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
                <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  2. Select Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: formData.paymentMethod === 'Credit Card' ? '2px solid var(--bordeaux)' : '1px solid var(--line)', borderRadius: '2px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'Credit Card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'Credit Card' })}
                    />
                    <CreditCard size={20} color="var(--gold)" />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem' }}>Credit / Debit Card (Visa, Mastercard, Amex)</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>Encrypted 256-bit SSL transaction</span>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: formData.paymentMethod === 'UPI' ? '2px solid var(--bordeaux)' : '1px solid var(--line)', borderRadius: '2px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                    />
                    <Smartphone size={20} color="var(--gold)" />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem' }}>Instant UPI / Google Pay / PhonePe</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>Pay directly from your mobile app</span>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: formData.paymentMethod === 'Cash on Delivery' ? '2px solid var(--bordeaux)' : '1px solid var(--line)', borderRadius: '2px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery' })}
                    />
                    <Banknote size={20} color="var(--gold)" />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', fontSize: '0.9rem' }}>Insured Cash / Card on Delivery</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>Available for orders up to ₹49,999</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', maxHeight: '240px', overflowY: 'auto' }}>
                {cart.map(item => (
                  <div key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span>{item.qty}x {item.product.name} ({item.selectedSize})</span>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--line)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--bordeaux)' }}>
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                {giftWrapFee > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                    <span>Gift Wrap</span>
                    <span>{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                  <span>Insured Courier</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                  <span>GST (3%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 600, color: 'var(--ink)', paddingTop: '0.75rem', borderTop: '1px solid var(--line)' }}>
                  <span>Total Payable</span>
                  <span style={{ color: 'var(--bordeaux)', fontFamily: 'var(--font-serif)' }}>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={submitting}>
                {submitting ? 'Creating Order...' : 'Place Order & Pay'} <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem', fontSize: '0.72rem', color: 'var(--stone)' }}>
                <ShieldCheck size={16} color="var(--gold)" />
                <span>100% Insured Delivery & Official Hallmark Receipt</span>
              </div>
            </div>
          </form>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default CheckoutPage;
