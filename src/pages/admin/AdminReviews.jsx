import React, { useState, useEffect } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { addToast } = useToast();

  const loadReviews = () => {
    api.getReviews().then(res => setReviews(res));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleStatus = async (id, status) => {
    await api.updateReviewStatus(id, status);
    loadReviews();
    addToast(`Review marked as ${status}.`, 'info');
  };

  const handleDelete = async (id) => {
    await api.deleteReview(id);
    loadReviews();
    addToast('Review deleted.', 'info');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Client Product Reviews</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Approve, moderate, or reject customer feedback</p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Rating</th>
              <th>Review Reflection</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(r => (
              <tr key={r.id}>
                <td><strong>{r.name}</strong></td>
                <td>
                  <div style={{ display: 'flex', color: 'var(--gold)' }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="var(--gold)" />
                    ))}
                  </div>
                </td>
                <td style={{ fontSize: '0.85rem', color: 'var(--ink)' }}>{r.comment}</td>
                <td>{r.date}</td>
                <td><span className={`status-pill ${r.status === 'Approved' ? 'confirmed' : 'cancelled'}`}>{r.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {r.status !== 'Approved' && (
                      <button onClick={() => handleStatus(r.id, 'Approved')} style={{ color: 'var(--success)' }}><Check size={16} /></button>
                    )}
                    {r.status !== 'Rejected' && (
                      <button onClick={() => handleStatus(r.id, 'Rejected')} style={{ color: 'var(--stone)' }}><X size={16} /></button>
                    )}
                    <button onClick={() => handleDelete(r.id)} style={{ color: 'var(--error)' }}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
