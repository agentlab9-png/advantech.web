import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

export default function NotFoundPage() {
  const { theme } = useTheme();
  const { isRTL } = useLang();
  const isLight = theme === 'light';
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-center px-4 ${isLight ? 'bg-gray-50' : 'bg-black'}`}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-red-600 text-8xl font-black mb-4">404</p>
        <h1 className={`text-3xl font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>
        <p className={`mb-8 ${isLight ? 'text-gray-500' : 'text-white/50'}`}>
          {isRTL ? 'الصفحة التي تبحث عنها غير موجودة.' : "The page you're looking for doesn't exist."}
        </p>
        <a href="/"
          className={`inline-flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white rounded-full px-8 py-3 font-semibold transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
          {isRTL ? <><ArrowRight size={16} className="rotate-180"/>العودة للرئيسية</> : <>Back to Home<ArrowRight size={16}/></>}
        </a>
      </motion.div>
    </div>
  );
}
