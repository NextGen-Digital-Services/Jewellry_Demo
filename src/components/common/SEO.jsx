import React from 'react';
import { Helmet } from 'react-helmet-async';
import { APP_CONFIG } from '../../config';

const SEO = ({ title, description, image, schema }) => {
  const defaultTitle = `${APP_CONFIG.BRAND_NAME} — ${APP_CONFIG.TAGLINE}`;
  const pageTitle = title ? `${title} | ${APP_CONFIG.BRAND_NAME}` : defaultTitle;
  const pageDesc = description || 'Discover Italian luxury fine jewellery handcrafted in Florence & Valenza. 18kt Gold, Certified Diamonds & High Jewellery by Aurelia Venezia.';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
