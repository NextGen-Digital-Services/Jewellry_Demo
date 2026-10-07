import React, { useState, useEffect } from 'react';
import { APP_CONFIG } from '../../config';

const CookieNotice = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem(`${APP_CONFIG.STORAGE_PREFIX}cookie_consent`);
    if (!consent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(`${APP_CONFIG.STORAGE_PREFIX}cookie_consent`, 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--ink)',
        color: 'var(--ivory)',
        padding: '1.25rem 2rem',
        zIndex: 1000,
        borderTop: '1px solid var(--gold)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ flex: 1, fontSize: '0.85rem', lineHeight: 1.5, color: '#D8CFBD' }}>
        <strong style={{ color: 'var(--gold-light)' }}>Privatssfera & Cookies:</strong> We use cookies to offer you a personalized luxury shopping experience and analyze site traffic in accordance with Italian data regulations.
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleAccept} className="btn btn-gold btn-sm">
          Accept & Continue
        </button>
      </div>
    </div>
  );
};

export default CookieNotice;
