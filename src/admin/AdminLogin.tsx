import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { adminLogin } from '../store';
import { useAdminT } from './adminTranslations';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

interface Props { onLogin: () => void; }

export default function AdminLogin({ onLogin }: Props) {
  const t = useAdminT();
  const { theme } = useTheme();
  const { isRTL } = useLang();
  const isLight = theme === 'light';

  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const bg     = isLight ? 'bg-slate-100'  : 'bg-gray-950';
  const bgCard = isLight ? 'bg-white'      : 'bg-gray-900';
  const bgInp  = isLight ? 'bg-slate-50 border-slate-300 text-gray-900 placeholder-gray-400' : 'bg-gray-800 border-gray-700 text-white placeholder-white/30';
  const border = isLight ? 'border-slate-200' : 'border-gray-800';
  const txt1   = isLight ? 'text-gray-900' : 'text-white';
  const txt2   = isLight ? 'text-gray-500' : 'text-white/50';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) { onLogin(); }
    else { setError(t.wrongPassword); setPassword(''); }
  };

  return (
    <div className={`min-h-screen ${bg} flex items-center justify-center px-4`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-700/20 border border-red-700/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-red-500" />
          </div>
          <h1 className={`${txt1} text-2xl font-bold`}>{t.adminDashboard}</h1>
          <p className={`${txt2} text-sm mt-1`}>Advanced Technologies — {t.controlPanel}</p>
        </div>

        <form onSubmit={handleSubmit} className={`${bgCard} border ${border} rounded-2xl p-8`}>
          <label className={`block ${txt2} text-sm mb-2 ${isRTL ? 'text-right' : ''}`}>{t.adminPassword}</label>
          <div className="relative mb-4">
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 transition-colors ${isRTL ? 'pr-4 pl-10' : 'pr-10 pl-4'} ${bgInp}`}
              placeholder={t.enterPassword}
              autoFocus
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 ${txt2} hover:opacity-70`}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="w-full bg-red-700 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-colors">
            {t.login}
          </button>
        </form>
      </div>
    </div>
  );
}
