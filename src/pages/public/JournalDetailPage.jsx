import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import SmartImage from '../../components/common/SmartImage';
import { api } from '../../services/api';

const JournalDetailPage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJournalArticle(slug).then(res => {
      setArticle(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="site-container section-padding text-center"><p style={{ color: 'var(--stone)' }}>Loading editorial...</p></div>;
  }

  if (!article) {
    return (
      <div className="site-container section-padding text-center">
        <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Article Not Found</h2>
        <p style={{ color: 'var(--stone)', margin: '1rem 0' }}>The requested editorial is no longer available.</p>
        <Link to="/journal" className="btn btn-primary">Return to Journal</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={article.title} description={article.excerpt} image={article.image} />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[
            { label: 'Journal', path: '/journal' },
            { label: article.title }
          ]} />
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container" style={{ maxWidth: '800px' }}>
          <span className="subtitle">{article.category} • {article.date}</span>
          <h1 className="h1" style={{ color: 'var(--bordeaux)', margin: '0.5rem 0 1rem 0' }}>{article.title}</h1>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--stone)', marginBottom: '2rem' }}>
            Written by {article.author}
          </p>

          <div style={{ marginBottom: '2.5rem' }}>
            <SmartImage src={article.image} alt={article.title} aspectRatio="16/9" />
          </div>

          <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink)' }}>
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/journal" className="btn btn-outline">← Back to All Articles</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default JournalDetailPage;
