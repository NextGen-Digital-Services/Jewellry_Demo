import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('admin@aurelia.com');
  const [password, setPassword] = useState('Admin@123');
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <SEO title="Admin Portal Authentication" description="Login to Aurelia Venezia Admin Panel." />

      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F1EC', padding: '1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '440px', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--bordeaux)', letterSpacing: '0.1em' }}>
              AURELIA ADMIN
            </span>
            <div className="gold-divider" />
            <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Master Management Portal</p>
          </div>

          <form onSubmit={handleAdminLogin}>
            <div className="form-group">
              <label className="form-label">Admin Email</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Admin Password</label>
              <input
                type="password"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1rem' }}>
              Sign In to Admin Portal
            </button>
          </form>

          {/* Demo Credentials Box */}
          <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', padding: '1rem', borderRadius: '2px', marginTop: '2rem', fontSize: '0.82rem', color: 'var(--ink)' }}>
            <strong style={{ color: 'var(--bordeaux)', display: 'block', marginBottom: '0.3rem' }}>Demo Credentials:</strong>
            <div>Email: <code>admin@aurelia.com</code></div>
            <div>Password: <code>Admin@123</code></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
