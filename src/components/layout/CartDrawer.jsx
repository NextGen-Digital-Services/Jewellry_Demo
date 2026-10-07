import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SmartImage from '../common/SmartImage';
import { formatPrice } from '../../utils/formatPrice';

const CartDrawer = () => {
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
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQty,
    removeFromCart,
    applyCouponCode,
    removeCoupon
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const navigate = useNavigate();

  const freeShippingThreshold = 50000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCouponCode(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  if (!isCartDrawerOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(27, 23, 20, 0.6)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        onClick={() => setIsCartDrawerOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100%',
            backgroundColor: 'var(--ivory)',
            boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShoppingBag size={20} color="var(--bordeaux)" />
              <h3 className="h3" style={{ fontSize: '1.25rem', color: 'var(--bordeaux)' }}>
                Shopping Bag ({cart.length})
              </h3>
            </div>
            <button onClick={() => setIsCartDrawerOpen(false)} style={{ color: 'var(--ink)' }}>
              <X size={22} />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div style={{ backgroundColor: 'var(--bone)', padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <strong style={{ color: 'var(--success)' }}>✓ You have unlocked Free Insured Shipping!</strong>
                ) : (
                  <span>Add <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong> more for Free Insured Shipping</span>
                )}
              </span>
            </div>
            <div style={{ height: '4px', backgroundColor: 'var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--bordeaux)', transition: 'width 0.3s' }} />
            </div>
          </div>

          {/* Cart items list */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <ShoppingBag size={48} color="var(--line)" style={{ margin: '0 auto 1rem auto' }} />
                <h4 className="h4" style={{ color: 'var(--stone)' }}>Your shopping bag is empty</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--stone)', margin: '0.5rem 0 1.5rem 0' }}>
                  Explore our fine jewellery collections and find your dream piece.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="btn btn-primary"
                >
                  Explore Shop
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {cart.map(item => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--line)'
                    }}
                  >
                    <div style={{ width: '80px', flexShrink: 0 }}>
                      <SmartImage src={item.product.images[0]} alt={item.product.name} aspectRatio="1/1" />
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', margin: 0, paddingRight: '0.5rem' }}>
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{ color: 'var(--stone)', padding: '0.2rem' }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--stone)', marginTop: '0.25rem' }}>
                          {item.product.purity} {item.product.metal} • Size: {item.selectedSize}
                        </p>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--line)', borderRadius: '2px' }}>
                          <button
                            onClick={() => updateQty(item.cartItemId, item.qty - 1)}
                            style={{ padding: '0.25rem 0.5rem', color: 'var(--ink)' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ padding: '0 0.6rem', fontSize: '0.85rem', fontWeight: 600 }}>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.cartItemId, item.qty + 1)}
                            style={{ padding: '0.25rem 0.5rem', color: 'var(--ink)' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span style={{ fontWeight: 600, color: 'var(--bordeaux)', fontSize: '0.95rem' }}>
                          {formatPrice(item.product.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--line)', backgroundColor: 'var(--bone)' }}>
              {/* Gift wrap option */}
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', marginBottom: '1rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                />
                <Gift size={16} color="var(--gold)" />
                <span>Add Italian Velvet Gift Wrapping & Letter (+₹250)</span>
              </label>

              {/* Coupon input */}
              {coupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--ivory)', padding: '0.5rem 0.75rem', border: '1px solid var(--gold)', borderRadius: '2px', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--bordeaux)', fontWeight: 600 }}>
                    Coupon: {coupon.code} (-{formatPrice(discountAmount)})
                  </span>
                  <button onClick={removeCoupon} style={{ color: 'var(--stone)', fontSize: '0.75rem' }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Coupon (e.g. WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.82rem', backgroundColor: 'var(--ivory)', border: '1px solid var(--line)', borderRadius: '2px' }}
                  />
                  <button type="submit" className="btn btn-outline-gold btn-sm">
                    Apply
                  </button>
                </form>
              )}

              {/* Totals */}
              <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
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
                {giftWrap && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                    <span>Gift Wrap</span>
                    <span>{formatPrice(giftWrapFee)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                  <span>Insured Express Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--stone)' }}>
                  <span>Estimated GST (3%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.1rem', color: 'var(--ink)', paddingTop: '0.5rem', borderTop: '1px solid var(--line)' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--bordeaux)' }}>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary btn-full btn-lg"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--stone)' }}>
                <ShieldCheck size={14} color="var(--gold)" />
                <span>100% Insured Delivery & 30-Day Money-Back Guarantee</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
