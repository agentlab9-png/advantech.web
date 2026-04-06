import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { translations, type Lang, type T } from '../translations';

interface LanguageCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: T;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem('advantech_lang') as Lang) || 'en'
  );

  const isRTL = lang === 'ar' || lang === 'ku';

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('advantech_lang', l);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.style.fontFamily = isRTL
      ? "'Cairo', 'Noto Sans Arabic', sans-serif"
      : "'Inter', sans-serif";
  }, [lang, isRTL]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
