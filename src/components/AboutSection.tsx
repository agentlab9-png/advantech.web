import { motion } from 'framer-motion';
import { Shield, Network, Phone, Building2 } from 'lucide-react';
import { useLang } from '../contexts/LanguageContext';

export default function AboutSection() {
  const { t, isRTL } = useLang();

  const services = [
    { icon: Phone,     title: t.svc1Title, desc: t.svc1Desc },
    { icon: Network,   title: t.svc2Title, desc: t.svc2Desc },
    { icon: Building2, title: t.svc3Title, desc: t.svc3Desc },
    { icon: Shield,    title: t.svc4Title, desc: t.svc4Desc },
  ];

  return (
    <section id="about-us" className="bg-section py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className={`grid lg:grid-cols-2 gap-16 items-center ${isRTL ? 'lg:grid-cols-[1fr,1fr]' : ''}`}>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={isRTL ? 'text-right' : ''}
          >
            <p className="text-red-500 text-sm uppercase tracking-widest mb-4">{t.aboutTag}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-t1 leading-tight mb-6">
              {t.aboutHeading}{' '}
              <span className="text-red-600">{t.aboutHeadingHighlight}</span>
            </h2>
            <p className="text-t2 text-base leading-relaxed mb-5">{t.aboutDesc1}</p>
            <p className="text-t2 text-base leading-relaxed mb-8">{t.aboutDesc2}</p>
            <div className="inline-block accent-bg border border-red-700/40 rounded-full px-6 py-3">
              <p className="text-red-500 font-semibold italic">{t.aboutSlogan}</p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`bg-card border border-t1 rounded-2xl p-5 hover:border-red-700/50 transition-colors group ${isRTL ? 'text-right' : ''}`}
              >
                <div className={`w-10 h-10 accent-bg rounded-xl flex items-center justify-center mb-3 group-hover:bg-red-700/25 transition-colors ${isRTL ? 'mr-auto' : ''}`}>
                  <s.icon size={20} className="text-red-500" />
                </div>
                <h3 className="text-t1 font-semibold text-sm mb-2">{s.title}</h3>
                <p className="text-t3 text-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
