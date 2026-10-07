import React, { useState } from 'react';
import Modal from '../common/Modal';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const BespokeFormModal = ({ isOpen, onClose, productName = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '03:00 PM',
    type: 'Virtual Video Consultation',
    notes: productName ? `Inquiry regarding ${productName}` : ''
  });

  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await api.createAppointment(formData);
    setSubmitting(false);
    addToast('Your Video Consultation has been requested! Our concierge will email you confirmation details.', 'success');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Virtual Video Consultation">
      <p style={{ fontSize: '0.85rem', color: 'var(--stone)', marginBottom: '1.5rem' }}>
        Connect live with our Senior Jewellery Stylist or Master Goldsmith in Florence to inspect this piece under high-definition cameras.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            required
            className="form-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Ananya Singhania"
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
            <label className="form-label">Preferred Date</label>
            <input
              type="date"
              required
              className="form-input"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Time (IST)</label>
            <select
              className="form-select"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            >
              <option value="11:00 AM">11:00 AM</option>
              <option value="02:00 PM">02:00 PM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="05:30 PM">05:30 PM</option>
              <option value="07:00 PM">07:00 PM</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Special Requests / Notes</label>
          <textarea
            rows={3}
            className="form-textarea"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-gold btn-full" disabled={submitting}>
          {submitting ? 'Confirming...' : 'Confirm Video Appointment'}
        </button>
      </form>
    </Modal>
  );
};

export default BespokeFormModal;
