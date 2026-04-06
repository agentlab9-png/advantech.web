import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, Phone, MessageCircle, Minus, Plus } from 'lucide-react';
import { getSettings, sendTelegramMessage, canOrder, markOrdered, type Product } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function OrderModal({ product, onClose }: Props) {
  const { t, isRTL } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [addr, setAddr]       = useState('');
  const [qty, setQty]         = useState(1);
  const [notes, setNotes]     = useState('');
  const [status, setStatus]   = useState<Status>('idle');
  const [touched, setTouched] = useState(false);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!product) return null;

  const valid = name.trim() && phone.trim() && addr.trim();
  const settings = getSettings();

  const handleSubmit = async () => {
    setTouched(true);
    if (!valid) return;

    if (!canOrder(product.id)) {
      // Already ordered recently — just show success
      setStatus('success');
      return;
    }

    setStatus('sending');

    const msg =
      `🛒 *طلب جديد / New Order*\n\n` +
      `📦 *المنتج / Product:* ${product.name}\n` +
      `🏷️ *الفئة / Category:* ${product.category}\n` +
      `💰 *السعر / Price:* ${product.price || 'سيتم التحديد / TBD'}\n` +
      `🔢 *الكمية / Qty:* ${qty}\n\n` +
      `👤 *الاسم / Name:* ${name}\n` +
      `📞 *الهاتف / Phone:* ${phone}\n` +
      `📍 *العنوان / Address:* ${addr}\n` +
      (notes ? `📝 *ملاحظات / Notes:* ${notes}\n` : '');

    const ok = await sendTelegramMessage(msg);
    markOrdered(product.id);

    if (ok) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  const bg    = isLight ? 'bg-white'      : 'bg-gray-900';
  const bg2   = isLight ? 'bg-gray-50'    : 'bg-gray-800';
  const bdr   = isLight ? 'border-gray-200' : 'border-gray-700';
  const txt1  = isLight ? 'text-gray-900' : 'text-white';
  const txt2  = isLight ? 'text-gray-600' : 'text-white/60';
  const inp   = isLight
    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-red-500'
    : 'bg-gray-800 border-gray-700 text-white placeholder-white/30 focus:border-red-500';

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Sheet */}
        <motion.div
          className={`relative w-full sm:max-w-lg ${bg} sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border ${bdr} max-h-[95vh] flex flex-col`}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        >
          {/* Drag handle (mobile) */}
          <div className={`flex justify-center pt-3 pb-1 sm:hidden ${isLight ? 'bg-white' : 'bg-gray-900'}`}>
            <div className={`w-10 h-1 rounded-full ${isLight ? 'bg-gray-300' : 'bg-gray-700'}`} />
          </div>

          {/* Header */}
          <div className={`flex items-center justify-between px-5 py-4 border-b ${bdr}`}>
            <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {product.image && (
                <img src={product.image} alt={product.name}
                  className={`w-12 h-12 object-contain rounded-xl ${bg2}`} />
              )}
              <div className={isRTL ? 'text-right' : ''}>
                <p className={`font-bold ${txt1}`}>{t.orderTitle}</p>
                <p className={`text-xs ${txt2} truncate max-w-[200px]`}>{product.name}</p>
              </div>
            </div>
            <button onClick={onClose}
              className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-gray-800 text-white/50'}`}>
              <X size={18} />
            </button>
          </div>

          {/* ── SUCCESS STATE ── */}
          {status === 'success' ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}>
                <CheckCircle2 size={64} className="text-green-500" />
              </motion.div>
              <h3 className={`text-2xl font-bold ${txt1}`}>{t.orderSuccessTitle}</h3>
              <p className={`${txt2} max-w-xs`}>{t.orderSuccessMsg}</p>
              <div className={`w-full rounded-2xl p-4 ${bg2} border ${bdr} text-sm ${isRTL ? 'text-right' : ''}`}>
                <p className={txt2}>{t.orderProductLabel}: <span className={`font-semibold ${txt1}`}>{product.name}</span></p>
                <p className={txt2}>{t.orderName}: <span className={`font-semibold ${txt1}`}>{name}</span></p>
                <p className={txt2}>{t.orderPhone}: <span className={`font-semibold ${txt1}`}>{phone}</span></p>
                <p className={txt2}>{t.orderQty}: <span className={`font-semibold ${txt1}`}>{qty}</span></p>
              </div>
              <button onClick={onClose}
                className="w-full bg-red-700 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-colors">
                {t.orderClose}
              </button>
            </div>
          ) : (
            <>
              {/* ── FORM ── */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">

                {/* Error banner */}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 p-3 rounded-xl bg-red-900/20 border border-red-700/40 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 text-sm font-medium">{t.orderErrorMsg}</p>
                      <p className="text-red-400/70 text-xs mt-1">{t.orderFallback}</p>
                      <div className={`flex gap-3 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <a href={`tel:${settings.phone1.replace(/\s/g,'')}`}
                          className="flex items-center gap-1 text-xs text-red-300 hover:text-red-200">
                          <Phone size={12} />{settings.phone1}
                        </a>
                        <a href={`https://wa.me/${settings.phone1.replace(/[^0-9]/g,'')}`}
                          target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300">
                          <MessageCircle size={12} />{t.orderWhatsapp}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Product row (readonly) */}
                <div className={`flex items-center gap-3 p-3 rounded-xl ${bg2} border ${bdr} ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {product.image && <img src={product.image} alt="" className="w-10 h-10 object-contain rounded-lg" />}
                  <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                    <p className={`text-xs ${txt2}`}>{t.orderProductLabel}</p>
                    <p className={`font-semibold text-sm ${txt1} truncate`}>{product.name}</p>
                    {product.price && <p className="text-red-500 text-xs">{product.price}</p>}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${txt1} ${isRTL ? 'text-right' : ''}`}>{t.orderQty}</label>
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}
                      className={`w-10 h-10 rounded-full border ${bdr} flex items-center justify-center transition-colors ${isLight ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}>
                      <Minus size={16} className={txt2} />
                    </button>
                    <span className={`text-2xl font-bold w-12 text-center ${txt1}`}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)}
                      className="w-10 h-10 rounded-full bg-red-700 hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${txt1} ${isRTL ? 'text-right' : ''}`}>
                    {t.orderName} <span className="text-red-500">*</span>
                  </label>
                  <input value={name} onChange={e => setName(e.target.value)}
                    placeholder={t.orderNamePH}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${inp} ${touched && !name.trim() ? 'border-red-500' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {touched && !name.trim() && (
                    <p className="text-red-500 text-xs mt-1">{t.orderRequired.split(' ')[0]}...</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${txt1} ${isRTL ? 'text-right' : ''}`}>
                    {t.orderPhone} <span className="text-red-500">*</span>
                  </label>
                  <input value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder={t.orderPhonePH} type="tel"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${inp} ${touched && !phone.trim() ? 'border-red-500' : ''}`}
                    dir="ltr"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${txt1} ${isRTL ? 'text-right' : ''}`}>
                    {t.orderAddress} <span className="text-red-500">*</span>
                  </label>
                  <textarea value={addr} onChange={e => setAddr(e.target.value)}
                    placeholder={t.orderAddressPH} rows={2}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${inp} ${touched && !addr.trim() ? 'border-red-500' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${txt2} ${isRTL ? 'text-right' : ''}`}>
                    {t.orderNotes}
                  </label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder={t.orderNotesPH} rows={2}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none transition-colors ${inp}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                {touched && !valid && (
                  <p className="text-red-500 text-sm text-center">{t.orderRequired}</p>
                )}
              </div>

              {/* Submit */}
              <div className={`p-4 border-t ${bdr}`}>
                <button onClick={handleSubmit} disabled={status === 'sending'}
                  className="w-full bg-red-700 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl py-3.5 font-bold text-base transition-colors flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.orderSending}</>
                  ) : (
                    <><MessageCircle size={18} />{t.orderSubmit}</>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
