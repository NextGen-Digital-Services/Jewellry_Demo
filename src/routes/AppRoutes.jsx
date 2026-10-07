import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdminLayout from '../components/layout/AdminLayout';
import BackToTop from '../components/common/BackToTop';
import CookieNotice from '../components/common/CookieNotice';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { ProtectedRoute, AdminRoute } from './ProtectedRoute';

// Public Lazy Pages
const Home = lazy(() => import('../pages/public/Home'));
const Shop = lazy(() => import('../pages/public/Shop'));
const CategoryPage = lazy(() => import('../pages/public/CategoryPage'));
const ProductDetail = lazy(() => import('../pages/public/ProductDetail'));
const CollectionsLanding = lazy(() => import('../pages/public/CollectionsLanding'));
const BridalPage = lazy(() => import('../pages/public/BridalPage'));
const CartPage = lazy(() => import('../pages/public/CartPage'));
const CheckoutPage = lazy(() => import('../pages/public/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('../pages/public/OrderSuccessPage'));
const OrderTrackingPage = lazy(() => import('../pages/public/OrderTrackingPage'));
const WishlistPage = lazy(() => import('../pages/public/WishlistPage'));
const AboutUsPage = lazy(() => import('../pages/public/AboutUsPage'));
const CraftsmanshipPage = lazy(() => import('../pages/public/CraftsmanshipPage'));
const GuidesPage = lazy(() => import('../pages/public/GuidesPage'));
const JournalPage = lazy(() => import('../pages/public/JournalPage'));
const JournalDetailPage = lazy(() => import('../pages/public/JournalDetailPage'));
const StoreLocatorPage = lazy(() => import('../pages/public/StoreLocatorPage'));
const BookAppointmentPage = lazy(() => import('../pages/public/BookAppointmentPage'));
const BespokeEnquiryPage = lazy(() => import('../pages/public/BespokeEnquiryPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const StaticPolicyPage = lazy(() => import('../pages/public/StaticPolicyPage'));
const SearchResultsPage = lazy(() => import('../pages/public/SearchResultsPage'));
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

// Customer Account Lazy Pages
const LoginPage = lazy(() => import('../pages/account/LoginPage'));
const RegisterPage = lazy(() => import('../pages/account/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/account/ForgotPasswordPage'));
const AccountDashboard = lazy(() => import('../pages/account/AccountDashboard'));
const AccountOrders = lazy(() => import('../pages/account/AccountOrders'));
const AccountAddresses = lazy(() => import('../pages/account/AccountAddresses'));

// Admin Lazy Pages
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminProductForm = lazy(() => import('../pages/admin/AdminProductForm'));
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminOrderDetail = lazy(() => import('../pages/admin/AdminOrderDetail'));
const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
const AdminInventory = lazy(() => import('../pages/admin/AdminInventory'));
const AdminCoupons = lazy(() => import('../pages/admin/AdminCoupons'));
const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));
const AdminAppointments = lazy(() => import('../pages/admin/AdminAppointments'));
const AdminBespoke = lazy(() => import('../pages/admin/AdminBespoke'));
const AdminMessages = lazy(() => import('../pages/admin/AdminMessages'));
const AdminJournal = lazy(() => import('../pages/admin/AdminJournal'));
const AdminGoldRates = lazy(() => import('../pages/admin/AdminGoldRates'));
const AdminHomeManager = lazy(() => import('../pages/admin/AdminHomeManager'));
const AdminPagesManager = lazy(() => import('../pages/admin/AdminPagesManager'));
const AdminMediaLibrary = lazy(() => import('../pages/admin/AdminMediaLibrary'));
const AdminReports = lazy(() => import('../pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Fallback Spinner
const PageFallback = () => (
  <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--ivory)' }}>
    <div style={{ textCenter: 'center', fontFamily: 'var(--font-serif)', color: 'var(--bordeaux)', fontSize: '1.2rem', letterSpacing: '0.15em' }}>
      AURELIA VENEZIA...
    </div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />

      {!isAdminPath && <Header />}

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public Store Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionsLanding />} />
          <Route path="/collections/:slug" element={<CategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/bridal" element={<BridalPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<JournalDetailPage />} />
          <Route path="/boutiques" element={<StoreLocatorPage />} />
          <Route path="/appointment" element={<BookAppointmentPage />} />
          <Route path="/bespoke" element={<BespokeEnquiryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<StaticPolicyPage pageType="faq" />} />
          <Route path="/shipping-returns" element={<StaticPolicyPage pageType="shipping" />} />
          <Route path="/privacy-policy" element={<StaticPolicyPage pageType="privacy" />} />
          <Route path="/terms-conditions" element={<StaticPolicyPage pageType="terms" />} />
          <Route path="/warranty" element={<StaticPolicyPage pageType="warranty" />} />
          <Route path="/search" element={<SearchResultsPage />} />

          {/* Auth & Account Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountDashboard />} />
            <Route path="/account/orders" element={<AccountOrders />} />
            <Route path="/account/addresses" element={<AccountAddresses />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="coupons" element={<AdminCoupons />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="bespoke" element={<AdminBespoke />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="journal" element={<AdminJournal />} />
              <Route path="gold-rates" element={<AdminGoldRates />} />
              <Route path="home-manager" element={<AdminHomeManager />} />
              <Route path="pages" element={<AdminPagesManager />} />
              <Route path="media" element={<AdminMediaLibrary />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!isAdminPath && (
        <>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
          <CookieNotice />
        </>
      )}
    </>
  );
};

export default AppRoutes;
