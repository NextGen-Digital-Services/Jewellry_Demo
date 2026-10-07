import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { Calculator, ShieldCheck, Sparkles, Award } from 'lucide-react';

const GuidesPage = () => {
  const [mmInput, setMmInput] = useState('');
  const [calculatedSize, setCalculatedSize] = useState(null);

  const calculateRingSize = (e) => {
    e.preventDefault();
    const mm = parseFloat(mmInput);
    if (!mm || mm < 13 || mm > 25) {
      setCalculatedSize({ error: 'Please enter a circumference or diameter between 13mm and 25mm.' });
      return;
    }

    // Standard Indian Ring Size formula
    let size = 12;
    if (mm < 15.7) size = 10;
    else if (mm < 16.5) size = 12;
    else if (mm < 17.3) size = 14;
    else if (mm < 18.1) size = 16;
    else if (mm < 18.9) size = 18;
    else if (mm < 19.8) size = 20;
    else size = 22;

    setCalculatedSize({ size, mm });
  };

  return (
    <>
      <SEO title="Jewellery Guides | Ring Size Calculator & Diamond 4Cs" description="Interactive ring size calculator, diamond 4Cs guide, gold purity hallmarks, and care guide." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Jewellery Guides & Size Calculator', path: '/guides' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">GUIDE ALLA GIOIELLERIA</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Jewellery & Purity Guides</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '900px' }}>

          {/* Interactive Ring Size Calculator */}
          <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gold)', padding: '2.5rem', borderRadius: '2px', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Calculator size={24} color="var(--bordeaux)" />
              <h3 className="h3" style={{ color: 'var(--bordeaux)', margin: 0 }}>Interactive Ring Size Calculator</h3>
            </div>
            <p style={{ color: 'var(--stone)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Measure the inside diameter or circumference of a ring that fits you comfortably in millimeters.
            </p>

            <form onSubmit={calculateRingSize} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <input
                type="number"
                step="0.1"
                placeholder="Inside Diameter (e.g. 16.5 mm)"
                value={mmInput}
                onChange={(e) => setMmInput(e.target.value)}
                className="form-input"
                style={{ flex: 1, minWidth: '220px' }}
              />
              <button type="submit" className="btn btn-gold">
                Calculate Size
              </button>
            </form>

            {calculatedSize && (
              <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', backgroundColor: 'var(--bone)', border: '1px solid var(--line)', borderRadius: '2px' }}>
                {calculatedSize.error ? (
                  <span style={{ color: 'var(--error)', fontSize: '0.88rem' }}>{calculatedSize.error}</span>
                ) : (
                  <div style={{ fontSize: '1rem', color: 'var(--ink)' }}>
                    Your Estimated Indian Ring Size is: <strong style={{ color: 'var(--bordeaux)', fontSize: '1.4rem' }}>Size {calculatedSize.size}</strong> ({calculatedSize.mm} mm diameter)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Diamond 4Cs Guide */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 className="h2" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>The Diamond 4Cs Redefined</h2>
            <div className="gold-divider-left" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className="card" style={{ padding: '1.25rem' }}>
                <strong style={{ color: 'var(--bordeaux)', display: 'block', fontSize: '1.1rem' }}>Cut</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                  Triple Excellent cuts engineered for maximum light dispersion and fire.
                </p>
              </div>
              <div className="card" style={{ padding: '1.25rem' }}>
                <strong style={{ color: 'var(--bordeaux)', display: 'block', fontSize: '1.1rem' }}>Color</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                  Colorless D, E, F grade diamonds selected for crystal clarity.
                </p>
              </div>
              <div className="card" style={{ padding: '1.25rem' }}>
                <strong style={{ color: 'var(--bordeaux)', display: 'block', fontSize: '1.1rem' }}>Clarity</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                  VVS1 and VVS2 eye-flawless stones accompanied by GIA/IGI certification.
                </p>
              </div>
              <div className="card" style={{ padding: '1.25rem' }}>
                <strong style={{ color: 'var(--bordeaux)', display: 'block', fontSize: '1.1rem' }}>Carat</strong>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', marginTop: '0.4rem' }}>
                  Precision weighed to three decimal places with certicard security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GuidesPage;
