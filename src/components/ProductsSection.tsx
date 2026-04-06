import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Star } from 'lucide-react';
import { getProducts, type Product } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import ProductDetailModal from './ProductDetailModal';

export default function ProductsSection() {
  const { t, isRTL } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [products, setProducts]     = useState<Product[]>([]);
  const [filter, setFilter]         = useState('ALL');
  const [search, setSearch]         = useState('');
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [page, setPage]             = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    setProducts(getProducts());
    const h = () => setProducts(getProducts());
    window.addEventListener('productsUpdated', h);
    return () => window.removeEventListener('productsUpdated', h);
  }, []);

  // Reset page on filter/search change
  useEffect(() => { setPage(1); }, [filter, search]);

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products
    .filter(p => filter === 'ALL' || p.category === filter)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const inpCls = isLight
    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
    : 'bg-gray-900 border-gray-700 text-white placeholder-white/30';

  return (
    <>
      <section id="products" className="bg-page py-24 px-4 sm:px-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-red-500 text-sm uppercase tracking-widest mb-3">{t.productsTag}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-t1 mb-4">{t.productsTitle}</h2>
            <p className="text-t3 max-w-xl mx-auto">{t.productsDesc}</p>
          </motion.div>

          {/* Search + Filter */}
          <div className={`flex flex-col sm:flex-row gap-3 mb-8 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} text-t3`} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={isRTL ? 'بحث...' : 'Search products...'}
                className={`w-full border rounded-full py-2.5 text-sm focus:outline-none focus:border-red-500 transition-colors ${inpCls} ${isRTL ? 'pr-9 pl-4' : 'pl-9 pr-4'}`}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            {/* Category pills */}
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    filter === cat
                      ? 'bg-red-700 text-white'
                      : 'border border-t2 text-t2 hover:border-red-700/50 hover:text-t1'
                  }`}>
                  {cat === 'ALL' ? t.productsAll : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }}
                onClick={() => setDetailProduct(product)}
                className={`relative bg-card border rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col cursor-pointer
                  ${product.featured ? 'border-yellow-500/40 hover:border-yellow-500/70 shadow-lg shadow-yellow-500/5' : 'border-t1 hover:border-red-700/50'}`}
              >
                {/* Featured badge */}
                {product.featured && (
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} z-10 flex items-center gap-1 bg-yellow-500 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-md`}>
                    <Star size={10} fill="currentColor" />
                    {t.productsFeatured}
                  </div>
                )}

                {/* Image */}
                <div className="h-52 bg-card2 overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy"
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-t4 text-sm">No Image</div>
                  )}
                </div>

                {/* Info */}
                <div className={`p-5 flex flex-col flex-1 ${isRTL ? 'text-right' : ''}`}>
                  <span className="text-red-500 text-xs uppercase tracking-widest">{product.category}</span>
                  <h3 className="text-t1 font-semibold text-lg mt-1 mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-t3 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                  <div className="mt-auto">
                    {product.price
                      ? <span className="text-red-500 font-bold text-lg">{product.price}</span>
                      : <span className="text-t4 text-sm">{t.productsContactPrice}</span>
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-t4 py-16">{t.productsEmpty}</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={`flex items-center justify-center gap-2 mt-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 rounded-full border border-t2 text-t2 text-sm disabled:opacity-30 hover:border-red-600 hover:text-red-500 transition-colors">
                {isRTL ? '›' : '‹'}
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                    page === n ? 'bg-red-700 text-white' : 'border border-t2 text-t2 hover:border-red-600 hover:text-red-500'
                  }`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 rounded-full border border-t2 text-t2 text-sm disabled:opacity-30 hover:border-red-600 hover:text-red-500 transition-colors">
                {isRTL ? '‹' : '›'}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Detail Modal */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
        />
      )}
    </>
  );
}
