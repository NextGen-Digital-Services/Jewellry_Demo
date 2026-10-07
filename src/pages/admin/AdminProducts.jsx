import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, RotateCcw, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';
import SmartImage from '../../components/common/SmartImage';
import Modal from '../../components/common/Modal';

const AdminProducts = () => {
  const { products = [], loading = false, refreshData } = useData();
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteId, setDeleteId] = useState(null);

  const safeProducts = Array.isArray(products) ? products : [];

  const filtered = safeProducts.filter(p => {
    if (!p) return false;
    const name = String(p.name || '').toLowerCase();
    const sku = String(p.sku || '').toLowerCase();
    const category = String(p.category || '').toLowerCase();
    const query = String(searchTerm || '').toLowerCase();
    const catFilter = String(selectedCategory || 'All').toLowerCase();

    const matchesSearch = name.includes(query) || sku.includes(query);
    const matchesCat = catFilter === 'all' || category === catFilter;
    return matchesSearch && matchesCat;
  });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.deleteProduct(deleteId);
      refreshData();
      addToast('Product deleted from catalog.', 'info');
    } catch (err) {
      addToast('Failed to delete product.', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  if (loading && safeProducts.length === 0) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Product Catalog Management</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Loading inventory masterpieces...</p>
          </div>
        </div>
        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '4rem 2rem', textAlign: 'center', borderRadius: '2px' }}>
          <p style={{ color: 'var(--stone)', fontSize: '0.95rem' }}>Fetching products catalog from data layer...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Product Catalog Management</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>
            {safeProducts.length} High Jewellery Masterpieces
          </p>
        </div>

        <Link to="/admin/products/new" className="btn btn-gold btn-sm">
          <Plus size={16} /> Add New Jewellery Item
        </Link>
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.25rem', borderRadius: '2px', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Search SKU or Product Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={18} color="var(--stone)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: 'auto', minWidth: '180px' }}
        >
          <option value="All">All Categories</option>
          <option value="Rings">Rings</option>
          <option value="Necklaces">Necklaces</option>
          <option value="Earrings">Earrings</option>
          <option value="Bracelets & Bangles">Bracelets & Bangles</option>
          <option value="Pendants">Pendants</option>
          <option value="Bridal & Mangalsutra">Bridal & Mangalsutra</option>
          <option value="Men's Jewellery">Men's Jewellery</option>
          <option value="Diamond">Diamond</option>
          <option value="Gold Coins & Bars">Gold Coins & Bars</option>
        </select>
      </div>

      {/* Content / Table */}
      {safeProducts.length === 0 ? (
        <div style={{ textAlign: 'center', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '4rem 2rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '0.5rem' }}>No Products in Catalog</h3>
          <p style={{ color: 'var(--stone)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Your catalog is currently empty. You can add a new product or re-seed the initial dataset.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/admin/products/new" className="btn btn-primary">
              <Plus size={16} /> Add Product
            </Link>
            <button onClick={() => refreshData()} className="btn btn-outline-gold">
              <RotateCcw size={16} /> Reload Catalog
            </button>
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '4rem 2rem', borderRadius: '2px' }}>
          <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '0.5rem' }}>No Matching Creations</h3>
          <p style={{ color: 'var(--stone)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            No products match "{searchTerm}" {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}.
          </p>
          <button onClick={handleResetFilters} className="btn btn-outline-gold">
            <RotateCcw size={16} /> Reset Filters
          </button>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>SKU / Name</th>
                <th>Category</th>
                <th>Metal / Purity</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(prod => {
                if (!prod) return null;
                const imageSrc = Array.isArray(prod.images) && prod.images.length > 0 ? prod.images[0] : '';
                const stockVal = Number(prod.stock ?? 0);

                return (
                  <tr key={prod.id || Math.random()}>
                    <td style={{ width: '60px' }}>
                      <SmartImage src={imageSrc} alt={prod.name || 'Jewellery'} aspectRatio="1/1" />
                    </td>
                    <td>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: 'var(--ink)' }}>
                        {prod.name || 'Untitled Creation'}
                      </strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>
                        SKU: {prod.sku || 'N/A'}
                      </span>
                    </td>
                    <td>{prod.category || 'General'}</td>
                    <td>{prod.purity || '18kt'} {prod.metal || 'Gold'}</td>
                    <td>{prod.weightGrams ? `${prod.weightGrams}g` : '—'}</td>
                    <td>
                      <strong style={{ color: 'var(--bordeaux)' }}>
                        {formatPrice(prod.price || 0)}
                      </strong>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: stockVal < 5 ? 'var(--error)' : 'var(--success)' }}>
                        {stockVal} units {stockVal < 5 && <AlertTriangle size={14} style={{ display: 'inline', marginLeft: '0.2rem' }} />}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {prod.slug && (
                          <Link to={`/product/${prod.slug}`} target="_blank" style={{ padding: '0.3rem', color: 'var(--stone)' }} title="View Store">
                            <Eye size={16} />
                          </Link>
                        )}
                        <Link to={`/admin/products/edit/${prod.id}`} style={{ padding: '0.3rem', color: 'var(--gold)' }} title="Edit">
                          <Edit size={16} />
                        </Link>
                        <button onClick={() => setDeleteId(prod.id)} style={{ padding: '0.3rem', color: 'var(--error)' }} title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Confirm Product Deletion">
        <p style={{ color: 'var(--stone)', marginBottom: '1.5rem' }}>
          Are you sure you want to permanently remove this fine jewellery item from the store catalog?
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button onClick={() => setDeleteId(null)} className="btn btn-outline">Cancel</button>
          <button onClick={handleDelete} className="btn btn-primary" style={{ backgroundColor: 'var(--error)', borderColor: 'var(--error)' }}>
            Delete Permanently
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminProducts;
