import React from 'react';
import { Grid, LayoutGrid } from 'lucide-react';

const ProductSort = ({
  sort,
  onSortChange,
  gridDensity,
  onGridDensityChange,
  totalResults,
  onOpenMobileFilters
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '1rem 1.5rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', borderRadius: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onOpenMobileFilters}
          className="btn btn-outline btn-sm mobile-filter-btn"
          style={{ display: 'none' }}
        >
          Filters
        </button>
        <span style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>
          Showing <strong>{totalResults}</strong> Fine Jewellery Creations
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Grid density toggle */}
        <div style={{ display: 'flex', gap: '0.4rem', color: 'var(--stone)' }}>
          <button
            onClick={() => onGridDensityChange(3)}
            style={{ padding: '0.2rem', color: gridDensity === 3 ? 'var(--bordeaux)' : 'var(--stone)' }}
            aria-label="3 columns"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => onGridDensityChange(4)}
            style={{ padding: '0.2rem', color: gridDensity === 4 ? 'var(--bordeaux)' : 'var(--stone)' }}
            aria-label="4 columns"
          >
            <LayoutGrid size={18} />
          </button>
        </div>

        {/* Sort select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--stone)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sort:</label>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
          >
            <option value="newest">Newest Creations</option>
            <option value="popular">Popularity & Ratings</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-filter-btn { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductSort;
