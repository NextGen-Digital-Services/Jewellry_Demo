import React from 'react';
import { ShieldCheck, Award, RotateCcw, Clock } from 'lucide-react';

const TrustBar = () => {
  const trusts = [
    { icon: ShieldCheck, title: 'Free Insured Shipping', desc: '100% insured express door delivery worldwide' },
    { icon: Award, title: 'BIS 750 / GIA Certified', desc: 'Every diamond & gold karat certified' },
    { icon: RotateCcw, title: '30-Day Money-Back', desc: 'Hassle-free 100% full refund returns' },
    { icon: Clock, title: 'Lifetime Care & Buyback', desc: 'Annual polishing & 100% gold rate exchange' }
  ];

  return (
    <section className="section-padding-sm bg-ivory border-bottom-line">
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {trusts.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', backgroundColor: 'var(--bone)', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--bordeaux)' }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, color: 'var(--ink)' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--stone)', marginTop: '0.2rem' }}>{t.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
