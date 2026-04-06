import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import ShinyText from './ShinyText';
import { getSettings } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export default function HeroSection() {
  const { t, isRTL } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    const h = () => setSettings(getSettings());
    window.addEventListener('settingsUpdated', h);
    return () => window.removeEventListener('settingsUpdated', h);
  }, []);

  const videoUrl = settings.heroVideoUrl ||
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

  return (
    <section id="home" className="relative w-full overflow-hidden bg-black" style={{ height: '100dvh' }}>
      {/* Video */}
      <video className="absolute inset-0 w-full h-full object-cover"
        src={videoUrl} autoPlay loop muted playsInline />

      {/* Overlay */}
      <div className={`absolute inset-0 transition-all duration-500 ${isLight ? 'bg-white/25' : 'bg-black/55'}`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <Navbar />

        {/* Top row */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-1">
          <div className={`flex flex-col lg:flex-row lg:justify-between gap-2 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className={`text-sm max-w-md ${isLight ? 'text-gray-800/90' : 'text-white/80'}`}>
              {t.heroDesc}
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className={`text-sm font-semibold ${isRTL ? 'lg:text-left' : 'lg:text-right'} ${isLight ? 'text-gray-900' : 'text-white/90'}`}>
              {t.heroStat}
            </motion.p>
          </div>
        </div>

        {/* Center heading */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 -mt-12">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className={`uppercase tracking-widest text-xs sm:text-sm mb-6 ${isLight ? 'text-gray-700/90' : 'text-white/75'}`}>
            {t.heroTagline}
          </motion.p>

          <div className="leading-none tracking-tighter font-medium" style={{ lineHeight: 0.88 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl block mb-2 font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {t.heroLine1}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl block">
              <ShinyText text={t.heroLine2} />
            </motion.div>
          </div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            className={`mt-10 flex flex-col sm:flex-row items-center gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className={`group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 border ${
                isLight ? 'bg-gray-900 hover:bg-gray-700 text-white border-gray-900' : 'bg-black hover:bg-gray-900 text-white border-white/20'
              }`}>
              {isRTL
                ? <><ArrowRight size={15} className="rotate-180 group-hover:-translate-x-1 transition-transform" />{t.heroCTA1}</>
                : <>{t.heroCTA1}<ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
