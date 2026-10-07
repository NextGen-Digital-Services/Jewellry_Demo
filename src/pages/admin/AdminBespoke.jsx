import React, { useState, useEffect } from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import SmartImage from '../../components/common/SmartImage';
import Modal from '../../components/common/Modal';

const AdminBespoke = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [replyNotes, setReplyNotes] = useState('');
  const { addToast } = useToast();

  const loadEnquiries = () => {
    api.getBespokeEnquiries().then(res => setEnquiries(res));
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id, status, notes) => {
    await api.updateBespokeStatus(id, status, notes);
    loadEnquiries();
    setActiveEnquiry(null);
    addToast(`Bespoke enquiry ${id} updated to ${status}.`, 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Bespoke Commission Requests</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Custom jewellery design inquiries & uploaded reference sketches</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Reference Image</th>
              <th>Client Name</th>
              <th>Category & Budget</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(e => (
              <tr key={e.id}>
                <td style={{ width: '70px' }}>
                  {e.referenceImage ? (
                    <SmartImage src={e.referenceImage} alt="Sketch" aspectRatio="1/1" />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>No Image</span>
                  )}
                </td>
                <td>
                  <strong style={{ color: 'var(--ink)' }}>{e.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>{e.email} • {e.phone}</span>
                </td>
                <td>
                  <strong style={{ color: 'var(--bordeaux)' }}>{e.category}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>Budget: {e.budget}</span>
                </td>
                <td>{e.date}</td>
                <td><span className="status-pill confirmed">{e.status}</span></td>
                <td>
                  <button onClick={() => { setActiveEnquiry(e); setReplyNotes(e.notes || ''); }} className="btn btn-outline-gold btn-sm">
                    <Eye size={14} /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {activeEnquiry && (
        <Modal isOpen={!!activeEnquiry} onClose={() => setActiveEnquiry(null)} title={`Bespoke Commission ${activeEnquiry.id}`}>
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Client:</strong> {activeEnquiry.name} ({activeEnquiry.email} | {activeEnquiry.phone})
            </div>

            {activeEnquiry.referenceImage && (
              <div style={{ marginBottom: '1.5rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Uploaded Reference Photo / Sketch:</strong>
                <div style={{ maxWidth: '300px' }}>
                  <SmartImage src={activeEnquiry.referenceImage} alt="Sketch" aspectRatio="4/3" />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <strong>Vision Details:</strong>
              <p style={{ backgroundColor: 'var(--bone)', padding: '1rem', borderRadius: '2px', marginTop: '0.4rem', fontSize: '0.9rem' }}>
                {activeEnquiry.details}
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Atelier Reply Notes & 3D CAD Status</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={replyNotes}
                onChange={(e) => setReplyNotes(e.target.value)}
                placeholder="Enter 3D CAD proposal notes or price estimation..."
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button onClick={() => handleUpdateStatus(activeEnquiry.id, 'Quotation Sent', replyNotes)} className="btn btn-primary">
                Send CAD Quotation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBespoke;
