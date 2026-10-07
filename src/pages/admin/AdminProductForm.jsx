import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Upload } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { slugify } from '../../utils/slugify';
import SmartImage from '../../components/common/SmartImage';

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { refreshData } = useData();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: 'Rings',
    collection: 'Firenze 1954',
    metal: 'Yellow Gold',
    purity: '18kt',
    weightGrams: 5.0,
    stones: '',
    price: 50000,
    originalPrice: 55000,
    makingCharges: 4000,
    stock: 10,
    badge: '',
    featured: false,
    bestseller: false,
    description: '',
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80&auto=format&fit=crop'],
    specs: { 'Origin': 'Florence Atelier', 'Certificate': 'BIS Hallmarked' }
  });

  const [imageInput, setImageInput] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.getProduct(id).then(res => {
        if (res) setFormData(res);
      });
    }
  }, [id, isEdit]);

  const handleNameChange = (val) => {
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: isEdit ? prev.slug : slugify(val)
    }));
  };

  const handleAddImageUrl = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, reader.result] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await api.saveProduct(formData);
    refreshData();
    setSubmitting(false);
    addToast(isEdit ? 'Product updated successfully.' : 'New product created and live in shop.', 'success');
    navigate('/admin/products');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/admin/products" className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>
          {isEdit ? 'Edit Product' : 'Create New Fine Jewellery Creation'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Info */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
            <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
              Basic Product Information
            </h3>

            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                required
                className="form-input"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">URL Slug</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">SKU Code</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="AV-RNG-99"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                rows={4}
                required
                className="form-textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          {/* Pricing & Stock */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
            <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
              Pricing, Metal Weight & Stock
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Original Tag Price (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Making Charges (₹)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.makingCharges}
                  onChange={(e) => setFormData({ ...formData, makingCharges: Number(e.target.value) })}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Gross Metal Weight (Grams)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="form-input"
                  value={formData.weightGrams}
                  onChange={(e) => setFormData({ ...formData, weightGrams: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inventory Quantity</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Product Gallery Images */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2rem', borderRadius: '2px' }}>
            <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1.25rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.5rem' }}>
              Product Images
            </h3>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Enter Unsplash Image URL..."
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
              />
              <button type="button" onClick={handleAddImageUrl} className="btn btn-outline-gold btn-sm">
                Add URL
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="file-upload-btn" className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={16} /> Upload Local Image File
              </label>
              <input type="file" id="file-upload-btn" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>

            {/* Thumbnails preview */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
              {formData.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                  <SmartImage src={img} alt={`Preview ${idx}`} aspectRatio="1/1" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{ position: 'absolute', top: '4px', right: '4px', backgroundColor: 'var(--error)', color: '#FFF', border: 'none', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
            <h4 className="form-label" style={{ color: 'var(--bordeaux)' }}>Categorization</h4>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
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

            <div className="form-group">
              <label className="form-label">Collection</label>
              <select
                className="form-select"
                value={formData.collection}
                onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
              >
                <option value="Firenze 1954">Firenze 1954</option>
                <option value="Roma Imperial">Roma Imperial</option>
                <option value="Venezia Luce">Venezia Luce</option>
                <option value="Milano Moderne">Milano Moderne</option>
                <option value="Capri Riviera">Capri Riviera</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Metal Color</label>
              <select
                className="form-select"
                value={formData.metal}
                onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
              >
                <option value="Yellow Gold">Yellow Gold</option>
                <option value="Rose Gold">Rose Gold</option>
                <option value="White Gold">White Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Metal Purity</label>
              <select
                className="form-select"
                value={formData.purity}
                onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
              >
                <option value="18kt">18kt (750 Gold)</option>
                <option value="22kt">22kt (916 Gold)</option>
                <option value="24kt (999)">24kt (999 Fine Gold)</option>
                <option value="950 Pt">950 Pt (Platinum)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Stones / Diamonds Info</label>
              <input
                type="text"
                className="form-input"
                value={formData.stones}
                onChange={(e) => setFormData({ ...formData, stones: e.target.value })}
                placeholder="e.g. 1.2ct VVS Diamonds"
              />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
            <h4 className="form-label" style={{ color: 'var(--bordeaux)' }}>Visibility & Flags</h4>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', marginBottom: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              />
              <span>Featured Masterpiece Banner</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', marginBottom: '0.75rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
              />
              <span>Mark as Bestseller</span>
            </label>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label className="form-label">Badge Label (Optional)</label>
              <input
                type="text"
                className="form-input"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Bestseller / Exclusive"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
            <Save size={18} /> {submitting ? 'Saving...' : 'Save Product Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
