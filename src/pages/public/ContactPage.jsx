import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { APP_CONFIG } from '../../config';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await api.createContactMessage(formData);
    setSubmitting(false);
    addToast('Your message has been dispatched to our Florence Concierge desk.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <SEO title="Contact Us | Client Concierge" description="Get in touch with Aurelia Venezia concierges in Florence, Milan, and Mumbai." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Contact Us', path: '/contact' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">CONTATTI & CONCIERGE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Client Concierge</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem' }} className="contact-grid">
            {/* Info Column */}
            <div>
              <h2 className="h2" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem' }}>We are at Your Service</h2>
              <div className="gold-divider-left" />
              <p style={{ color: 'var(--stone)', lineHeight: 1.8, marginBottom: '2rem' }}>
                Whether inquiring about diamond certificates, hallmarking authenticity, bespoke commissions, or boutique appointments, our concierges are available 24/7.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--bordeaux)' }}><Phone size={20} /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--stone)' }}>Telephone Desk</strong>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>{APP_CONFIG.CONTACT.PHONE}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--bordeaux)' }}><Mail size={20} /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--stone)' }}>Email Concierge</strong>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--ink)' }}>{APP_CONFIG.CONTACT.EMAIL}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--bordeaux)' }}><MapPin size={20} /></div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--stone)' }}>Florence Atelier</strong>
                    <span style={{ fontSize: '0.92rem', color: 'var(--ink)' }}>{APP_CONFIG.CONTACT.ADDRESS}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.5rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                Send a Message
              </h3>

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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default ContactPage;
