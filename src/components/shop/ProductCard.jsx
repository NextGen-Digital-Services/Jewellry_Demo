import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import SmartImage from '../common/SmartImage';
import Badge from '../common/Badge';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product.id);

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Badge Overlay */}
      {product.badge && (
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
          <Badge variant={product.badge === 'Bestseller' ? 'bordeaux' : 'gold'}>
            {product.badge}
          </Badge>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Wishlist"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10,
          backgroundColor: 'var(--white)',
          color: isLiked ? 'var(--bordeaux)' : 'var(--stone)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <Heart size={18} fill={isLiked ? 'var(--bordeaux)' : 'none'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.slug}`} style={{ display: 'block', overflow: 'hidden' }}>
        <SmartImage
          src={product.images && product.images.length > 0 ? product.images[0] : ''}
          alt={product.name}
          aspectRatio="1/1"
          zoom
        />
      </Link>

      {/* Product Details */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--white)' }}>
        <div>
          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--stone)' }}>
            {product.purity} {product.metal} • {product.category}
          </span>

          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink)', margin: '0.35rem 0 0.5rem 0', fontWeight: 500 }}>
            <Link to={`/product/${product.slug}`} style={{ color: 'inherit' }} className="link-underline">
              {product.name}
            </Link>
          </h4>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            <Star size={14} fill="var(--gold)" />
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{product.rating}</span>
            <span style={{ color: 'var(--stone)' }}>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Add To Cart CTA */}
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--bordeaux)' }}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '0.8rem', color: 'var(--stone)', textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.45rem 0.85rem' }}
            aria-label="Add to Bag"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
