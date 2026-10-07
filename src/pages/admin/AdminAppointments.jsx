import React, { useState, useEffect } from 'react';
import { Calendar, Video, MapPin, CheckCircle } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminAppointments = () => {
  const [apps, setApps] = useState([]);
  const { addToast } = useToast();

  const loadApps = () => {
    api.getAppointments().then(res => setApps(res));
  };

  useEffect(() => {
    loadApps();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await api.updateAppointmentStatus(id, status);
    loadApps();
    addToast(`Appointment updated to ${status}.`, 'info');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Consultations & Salon Appointments</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Virtual video call requests and in-boutique appointments</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Contact Details</th>
              <th>Type / Location</th>
              <th>Date & Time</th>
              <th>Notes / Request</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a.id}>
                <td><strong>{a.name}</strong></td>
                <td>
                  <div>{a.email}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{a.phone}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--bordeaux)' }}>{a.type}</span>
                  {a.boutique && <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--stone)' }}>{a.boutique}</span>}
                </td>
                <td><strong>{a.date}</strong> at {a.time}</td>
                <td style={{ fontSize: '0.8rem', color: 'var(--stone)' }}>{a.notes || '—'}</td>
                <td>
                  <select
                    value={a.status}
                    onChange={(e) => handleUpdateStatus(a.id, e.target.value)}
                    className="form-select"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem', width: 'auto' }}
                  >
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Rescheduled">Rescheduled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
