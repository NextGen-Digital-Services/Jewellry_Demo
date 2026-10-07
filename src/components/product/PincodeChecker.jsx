import React, { useState } from 'react';
import { Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { isValidPincode } from '../../utils/validators';

const PincodeChecker = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!isValidPincode(pincode)) {
      setResult({ valid: false, message: 'Please enter a valid 6-digit Indian postal code.' });
      return;
    }

    setResult({
      valid: true,
      message: `Insured Express Delivery available to Pincode ${pincode} by ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}.`
    });
  };

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Truck size={14} color="var(--gold)" /> Delivery & Pincode Checker
      </label>

      <form onSubmit={handleCheck} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit pincode (e.g. 400026)"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            setResult(null);
          }}
          className="form-input"
          style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
        />
        <button type="submit" className="btn btn-outline-gold btn-sm">
          Check
        </button>
      </form>

      {result && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.8rem', color: result.valid ? 'var(--success)' : 'var(--error)' }}>
          {result.valid ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          <span>{result.message}</span>
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;
