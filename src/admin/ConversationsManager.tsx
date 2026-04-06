import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, MessageCircle, Phone, User, Clock, CheckCheck, Inbox } from 'lucide-react';
import { getConversations, markConversationRead, deleteConversation, type Conversation } from '../store';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';
import { useAdminT } from './adminTranslations';

function timeAgo(ts: number, lang: string): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (lang === 'ar') {
    if (m < 1) return 'الآن';
    if (m < 60) return `${m} د`;
    if (h < 24) return `${h} س`;
    return `${d} ي`;
  }
  if (lang === 'ku') {
    if (m < 1) return 'ئێستا';
    if (m < 60) return `${m} خ`;
    if (h < 24) return `${h} س`;
    return `${d} ر`;
  }
  if (m < 1) return 'now';
  if (m < 60) return `${m}m`;
  if (h < 24) return `${h}h`;
  return `${d}d`;
}

export default function ConversationsManager() {
  useAdminT();
  const { theme } = useTheme();
  const { lang, isRTL } = useLang();
  const isLight = theme === 'light';

  const [convs, setConvs] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const bottomRef = useRef<HTMLDivElement>(null);

  const refresh = () => setConvs(getConversations());

  useEffect(() => {
    refresh();
    const h = () => refresh();
    window.addEventListener('conversationsUpdated', h);
    return () => window.removeEventListener('conversationsUpdated', h);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected, convs]);

  const filtered = convs.filter(c =>
    !search ||
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.customerPhone.includes(search)
  );

  const selectedConv = convs.find(c => c.id === selected) ?? null;

  const handleSelect = (id: string) => {
    setSelected(id);
    setMobileView('chat');
    markConversationRead(id);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (selected === id) setSelected(null);
    deleteConversation(id);
    refresh();
  };

  const unread = convs.filter(c => !c.read).length;

  // Theme tokens
  const dk      = !isLight;
  const bg      = dk ? 'bg-[#0d0d14]'    : 'bg-slate-50';
  const panel   = dk ? 'bg-white/[0.03] border-white/[0.07]' : 'bg-white border-slate-200';
  const hov     = dk ? 'hover:bg-white/[0.05]' : 'hover:bg-slate-50';
  const selBg   = dk ? 'bg-white/[0.08] border-red-500/30' : 'bg-red-50 border-red-200';
  const txt1    = dk ? 'text-white'       : 'text-slate-900';
  const txt2    = dk ? 'text-white/60'    : 'text-slate-500';
  const txt3    = dk ? 'text-white/30'    : 'text-slate-400';
  const divider = dk ? 'border-white/[0.07]' : 'border-slate-100';
  const inpBg   = dk ? 'bg-white/[0.05] border-white/[0.08] text-white placeholder-white/30' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400';
  const botBub  = dk ? 'bg-white/[0.08] text-white'     : 'bg-slate-100 text-slate-800';
  const usrBub  = 'bg-red-600 text-white';
  const chatBg  = dk ? 'bg-[#0a0a10]'    : 'bg-slate-50';

  return (
    <div className={`-m-4 sm:-m-6 h-[calc(100dvh-64px)] flex ${bg}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Conversation List ── */}
      <div className={`${mobileView === 'chat' ? 'hidden' : 'flex'} lg:flex flex-col w-full lg:w-80 xl:w-96 border-${isRTL ? 'l' : 'r'} ${divider} shrink-0`}>

        {/* Header */}
        <div className={`px-4 py-4 border-b ${divider}`}>
          <div className={`flex items-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <MessageCircle size={18} className="text-red-500 shrink-0" />
            <h2 className={`${txt1} font-bold text-base flex-1`}>
              {lang === 'ar' ? 'المحادثات' : lang === 'ku' ? 'گفتوگۆکان' : 'Conversations'}
            </h2>
            {unread > 0 && (
              <span className="bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                {unread}
              </span>
            )}
          </div>
          <div className="relative">
            <Search size={14} className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} ${txt3}`} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'بحث بالاسم أو الهاتف...' : lang === 'ku' ? 'بگەڕێ...' : 'Search by name or phone...'}
              className={`w-full border rounded-xl py-2 text-sm focus:outline-none focus:border-red-500 transition-colors ${isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'} ${inpBg}`} />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`flex flex-col items-center justify-center h-48 gap-3 ${txt3}`}>
                <Inbox size={36} className="opacity-40" />
                <p className="text-sm">{lang === 'ar' ? 'لا توجد محادثات' : lang === 'ku' ? 'هیچ گفتوگۆیەک نییە' : 'No conversations yet'}</p>
              </motion.div>
            ) : (
              filtered.map((c, i) => {
                const lastMsg = c.messages[c.messages.length - 1];
                const isSelected = selected === c.id;
                return (
                  <motion.div key={c.id}
                    initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 10 : -10 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => handleSelect(c.id)}
                    className={`relative flex items-start gap-3 px-4 py-3.5 cursor-pointer border-b transition-all
                      ${isRTL ? 'flex-row-reverse' : ''}
                      ${divider} ${isSelected ? selBg + ' border' : hov}
                    `}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm
                      ${isSelected ? 'bg-red-600 text-white' : dk ? 'bg-white/10 text-white/70' : 'bg-slate-200 text-slate-600'}`}>
                      {c.customerName?.[0]?.toUpperCase() || '?'}
                    </div>

                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`font-semibold text-sm truncate ${txt1}`}>{c.customerName || '—'}</span>
                        <span className={`text-xs shrink-0 ${isRTL ? 'mr-2' : 'ml-2'} ${txt3}`}>{timeAgo(c.createdAt, lang)}</span>
                      </div>
                      <p className={`text-xs ${txt3} truncate mt-0.5`}>{c.customerPhone}</p>
                      {lastMsg && (
                        <p className={`text-xs mt-1 truncate ${txt2}`}>
                          {lastMsg.from === 'bot' ? '🤖 ' : '👤 '}{lastMsg.text}
                        </p>
                      )}
                    </div>

                    {!c.read && !isSelected && (
                      <span className="absolute top-3.5 right-3 w-2 h-2 bg-red-500 rounded-full" />
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Chat View ── */}
      <div className={`${mobileView === 'list' ? 'hidden' : 'flex'} lg:flex flex-1 flex-col min-w-0`}>
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className={`flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b ${divider} ${panel} backdrop-blur-sm sticky top-0 z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => setMobileView('list')}
                className={`lg:hidden p-1.5 rounded-lg ${dk ? 'hover:bg-white/10' : 'hover:bg-slate-100'} ${txt2} transition-colors`}>
                {isRTL ? '→' : '←'}
              </button>
              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm shrink-0">
                {selectedConv.customerName?.[0]?.toUpperCase() || '?'}
              </div>
              <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
                <p className={`${txt1} font-semibold text-sm`}>{selectedConv.customerName}</p>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone size={11} className="text-green-400" />
                  <p className={`${txt3} text-xs`} dir="ltr">{selectedConv.customerPhone}</p>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-1 text-xs ${txt3} ${dk ? 'bg-white/[0.05]' : 'bg-slate-100'} px-2.5 py-1.5 rounded-lg`}>
                  <Clock size={11} />
                  <span>{new Date(selectedConv.createdAt).toLocaleDateString()}</span>
                </div>
                <button onClick={() => handleDelete(selectedConv.id)}
                  className={`p-1.5 rounded-lg ${dk ? 'hover:bg-red-500/20 text-white/40 hover:text-red-400' : 'hover:bg-red-50 text-slate-400 hover:text-red-500'} transition-colors`}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {/* Customer Info Bar */}
            <div className={`px-4 sm:px-5 py-2.5 border-b ${divider} flex items-center gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''} ${dk ? 'bg-white/[0.02]' : 'bg-slate-50/80'}`}>
              <div className={`flex items-center gap-1.5 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                <User size={12} className="text-blue-400" />
                <span className={txt2}>{lang === 'ar' ? 'الاسم:' : lang === 'ku' ? 'ناو:' : 'Name:'}</span>
                <span className={`${txt1} font-medium`}>{selectedConv.customerName}</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Phone size={12} className="text-green-400" />
                <span className={txt2}>{lang === 'ar' ? 'الهاتف:' : lang === 'ku' ? 'تەلەفۆن:' : 'Phone:'}</span>
                <span className={`${txt1} font-medium`} dir="ltr">{selectedConv.customerPhone}</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MessageCircle size={12} className="text-purple-400" />
                <span className={txt2}>{lang === 'ar' ? 'رسائل:' : lang === 'ku' ? 'پەیام:' : 'Messages:'}</span>
                <span className={`${txt1} font-medium`}>{selectedConv.messages.length}</span>
              </div>
              <div className={`flex items-center gap-1.5 text-xs ${isRTL ? 'ml-auto' : 'mr-auto'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                <CheckCheck size={12} className="text-green-400" />
                <span className="text-green-400">{lang === 'ar' ? 'مقروءة' : lang === 'ku' ? 'خوێندراوەتەوە' : 'Read'}</span>
              </div>
            </div>

            {/* Messages */}
            <div className={`flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-3 ${chatBg}`}
              style={{ scrollbarWidth: 'thin' }}>
              <AnimatePresence>
                {selectedConv.messages.map((msg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.02, type: 'spring', stiffness: 300, damping: 25 }}
                    className={`flex ${
                      msg.from === 'user'
                        ? (isRTL ? 'justify-start' : 'justify-end')
                        : (isRTL ? 'justify-end' : 'justify-start')
                    }`}>
                    <div className={`flex flex-col gap-1 max-w-[75%] ${
                      msg.from === 'user'
                        ? (isRTL ? 'items-start' : 'items-end')
                        : (isRTL ? 'items-end' : 'items-start')
                    }`}>
                      {/* Sender label */}
                      <span className={`text-[10px] ${txt3} px-1 flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {msg.from === 'bot'
                          ? <><span className="text-red-400">🤖</span> {lang === 'ar' ? 'مينا (الذكاء الاصطناعي)' : lang === 'ku' ? 'مینا (AI)' : 'Mina (AI)'}</>
                          : <><span>👤</span>{selectedConv.customerName || (lang === 'ar' ? 'الزبون' : 'Customer')}</>}
                      </span>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.from === 'user'
                          ? usrBub + (isRTL ? ' rounded-tl-sm' : ' rounded-tr-sm')
                          : botBub + (isRTL ? ' rounded-tr-sm' : ' rounded-tl-sm')
                      }`}>
                        {msg.text}
                      </div>
                      <span className={`text-[10px] ${txt3} px-1`}>{msg.time}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Footer note */}
            <div className={`px-4 py-3 border-t ${divider} ${dk ? 'bg-white/[0.02]' : 'bg-slate-50'}`}>
              <p className={`text-xs ${txt3} text-center`}>
                {lang === 'ar' ? '📋 هذه محادثة مسجّلة — يتم التواصل مع الزبون عبر تيليغرام أو هاتفه' :
                 lang === 'ku' ? '📋 ئەمە گفتوگۆیەکی تۆمارکراوە' :
                 '📋 This is a recorded conversation — contact the customer via Telegram or phone'}
              </p>
            </div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className={`flex-1 flex flex-col items-center justify-center gap-4 ${chatBg}`}>
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${dk ? 'bg-white/[0.05]' : 'bg-slate-100'}`}>
              <MessageCircle size={36} className="text-red-500/50" />
            </div>
            <div className="text-center">
              <p className={`${txt2} font-medium`}>
                {lang === 'ar' ? 'اختر محادثة لعرضها' : lang === 'ku' ? 'گفتوگۆیەک هەڵبژێرە' : 'Select a conversation to view'}
              </p>
              <p className={`${txt3} text-sm mt-1`}>
                {lang === 'ar' ? `${convs.length} محادثة مسجّلة` : `${convs.length} recorded`}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
