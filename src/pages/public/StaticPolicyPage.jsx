import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { INITIAL_FAQS } from '../../data/seed';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StaticPolicyPage = ({ pageType = 'faq' }) => {
  const location = useLocation();
  const path = location.pathname;

  let pageTitle = 'Frequently Asked Questions';
  let pageSlug = 'FAQ';

  if (path.includes('shipping') || pageType === 'shipping') {
    pageTitle = 'Shipping, Delivery & 30-Day Returns Policy';
    pageSlug = 'Shipping & Returns';
  } else if (path.includes('privacy') || pageType === 'privacy') {
    pageTitle = 'Privacy Policy & Data Security';
    pageSlug = 'Privacy Policy';
  } else if (path.includes('terms') || pageType === 'terms') {
    pageTitle = 'Terms & Conditions of Service';
    pageSlug = 'Terms & Conditions';
  } else if (path.includes('warranty') || pageType === 'warranty') {
    pageTitle = 'Lifetime Craftsmanship Warranty & Buyback';
    pageSlug = 'Warranty & Buyback';
  }

  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <SEO title={pageTitle} description={`Official ${pageTitle} for Aurelia Venezia Italian Fine Jewellery.`} />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: pageSlug }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">CONDIZIONI E GARANZIE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>{pageTitle}</h1>
            <div className="gold-divider" />
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '850px' }}>
          {path.includes('faq') || pageType === 'faq' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {INITIAL_FAQS.map((faq, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', borderRadius: '2px' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      color: 'var(--bordeaux)',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.question}</span>
                    {openFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {openFaq === idx && (
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', fontSize: '0.92rem', color: 'var(--stone)', lineHeight: 1.7, borderTop: '1px solid var(--line)' }}>
                      <p style={{ marginTop: '0.75rem' }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ backgroundColor: 'var(--white)', border: '1px solid var(--line)', padding: '3rem 2.5rem', borderRadius: '2px', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>1. Authenticity & BIS Hallmarking</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Every creation purchased directly from Aurelia Venezia or our official boutique network is 100% BIS Hallmarked (750 for 18kt gold, 916 for 22kt gold, 950 for Platinum). Diamonds above 0.30ct are certified by GIA, IGI, or SGL.
              </p>

              <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>2. 100% Insured Delivery</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Shipments are dispatched via armored courier in tamper-evident security boxes requiring OTP confirmation upon delivery. If any package displays signs of damage prior to acceptance, do not accept the shipment.
              </p>

              <h3 className="h3" style={{ color: 'var(--bordeaux)', marginBottom: '1rem' }}>3. 30-Day Money Back Guarantee & Lifetime Buyback</h3>
              <p>
                Unworn pieces in original vault packaging may be returned for a 100% full refund within 30 days. Furthermore, Aurelia Venezia guarantees a Lifetime Exchange and Buyback at 100% prevailing gold rate and 90% diamond value.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default StaticPolicyPage;
