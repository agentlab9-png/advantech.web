import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { type Product } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: Props) {
  const { t, isRTL } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          onClick={e => e.stopPropagation()}
          className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl
            ${isLight ? 'bg-white' : 'bg-gray-900 border border-gray-800'}`}
          style={{ maxHeight: 'min(90dvh, 700px)' }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10 p-2 rounded-full transition-colors
              ${isLight ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' : 'bg-gray-800 hover:bg-gray-700 text-white/70'}`}
          >
            <X size={18} />
          </button>

          <div className="overflow-y-auto" style={{ maxHeight: 'min(90dvh, 700px)' }}>
            {/* Image */}
            <div className={`w-full h-64 sm:h-72 flex items-center justify-center p-6
              ${isLight ? 'bg-gray-50' : 'bg-gray-800'}`}>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/30'}`}>No Image</div>
              )}
            </div>

            {/* Content */}
            <div className={`p-6 sm:p-8 ${isRTL ? 'text-right' : ''}`}>
              {/* Featured badge */}
              {product.featured && (
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3
                  bg-yellow-500/15 text-yellow-500 border border-yellow-500/25`}>
                  <Star size={11} fill="currentColor" />
                  {t.productsFeatured}
                </div>
              )}

              {/* Category */}
              <p className="text-red-500 text-xs uppercase tracking-widest mb-2">{product.category}</p>

              {/* Name */}
              <h2 className={`text-2xl sm:text-3xl font-bold mb-4 leading-tight
                ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {product.name}
              </h2>

              {/* Description */}
              <p className={`text-sm sm:text-base leading-relaxed mb-6
                ${isLight ? 'text-gray-600' : 'text-white/70'}`}>
                {product.description || '—'}
              </p>

              {/* Price */}
              <div>
                {product.price ? (
                  <span className="text-red-500 font-bold text-2xl">{product.price}</span>
                ) : (
                  <span className={`text-sm ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
                    {t.productsContactPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
