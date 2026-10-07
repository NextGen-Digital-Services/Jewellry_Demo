import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';

const AdminHomeManager = () => {
  const { homeContent, refreshData } = useData();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    heroCtaPrimary: '',
    heroCtaSecondary: '',
    heroImage: '',
    announcements: ['', '', '']
  });

  useEffect(() => {
    if (homeContent) {
      setFormData(homeContent);
    }
  }, [homeContent]);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.updateHomeContent(formData);
    refreshData();
    addToast('Homepage hero banner and announcements updated live on storefront.', 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Homepage Content Manager</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Edit hero banners, CTAs, announcements, and featured messaging</p>
      </div>

      <form onSubmit={handleSave} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px', maxWidth: '800px' }}>
        <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
          Hero Banner Settings
        </h3>

        <div className="form-group">
          <label className="form-label">Hero Serif Headline</label>
          <input
            type="text"
            required
            className="form-input"
            value={formData.heroHeadline}
            onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Hero Subheadline / Lead Text</label>
          <textarea
            rows={3}
            required
            className="form-textarea"
            value={formData.heroSubheadline}
            onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Primary CTA Button Label</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.heroCtaPrimary}
              onChange={(e) => setFormData({ ...formData, heroCtaPrimary: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Secondary CTA Button Label</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.heroCtaSecondary}
              onChange={(e) => setFormData({ ...formData, heroCtaSecondary: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Hero Background Image URL</label>
          <input
            type="text"
            required
            className="form-input"
            value={formData.heroImage}
            onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
          />
        </div>

        <h3 className="h3" style={{ color: 'var(--bordeaux)', margin: '2rem 0 1.25rem 0', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
          Top Announcement Bar Ticker Messages
        </h3>

        {formData.announcements?.map((msg, idx) => (
          <div key={idx} className="form-group">
            <label className="form-label">Announcement #{idx + 1}</label>
            <input
              type="text"
              required
              className="form-input"
              value={msg}
              onChange={(e) => {
                const updated = [...formData.announcements];
                updated[idx] = e.target.value;
                setFormData({ ...formData, announcements: updated });
              }}
            />
          </div>
        ))}

        <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '1.5rem' }}>
          <Save size={18} /> Update Live Storefront Banner
        </button>
      </form>
    </div>
  );
};

export default AdminHomeManager;
