import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ProductCard from '../../components/shop/ProductCard';
import ProductFilterDrawer from '../../components/shop/ProductFilterDrawer';
import ProductSort from '../../components/shop/ProductSort';
import Pagination from '../../components/common/Pagination';
import Skeleton from '../../components/common/Skeleton';
import { api } from '../../services/api';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [gridDensity, setGridDensity] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filters State from URL or Default
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: initialCategory,
    metal: 'All',
    purity: 'All',
    maxPrice: 2000000,
    inStockOnly: false,
    search: initialSearch
  });

  const [sort, setSort] = useState('newest');

  useEffect(() => {
    const catFromUrl = searchParams.get('category');
    if (catFromUrl && catFromUrl !== filters.category) {
      setFilters(prev => ({ ...prev, category: catFromUrl }));
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    api.getProducts({ ...filters, sort }).then(res => {
      if (isMounted) {
        setProducts(res);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [filters, sort]);

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      metal: 'All',
      purity: 'All',
      maxPrice: 2000000,
      inStockOnly: false,
      search: ''
    });
    setSearchParams({});
    setCurrentPage(1);
  };

  // Pagination slicing
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPage]);

  return (
    <>
      <SEO title="Shop Fine Jewellery | 18kt Gold & Diamonds" description="Explore Italian 18kt gold rings, riviera diamond necklaces, earrings, and bangles." />

      <div className="bg-ivory border-bottom-line">
        <div className="site-container">
          <Breadcrumbs items={[{ label: 'Shop All Jewellery', path: '/shop' }]} />
          <div style={{ padding: '2rem 0 3rem 0', textAlign: 'center' }}>
            <span className="roman-numeral">COLLEZIONI INTERE</span>
            <h1 className="h1" style={{ color: 'var(--bordeaux)' }}>Fine Jewellery Catalog</h1>
            <div className="gold-divider" />
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--stone)', fontSize: '0.92rem' }}>
              Hand-chiselled 18kt gold, certified diamonds, and precious gemstones forged in Florence & Valenza.
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding bg-ivory">
        <div className="site-container">
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', alignItems: 'start' }} className="shop-grid">

            {/* Desktop Filters Sidebar */}
            <div className="desktop-filters-sidebar">
              <ProductFilterDrawer
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Main Products Container */}
            <div>
              <ProductSort
                sort={sort}
                onSortChange={setSort}
                gridDensity={gridDensity}
                onGridDensityChange={setGridDensity}
                totalResults={products.length}
                onOpenMobileFilters={() => setMobileFilterOpen(true)}
              />

              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${gridDensity}, 1fr)`, gap: '1.5rem' }}>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} style={{ height: '360px' }}>
                      <Skeleton height="100%" />
                    </div>
                  ))}
                </div>
              ) : currentProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'var(--white)', border: '1px solid var(--line)' }}>
                  <h3 className="h3" style={{ color: 'var(--bordeaux)' }}>No Jewellery Matches Found</h3>
                  <p style={{ color: 'var(--stone)', margin: '0.75rem 0 1.5rem 0' }}>
                    Try relaxing your price slider, metal filter, or category parameters.
                  </p>
                  <button onClick={handleResetFilters} className="btn btn-primary">
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(${gridDensity}, 1fr)`,
                      gap: '1.5rem'
                    }}
                    className="product-catalog-grid"
                  >
                    {currentProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(p) => {
                      setCurrentPage(p);
                      window.scrollTo({ top: 250, behavior: 'smooth' });
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <ProductFilterDrawer
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 1024px) {
          .shop-grid { grid-template-columns: 1fr !important; }
          .desktop-filters-sidebar { display: none !important; }
          .product-catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .product-catalog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default Shop;
