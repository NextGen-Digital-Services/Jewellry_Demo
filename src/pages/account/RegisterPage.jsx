import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      registerUser(formData);
      navigate('/account');
    }
  };

  return (
    <>
      <SEO title="Create Client Account" description="Register for an Aurelia Venezia client account to unlock private concierge services." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Register Account', path: '/register' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">REGISTRAZIONE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Create Privé Account</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '480px' }}>
          <form onSubmit={handleRegister} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                required
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                required
                className="form-input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-gold btn-full btn-lg" style={{ marginTop: '1rem' }}>
              Create Client Account
            </button>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--stone)' }}>
              Already registered?{' '}
              <Link to="/login" style={{ color: 'var(--bordeaux)', fontWeight: 600 }}>Sign In Here</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
