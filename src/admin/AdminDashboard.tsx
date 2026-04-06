import { useState, useRef } from 'react';
import Logo from '../components/Logo';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, Settings, LogOut,
  Menu, X, ExternalLink, Sun, Moon, Globe, TrendingUp,
  Star, Layers, ChevronRight, Activity, BarChart3, Handshake,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from 'recharts';
import { adminLogout, getProducts, getSettings } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAdminT } from './adminTranslations';
import ProductsManager from './ProductsManager';
import SettingsManager from './SettingsManager';
import PartnersManager from './PartnersManager';

type Tab = 'overview' | 'products' | 'settings' | 'partners';

/* ─── 3D Tilt Card ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const shine = useTransform(x, [-0.5, 0.5], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)']);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`relative ${className}`}
      whileHover={{ z: 10 }}>
      <motion.div style={{ background: shine }}
        className="absolute inset-0 rounded-2xl pointer-events-none z-10" />
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function Counter({ value }: { value: number | string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}>
      {value}
    </motion.span>
  );
}

/* ─── Weekly mock data (seeded from day of week) ─── */
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = new Date().getDay();
const weekData = Array.from({ length: 7 }, (_, i) => ({
  day: days[(today - 6 + i + 7) % 7],
  orders: Math.floor(3 + Math.sin(i * 0.9 + 1) * 4 + Math.random() * 5),
  inquiries: Math.floor(6 + Math.cos(i * 0.7) * 5 + Math.random() * 8),
}));

const PIE_COLORS = ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca', '#fee2e2'];

export default function AdminDashboard() {
  const { lang, setLang, isRTL } = useLang();
  const { theme, toggleTheme } = useTheme();
  const t = useAdminT();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const products   = getProducts();
  const settings   = getSettings();
  const featured   = products.filter(p => p.featured).length;
  const withPrice  = products.filter(p => p.price).length;
  const categories = Array.from(new Set(products.map(p => p.category)));
  const catData    = categories.map(c => ({
    name: c, value: products.filter(p => p.category === c).length,
  }));
  const radialData = catData.slice(0, 5).map((c, i) => ({ ...c, fill: PIE_COLORS[i] }));

  // Theme tokens
  const dk = !isLight;
  const bg      = dk ? 'bg-[#0a0a0f]'    : 'bg-slate-50';
  const glass   = dk ? 'bg-white/[0.04] border-white/[0.08] backdrop-blur-xl' : 'bg-white border-slate-200/80 shadow-sm';
  const txt1    = dk ? 'text-white'       : 'text-slate-900';
  const txt2    = dk ? 'text-white/60'    : 'text-slate-500';
  const txt3    = dk ? 'text-white/30'    : 'text-slate-400';
  const hover   = dk ? 'hover:bg-white/[0.06]' : 'hover:bg-slate-100';
  const activeNav = dk ? 'bg-red-500/15 text-red-400 border-red-500/30' : 'bg-red-50 text-red-600 border-red-200';
  const inactiveNav = dk ? `${txt2} ${hover}` : `${txt2} ${hover}`;

  const tabs = [
    { id: 'overview'  as Tab, label: t.overview,  icon: LayoutDashboard, badge: null },
    { id: 'products'  as Tab, label: t.products,  icon: Package,         badge: null },
    { id: 'settings'  as Tab, label: t.settings,  icon: Settings,        badge: null },
    { id: 'partners'  as Tab, label: lang === 'ar' ? 'الشركاء' : lang === 'ku' ? 'هاوبەشەکان' : 'Partners', icon: Handshake, badge: null },
  ];

  const statCards = [
    { label: t.totalProducts, value: products.length, icon: Package,     color: 'from-red-500/20 to-red-600/5',   iconColor: 'text-red-400',   border: 'border-red-500/20' },
    { label: t.featured,      value: featured,        icon: Star,        color: 'from-yellow-500/20 to-yellow-600/5', iconColor: 'text-yellow-400', border: 'border-yellow-500/20' },
    { label: t.categories,    value: categories.length, icon: Layers,    color: 'from-blue-500/20 to-blue-600/5',  iconColor: 'text-blue-400',  border: 'border-blue-500/20' },
    { label: t.telegram,      value: settings.telegramBotToken ? t.connected : t.notSet, icon: Activity,
      color: settings.telegramBotToken ? 'from-green-500/20 to-green-600/5' : 'from-orange-500/20 to-orange-600/5',
      iconColor: settings.telegramBotToken ? 'text-green-400' : 'text-orange-400',
      border: settings.telegramBotToken ? 'border-green-500/20' : 'border-orange-500/20' },
  ];

  const chartTooltipStyle = {
    backgroundColor: dk ? '#1a1a2e' : '#fff',
    border: `1px solid ${dk ? 'rgba(255,255,255,0.1)' : '#e2e8f0'}`,
    borderRadius: '12px',
    color: dk ? '#fff' : '#0f172a',
    fontSize: 12,
  };

  const langs: { code: 'en'|'ar'|'ku'; label: string }[] = [
    { code: 'en', label: 'EN' }, { code: 'ar', label: 'ع' }, { code: 'ku', label: 'ک' },
  ];

  return (
    <div className={`min-h-screen ${bg} flex overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Background orbs ── */}
      {dk && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/[0.04] blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.04] blur-3xl" />
        </div>
      )}

      {/* ── Sidebar ── */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024 ? 0 : (isRTL ? '100%' : '-100%') }}
        className={`fixed inset-y-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-40 w-64 flex flex-col
          ${glass} transition-colors duration-300
          lg:relative lg:translate-x-0`}
        style={{ transform: undefined }}>

        {/* Logo */}
        <div className="p-5 border-b border-white/[0.06]">
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="shrink-0">
              <Logo size={38} />
            </motion.div>
            <div className={isRTL ? 'text-right' : ''}>
              <p className={`${txt1} text-sm font-bold`}>{t.adminPanel}</p>
              <p className={`${txt3} text-xs`}>{t.controlPanel}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {tabs.map((tab, i) => (
            <motion.button key={tab.id}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border
                ${isRTL ? 'flex-row-reverse text-right' : ''}
                ${activeTab === tab.id ? activeNav : `border-transparent ${inactiveNav}`}`}>
              <tab.icon size={16} />
              {tab.label}
              {tab.badge != null && (
                <span className={`${isRTL ? 'mr-auto' : 'ml-auto'} min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1`}>
                  {tab.badge}
                </span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/[0.06] space-y-1">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3 py-2.5 ${txt2} ${hover} rounded-xl text-sm transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
            <ExternalLink size={15} />{t.viewSite}
          </a>
          <button onClick={() => { adminLogout(); window.location.reload(); }}
            className={`w-full flex items-center gap-2 px-3 py-2.5 ${txt2} hover:text-red-400 hover:bg-red-500/10 rounded-xl text-sm transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LogOut size={15} />{t.logout}
          </button>
        </div>
      </motion.div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">

        {/* Header */}
        <header className={`${glass} border-b px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20`}>
          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button className={`lg:hidden ${txt2} hover:${txt1} p-1`} onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className={`${txt1} font-bold text-sm sm:text-base`}>{tabs.find(t => t.id === activeTab)?.label}</h1>
              <p className={`${txt3} text-xs hidden sm:block`}>Advanced Technologies — {t.controlPanel}</p>
            </div>
          </div>

          <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-0.5 ${dk ? 'bg-white/[0.06]' : 'bg-slate-100'} rounded-xl p-1`}>
              <Globe size={12} className={`${txt3} mx-1`} />
              {langs.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                    lang === l.code ? 'bg-red-600 text-white shadow-sm' : `${txt2} ${hover}`}`}>
                  {l.label}
                </button>
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
              className={`p-2 rounded-xl ${dk ? 'bg-white/[0.06] hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200'} ${txt2} transition-colors`}>
              {isLight ? <Moon size={15} /> : <Sun size={15} />}
            </motion.button>

          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {statCards.map((s, i) => (
                    <TiltCard key={s.label}>
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.07, type: 'spring', stiffness: 200 }}
                        className={`${glass} border ${s.border} rounded-2xl p-5 bg-gradient-to-br ${s.color} overflow-hidden relative`}>
                        {/* Glow */}
                        <div className="absolute inset-0 rounded-2xl opacity-20"
                          style={{ background: `radial-gradient(circle at 30% 30%, var(--tw-gradient-from), transparent 70%)` }} />
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} border ${s.border} flex items-center justify-center mb-4`}>
                          <s.icon size={16} className={s.iconColor} />
                        </div>
                        <p className={`${txt3} text-xs uppercase tracking-widest mb-1 ${isRTL ? 'text-right' : ''}`}>{s.label}</p>
                        <p className={`${txt1} text-2xl font-bold ${isRTL ? 'text-right' : ''}`}>
                          <Counter value={s.value} />
                        </p>
                      </motion.div>
                    </TiltCard>
                  ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                  {/* Area Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 180 }}
                    className={`xl:col-span-2 ${glass} border rounded-2xl p-5`}>
                    <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={isRTL ? 'text-right' : ''}>
                        <h3 className={`${txt1} font-semibold text-sm`}>
                          {lang === 'ar' ? 'نشاط الأسبوع' : lang === 'ku' ? 'چالاکی هەفتەیەک' : 'Weekly Activity'}
                        </h3>
                        <p className={`${txt3} text-xs mt-0.5`}>
                          {lang === 'ar' ? 'الطلبات والاستفسارات' : lang === 'ku' ? 'داواکاری و پرسیارەکان' : 'Orders & Inquiries'}
                        </p>
                      </div>
                      <div className={`flex items-center gap-3 text-xs ${txt3} ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="flex items-center gap-1"><span className="w-3 h-1 bg-red-500 rounded-full inline-block" />{lang === 'ar' ? 'طلبات' : 'Orders'}</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-1 bg-blue-400 rounded-full inline-block" />{lang === 'ar' ? 'استفسارات' : 'Inquiries'}</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                      <AreaChart data={weekData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gInquiries" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" tick={{ fill: dk ? 'rgba(255,255,255,0.3)' : '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: dk ? 'rgba(255,255,255,0.3)' : '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={chartTooltipStyle} cursor={{ stroke: dk ? 'rgba(255,255,255,0.1)' : '#e2e8f0', strokeWidth: 1 }} />
                        <Area type="monotone" dataKey="inquiries" stroke="#60a5fa" strokeWidth={2} fill="url(#gInquiries)" dot={false} />
                        <Area type="monotone" dataKey="orders"    stroke="#dc2626" strokeWidth={2} fill="url(#gOrders)"    dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>

                  {/* Donut Chart */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
                    className={`${glass} border rounded-2xl p-5`}>
                    <h3 className={`${txt1} font-semibold text-sm mb-1 ${isRTL ? 'text-right' : ''}`}>
                      {lang === 'ar' ? 'التصنيفات' : lang === 'ku' ? 'پۆلەکان' : 'Categories'}
                    </h3>
                    <p className={`${txt3} text-xs mb-4 ${isRTL ? 'text-right' : ''}`}>
                      {products.length} {lang === 'ar' ? 'منتج' : lang === 'ku' ? 'بەرهەم' : 'products'}
                    </p>
                    {catData.length > 0 ? (
                      <>
                        <ResponsiveContainer width="100%" height={130}>
                          <PieChart>
                            <Pie data={catData} cx="50%" cy="50%" innerRadius={38} outerRadius={58}
                              paddingAngle={3} dataKey="value" strokeWidth={0}>
                              {catData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={chartTooltipStyle} />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-1.5 mt-2">
                          {catData.slice(0, 4).map((c, i) => (
                            <div key={c.name} className={`flex items-center gap-2 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                              <span className={`${txt2} truncate flex-1`}>{c.name}</span>
                              <span className={`${txt3} font-medium shrink-0`}>{c.value}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className={`flex items-center justify-center h-32 ${txt3} text-sm`}>
                        {lang === 'ar' ? 'لا توجد بيانات' : 'No data'}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Recent Products */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, type: 'spring', stiffness: 180 }}
                    className={`${glass} border rounded-2xl p-5`}>
                    <div className={`flex items-center justify-between mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className={`${txt1} font-semibold text-sm`}>{t.recentProducts}</h3>
                      <button onClick={() => setActiveTab('products')}
                        className={`flex items-center gap-1 text-red-500 hover:text-red-400 text-xs transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {t.manage} <ChevronRight size={12} className={isRTL ? 'rotate-180' : ''} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {products.slice(0, 5).map((p, i) => (
                        <motion.div key={p.id}
                          initial={{ opacity: 0, x: isRTL ? 10 : -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.04 }}
                          className={`flex items-center gap-3 p-2.5 rounded-xl ${dk ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-50'} transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {p.image
                            ? <img src={p.image} alt={p.name} className={`w-9 h-9 object-contain rounded-lg ${dk ? 'bg-white/[0.06]' : 'bg-slate-100'} shrink-0`} />
                            : <div className={`w-9 h-9 ${dk ? 'bg-white/[0.06]' : 'bg-slate-100'} rounded-lg shrink-0 flex items-center justify-center`}>
                                <Package size={14} className={txt3} /></div>}
                          <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                            <p className={`${txt1} text-sm font-medium truncate`}>{p.name}</p>
                            <p className={`${txt3} text-xs`}>{p.category}</p>
                          </div>
                          <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {p.featured && <Star size={11} className="text-yellow-400 fill-yellow-400" />}
                            {p.price && <span className="text-red-400 text-xs font-medium">{p.price}</span>}
                          </div>
                        </motion.div>
                      ))}
                      {products.length === 0 && <p className={`${txt3} text-sm text-center py-6`}>{t.noProducts}</p>}
                    </div>
                  </motion.div>

                  {/* Right col: Radial + Quick Actions */}
                  <div className="space-y-4">
                    {/* Products breakdown radial */}
                    {radialData.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 180 }}
                        className={`${glass} border rounded-2xl p-5`}>
                        <h3 className={`${txt1} font-semibold text-sm mb-3 ${isRTL ? 'text-right' : ''}`}>
                          {lang === 'ar' ? 'توزيع المنتجات' : lang === 'ku' ? 'دابەشبوونی بەرهەمەکان' : 'Product Distribution'}
                        </h3>
                        <ResponsiveContainer width="100%" height={120}>
                          <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="100%"
                            data={radialData} startAngle={90} endAngle={-270}>
                            <RadialBar dataKey="value" cornerRadius={4} background={{ fill: dk ? 'rgba(255,255,255,0.03)' : '#f1f5f9' }} />
                            <Tooltip contentStyle={chartTooltipStyle} />
                          </RadialBarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, type: 'spring', stiffness: 180 }}
                      className={`${glass} border rounded-2xl p-5`}>
                      <h3 className={`${txt1} font-semibold text-sm mb-3 ${isRTL ? 'text-right' : ''}`}>{t.quickActions}</h3>
                      <div className="space-y-2">
                        {[
                          { label: t.addNewProduct, tab: 'products' as Tab, icon: Package,    color: dk ? 'hover:bg-red-500/10 text-red-400 border-red-500/20'    : 'hover:bg-red-50 text-red-600 border-red-100' },
                          { label: t.updateContact, tab: 'settings' as Tab, icon: TrendingUp, color: dk ? 'hover:bg-blue-500/10 text-blue-400 border-blue-500/20'   : 'hover:bg-blue-50 text-blue-600 border-blue-100' },
                          { label: t.setupTelegram, tab: 'settings' as Tab, icon: BarChart3,  color: dk ? 'hover:bg-green-500/10 text-green-400 border-green-500/20' : 'hover:bg-green-50 text-green-600 border-green-100' },
                        ].map((a, i) => (
                          <motion.button key={a.label} onClick={() => setActiveTab(a.tab)}
                            whileHover={{ x: isRTL ? -4 : 4 }} whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, x: isRTL ? 10 : -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${isRTL ? 'flex-row-reverse text-right' : ''} ${a.color} ${dk ? 'border-opacity-100' : ''}`}>
                            <a.icon size={14} />
                            {a.label}
                            <ChevronRight size={13} className={`${isRTL ? 'mr-auto rotate-180' : 'ml-auto'} opacity-50`} />
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Stats footer */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                  className={`mt-4 ${glass} border rounded-2xl p-4`}>
                  <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 divide-x ${dk ? 'divide-white/[0.06]' : 'divide-slate-200'} ${isRTL ? 'divide-x-reverse' : ''}`}>
                    {[
                      { label: lang === 'ar' ? 'إجمالي المنتجات' : lang === 'ku' ? 'کۆی بەرهەمەکان' : 'Total Products',   value: products.length },
                      { label: lang === 'ar' ? 'مميزة'            : lang === 'ku' ? 'تایبەت'          : 'Featured',          value: featured },
                      { label: lang === 'ar' ? 'بسعر'             : lang === 'ku' ? 'بە نرخ'           : 'With Price',        value: withPrice },
                      { label: lang === 'ar' ? 'تصنيفات'          : lang === 'ku' ? 'پۆلەکان'          : 'Categories',        value: categories.length },
                    ].map(s => (
                      <div key={s.label} className={`${isRTL ? 'text-right pr-4 first:pr-0' : 'pl-4 first:pl-0'} text-center`}>
                        <p className={`${txt1} text-xl font-bold`}>{s.value}</p>
                        <p className={`${txt3} text-xs mt-0.5`}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab !== 'overview' && (
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}>
                {activeTab === 'products' && <ProductsManager />}
                {activeTab === 'partners' && <PartnersManager />}
                {activeTab === 'settings' && <SettingsManager />}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
