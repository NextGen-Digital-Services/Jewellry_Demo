import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import BespokeFormModal from '../../components/product/BespokeFormModal';
import { INITIAL_BOUTIQUES } from '../../data/seed';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const StoreLocatorPage = () => {
  const [selectedBoutique, setSelectedBoutique] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookBoutique = (b) => {
    setSelectedBoutique(b);
    setIsModalOpen(true);
  };

  return (
    <>
      <SEO title="Boutiques & Ateliers | Florence, Milan, Rome, Mumbai" description="Find an Aurelia Venezia high jewellery flagship boutique or private atelier near you." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Boutiques & Ateliers', path: '/boutiques' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">LE NOSTRE BOUTIQUE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Flagship Boutiques & Ateliers</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {INITIAL_BOUTIQUES.map(b => (
              <div key={b.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <SmartImage src={b.image} alt={b.name} aspectRatio="16/10" zoom />
                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--white)' }}>
                  <div>
                    <span className="subtitle" style={{ color: 'var(--gold)' }}>{b.city}, {b.country}</span>
                    <h3 className="h3" style={{ fontSize: '1.4rem', color: 'var(--bordeaux)', margin: '0.2rem 0 0.75rem 0' }}>{b.name}</h3>

                    <div style={{ fontSize: '0.85rem', color: 'var(--stone)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}><MapPin size={16} color="var(--gold)" /> <span>{b.address}</span></div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}><Phone size={16} color="var(--gold)" /> <span>{b.phone}</span></div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}><Mail size={16} color="var(--gold)" /> <span>{b.email}</span></div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}><Clock size={16} color="var(--gold)" /> <span>{b.hours}</span></div>
                    </div>

                    {/* Services Pill List */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                      {b.services.map((s, idx) => (
                        <span key={idx} style={{ backgroundColor: 'var(--bone)', color: 'var(--ink)', fontSize: '0.72rem', padding: '0.2rem 0.5rem', borderRadius: '2px', border: '1px solid var(--line)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => handleBookBoutique(b)} className="btn btn-outline-gold btn-full">
                    Book In-Boutique Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BespokeFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={selectedBoutique ? `Boutique Visit: ${selectedBoutique.name}` : ''}
      />
    </>
  );
};

export default StoreLocatorPage;
