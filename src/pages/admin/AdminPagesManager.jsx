import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AdminPagesManager = () => {
  const [pages, setPages] = useState({
    about: 'Founded in 1954 along the Arno river in Florence, Aurelia Venezia represents the apex of Italian goldsmithing. Combining Renaissance heritage with contemporary haute couture, our master artisans craft limited-production 18kt fine jewellery.',
    terms: 'Welcome to Aurelia Venezia. By browsing or purchasing from our platform, you agree to our terms of luxury craftsmanship, hallmarking integrity, and secure transactions.',
    privacy: 'Aurelia Venezia respects your absolute privacy. We use bank-level encryption to safeguard your personal data and order records.',
    warranty: 'Every creation from Aurelia Venezia is covered by our Lifetime Craftsmanship Warranty and 100% BIS / GIA Certified Quality Guarantee.'
  });

  const { addToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Static policy pages updated.', 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Pages & Policies Content Manager</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Edit text content for About Us, Terms, Privacy Policy, and Warranty pages</p>
      </div>

      <form onSubmit={handleSave} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px', maxWidth: '800px' }}>
        <div className="form-group">
          <label className="form-label">About Us Story Text</label>
          <textarea rows={4} className="form-textarea" value={pages.about} onChange={(e) => setPages({ ...pages, about: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Terms & Conditions</label>
          <textarea rows={4} className="form-textarea" value={pages.terms} onChange={(e) => setPages({ ...pages, terms: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Privacy Policy Text</label>
          <textarea rows={4} className="form-textarea" value={pages.privacy} onChange={(e) => setPages({ ...pages, privacy: e.target.value })} />
        </div>

        <div className="form-group">
          <label className="form-label">Warranty & Service Policy</label>
          <textarea rows={4} className="form-textarea" value={pages.warranty} onChange={(e) => setPages({ ...pages, warranty: e.target.value })} />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          <Save size={16} /> Save Policy Texts
        </button>
      </form>
    </div>
  );
};

export default AdminPagesManager;
