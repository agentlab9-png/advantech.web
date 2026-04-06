import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { getSettings } from '../store';
import { useLang } from '../contexts/LanguageContext';

export default function ContactSection() {
  const [s, setS] = useState(getSettings());
  const { t, isRTL } = useLang();

  useEffect(() => {
    const h = () => setS(getSettings());
    window.addEventListener('settingsUpdated', h);
    return () => window.removeEventListener('settingsUpdated', h);
  }, []);

  const cards = [
    { icon: Phone,  label: t.mobile1,      value: s.phone1, href: `tel:${s.phone1.replace(/\s/g, '')}` },
    { icon: Phone,  label: t.mobile2,      value: s.phone2, href: `tel:${s.phone2.replace(/\s/g, '')}` },
    { icon: Mail,   label: t.emailLabel,   value: s.email,  href: `mailto:${s.email}` },
    { icon: MapPin, label: t.addressLabel, value: t.address, href: undefined },
  ];

  return (
    <section id="contact" className="bg-page py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-14">
          <p className="text-red-500 text-sm uppercase tracking-widest mb-3">{t.contactTag}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-t1">{t.contactTitle}</h2>
          <p className="text-t3 mt-4 max-w-md mx-auto">{t.contactDesc}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className="w-12 h-12 accent-bg rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-700/25 transition-colors">
                  <c.icon size={22} className="text-red-500" />
                </div>
                <p className="text-t4 text-xs uppercase tracking-widest mb-1">{c.label}</p>
                <p className="text-t1 font-semibold text-sm leading-relaxed">{c.value}</p>
              </>
            );
            return (
              <motion.div key={c.label + i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }} viewport={{ once: true }}>
                {c.href
                  ? <a href={c.href} className={`bg-card border border-t1 rounded-2xl p-6 hover:border-red-700/50 transition-colors group block ${isRTL ? 'text-right' : ''}`}>{inner}</a>
                  : <div className={`bg-card border border-t1 rounded-2xl p-6 group ${isRTL ? 'text-right' : ''}`}>{inner}</div>
                }
              </motion.div>
            );
          })}
        </div>


<div className={`mt-16 pt-8 border-t border-t1 text-center text-t4 text-sm`}>
          <p>{t.copyright}</p>
          <p className="mt-1">{t.address}</p>
        </div>
      </div>
    </section>
  );
}
