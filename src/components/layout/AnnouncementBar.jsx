import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { formatPrice } from '../../utils/formatPrice';

const AnnouncementBar = () => {
  const { homeContent, goldRates } = useData();
  const announcements = homeContent?.announcements || [
    '✦ FATTO A MANO IN ITALIA — COMPLIMENTARY INSURED EXPRESS WORLDWIDE SHIPPING',
    '✦ EXPLORE THE FIRENZE 1954 RENAISSANCE COLLECTION',
    '✦ BOOK A PRIVATE VIRTUAL CONSULTATION WITH OUR MASTER GOLDSMITH IN FLORENCE'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div
      style={{
        height: 'var(--announcement-height)',
        backgroundColor: 'var(--bordeaux-dark)',
        color: 'var(--gold-light)',
        fontSize: '0.72rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1rem',
        borderBottom: '1px solid rgba(176,141,76,0.3)',
        overflow: 'hidden'
      }}
    >
      <div className="site-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span>{announcements[currentIndex]}</span>
        </div>

        {goldRates && (
          <div style={{ display: 'none', gap: '1rem', fontSize: '0.68rem', color: 'var(--ivory)' }} className="header-gold-rates">
            <span>18kt Gold: <strong>{formatPrice(goldRates.gold18k)}/g</strong></span>
            <span>22kt Gold: <strong>{formatPrice(goldRates.gold22k)}/g</strong></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBar;
