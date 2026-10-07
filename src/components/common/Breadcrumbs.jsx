import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '1rem 0', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)' }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ color: 'var(--stone)' }} className="link-underline">Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ChevronRight size={12} color="var(--line)" />
              {isLast ? (
                <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{item.label}</span>
              ) : (
                <Link to={item.path} style={{ color: 'var(--stone)' }} className="link-underline">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
