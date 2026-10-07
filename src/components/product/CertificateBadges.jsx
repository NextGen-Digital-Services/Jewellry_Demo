import React from 'react';
import { Award, ShieldCheck, CheckSquare, Sparkles } from 'lucide-react';

const CertificateBadges = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', padding: '1rem 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', margin: '1.5rem 0', textAlign: 'center' }}>
      <div>
        <Award size={20} color="var(--gold)" style={{ margin: '0 auto 0.2rem auto' }} />
        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink)' }}>BIS 750 / 916</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--stone)' }}>Hallmarked Gold</span>
      </div>

      <div>
        <Sparkles size={20} color="var(--gold)" style={{ margin: '0 auto 0.2rem auto' }} />
        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink)' }}>GIA / IGI</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--stone)' }}>Certified Diamond</span>
      </div>

      <div>
        <ShieldCheck size={20} color="var(--gold)" style={{ margin: '0 auto 0.2rem auto' }} />
        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink)' }}>100% Insured</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--stone)' }}>Express Transit</span>
      </div>

      <div>
        <CheckSquare size={20} color="var(--gold)" style={{ margin: '0 auto 0.2rem auto' }} />
        <span style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'var(--ink)' }}>Lifetime Care</span>
        <span style={{ fontSize: '0.62rem', color: 'var(--stone)' }}>Buyback Guarantee</span>
      </div>
    </div>
  );
};

export default CertificateBadges;
