import React, { useState, useEffect } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Modal from '../common/Modal';

const ReviewsList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    api.getReviews(productId).then(res => setReviews(res));
  }, [productId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      addToast('Please provide your name and review details.', 'error');
      return;
    }
    const newRev = await api.addReview({ productId, name: name.trim(), rating, comment: comment.trim() });
    setReviews(prev => [newRev, ...prev]);
    addToast('Thank you! Your review has been recorded.', 'success');
    setIsModalOpen(false);
    setName('');
    setComment('');
  };

  return (
    <div style={{ margin: '3rem 0', paddingTop: '2rem', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>Client Reviews & Reflections</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Verified experiences from collectors</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn btn-outline-gold btn-sm">
          <MessageSquare size={14} /> Write a Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <p style={{ fontSize: '0.88rem', color: 'var(--stone)', fontStyle: 'italic' }}>
          No reviews written for this piece yet. Be the first to share your reflection.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {reviews.map(rev => (
            <div key={rev.id} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.25rem', borderRadius: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>{rev.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>{rev.date}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.2rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="var(--gold)" />
                ))}
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink)' }}>{rev.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Client Review">
        <form onSubmit={handleSubmitReview}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Contessa Sofia"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? 'var(--gold)' : 'var(--line)', background: 'none' }}
                >
                  <Star size={24} fill={star <= rating ? 'var(--gold)' : 'none'} />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Your Reflection / Review</label>
            <textarea
              required
              rows={4}
              className="form-textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details regarding craftsmanship, gold weight, clarity, or service..."
            />
          </div>

          <button type="submit" className="btn btn-gold btn-full">
            Submit Review
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ReviewsList;
