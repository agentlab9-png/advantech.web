import { useState } from 'react';
import { Check, Eye, EyeOff } from 'lucide-react';
import { getSettings, saveSettings, type SiteSettings } from '../store';
import { useAdminT } from './adminTranslations';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

export default function SettingsManager() {
  const t = useAdminT();
  const { theme } = useTheme();
  const { isRTL } = useLang();
  const isLight = theme === 'light';

  const [form, setForm]         = useState<SiteSettings>(getSettings());
  const [saved, setSaved]       = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [newPass, setNewPass]   = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passErr, setPassErr]   = useState('');

  const bgCard  = isLight ? 'bg-white'      : 'bg-gray-900';
  const bgInp   = isLight ? 'bg-slate-50 border-slate-300 text-gray-900' : 'bg-gray-800 border-gray-700 text-white';
  const border  = isLight ? 'border-slate-200' : 'border-gray-800';
  const border2 = isLight ? 'border-slate-300' : 'border-gray-700';
  const txt1    = isLight ? 'text-gray-900' : 'text-white';
  const txt2    = isLight ? 'text-gray-500' : 'text-white/70';
  const txt3    = isLight ? 'text-gray-400' : 'text-white/30';

  const inpCls = `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-600 transition-colors ${bgInp}`;
  const lbl    = `${txt2} text-sm block mb-1 ${isRTL ? 'text-right' : ''}`;
  const hint   = `${txt3} text-xs mb-1.5 ${isRTL ? 'text-right' : ''}`;

  const handleSave = () => {
    if (newPass || confirmPass) {
      if (newPass.length < 6) { setPassErr(t.passwordMin); return; }
      if (newPass !== confirmPass) { setPassErr(t.passwordMatch); return; }
      saveSettings({ ...form, adminPassword: newPass });
      setForm(f => ({ ...f, adminPassword: newPass }));
    } else {
      saveSettings(form);
    }
    setPassErr(''); setNewPass(''); setConfirmPass('');
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const F = ({ label, value, onChange, type = 'text', placeholder = '', hint: h = '' }:
    { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; hint?: string }) => (
    <div>
      <label className={lbl}>{label}</label>
      {h && <p className={hint}>{h}</p>}
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className={inpCls} dir="ltr" />
    </div>
  );

  return (
    <div>
      <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
        <h2 className={`${txt1} text-xl font-bold`}>{t.siteSettings}</h2>
        <p className={`${txt2} text-sm`}>{t.contactInfo}, Telegram, {t.heroVideo}, {t.changePassword}</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-900/40 border border-green-700/40 rounded-xl px-4 py-3 mb-5 text-green-400 text-sm">
          <Check size={16} /> {t.settingsSaved}
        </div>
      )}

      <div className="space-y-5">
        {/* Contact */}
        <div className={`${bgCard} border ${border} rounded-2xl p-5`}>
          <h3 className={`${txt1} font-semibold mb-4 pb-3 border-b ${border2} ${isRTL ? 'text-right' : ''}`}>{t.contactInfo}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <F label={t.mobile1}  value={form.phone1} onChange={v => setForm({...form, phone1: v})} placeholder="+964 790 634 7388" />
            <F label={t.mobile2}  value={form.phone2} onChange={v => setForm({...form, phone2: v})} placeholder="+964 770 623 5052" />
            <F label={t.fax}      value={form.fax}    onChange={v => setForm({...form, fax: v})}    placeholder="+964 780 614 7403" />
            <F label={t.email}    value={form.email}  onChange={v => setForm({...form, email: v})}  placeholder="info@advantechco.com" />
            <div className="md:col-span-2">
              <F label={`${t.whatsappAI}`} value={form.whatsappNumber}
                onChange={v => setForm({...form, whatsappNumber: v})}
                hint={t.whatsappAIHint} placeholder="9647906347388" />
            </div>
            <div className="md:col-span-2">
              <label className={lbl}>{t.address}</label>
              <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} rows={2}
                className={`${inpCls} resize-none`} dir="auto" />
            </div>
          </div>
        </div>

        {/* Hero Video */}
        <div className={`${bgCard} border ${border} rounded-2xl p-5`}>
          <h3 className={`${txt1} font-semibold mb-4 pb-3 border-b ${border2} ${isRTL ? 'text-right' : ''}`}>{t.heroVideo}</h3>
          <F label={t.videoUrl} value={form.heroVideoUrl} onChange={v => setForm({...form, heroVideoUrl: v})} placeholder="https://..." />
        </div>

        {/* Password */}
        <div className={`${bgCard} border ${border} rounded-2xl p-5`}>
          <h3 className={`${txt1} font-semibold mb-4 pb-3 border-b ${border2} ${isRTL ? 'text-right' : ''}`}>{t.changePassword}</h3>
          <div className="space-y-3">
            <div>
              <label className={lbl}>{t.currentPassword}</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.adminPassword} readOnly dir="ltr"
                  className={`${inpCls} opacity-50 cursor-not-allowed ${isRTL ? 'pl-10' : 'pr-10'}`} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 ${txt3} hover:opacity-70`}>
                  {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
            <div>
              <label className={lbl}>{t.newPassword}</label>
              <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)}
                className={inpCls} dir="ltr" placeholder="Min 6 characters" />
            </div>
            <div>
              <label className={lbl}>{t.confirmPassword}</label>
              <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                className={inpCls} dir="ltr" placeholder="Repeat new password" />
            </div>
            {passErr && <p className="text-red-500 text-sm">{passErr}</p>}
            {!newPass && !confirmPass && <p className={`${txt3} text-xs`}>{t.passwordHint}</p>}
          </div>
        </div>

        <button onClick={handleSave}
          className="w-full bg-red-700 hover:bg-red-600 text-white rounded-xl py-3 font-semibold transition-colors">
          {t.saveAll}
        </button>
      </div>
    </div>
  );
}
