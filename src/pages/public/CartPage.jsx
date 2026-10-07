import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

const CartPage = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    giftWrap,
    setGiftWrap,
    giftWrapFee,
    shippingFee,
    tax,
    totalAmount,
    coupon,
    updateQty,
    removeFromCart,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput.trim());
      setCouponInput('');
    }
  };

  return (
    <>
      <SEO title="Shopping Bag | Aurelia Venezia" description="Review your selected fine jewellery pieces and proceed to secure checkout." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Shopping Bag', path: '/cart' }]} />
          <div style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
            <span className="roman-numeral">BORSA DELLA SPESA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Your Shopping Bag</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--white)', border: '1px solid var(--line)', borderRadius: '2px' }}>
              <ShoppingBag size={56} color="var(--line)" style={{ margin: '0 auto 1.5rem auto' }} />
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Your Shopping Bag is Empty</h3>
              <p style={{ color: 'var(--stone)', margin: '0.75rem 0 2rem 0' }}>
                Browse our high jewellery collections and find your piece of Florence.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg">
                Explore All Jewellery
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }} className="cart-page-grid">
              {/* Item List */}
              <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
                <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  Bag Items ({cart.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cart.map(item => (
                    <div
                      key={item.cartItemId}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr auto',
                        gap: '1.5rem',
                        paddingBottom: '1.5rem',
                        borderBottom: '1px solid var(--line)',
                        alignItems: 'center'
                      }}
                    >
                      <SmartImage src={item.product.images[0]} alt={item.product.name} aspectRatio="1/1" />

                      <div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: 0, color: 'var(--ink)' }}>
                          <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--stone)', marginTop: '0.3rem' }}>
                          Metal: {item.product.purity} {item.product.metal} • Size: {item.selectedSize}
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>
                          Weight: {item.product.weightGrams}g
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '2px' }}>
                            <button onClick={() => updateQty(item.cartItemId, item.qty - 1)} style={{ padding: '0.3rem 0.6rem' }}><Minus size={14} /></button>
                            <span style={{ padding: '0 0.8rem', fontWeight: 600, fontSize: '0.9rem' }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.cartItemId, item.qty + 1)} style={{ padding: '0.3rem 0.6rem' }}><Plus size={14} /></button>
                          </div>

                          <button onClick={() => removeFromCart(item.cartItemId)} style={{ color: 'var(--stone)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--bordeaux)', fontFamily: 'var(--font-serif)' }}>
                          {formatPrice(item.product.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
                <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  Order Summary
                </h3>

                {/* Gift Wrap */}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', marginBottom: '1.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} />
                  <Gift size={18} color="var(--gold)" />
                  <span>Velvet Box & Italian Satin Gift Wrap (+₹250)</span>
                </label>

                {/* Coupon Code */}
                {coupon ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--ivory)', padding: '0.75rem 1rem', border: '1px solid var(--gold)', borderRadius: '2px', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--bordeaux)', fontWeight: 600 }}>
                      Code: {coupon.code} (-{formatPrice(discountAmount)})
                    </span>
                    <button onClick={removeCoupon} style={{ color: 'var(--stone)', fontSize: '0.75rem' }}>Remove</button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.85rem', padding: '0.6rem 0.8rem' }}
                    />
                    <button type="submit" className="btn btn-outline-gold btn-sm">Apply</button>
                  </form>
                )}

                {/* Cost Calculations */}
                <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--bordeaux)' }}>
                      <span>Promotional Discount</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                      <span>Velvet Gift Wrap</span>
                      <span>{formatPrice(giftWrapFee)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                    <span>Insured Shipping</span>
                    <span>{shippingFee === 0 ? 'COMPLIMENTARY' : formatPrice(shippingFee)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                    <span>GST (3%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, color: 'var(--ink)', paddingTop: '0.75rem', borderTop: '1px solid var(--line)' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--bordeaux)', fontFamily: 'var(--font-serif)' }}>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                <button onClick={() => navigate('/checkout')} className="btn btn-primary btn-full btn-lg">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--stone)' }}>
                  <ShieldCheck size={16} color="var(--gold)" />
                  <span>100% Insured Delivery & 30-Day Money Back Guarantee</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default CartPage;
