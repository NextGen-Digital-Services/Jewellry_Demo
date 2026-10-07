import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Video, ShieldCheck, RefreshCw, Star } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ImageGallery from '../../components/product/ImageGallery';
import PriceBreakdown from '../../components/product/PriceBreakdown';
import PincodeChecker from '../../components/product/PincodeChecker';
import CertificateBadges from '../../components/product/CertificateBadges';
import Accordion from '../../components/product/Accordion';
import ReviewsList from '../../components/product/ReviewsList';
import BespokeFormModal from '../../components/product/BespokeFormModal';
import ProductCard from '../../components/shop/ProductCard';
import Badge from '../../components/common/Badge';
import { api } from '../../services/api';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { APP_CONFIG } from '../../config';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getProduct(slug).then(res => {
      if (isMounted && res) {
        setProduct(res);
        if (res.sizes && res.sizes.length > 0) {
          setSelectedSize(res.sizes[0]);
        }

        // Add to recently viewed in localStorage
        try {
          const recentsKey = `${APP_CONFIG.STORAGE_PREFIX}recently_viewed`;
          const saved = JSON.parse(localStorage.getItem(recentsKey) || '[]');
          const updated = [res, ...saved.filter(p => p.id !== res.id)].slice(0, 4);
          localStorage.setItem(recentsKey, JSON.stringify(updated));
        } catch (e) {}

        // Fetch related products
        api.getProducts({ category: res.category }).then(rel => {
          if (isMounted) setRelatedProducts(rel.filter(p => p.id !== res.id).slice(0, 4));
        });

        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="site-container section-padding text-center">
        <p style={{ color: 'var(--stone)' }}>Loading creation details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="site-container section-padding text-center">
        <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Product Not Found</h2>
        <p style={{ color: 'var(--stone)', margin: '1rem 0' }}>The requested piece may have been retired or moved.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.id);

  // Schema.org JSON-LD structured data for product
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': product.images[0],
    'description': product.description,
    'sku': product.sku,
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': product.price,
      'availability': product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        image={product.images[0]}
        schema={productSchema}
      />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/shop?category=${product.category.toLowerCase()}` },
            { label: product.name }
          ]} />
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'start' }} className="product-detail-grid">

            {/* Gallery Column */}
            <div>
              <ImageGallery images={product.images} />
            </div>

            {/* Product Meta & Purchase Panel */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Badge variant="gold">{product.purity} Gold</Badge>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)' }}>
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="h1" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--bordeaux)', margin: '0.2rem 0 0.75rem 0' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '0.1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold)" />
                  ))}
                </div>
                <strong style={{ color: 'var(--ink)' }}>{product.rating}</strong>
                <span style={{ color: 'var(--stone)' }}>({product.reviewsCount} Client Reviews)</span>
              </div>

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--bordeaux)', fontFamily: 'var(--font-serif)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--stone)', textDecoration: 'line-through' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>(Inclusive of all taxes)</span>
              </div>

              {/* Metal Specs Pill */}
              <div style={{ backgroundColor: 'var(--bone)', padding: '0.75rem 1rem', borderRadius: '2px', border: '1px solid var(--line)', marginBottom: '1.5rem', fontSize: '0.82rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div><strong>Metal:</strong> {product.metal} ({product.purity})</div>
                <div><strong>Gross Weight:</strong> {product.weightGrams}g</div>
                {product.stones && <div><strong>Stones:</strong> {product.stones}</div>}
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label className="form-label">Select Size</label>
                    <Link to="/guides" style={{ fontSize: '0.75rem', color: 'var(--gold)', textDecoration: 'underline' }}>
                      Ring Size Guide
                    </Link>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: '0.5rem 1rem',
                          border: selectedSize === size ? '2px solid var(--bordeaux)' : '1px solid var(--line)',
                          backgroundColor: selectedSize === size ? 'var(--bordeaux)' : 'var(--white)',
                          color: selectedSize === size ? 'var(--ivory)' : 'var(--ink)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          borderRadius: '2px',
                          cursor: 'pointer'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions CTAs */}
              <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0 1.5rem 0', flexWrap: 'wrap' }}>
                <button
                  onClick={() => addToCart(product, qty, selectedSize)}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <ShoppingBag size={18} /> Add to Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="btn btn-outline"
                  style={{ padding: '0.9rem 1.25rem', borderColor: isLiked ? 'var(--bordeaux)' : 'var(--line)', color: isLiked ? 'var(--bordeaux)' : 'var(--ink)' }}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={20} fill={isLiked ? 'var(--bordeaux)' : 'none'} />
                </button>
              </div>

              {/* Video Consultation Button */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="btn btn-outline-gold btn-full"
                style={{ marginBottom: '1.5rem' }}
              >
                <Video size={18} /> Book Live Video Call Inspection
              </button>

              {/* Pincode Checker */}
              <PincodeChecker />

              {/* Price Breakdown */}
              <PriceBreakdown product={product} />

              {/* Certificate Badges */}
              <CertificateBadges />

              {/* Accordions */}
              <Accordion product={product} />
            </div>
          </div>

          {/* Client Reviews Section */}
          <ReviewsList productId={product.id} />

          {/* Related Masterpieces */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--line)' }}>
              <div className="text-center" style={{ marginBottom: '3rem' }}>
                <span className="roman-numeral">ALTRE CREAZIONI</span>
                <h2 className="h2" style={{ color: 'var(--bordeaux)' }}>Complementary Creations</h2>
                <div className="gold-divider" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {relatedProducts.map(rel => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Consultation Modal */}
      <BespokeFormModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        productName={product.name}
      />

      <style>{`
        @media (max-width: 1024px) {
          .product-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default ProductDetail;
