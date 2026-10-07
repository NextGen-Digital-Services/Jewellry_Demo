import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import SmartImage from '../../components/common/SmartImage';
import Modal from '../../components/common/Modal';

const AdminCategories = () => {
  const { categories, collections, refreshData } = useData();
  const { addToast } = useToast();

  const [activeModal, setActiveModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop' });

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveCategory(formData);
    refreshData();
    setActiveModal(false);
    addToast('Category saved.', 'success');
  };

  const handleDeleteCat = async (id) => {
    await api.deleteCategory(id);
    refreshData();
    addToast('Category deleted.', 'info');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Categories & Collections</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Structure and editorial collection taxonomies</p>
        </div>
        <button onClick={() => { setFormData({ name: '', slug: '', description: '', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop' }); setActiveModal(true); }} className="btn btn-gold btn-sm">
          <Plus size={16} /> Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>Shop Categories</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {categories.map(cat => (
          <div key={cat.id} className="card" style={{ padding: '1rem' }}>
            <SmartImage src={cat.image} alt={cat.name} aspectRatio="16/9" />
            <div style={{ padding: '1rem 0 0 0' }}>
              <strong style={{ display: 'block', fontSize: '1.1rem', color: 'var(--ink)' }}>{cat.name}</strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--stone)', margin: '0.3rem 0 0.75rem 0' }}>{cat.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                <button onClick={() => handleDeleteCat(cat.id)} style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Named Collections List */}
      <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>Editorial Named Collections</h3>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Collection Name</th>
              <th>Tagline</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {collections.map(col => (
              <tr key={col.id}>
                <td style={{ width: '60px' }}>
                  <SmartImage src={col.image} alt={col.name} aspectRatio="1/1" />
                </td>
                <td><strong style={{ color: 'var(--bordeaux)' }}>{col.name}</strong></td>
                <td>{col.tagline}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isOpen={activeModal} onClose={() => setActiveModal(false)} title="Add Category">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Category Name</label>
            <input type="text" required className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input type="text" required className="form-input" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input type="text" required className="form-input" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary btn-full">Save Category</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminCategories;
