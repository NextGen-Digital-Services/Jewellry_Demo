import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { INITIAL_TESTIMONIALS } from '../../data/seed';
import SmartImage from '../common/SmartImage';

const TestimonialsSlider = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(prev => (prev === 0 ? INITIAL_TESTIMONIALS.length - 1 : prev - 1));
  const next = () => setIndex(prev => (prev === INITIAL_TESTIMONIALS.length - 1 ? 0 : prev + 1));

  const t = INITIAL_TESTIMONIALS[index];

  return (
    <section className="section-padding bg-ivory border-bottom-line">
      <div className="site-container" style={{ maxWidth: '850px' }}>
        <div className="text-center" style={{ marginBottom: '2.5rem' }}>
          <span className="roman-numeral">IX — TESTIMONIANZE</span>
          <p className="subtitle">Client Reflections</p>
          <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Words from Our Collectors</h2>
          <div className="gold-divider" />
        </div>

        <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold-light)', padding: '3rem 2.5rem', borderRadius: '2px', textAlign: 'center', position: 'relative' }}>
          <Quote size={48} color="var(--gold-light)" style={{ position: 'absolute', top: '1.5rem', left: '2rem', opacity: 0.3 }} />

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>
            {[...Array(t.rating)].map((_, i) => (
              <Star key={i} size={18} fill="var(--gold)" />
            ))}
          </div>

          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', lineHeight: 1.6, color: 'var(--ink)', fontStyle: 'italic', marginBottom: '2rem' }}>
            "{t.quote}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
              <SmartImage src={t.avatar} alt={t.name} aspectRatio="1/1" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, color: 'var(--bordeaux)' }}>{t.name}</h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--stone)' }}>{t.city} • Verified Buyer of {t.productName}</span>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button onClick={prev} className="btn btn-outline btn-sm" aria-label="Previous Testimonial">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="btn btn-outline btn-sm" aria-label="Next Testimonial">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;
