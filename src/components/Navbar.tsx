import { useState } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { type Lang } from '../translations';

const langLabels: Record<Lang, string> = { en: 'EN', ar: 'ع', ku: 'ک' };
const langFull: Record<Lang, string>   = { en: 'English', ar: 'العربية', ku: 'کوردی' };

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLang();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const navLinks = [
    { label: t.navHome,     id: 'home' },
    { label: t.navAbout,    id: 'about-us' },
    { label: t.navProducts, id: 'products' },
    { label: t.navPartners, id: 'partners' },
    { label: t.navContact,  id: 'contact' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <nav className="relative z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size={38} />
            <div>
              <span className="text-t1 font-bold text-base leading-tight block">{t.companyName}</span>
              <span className="text-t3 text-xs">{t.companySubtitle}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 border border-t2 rounded-full px-3 py-1.5 nav-bg`}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-t2 hover:text-t1 text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border border-t2 transition-all duration-200 text-t2 hover:text-t1 ${isLight ? 'bg-white/80 hover:bg-gray-100' : 'bg-white/5 hover:bg-white/10'}`}
              title={isLight ? 'Switch to Dark' : 'Switch to Light'}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-full border border-t2 text-sm font-medium text-t2 hover:text-t1 transition-all duration-200 ${isLight ? 'bg-white/80 hover:bg-gray-100' : 'bg-white/5 hover:bg-white/10'}`}
              >
                {langLabels[lang]}
                <ChevronDown size={12} className={`transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-36 rounded-xl border border-t2 overflow-hidden shadow-xl z-50 ${isLight ? 'bg-white' : 'bg-gray-900'}`}
                  >
                    {(['en', 'ar', 'ku'] as Lang[]).map(l => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                          lang === l
                            ? 'text-red-500 bg-red-700/10'
                            : `text-t2 hover:text-t1 ${isLight ? 'hover:bg-gray-50' : 'hover:bg-gray-800'}`
                        }`}
                      >
                        <span>{langFull[l]}</span>
                        {lang === l && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-t1 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden mt-3 border border-t2 rounded-2xl overflow-hidden ${isLight ? 'bg-white/95' : 'bg-black/85'} backdrop-blur-md`}
            >
              <div className="flex flex-col py-2">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`text-t2 hover:text-t1 text-sm px-5 py-3 ${isRTL ? 'text-right' : 'text-left'} ${isLight ? 'hover:bg-gray-50' : 'hover:bg-white/8'} transition-colors`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
