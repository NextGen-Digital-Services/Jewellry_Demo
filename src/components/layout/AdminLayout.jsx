import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Gem,
  Grid,
  ShoppingBag,
  Users,
  Boxes,
  Ticket,
  MessageSquare,
  Calendar,
  Sparkles,
  Mail,
  BookOpen,
  Image,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Coins,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Products', icon: Gem, path: '/admin/products' },
    { label: 'Categories', icon: Grid, path: '/admin/categories' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Customers', icon: Users, path: '/admin/customers' },
    { label: 'Inventory', icon: Boxes, path: '/admin/inventory' },
    { label: 'Coupons & Offers', icon: Ticket, path: '/admin/coupons' },
    { label: 'Reviews', icon: MessageSquare, path: '/admin/reviews' },
    { label: 'Appointments', icon: Calendar, path: '/admin/appointments' },
    { label: 'Bespoke Enquiries', icon: Sparkles, path: '/admin/bespoke' },
    { label: 'Inbox & Newsletter', icon: Mail, path: '/admin/messages' },
    { label: 'Journal / Blog', icon: BookOpen, path: '/admin/journal' },
    { label: 'Gold / Silver Rates', icon: Coins, path: '/admin/gold-rates' },
    { label: 'Home Content', icon: LayoutDashboard, path: '/admin/home-manager' },
    { label: 'Pages & Policies', icon: FileText, path: '/admin/pages' },
    { label: 'Media Library', icon: Image, path: '/admin/media' },
    { label: 'Sales Reports', icon: TrendingUp, path: '/admin/reports' },
    { label: 'Store Settings', icon: Settings, path: '/admin/settings' }
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`} style={{ display: mobileMenuOpen ? 'flex' : undefined }}>
        <div className="admin-sidebar-header">
          {!collapsed && (
            <Link to="/admin/dashboard" className="admin-brand">
              AURELIA ADMIN
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: 'var(--gold-light)', background: 'none' }}
            title="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="admin-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--gold-light)', width: '100%', fontSize: '0.85rem' }}
          >
            <LogOut size={18} />
            {!collapsed && <span>Exit Portal</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="admin-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <span style={{ fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--stone)' }}>
              Aurelia Venezia Management System
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/" target="_blank" className="btn btn-outline-gold btn-sm" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
              View Store Front ↗
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--bordeaux)', color: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.85rem' }}>
                A
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Admin Master</span>
            </div>
          </div>
        </header>

        {/* Dynamic Admin Page Outlet */}
        <main className="admin-content" style={{ flex: 1 }}>
          <Outlet />
        </main>

        {/* Westmere Admin Footer */}
        <footer
          className="admin-footer"
          style={{
            padding: '1.25rem 2rem',
            backgroundColor: 'var(--white)',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--stone)'
          }}
        >
          <div>
            <span>Crafted & Powered by </span>
            <a
              href="https://westmere.io"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--bordeaux)',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--bordeaux)'}
            >
              Westmere ↗
            </a>
          </div>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--stone)', fontStyle: 'italic' }}>
            Technology, Built Forward.
          </div>
        </footer>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1000;
            display: none;
          }
          .admin-mobile-toggle { display: block !important; }
        }
        @media (min-width: 1025px) {
          .admin-mobile-toggle { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
