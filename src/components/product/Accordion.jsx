import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ title, children, isOpen, onToggle }) => {
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '1.25rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          color: 'var(--ink)',
          textAlign: 'left'
        }}
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp size={18} color="var(--gold)" /> : <ChevronDown size={18} color="var(--gold)" />}
      </button>

      {isOpen && (
        <div style={{ paddingBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--stone)', lineHeight: 1.7 }}>
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ product }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={{ margin: '2rem 0' }}>
      <AccordionItem
        title="Product Description & Craftsmanship"
        isOpen={openIndex === 0}
        onToggle={() => setOpenIndex(openIndex === 0 ? null : 0)}
      >
        <p>{product.description}</p>
        {product.specs && (
          <ul style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {Object.entries(product.specs).map(([key, val]) => (
              <li key={key}>
                <strong style={{ color: 'var(--ink)' }}>{key}:</strong> {val}
              </li>
            ))}
          </ul>
        )}
      </AccordionItem>

      <AccordionItem
        title="Jewellery Care Instructions"
        isOpen={openIndex === 1}
        onToggle={() => setOpenIndex(openIndex === 1 ? null : 1)}
      >
        <p>1. Store in the complimentary velvet-lined Aurelia box provided.</p>
        <p>2. Avoid direct contact with perfume, hairspray, and swimming pool chemicals.</p>
        <p>3. Clean gently using warm soapy water and an ultra-soft suede cloth.</p>
      </AccordionItem>

      <AccordionItem
        title="Insured Shipping & 30-Day Returns"
        isOpen={openIndex === 2}
        onToggle={() => setOpenIndex(openIndex === 2 ? null : 2)}
      >
        <p>Every shipment is 100% insured against loss or damage in transit. Delivered via tamper-evident security courier. Enjoy 30 days full refund return policy for non-customized creations.</p>
      </AccordionItem>
    </div>
  );
};

export default Accordion;
