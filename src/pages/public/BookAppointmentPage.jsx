import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { Calendar, Video, MapPin, CheckCircle } from 'lucide-react';

const BookAppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Virtual Video Consultation',
    boutique: 'Palazzo Aurelia Flagship (Firenze)',
    date: '',
    time: '03:00 PM',
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await api.createAppointment(formData);
    setSubmitting(false);
    setSuccess(true);
    addToast('Appointment request received! Check your inbox for confirmation.', 'success');
  };

  return (
    <>
      <SEO title="Book Appointment | Virtual Call or In-Boutique" description="Schedule a private video consultation or in-boutique visit with Aurelia Venezia master jewellers." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Book Consultation', path: '/appointment' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">PRENOTAZIONE APPUNTAMENTO</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Book a Private Appointment</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '750px' }}>
          {success ? (
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '3rem', textAlign: 'center', borderRadius: '2px' }}>
              <CheckCircle size={48} color="var(--gold)" style={{ margin: '0 auto 1rem auto' }} />
              <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Appointment Confirmed</h2>
              <p style={{ color: 'var(--stone)', margin: '1rem 0 2rem 0' }}>
                Our Client Concierge will email you high-definition call links and preparation guidance.
              </p>
              <button onClick={() => setSuccess(false)} className="btn btn-primary">
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px' }}>
              <div className="form-group">
                <label className="form-label">Consultation Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label style={{ padding: '1rem', border: formData.type === 'Virtual Video Consultation' ? '2px solid var(--bordeaux)' : '1px solid var(--line)', borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="type"
                      checked={formData.type === 'Virtual Video Consultation'}
                      onChange={() => setFormData({ ...formData, type: 'Virtual Video Consultation' })}
                    />
                    <Video size={18} color="var(--gold)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>Virtual Video Call</span>
                  </label>

                  <label style={{ padding: '1rem', border: formData.type === 'In-Boutique Visit' ? '2px solid var(--bordeaux)' : '1px solid var(--line)', borderRadius: '2px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="type"
                      checked={formData.type === 'In-Boutique Visit'}
                      onChange={() => setFormData({ ...formData, type: 'In-Boutique Visit' })}
                    />
                    <MapPin size={18} color="var(--gold)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>In-Boutique Visit</span>
                  </label>
                </div>
              </div>

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
                  <label className="form-label">Phone Number</label>
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
                <label className="form-label">Notes & Desired Pieces to Inspect</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention ring sizes, solitaire specifications, or bridal attire colors..."
                />
              </div>

              <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={submitting}>
                {submitting ? 'Submitting Request...' : 'Schedule Private Appointment'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default BookAppointmentPage;
