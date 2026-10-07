import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import SmartImage from '../../components/common/SmartImage';
import Modal from '../../components/common/Modal';

const AdminJournal = () => {
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Craftsmanship',
    author: 'Maestro Lorenzo Bernini',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop'
  });

  const { addToast } = useToast();

  const loadArticles = () => {
    api.getJournalArticles().then(res => setArticles(res));
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.saveJournalArticle(formData);
    loadArticles();
    setIsModalOpen(false);
    addToast('Journal article saved and published.', 'success');
  };

  const handleDelete = async (id) => {
    await api.deleteJournalArticle(id);
    loadArticles();
    addToast('Article deleted.', 'info');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Journal & Editorial Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Publish and edit blog stories and craft guides</p>
        </div>
        <button onClick={() => { setFormData({ title: '', slug: '', category: 'Craftsmanship', author: 'Maestro Lorenzo Bernini', excerpt: '', content: '', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80&auto=format&fit=crop' }); setIsModalOpen(true); }} className="btn btn-gold btn-sm">
          <Plus size={16} /> Create Article
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Article Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(a => (
              <tr key={a.id}>
                <td style={{ width: '60px' }}>
                  <SmartImage src={a.image} alt={a.title} aspectRatio="1/1" />
                </td>
                <td>
                  <strong style={{ color: 'var(--bordeaux)' }}>{a.title}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>{a.excerpt}</span>
                </td>
                <td>{a.category}</td>
                <td>{a.author}</td>
                <td>{a.date}</td>
                <td>
                  <button onClick={() => handleDelete(a.id)} style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Publish Journal Article">
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" required className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="Craftsmanship">Craftsmanship</option>
                <option value="Jewellery Guide">Jewellery Guide</option>
                <option value="Bridal Editorial">Bridal Editorial</option>
                <option value="Care & Maintenance">Care & Maintenance</option>
                <option value="Heritage">Heritage</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Author Name</label>
              <input type="text" required className="form-input" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input type="text" required className="form-input" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt / Summary</label>
            <input type="text" required className="form-input" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} />
          </div>

          <div className="form-group">
            <label className="form-label">Full Article Content</label>
            <textarea rows={6} required className="form-textarea" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary btn-full">Publish Article</button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminJournal;
