import React, { useState } from 'react';
import SmartImage from '../common/SmartImage';

const ImageGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Main Active Image */}
      <div style={{ border: '1px solid var(--line)', backgroundColor: 'var(--white)', borderRadius: '2px', overflow: 'hidden' }}>
        <SmartImage
          src={images[selectedIndex]}
          alt={`Jewellery view ${selectedIndex + 1}`}
          aspectRatio="1/1"
          zoom
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              style={{
                width: '70px',
                height: '70px',
                border: selectedIndex === idx ? '2px solid var(--bordeaux)' : '1px solid var(--line)',
                padding: 0,
                cursor: 'pointer',
                borderRadius: '2px',
                overflow: 'hidden'
              }}
            >
              <SmartImage src={img} alt={`Thumb ${idx + 1}`} aspectRatio="1/1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
