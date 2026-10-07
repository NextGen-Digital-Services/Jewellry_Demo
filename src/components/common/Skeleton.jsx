import React from 'react';

const Skeleton = ({ width = '100%', height = '20px', borderRadius = '2px', style = {} }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: 'var(--bone)',
        animation: 'pulse 1.5s infinite ease-in-out',
        ...style
      }}
    />
  );
};

export default Skeleton;
