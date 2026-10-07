import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      loginUser(email, password);
      navigate('/account');
    }
  };

  return (
    <>
      <SEO title="Customer Login | Aurelia Privé" description="Login to your Aurelia Venezia client account to view orders and addresses." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Client Login', path: '/login' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">ACCESSO CLIENTE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Client Login</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '480px' }}>
          <form onSubmit={handleLogin} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="collector@example.com"
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>Forgot Password?</Link>
              </div>
              <input
                type="password"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-gold btn-full btn-lg" style={{ marginTop: '1rem' }}>
              Sign In to Privé Salon
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--stone)' }}>
              New to Aurelia Venezia?{' '}
              <Link to="/register" style={{ color: 'var(--bordeaux)', fontWeight: 600 }}>Create an Account</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
