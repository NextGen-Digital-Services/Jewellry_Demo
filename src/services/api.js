import { APP_CONFIG } from '../config';
import {
  INITIAL_CATEGORIES,
  INITIAL_COLLECTIONS,
  INITIAL_PRODUCTS,
  INITIAL_TESTIMONIALS,
  INITIAL_JOURNAL,
  INITIAL_FAQS,
  INITIAL_BOUTIQUES,
  INITIAL_COUPONS,
  INITIAL_GOLD_RATES,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_APPOINTMENTS,
  INITIAL_BESPOKE_ENQUIRIES,
  INITIAL_HOME_CONTENT
} from '../data/seed';

const PREFIX = APP_CONFIG.STORAGE_PREFIX;

const delay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));

const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(`${PREFIX}${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading key ${key} from localStorage`, err);
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing key ${key} to localStorage`, err);
  }
};

export const initializeSeedData = (forceReset = false) => {
  if (forceReset || !localStorage.getItem(`${PREFIX}initialized`)) {
    setStorageItem('products', INITIAL_PRODUCTS);
    setStorageItem('categories', INITIAL_CATEGORIES);
    setStorageItem('collections', INITIAL_COLLECTIONS);
    setStorageItem('testimonials', INITIAL_TESTIMONIALS);
    setStorageItem('journal', INITIAL_JOURNAL);
    setStorageItem('faqs', INITIAL_FAQS);
    setStorageItem('boutiques', INITIAL_BOUTIQUES);
    setStorageItem('coupons', INITIAL_COUPONS);
    setStorageItem('goldRates', INITIAL_GOLD_RATES);
    setStorageItem('orders', INITIAL_ORDERS);
    setStorageItem('customers', INITIAL_CUSTOMERS);
    setStorageItem('appointments', INITIAL_APPOINTMENTS);
    setStorageItem('bespoke', INITIAL_BESPOKE_ENQUIRIES);
    setStorageItem('homeContent', INITIAL_HOME_CONTENT);
    setStorageItem('messages', [
      { id: 'msg-1', name: 'Contessa Sofia', email: 'sofia@deluca.it', subject: 'Private Appointment', message: 'I would like to view the high jewellery collection in Milan next week.', date: '2026-10-06', read: false }
    ]);
    setStorageItem('subscribers', [
      { id: 'sub-1', email: 'collector@finejewellery.com', date: '2026-09-28' },
      { id: 'sub-2', email: 'ananya.s@example.com', date: '2026-10-02' }
    ]);
    setStorageItem('reviews', [
      { id: 'rev-1', productId: 'prod-101', name: 'Sofia D.', rating: 5, comment: 'Breathtaking 18kt gold craftsmanship. Verified by my family jeweller in Milan.', date: '2026-09-20', status: 'Approved' },
      { id: 'rev-2', productId: 'prod-101', name: 'Aarav M.', rating: 5, comment: 'Proposed with this ring on Amalfi coast. She cried tears of joy!', date: '2026-09-24', status: 'Approved' },
      { id: 'rev-3', productId: 'prod-201', name: 'Elena R.', rating: 5, comment: 'The riviera necklace sits like liquid gold around the neck. Outstanding.', date: '2026-09-29', status: 'Approved' }
    ]);
    setStorageItem('pages', {
      about: 'Founded in 1954 along the Arno river in Florence, Aurelia Venezia represents the apex of Italian goldsmithing. Combining Renaissance heritage with contemporary haute couture, our master artisans craft limited-production 18kt fine jewellery.',
      faq: 'Find answers to common questions about hallmarking, diamond certification, worldwide insured shipping, custom design, and care.',
      terms: 'Welcome to Aurelia Venezia. By browsing or purchasing from our platform, you agree to our terms of luxury craftsmanship, hallmarking integrity, and secure transactions.',
      privacy: 'Aurelia Venezia respects your absolute privacy. We use bank-level encryption to safeguard your personal data and order records.',
      warranty: 'Every creation from Aurelia Venezia is covered by our Lifetime Craftsmanship Warranty and 100% BIS / GIA Certified Quality Guarantee.'
    });
    setStorageItem('settings', {
      storeName: APP_CONFIG.BRAND_NAME,
      tagline: APP_CONFIG.TAGLINE,
      contactEmail: APP_CONFIG.CONTACT.EMAIL,
      contactPhone: APP_CONFIG.CONTACT.PHONE,
      whatsappNumber: APP_CONFIG.CONTACT.WHATSAPP,
      address: APP_CONFIG.CONTACT.ADDRESS,
      taxRate: 3,
      freeShippingThreshold: 50000,
      currency: 'INR'
    });
    setStorageItem('media', [
      { id: 'm-1', url: INITIAL_PRODUCTS[0].images[0], name: 'Anello Firenze Ring', date: '2026-10-01' },
      { id: 'm-2', url: INITIAL_PRODUCTS[4].images[0], name: 'Venezia Riviera Necklace', date: '2026-10-01' }
    ]);

    setStorageItem('initialized', 'true');
  }
};

// Initialize on import
initializeSeedData();

// API Object
export const api = {
  // PRODUCTS
  getProducts: async (params = {}) => {
    await delay(300);
    let products = getStorageItem('products', []);

    if (params.category && params.category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === params.category.toLowerCase() || p.slug === params.category);
    }
    if (params.collection) {
      products = products.filter(p => p.collection && p.collection.toLowerCase().includes(params.collection.toLowerCase()));
    }
    if (params.metal && params.metal !== 'All') {
      products = products.filter(p => p.metal.toLowerCase().includes(params.metal.toLowerCase()));
    }
    if (params.purity && params.purity !== 'All') {
      products = products.filter(p => p.purity === params.purity);
    }
    if (params.minPrice !== undefined) {
      products = products.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice !== undefined) {
      products = products.filter(p => p.price <= Number(params.maxPrice));
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (params.inStockOnly) {
      products = products.filter(p => p.stock > 0);
    }

    // Sort
    if (params.sort) {
      if (params.sort === 'price-low') products.sort((a, b) => a.price - b.price);
      else if (params.sort === 'price-high') products.sort((a, b) => b.price - a.price);
      else if (params.sort === 'popular') products.sort((a, b) => b.rating - a.rating);
      else if (params.sort === 'newest') products.sort((a, b) => b.id.localeCompare(a.id));
    }

    return products;
  },

  getProduct: async (idOrSlug) => {
    await delay(200);
    const products = getStorageItem('products', []);
    return products.find(p => p.id === idOrSlug || p.slug === idOrSlug) || null;
  },

  saveProduct: async (productData) => {
    await delay(400);
    const products = getStorageItem('products', []);
    let updated;
    if (productData.id) {
      updated = products.map(p => p.id === productData.id ? { ...p, ...productData } : p);
    } else {
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 0,
        stock: Number(productData.stock || 10),
        price: Number(productData.price || 50000),
        images: productData.images && productData.images.length > 0 ? productData.images : [INITIAL_PRODUCTS[0].images[0]]
      };
      updated = [newProduct, ...products];
    }
    setStorageItem('products', updated);
    return true;
  },

  deleteProduct: async (id) => {
    await delay(300);
    const products = getStorageItem('products', []);
    const updated = products.filter(p => p.id !== id);
    setStorageItem('products', updated);
    return true;
  },

  // CATEGORIES & COLLECTIONS
  getCategories: async () => {
    await delay(200);
    return getStorageItem('categories', []);
  },

  saveCategory: async (cat) => {
    await delay(300);
    const categories = getStorageItem('categories', []);
    let updated;
    if (cat.id) {
      updated = categories.map(c => c.id === cat.id ? { ...c, ...cat } : c);
    } else {
      updated = [...categories, { ...cat, id: `cat-${Date.now()}` }];
    }
    setStorageItem('categories', updated);
    return true;
  },

  deleteCategory: async (id) => {
    await delay(300);
    const categories = getStorageItem('categories', []);
    setStorageItem('categories', categories.filter(c => c.id !== id));
    return true;
  },

  getCollections: async () => {
    await delay(200);
    return getStorageItem('collections', []);
  },

  // ORDERS
  getOrders: async () => {
    await delay(300);
    return getStorageItem('orders', []);
  },

  getOrder: async (orderId) => {
    await delay(200);
    const orders = getStorageItem('orders', []);
    return orders.find(o => o.id === orderId) || null;
  },

  createOrder: async (orderPayload) => {
    await delay(500);
    const orders = getStorageItem('orders', []);
    const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      ...orderPayload,
      id: newOrderId,
      date: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: 'Paid',
      timeline: [
        { status: 'Order Placed', time: new Date().toLocaleString(), completed: true },
        { status: 'Confirmed & Hallmarked', time: new Date().toLocaleString(), completed: true },
        { status: 'Atelier Crafting & Quality Check', time: 'In Progress', completed: false },
        { status: 'Insured Express Shipping', time: 'Pending', completed: false },
        { status: 'Delivered', time: 'Pending', completed: false }
      ]
    };

    setStorageItem('orders', [newOrder, ...orders]);

    // Update customer stats
    const customers = getStorageItem('customers', []);
    const existing = customers.find(c => c.email.toLowerCase() === orderPayload.customer.email.toLowerCase());
    if (existing) {
      existing.ordersCount += 1;
      existing.totalSpent += orderPayload.totalAmount;
      setStorageItem('customers', customers);
    } else {
      const newCust = {
        id: `cust-${Date.now()}`,
        name: orderPayload.customer.name,
        email: orderPayload.customer.email,
        phone: orderPayload.customer.phone,
        city: orderPayload.shippingAddress.city,
        ordersCount: 1,
        totalSpent: orderPayload.totalAmount,
        status: 'Active',
        joinedDate: new Date().toISOString().split('T')[0]
      };
      setStorageItem('customers', [newCust, ...customers]);
    }

    return newOrder;
  },

  updateOrderStatus: async (orderId, newStatus, trackingNumber = '') => {
    await delay(300);
    const orders = getStorageItem('orders', []);
    const updated = orders.map(o => {
      if (o.id === orderId) {
        const timeline = o.timeline.map(t => {
          if (t.status.includes(newStatus)) {
            return { ...t, time: new Date().toLocaleString(), completed: true };
          }
          return t;
        });
        return {
          ...o,
          status: newStatus,
          trackingNumber: trackingNumber || o.trackingNumber,
          timeline
        };
      }
      return o;
    });
    setStorageItem('orders', updated);
    return true;
  },

  // CUSTOMERS
  getCustomers: async () => {
    await delay(200);
    return getStorageItem('customers', []);
  },

  updateCustomerStatus: async (id, status) => {
    await delay(200);
    const customers = getStorageItem('customers', []);
    const updated = customers.map(c => c.id === id ? { ...c, status } : c);
    setStorageItem('customers', updated);
    return true;
  },

  // COUPONS
  getCoupons: async () => {
    await delay(200);
    return getStorageItem('coupons', []);
  },

  saveCoupon: async (coupon) => {
    await delay(300);
    const coupons = getStorageItem('coupons', []);
    let updated;
    if (coupon.id) {
      updated = coupons.map(c => c.id === coupon.id ? { ...c, ...coupon } : c);
    } else {
      updated = [...coupons, { ...coupon, id: `c-${Date.now()}` }];
    }
    setStorageItem('coupons', updated);
    return true;
  },

  deleteCoupon: async (id) => {
    await delay(300);
    const coupons = getStorageItem('coupons', []);
    setStorageItem('coupons', coupons.filter(c => c.id !== id));
    return true;
  },

  validateCoupon: async (code, subtotal) => {
    await delay(300);
    const coupons = getStorageItem('coupons', []);
    const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.active);

    if (!match) {
      return { valid: false, message: 'Invalid or expired promotional code.' };
    }
    if (subtotal < match.minOrder) {
      return { valid: false, message: `Minimum order value of ₹${match.minOrder.toLocaleString()} required for this code.` };
    }

    let discountAmount = 0;
    if (match.type === 'percentage') {
      discountAmount = Math.round((subtotal * match.discount) / 100);
      if (match.maxDiscount && discountAmount > match.maxDiscount) {
        discountAmount = match.maxDiscount;
      }
    } else {
      discountAmount = match.discount;
    }

    return { valid: true, coupon: match, discountAmount, message: `Coupon ${match.code} applied successfully!` };
  },

  // REVIEWS
  getReviews: async (productId) => {
    await delay(200);
    const reviews = getStorageItem('reviews', []);
    if (productId) return reviews.filter(r => r.productId === productId && r.status === 'Approved');
    return reviews;
  },

  addReview: async (reviewData) => {
    await delay(300);
    const reviews = getStorageItem('reviews', []);
    const newRev = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      status: 'Approved',
      date: new Date().toISOString().split('T')[0]
    };
    setStorageItem('reviews', [newRev, ...reviews]);
    return newRev;
  },

  updateReviewStatus: async (id, status) => {
    await delay(200);
    const reviews = getStorageItem('reviews', []);
    const updated = reviews.map(r => r.id === id ? { ...r, status } : r);
    setStorageItem('reviews', updated);
    return true;
  },

  deleteReview: async (id) => {
    await delay(200);
    const reviews = getStorageItem('reviews', []);
    setStorageItem('reviews', reviews.filter(r => r.id !== id));
    return true;
  },

  // APPOINTMENTS
  getAppointments: async () => {
    await delay(200);
    return getStorageItem('appointments', []);
  },

  createAppointment: async (data) => {
    await delay(400);
    const apps = getStorageItem('appointments', []);
    const newApp = { id: `app-${Date.now()}`, ...data, status: 'Confirmed' };
    setStorageItem('appointments', [newApp, ...apps]);
    return newApp;
  },

  updateAppointmentStatus: async (id, status) => {
    await delay(200);
    const apps = getStorageItem('appointments', []);
    const updated = apps.map(a => a.id === id ? { ...a, status } : a);
    setStorageItem('appointments', updated);
    return true;
  },

  // BESPOKE ENQUIRIES
  getBespokeEnquiries: async () => {
    await delay(200);
    return getStorageItem('bespoke', []);
  },

  createBespokeEnquiry: async (data) => {
    await delay(400);
    const enquiries = getStorageItem('bespoke', []);
    const newEnq = { id: `bespoke-${Date.now()}`, ...data, status: 'Received', date: new Date().toISOString().split('T')[0] };
    setStorageItem('bespoke', [newEnq, ...enquiries]);
    return newEnq;
  },

  updateBespokeStatus: async (id, status, notes = '') => {
    await delay(200);
    const enquiries = getStorageItem('bespoke', []);
    const updated = enquiries.map(e => e.id === id ? { ...e, status, notes } : e);
    setStorageItem('bespoke', updated);
    return true;
  },

  // MESSAGES & NEWSLETTER
  getContactMessages: async () => {
    await delay(200);
    return getStorageItem('messages', []);
  },

  createContactMessage: async (data) => {
    await delay(300);
    const messages = getStorageItem('messages', []);
    const newMsg = { id: `msg-${Date.now()}`, ...data, read: false, date: new Date().toISOString().split('T')[0] };
    setStorageItem('messages', [newMsg, ...messages]);
    return newMsg;
  },

  getNewsletterSubscribers: async () => {
    await delay(200);
    return getStorageItem('subscribers', []);
  },

  subscribeNewsletter: async (email) => {
    await delay(300);
    const subs = getStorageItem('subscribers', []);
    if (subs.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      return { success: true, message: 'You are already subscribed to our private newsletter.' };
    }
    const newSub = { id: `sub-${Date.now()}`, email, date: new Date().toISOString().split('T')[0] };
    setStorageItem('subscribers', [newSub, ...subs]);
    return { success: true, message: 'Welcome to Aurelia Venezia. Your exclusive invitation code WELCOME10 has been issued.' };
  },

  // JOURNAL / BLOG
  getJournalArticles: async () => {
    await delay(200);
    return getStorageItem('journal', []);
  },

  getJournalArticle: async (idOrSlug) => {
    await delay(200);
    const articles = getStorageItem('journal', []);
    return articles.find(a => a.id === idOrSlug || a.slug === idOrSlug) || null;
  },

  saveJournalArticle: async (article) => {
    await delay(300);
    const articles = getStorageItem('journal', []);
    let updated;
    if (article.id) {
      updated = articles.map(a => a.id === article.id ? { ...a, ...article } : a);
    } else {
      updated = [{ ...article, id: `j-${Date.now()}`, date: new Date().toISOString().split('T')[0] }, ...articles];
    }
    setStorageItem('journal', updated);
    return true;
  },

  deleteJournalArticle: async (id) => {
    await delay(200);
    const articles = getStorageItem('journal', []);
    setStorageItem('journal', articles.filter(a => a.id !== id));
    return true;
  },

  // GOLD & SILVER RATES
  getGoldRates: async () => {
    await delay(200);
    return getStorageItem('goldRates', INITIAL_GOLD_RATES);
  },

  updateGoldRates: async (newRates) => {
    await delay(300);
    const current = getStorageItem('goldRates', INITIAL_GOLD_RATES);
    const updated = {
      ...current,
      ...newRates,
      lastUpdated: new Date().toISOString(),
      history: [
        ...current.history,
        { date: new Date().toISOString().split('T')[0], ...newRates }
      ]
    };
    setStorageItem('goldRates', updated);
    return updated;
  },

  // HOME & CONTENT MANAGER
  getHomeContent: async () => {
    await delay(200);
    return getStorageItem('homeContent', INITIAL_HOME_CONTENT);
  },

  updateHomeContent: async (content) => {
    await delay(300);
    setStorageItem('homeContent', content);
    return content;
  },

  // SETTINGS & DEMO RESET
  getSettings: async () => {
    await delay(200);
    return getStorageItem('settings', {});
  },

  saveSettings: async (settings) => {
    await delay(300);
    setStorageItem('settings', settings);
    return settings;
  },

  resetDemoData: async () => {
    await delay(600);
    initializeSeedData(true);
    return true;
  },

  // MEDIA LIBRARY
  getMediaLibrary: async () => {
    await delay(200);
    return getStorageItem('media', []);
  },

  addMediaItem: async (item) => {
    await delay(300);
    const media = getStorageItem('media', []);
    const newItem = { id: `m-${Date.now()}`, ...item, date: new Date().toISOString().split('T')[0] };
    setStorageItem('media', [newItem, ...media]);
    return newItem;
  },

  deleteMediaItem: async (id) => {
    await delay(200);
    const media = getStorageItem('media', []);
    setStorageItem('media', media.filter(m => m.id !== id));
    return true;
  }
};
