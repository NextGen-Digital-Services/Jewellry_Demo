import React, { useRef, useState, useEffect } from 'react';
import { useCounter } from '../../hooks/useCounter';

const CounterItem = ({ end, label, subtitle, suffix = '+' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const count = useCounter(end, 2000, 0, isVisible);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '1.5rem' }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 4vw, 4rem)', color: 'var(--gold-light)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ivory)', marginTop: '0.5rem' }}>
        {label}
      </h4>
      <p style={{ fontSize: '0.8rem', color: '#D8CFBD', marginTop: '0.2rem' }}>
        {subtitle}
      </p>
    </div>
  );
};

const HeritageCounters = () => {
  return (
    <section className="section-padding bg-bordeaux text-center">
      <div className="site-container">
        <span className="roman-numeral" style={{ color: 'var(--gold-light)' }}>IV — MAESTRIA E TRADIZIONE</span>
        <h2 className="h2" style={{ color: 'var(--ivory)', marginBottom: '1rem' }}>
          Seven Decades of Florentine Mastery
        </h2>
        <div className="gold-divider" style={{ backgroundColor: 'var(--gold-light)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
          <CounterItem end={72} label="Years of Craftsmanship" subtitle="Established in Florence in 1954" />
          <CounterItem end={150} label="Master Artisans" subtitle="Maestri Orafi in Florence & Valenza" />
          <CounterItem end={48000} label="Heirloom Pieces" subtitle="Delivered to luxury collectors worldwide" suffix="+" />
          <CounterItem end={100} label="Percent BIS Hallmarked" subtitle="Certified 18kt & 22kt Fine Gold" suffix="%" />
        </div>
      </div>
    </section>
  );
};

export default HeritageCounters;
