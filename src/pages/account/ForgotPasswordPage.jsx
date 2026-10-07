import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useToast } from '../../context/ToastContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSent(true);
      addToast('Password reset link has been dispatched to your email.', 'success');
    }
  };

  return (
    <>
      <SEO title="Reset Password" description="Request a password reset link for your Aurelia account." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Reset Password' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">RECUPERO PASSWORD</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Reset Your Password</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '480px' }}>
          {sent ? (
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '2.5rem', textAlign: 'center', borderRadius: '2px' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Instructions Dispatched</h3>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 2rem 0', fontSize: '0.9rem' }}>
                We have emailed password reset instructions to <strong>{email}</strong>.
              </p>
              <Link to="/login" className="btn btn-primary">Return to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
              <div className="form-group">
                <label className="form-label">Account Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-gold btn-full">
                Send Reset Link
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordPage;
