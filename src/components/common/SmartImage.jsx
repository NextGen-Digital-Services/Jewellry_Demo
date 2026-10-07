import React, { useState } from 'react';
import { APP_CONFIG } from '../../config';

const SmartImage = ({
  src,
  alt = '',
  aspectRatio = '4/3',
  className = '',
  zoom = false,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`smart-image-wrapper ${zoom ? 'zoom' : ''} ${className}`}
      style={{ aspectRatio }}
    >
      {!loaded && !error && (
        <div className="skeleton-box" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
      )}

      {error ? (
        <div className="smart-image-fallback">
          <div className="smart-image-monogram">A</div>
          <div className="gold-divider" style={{ margin: '0.5rem auto' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--stone)', textTransform: 'uppercase' }}>
            {APP_CONFIG.BRAND_NAME}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{ opacity: loaded ? 1 : 0 }}
          {...props}
        />
      )}
    </div>
  );
};

export default SmartImage;
