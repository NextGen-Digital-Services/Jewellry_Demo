import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';
import { formatPrice } from '../../utils/formatPrice';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ code: '', type: 'percentage', discount: 10, minOrder: 25000, description: '', active: true, expiry: '2026-12-31' });
  const { addToast } = useToast();

  const loadCoupons = () => {
    api.getCoupons().then(res => setCoupons(res));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveCoupon(formData);
    loadCoupons();
    setIsModalOpen(false);
    addToast('Coupon saved.', 'success');
  };

  const handleDelete = async (id) => {
    await api.deleteCoupon(id);
    loadCoupons();
    addToast('Coupon deleted.', 'info');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Promotions & Coupons</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Discount codes and promotional offers</p>
        </div>
        <button onClick={() => { setFormData({ code: '', type: 'percentage', discount: 10, minOrder: 25000, description: '', active: true, expiry: '2026-12-31' }); setIsModalOpen(true); }} className="btn btn-gold btn-sm">
          <Plus size={16} /> Create Coupon Code
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Min Order</th>
              <th>Description</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id}>
                <td><strong style={{ color: 'var(--bordeaux)', fontSize: '1rem' }}>{c.code}</strong></td>
                <td>{c.type === 'percentage' ? `${c.discount}% OFF` : formatPrice(c.discount)}</td>
                <td>{formatPrice(c.minOrder)}</td>
                <td>{c.description}</td>
                <td>{c.expiry}</td>
                <td><span className={`status-pill ${c.active ? 'confirmed' : 'cancelled'}`}>{c.active ? 'Active' : 'Inactive'}</span></td>
                <td>
                  <button onClick={() => handleDelete(c.id)} style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Coupon Code">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Coupon Code (Uppercase)</label>
            <input type="text" required className="form-input" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })} placeholder="e.g. LUXURY20" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Discount Type</label>
              <select className="form-select" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Discount Value</label>
              <input type="number" required className="form-input" value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Min Order Threshold (₹)</label>
            <input type="number" required className="form-input" value={formData.minOrder} onChange={(e) => setFormData({ ...formData, minOrder: Number(e.target.value) })} />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" required className="form-input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary btn-full">Save Coupon</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCoupons;
