import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { formatPrice } from '../../utils/formatPrice';

const PriceBreakdown = ({ product }) => {
  const [open, setOpen] = useState(false);

  const metalCost = Math.round(product.price * 0.55);
  const stoneCost = Math.round(product.price * 0.25);
  const makingCharges = product.makingCharges || Math.round(product.price * 0.15);
  const gst = Math.round(product.price * 0.03);

  return (
    <div style={{ backgroundColor: 'var(--bone)', border: '1px solid var(--line)', borderRadius: '2px', padding: '1rem 1.25rem', margin: '1.25rem 0' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bordeaux)', fontWeight: 600 }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Info size={16} /> Transparent Price Breakdown
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid var(--line)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{product.purity} Gold Metal Value ({product.weightGrams}g)</span>
            <span>{formatPrice(metalCost)}</span>
          </div>
          {product.stones && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Precious Stones / Diamonds ({product.stones})</span>
              <span>{formatPrice(stoneCost)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Artisan Making & Setting Charges</span>
            <span>{formatPrice(makingCharges)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Applicable GST (3%)</span>
            <span>{formatPrice(gst)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, borderTop: '1px solid var(--line)', paddingTop: '0.5rem', color: 'var(--bordeaux)' }}>
            <span>Total Tag Price</span>
            <span>{formatPrice(product.price)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceBreakdown;
