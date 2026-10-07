import React from 'react';

const Badge = ({ children, variant = 'gold', className = '' }) => {
  const styles = {
    gold: { backgroundColor: 'var(--gold)', color: 'var(--white)' },
    bordeaux: { backgroundColor: 'var(--bordeaux)', color: 'var(--ivory)' },
    outline: { backgroundColor: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' },
    bone: { backgroundColor: 'var(--bone)', color: 'var(--ink)' }
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '0.2rem 0.6rem',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        ...(styles[variant] || styles.gold)
      }}
    >
      {children}
    </span>
  );
};

export default Badge;
