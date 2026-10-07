import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import { api } from '../../services/api';

const JournalPage = () => {
  const [articles, setArticles] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJournalArticles().then(res => {
      setArticles(res);
      setLoading(false);
    });
  }, []);

  const categories = ['All', 'Craftsmanship', 'Jewellery Guide', 'Bridal Editorial', 'Care & Maintenance', 'Heritage'];

  const filtered = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      <SEO title="Journal & Editorial Articles" description="Read articles on Florentine hand engraving, diamond setting, gold karats, and high jewellery trends." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Journal & Editorial', path: '/journal' }]} />
          <div className="text-center" style={{ padding: '2rem 0 3.5rem 0' }}>
            <span className="roman-numeral">IL GIORNALE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>The Atelier Journal</h1>
            <div className="gold-divider" />
            <p style={{ color: 'var(--stone)', maxWidth: '600px', margin: '0 auto' }}>
              Stories of Renaissance goldsmithing, diamond gemology, and high fashion editorials.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn btn-sm ${activeCategory === cat ? 'btn-bordeaux' : 'btn-outline'}`}
                style={{
                  backgroundColor: activeCategory === cat ? 'var(--bordeaux)' : 'var(--white)',
                  color: activeCategory === cat ? 'var(--ivory)' : 'var(--ink)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-center" style={{ color: 'var(--stone)' }}>Loading journal articles...</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
              {filtered.map(art => (
                <div key={art.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/journal/${art.slug}`}>
                    <SmartImage src={art.image} alt={art.title} aspectRatio="16/10" zoom />
                  </Link>

                  <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--white)' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                        {art.category} • {art.date}
                      </span>
                      <h3 className="h3" style={{ fontSize: '1.35rem', color: 'var(--ink)', margin: '0.5rem 0 0.75rem 0' }}>
                        <Link to={`/journal/${art.slug}`} className="link-underline">{art.title}</Link>
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--stone)', lineHeight: 1.6 }}>
                        {art.excerpt}
                      </p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1rem', marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--stone)', fontStyle: 'italic' }}>By {art.author}</span>
                      <Link to={`/journal/${art.slug}`} className="link-underline" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bordeaux)', fontWeight: 600 }}>
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JournalPage;
