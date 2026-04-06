import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../contexts/LanguageContext';
import { getPartners, type Partner } from '../store';

const GRANDSTREAM_FILTER = 'brightness(2) saturate(1.4)';

export default function PartnersSection() {
  const { t } = useLang();
  const [partners, setPartners] = useState<Partner[]>(getPartners);

  useEffect(() => {
    const h = () => setPartners(getPartners());
    window.addEventListener('partnersUpdated', h);
    return () => window.removeEventListener('partnersUpdated', h);
  }, []);

  return (
    <section id="partners" className="bg-section py-20 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-red-500 text-sm uppercase tracking-widest mb-3">{t.partnersTag}</p>
          <h2 className="text-4xl font-bold text-t1">{t.partnersTitle}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partners.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-t1 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-t2 transition-colors"
            >
              <div className="bg-white rounded-2xl flex items-center justify-center"
                   style={{ width: 240, height: 110 }}>
                <img
                  src={p.logo}
                  alt={p.name}
                  draggable={false}
                  style={{
                    width: 180,
                    height: 'auto',
                    maxHeight: 90,
                    objectFit: 'contain',
                    filter: p.logo.includes('grandstream') ? GRANDSTREAM_FILTER : undefined,
                  }}
                />
              </div>
              <p className="text-t3 text-sm text-center">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
