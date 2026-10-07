import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/seed';
import { formatPrice } from '../../utils/formatPrice';

const ProductFilterDrawer = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onClose
}) => {
  const metals = ['All', 'Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum'];
  const purities = ['All', '18kt', '22kt', '24kt (999)', '950 Pt'];

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)', paddingBottom: '1rem' }}>
        <h3 className="h3" style={{ fontSize: '1.2rem', color: 'var(--bordeaux)', margin: 0 }}>
          Refine Selection
        </h3>
        <button
          onClick={onResetFilters}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          <RotateCcw size={14} /> Reset All
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="form-label">Category</h4>
        <select
          className="form-select"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          <option value="All">All Categories</option>
          {INITIAL_CATEGORIES.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Metal Type */}
      <div>
        <h4 className="form-label">Precious Metal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {metals.map(metal => (
            <label key={metal} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="metal"
                checked={filters.metal === metal}
                onChange={() => onFilterChange('metal', metal)}
              />
              <span>{metal}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Purity */}
      <div>
        <h4 className="form-label">Gold / Metal Purity</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {purities.map(purity => (
            <label key={purity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="purity"
                checked={filters.purity === purity}
                onChange={() => onFilterChange('purity', purity)}
              />
              <span>{purity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <h4 className="form-label">Max Price: {formatPrice(filters.maxPrice)}</h4>
        <input
          type="range"
          min="20000"
          max="2000000"
          step="10000"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--bordeaux)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--stone)', marginTop: '0.3rem' }}>
          <span>₹20,000</span>
          <span>₹20,00,000+</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          />
          <span>In-Stock Only</span>
        </label>
      </div>
    </div>
  );

  // Desktop inline filter panel vs Mobile drawer
  if (isOpen) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(27,23,20,0.6)',
          zIndex: 1200,
          display: 'flex',
          justifyContent: 'flex-start'
        }}
        onClick={onClose}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            height: '100%',
            backgroundColor: 'var(--ivory)',
            padding: '2rem',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button onClick={onClose}><X size={24} /></button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1.5rem', borderRadius: '2px' }}>
      {content}
    </div>
  );
};

export default ProductFilterDrawer;
