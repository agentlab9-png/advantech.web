import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone } from 'lucide-react';
import Logo from './Logo';
import { getSettings, sendTelegramMessage, addConversation } from '../store';
import { useLang } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

type Stage = 'welcome' | 'chat' | 'askName' | 'askPhone' | 'done';

const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Simple keyword auto-replies (Arabic/English/Kurdish)
function autoReply(text: string, lang: string): string | null {
  const t = text.toLowerCase();
  if (/سعر|price|نرخ|بچند|بكم/.test(t))
    return lang === 'ar'
      ? 'يختلف السعر حسب المنتج والكمية. سيتواصل معك فريقنا بعرض سعر مفصل قريباً.'
      : lang === 'ku'
      ? 'نرخەکە پشت بە بەرهەم و ئەندازەکەوە دەگۆڕێت. تیمەکەمان بەم زوانەیەک نرخی ورد پێت دەدەنەوە.'
      : 'Pricing varies by product and quantity. Our team will send you a detailed quote soon.';

  if (/فورتي|fortinet|fortigate/.test(t))
    return lang === 'ar'
      ? 'منتجات Fortinet متوفرة لدينا! FortiGate جدران حماية للشركات الصغيرة والمتوسطة والمؤسسات الكبيرة.'
      : 'We carry full Fortinet lineup — FortiGate firewalls for SMB and enterprise. Ask for a model!';

  if (/grandstream|جراندستريم/.test(t))
    return lang === 'ar'
      ? 'نوفر حلول Grandstream الكاملة لهواتف IP والاتصالات الموحدة.'
      : 'Full Grandstream IP telephony solutions available. Let us know your requirements!';

  if (/cisco|سيسكو/.test(t))
    return lang === 'ar'
      ? 'منتجات Cisco للشبكات متوفرة. سويتشات، راوترات، وحلول لاسلكية.'
      : 'Cisco networking products available — switches, routers, and wireless solutions.';

  if (/وقت|ساعات|working|hours|opens|يفتح/.test(t))
    return lang === 'ar'
      ? 'أوقات العمل: السبت–الخميس، 9 صباحاً – 6 مساءً.'
      : 'Working hours: Sat–Thu, 9 AM – 6 PM (Baghdad time).';

  if (/عنوان|address|location|موقع|ناونيشان/.test(t))
    return lang === 'ar'
      ? 'نحن في شارع الصناعة، مقابل الجامعة التكنولوجية، بغداد.'
      : "We're at Sina'a Street, opposite University of Technology, Baghdad.";

  return null;
}

export default function ChatWidget() {
  const { t, lang, isRTL } = useLang();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [open, setOpen]       = useState(false);
  const [messages, setMsgs]   = useState<Message[]>([]);
  const [input, setInput]     = useState('');
  const [stage, setStage]     = useState<Stage>('welcome');
  const [userName, setName]   = useState('');
  const [_userPhone, setPhone] = useState('');
  const [typing, setTyping]   = useState(false);
  const [msgCount, setCount]  = useState(0);
  const [_unread, setUnread]  = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const idRef     = useRef(0);
  const settings  = getSettings();

  const addMsg = (from: Message['from'], text: string) => {
    idRef.current++;
    setMsgs(prev => [...prev, { id: idRef.current, from, text, time: now() }]);
    if (from === 'bot' && !open) setUnread(u => u + 1);
  };

  const botReply = (text: string, delay = 900) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMsg('bot', text);
    }, delay);
  };

  // Listen for external open event (from ActionButton)
  useEffect(() => {
    const h = () => setOpen(true);
    window.addEventListener('openChatWidget', h);
    return () => window.removeEventListener('openChatWidget', h);
  }, []);

  // Open chat → show welcome
  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => addMsg('bot', t.chatWelcome), 400);
      setUnread(0);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    addMsg('user', text);
    const n = msgCount + 1;
    setCount(n);

    if (stage === 'askName') {
      setName(text);
      setStage('askPhone');
      botReply(t.chatAskPhone);
      return;
    }

    if (stage === 'askPhone') {
      const phone = text;
      setPhone(phone);
      setStage('done');
      botReply(t.chatThanks);

      // Build full message history including this last message
      const fullMsgs = [
        ...messages.map(m => ({ from: m.from, text: m.text, time: m.time })),
        { from: 'user' as const, text: phone, time: now() },
      ];

      // Save conversation to localStorage (admin inbox)
      addConversation({
        customerName: userName,
        customerPhone: phone,
        messages: fullMsgs,
        read: false,
      });

      // Send to Telegram
      const userMsgs = messages.filter(m => m.from === 'user').map(m => m.text).join('\n• ');
      await sendTelegramMessage(
        `💬 *محادثة جديدة / New Chat*\n\n` +
        `👤 *الاسم / Name:* ${userName}\n` +
        `📞 *الهاتف / Phone:* ${phone}\n\n` +
        `📝 *المحادثة:*\n• ${userMsgs}`
      );
      return;
    }

    // Check auto-reply first
    const auto = autoReply(text, lang);
    if (auto) {
      botReply(auto);
      return;
    }

    // After 2 messages, ask for contact info
    if (n >= 2 && stage === 'chat') {
      setStage('askName');
      botReply(t.chatAskName, 1200);
      return;
    }

    if (stage === 'done') {
      // Still answer if more questions
      const a = autoReply(text, lang);
      if (a) { botReply(a); return; }
      botReply(
        lang === 'ar'
          ? 'شكراً! سيتواصل معك فريقنا قريباً على رقمك.'
          : lang === 'ku'
          ? 'سوپاس! تیمەکەمان بەم زوانەیەک پەیوەندیت پێوە دەکەن.'
          : 'Thank you! Our team will contact you shortly.'
      );
      return;
    }

    // Generic reply
    setStage('chat');
    botReply(
      lang === 'ar'
        ? 'شكراً على تواصلك! هل يمكنني مساعدتك في منتج معين أو لديك استفسار؟'
        : lang === 'ku'
        ? 'سوپاس بۆ پەیوەندیت! دەتوانم یارمەتیت بدەم لە بەرهەمێکی دیاریکراو؟'
        : 'Thanks for reaching out! Can I help you with a specific product or inquiry?'
    );
  };

  const bg    = isLight ? 'bg-white'       : 'bg-gray-900';
  const bg2   = isLight ? 'bg-gray-50'     : 'bg-gray-800';
  const bdr   = isLight ? 'border-gray-200': 'border-gray-700';
  const txt2  = isLight ? 'text-gray-500'  : 'text-white/60';

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className={`fixed z-[90] ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-4 sm:bottom-6
              w-[calc(100vw-2rem)] sm:w-[380px]
              ${bg} rounded-3xl shadow-2xl border ${bdr}
              flex flex-col overflow-hidden`}
            style={{ maxHeight: 'min(600px, calc(100dvh - 2rem))' }}
          >
            {/* Header */}
            <div className="bg-red-700 px-4 py-3.5 flex items-center justify-between shrink-0">
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0 overflow-hidden p-1">
                  <Logo size={20} />
                </div>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-white font-bold text-sm leading-tight">{t.chatTitle}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <p className="text-white/80 text-xs">{t.chatSubtitle}</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${bg2}`}
              style={{ scrollbarWidth: 'thin' }}>

              {messages.map(msg => (
                <motion.div key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === 'user' ? (isRTL ? 'justify-start' : 'justify-end') : (isRTL ? 'justify-end' : 'justify-start')}`}
                >
                  <div className={`max-w-[78%] ${msg.from === 'bot' ? (isRTL ? 'items-end' : 'items-start') : (isRTL ? 'items-start' : 'items-end')} flex flex-col gap-1`}>
                    <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-red-700 text-white rounded-br-sm'
                        : `${isLight ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-700 text-white'} rounded-bl-sm`
                    }`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      {msg.text}
                    </div>
                    <span className={`text-xs ${txt2} px-1`}>{msg.time}</span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl ${isLight ? 'bg-white border border-gray-200' : 'bg-gray-700'} flex gap-1.5 items-center`}>
                    {[0,1,2].map(i => (
                      <span key={i} className="w-2 h-2 rounded-full bg-red-500"
                        style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Done — show contact info */}
              {stage === 'done' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl p-3 border ${bdr} ${bg} max-w-[78%] space-y-2`}>
                    <a href={`tel:${settings.phone1.replace(/\s/g,'')}`}
                      className={`flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone size={14} />{settings.phone1}
                    </a>
                    <a href={`tel:${settings.phone2.replace(/\s/g,'')}`}
                      className={`flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Phone size={14} />{settings.phone2}
                    </a>
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className={`px-3 py-3 border-t ${bdr} ${bg} shrink-0`}>
              <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder={t.chatPlaceholder}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className={`flex-1 rounded-full px-4 py-2.5 text-sm border ${bdr} focus:outline-none focus:border-red-500 transition-colors ${
                    isLight ? 'bg-gray-50 text-gray-900 placeholder-gray-400' : 'bg-gray-800 text-white placeholder-white/30'
                  }`}
                />
                <button onClick={sendMessage} disabled={!input.trim()}
                  className="w-10 h-10 bg-red-700 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shrink-0">
                  <Send size={16} className={isRTL ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
