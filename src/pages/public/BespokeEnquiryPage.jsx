import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Sparkles, Upload, CheckCircle } from 'lucide-react';
import SmartImage from '../../components/common/SmartImage';

const BespokeEnquiryPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'High Jewellery Necklace',
    budget: '₹3,00,000 – ₹5,00,000',
    details: '',
    referenceImage: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, referenceImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await api.createBespokeEnquiry(formData);
    setSubmitting(false);
    setSubmitted(true);
    addToast('Bespoke custom enquiry submitted successfully to our Florence Atelier team.', 'success');
  };

  return (
    <>
      <SEO title="Bespoke Jewellery Commission | Custom 18kt Gold & Diamonds" description="Commission a one-of-a-kind fine jewellery piece crafted by Aurelia Venezia master goldsmiths in Florence." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Bespoke Atelier Enquiry', path: '/bespoke' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">SU MISURA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Bespoke Custom Commission</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--stone)', maxWidth: '650px', margin: '0 auto' }}>
              Translate your dream sketch or vision into a certified 18kt gold masterwork.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '800px' }}>
          {submitted ? (
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '3rem', textAlign: 'center', borderRadius: '2px' }}>
              <CheckCircle size={48} color="var(--gold)" style={{ margin: '0 auto 1rem auto' }} />
              <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Enquiry Received</h2>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 2rem 0' }}>
                Our Florence Atelier design director will review your reference files and respond within 24 hours with a 3D CAD proposal.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary">
                Submit Another Commission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
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
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Jewellery Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="High Jewellery Necklace">High Jewellery Necklace</option>
                    <option value="Solitaire Engagement Ring">Solitaire Engagement Ring</option>
                    <option value="Bridal Choker Set">Bridal Choker Set</option>
                    <option value="Bespoke Earrings">Bespoke Earrings</option>
                    <option value="Custom Bangle or Kada">Custom Bangle or Kada</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Target Investment / Budget</label>
                  <select
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option value="₹1,50,000 – ₹3,00,000">₹1,50,000 – ₹3,00,000</option>
                    <option value="₹3,00,000 – ₹5,00,000">₹3,00,000 – ₹5,00,000</option>
                    <option value="₹5,00,000 – ₹10,00,000">₹5,00,000 – ₹10,00,000</option>
                    <option value="₹10,00,000+ Couture">₹10,00,000+ Couture</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Describe Your Vision & Specifications</label>
                <textarea
                  rows={4}
                  required
                  className="form-textarea"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe metal preference (18kt Rose/Yellow/White Gold or Platinum), diamond carat weight, gemstone color, or engraving inscription..."
                />
              </div>

              {/* Image Upload Preview */}
              <div className="form-group">
                <label className="form-label">Upload Sketch / Reference Photo</label>
                <div style={{ border: '2px dashed var(--line)', padding: '1.5rem', textAlign: 'center', borderRadius: '2px', backgroundColor: 'var(--bone)' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="reference-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="reference-upload" className="btn btn-outline-gold btn-sm" style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                    <Upload size={16} /> Choose Image File
                  </label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--stone)', margin: 0 }}>JPG, PNG or WEBP up to 5MB</p>

                  {formData.referenceImage && (
                    <div style={{ marginTop: '1rem', width: '120px', margin: '1rem auto 0 auto' }}>
                      <SmartImage src={formData.referenceImage} alt="Uploaded Reference" aspectRatio="1/1" />
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={submitting}>
                {submitting ? 'Submitting Commission...' : 'Submit Bespoke Commission'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default BespokeEnquiryPage;
