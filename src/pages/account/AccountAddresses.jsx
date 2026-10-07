import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { MapPin, Plus, Trash2 } from 'lucide-react';

const AccountAddresses = () => {
  const { user, updateUserAddresses } = useAuth();
  const { addToast } = useToast();

  const [newAddr, setNewAddr] = useState({ title: 'Home', addressLine: '', city: '', state: 'Maharashtra', pincode: '' });
  const [adding, setAdding] = useState(false);

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine || !newAddr.city || !newAddr.pincode) {
      addToast('Please complete all address fields.', 'error');
      return;
    }

    const updated = [...(user.addresses || []), { id: `addr-${Date.now()}`, ...newAddr, default: (user.addresses || []).length === 0 }];
    updateUserAddresses(updated);
    addToast('New address saved to your Privé account.', 'success');
    setNewAddr({ title: 'Home', addressLine: '', city: '', state: 'Maharashtra', pincode: '' });
    setAdding(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = user.addresses.filter(a => a.id !== id);
    updateUserAddresses(updated);
    addToast('Address deleted.', 'info');
  };

  return (
    <>
      <SEO title="Address Book | Privé Portal" description="Manage saved shipping addresses for Aurelia orders." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Account', path: '/account' }, { label: 'Addresses' }]} />
          <div style={{ padding: '2rem 0 3.5rem 0' }}>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Address Book</h1>
            <div className="gold-divider-left" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Saved Destinations</h3>
            <button onClick={() => setAdding(!adding)} className="btn btn-gold btn-sm">
              <Plus size={16} /> Add New Address
            </button>
          </div>

          {adding && (
            <form onSubmit={handleAddAddress} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '2rem', borderRadius: '2px', marginBottom: '2.5rem' }}>
              <h4 className="subtitle" style={{ color: 'var(--bordeaux)' }}>New Address Details</h4>
              <div className="form-group">
                <label className="form-label">Address Tag / Title</label>
                <input type="text" className="form-input" value={newAddr.title} onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })} placeholder="e.g. Home / Office" />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address & House No.</label>
                <input type="text" required className="form-input" value={newAddr.addressLine} onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" required className="form-input" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" required className="form-input" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input type="text" required className="form-input" value={newAddr.pincode} onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full">Save Address</button>
            </form>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {user?.addresses?.map(addr => (
              <div key={addr.id} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ color: 'var(--bordeaux)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>{addr.title}</strong>
                  <button onClick={() => handleDeleteAddress(addr.id)} style={{ color: 'var(--stone)' }}><Trash2 size={16} /></button>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink)', margin: 0 }}>{addr.addressLine}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginTop: '0.3rem' }}>
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountAddresses;
