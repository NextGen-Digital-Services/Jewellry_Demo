import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn btn-outline btn-sm"
        style={{ padding: '0.5rem 0.75rem', opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '2px',
            border: page === currentPage ? '1px solid var(--bordeaux)' : '1px solid var(--line)',
            backgroundColor: page === currentPage ? 'var(--bordeaux)' : 'var(--white)',
            color: page === currentPage ? 'var(--ivory)' : 'var(--ink)',
            fontWeight: 500,
            fontSize: '0.85rem'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn btn-outline btn-sm"
        style={{ padding: '0.5rem 0.75rem', opacity: currentPage === totalPages ? 0.4 : 1 }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
