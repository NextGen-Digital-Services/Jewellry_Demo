import React from 'react';
import { MessageCircle } from 'lucide-react';
import { APP_CONFIG } from '../../config';

const WhatsAppButton = () => {
  const message = encodeURIComponent('Salve! I would like to inquire about Aurelia Venezia fine jewellery collections.');
  const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP.replace(/[\s\+]/g, '')}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Concierge on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 900,
        backgroundColor: '#25D366',
        color: '#FFFFFF',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
