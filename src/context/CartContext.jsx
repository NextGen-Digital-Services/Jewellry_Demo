import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';
import { api } from '../services/api';
import { APP_CONFIG } from '../config';

const CartContext = createContext(null);
const PREFIX = APP_CONFIG.STORAGE_PREFIX;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`${PREFIX}cart`);
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem(`${PREFIX}applied_coupon`);
    return saved ? JSON.parse(saved) : null;
  });

  const [discountAmount, setDiscountAmount] = useState(0);
  const [giftWrap, setGiftWrap] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem(`${PREFIX}cart`, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem(`${PREFIX}applied_coupon`, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(`${PREFIX}applied_coupon`);
    }
  }, [coupon]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cart]);

  useEffect(() => {
    if (coupon && subtotal > 0) {
      api.validateCoupon(coupon.code, subtotal).then(res => {
        if (res.valid) {
          setDiscountAmount(res.discountAmount);
        } else {
          setCoupon(null);
          setDiscountAmount(0);
          addToast(res.message, 'error');
        }
      });
    } else {
      setDiscountAmount(0);
    }
  }, [subtotal, coupon]);

  const giftWrapFee = giftWrap ? 250 : 0;
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 500;
  const tax = Math.round((subtotal - discountAmount) * (APP_CONFIG.DEFAULT_TAX_PERCENT / 100));
  const totalAmount = Math.max(0, subtotal - discountAmount + giftWrapFee + shippingFee + tax);

  const addToCart = (product, qty = 1, selectedSize = null) => {
    const size = selectedSize || (product.sizes ? product.sizes[0] : 'Standard');
    const cartItemId = `${product.id}-${size}`;

    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { cartItemId, product, qty, selectedSize: size }];
    });

    addToast(`Added ${product.name} to your shopping bag.`, 'success');
    setIsCartDrawerOpen(true);
  };

  const updateQty = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.cartItemId === cartItemId ? { ...item, qty: newQty } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    addToast('Item removed from shopping bag.', 'info');
  };

  const applyCouponCode = async (code) => {
    const res = await api.validateCoupon(code, subtotal);
    if (res.valid) {
      setCoupon(res.coupon);
      setDiscountAmount(res.discountAmount);
      addToast(res.message, 'success');
      return true;
    } else {
      addToast(res.message, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountAmount(0);
    addToast('Coupon removed.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    setDiscountAmount(0);
    setGiftWrap(false);
  };

  return (
    <CartContext.Provider value={{
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
      addToCart,
      updateQty,
      removeFromCart,
      applyCouponCode,
      removeCoupon,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
