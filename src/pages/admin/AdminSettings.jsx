import React, { useState } from 'react';
import { Save, RotateCcw, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { APP_CONFIG } from '../../config';

const AdminSettings = () => {
  const { refreshData } = useData();
  const { addToast } = useToast();

  const [settings, setSettings] = useState({
    storeName: APP_CONFIG.BRAND_NAME,
    tagline: APP_CONFIG.TAGLINE,
    contactEmail: APP_CONFIG.CONTACT.EMAIL,
    contactPhone: APP_CONFIG.CONTACT.PHONE,
    whatsappNumber: APP_CONFIG.CONTACT.WHATSAPP,
    address: APP_CONFIG.CONTACT.ADDRESS,
    taxRate: 3,
    currency: 'INR'
  });

  const [resetted, setResetted] = useState(false);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    await api.saveSettings(settings);
    addToast('Store settings saved.', 'success');
  };

  const handleResetDemoData = async () => {
    if (window.confirm('Resetting demo data will re-seed all initial 40+ products, orders, categories, and gold rates. Continue?')) {
      await api.resetDemoData();
      await refreshData();
      setResetted(true);
      addToast('Demo dataset re-seeded successfully!', 'success');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Store Settings & System Utilities</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Configure store metadata and demo environment state</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <form onSubmit={handleSaveSettings} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
            Store Profile & Tax Setup
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Brand Name</label>
              <input type="text" className="form-input" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Tagline</label>
              <input type="text" className="form-input" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Concierge Email</label>
              <input type="email" className="form-input" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Concierge Phone</label>
              <input type="text" className="form-input" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Concierge Number</label>
            <input type="text" className="form-input" value={settings.whatsappNumber} onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Florence Atelier Address</label>
            <input type="text" className="form-input" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '1rem' }}>
            <Save size={16} /> Save Configuration
          </button>
        </form>

        {/* Demo Reset Panel */}
        <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', padding: '2rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '0.5rem' }}>Demo Data Factory Reset</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Clicking this button will flush localStorage and re-seed the complete 40+ products catalog, categories, orders, customers, reviews, and gold rates.
          </p>

          <button onClick={handleResetDemoData} className="btn btn-gold btn-full">
            <RotateCcw size={16} /> Reset Demo Dataset
          </button>

          {resetted && (
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--success)', fontWeight: 600, textAlign: 'center' }}>
              ✓ Store re-seeded with factory demo data!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
