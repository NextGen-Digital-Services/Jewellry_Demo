import React, { useState, useEffect } from 'react';
import { Save, Coins } from 'lucide-react';
import { api } from '../../services/api';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

const AdminGoldRates = () => {
  const { goldRates, refreshData } = useData();
  const { addToast } = useToast();

  const [rates, setRates] = useState({
    gold18k: 5450,
    gold22k: 6650,
    gold24k: 7250,
    silver925: 85,
    platinum950: 3400
  });

  useEffect(() => {
    if (goldRates) {
      setRates({
        gold18k: goldRates.gold18k,
        gold22k: goldRates.gold22k,
        gold24k: goldRates.gold24k,
        silver925: goldRates.silver925,
        platinum950: goldRates.platinum950
      });
    }
  }, [goldRates]);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.updateGoldRates(rates);
    refreshData();
    addToast("Today's official precious metal rates updated live.", 'success');
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="h2" style={{ color: 'var(--bordeaux)', margin: 0 }}>Daily Gold & Silver Rate Manager</h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--stone)' }}>Set prevailing market metal benchmark rates (₹ per gram)</p>
      </div>

      <form onSubmit={handleSave} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '2.5rem', borderRadius: '2px', maxWidth: '750px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">18kt Gold Rate (₹/g)</label>
            <input
              type="number"
              required
              className="form-input"
              value={rates.gold18k}
              onChange={(e) => setRates({ ...rates, gold18k: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">22kt Gold Rate (₹/g)</label>
            <input
              type="number"
              required
              className="form-input"
              value={rates.gold22k}
              onChange={(e) => setRates({ ...rates, gold22k: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">24kt Pure Gold Rate (₹/g)</label>
            <input
              type="number"
              required
              className="form-input"
              value={rates.gold24k}
              onChange={(e) => setRates({ ...rates, gold24k: Number(e.target.value) })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Silver 925 Sterling (₹/g)</label>
            <input
              type="number"
              required
              className="form-input"
              value={rates.silver925}
              onChange={(e) => setRates({ ...rates, silver925: Number(e.target.value) })}
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Platinum 950 Pure Rate (₹/g)</label>
            <input
              type="number"
              required
              className="form-input"
              value={rates.platinum950}
              onChange={(e) => setRates({ ...rates, platinum950: Number(e.target.value) })}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-gold btn-full btn-lg" style={{ marginTop: '1.5rem' }}>
          <Save size={18} /> Update Today's Metal Rates
        </button>
      </form>
    </div>
  );
};

export default AdminGoldRates;
