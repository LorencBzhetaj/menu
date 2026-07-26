import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Isolated bilingual state (AL/EN) for the QR menu.
 * No Redux here — this page stands alone. Preference is saved to localStorage.
 * Only ONE language is ever rendered at a time (see the `t` helper).
 */

const STORAGE_KEY = 'gjecaj-menu-lang';
const LanguageContext = createContext(null);

function readInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'al' || saved === 'en') return saved;
  } catch {
    /* localStorage may be unavailable (private mode) — fall through */
  }
  // Default to English on first visit (no saved preference yet).
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore write failures */
    }
    // keep <html lang> accurate for accessibility / SEO
    document.documentElement.lang = lang === 'al' ? 'sq' : 'en';
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === 'al' || next === 'en') setLangState(next);
  }, []);

  // Pick the field for the active language: t(item, 'name') or t(al, en).
  const t = useCallback(
    (a, b) => {
      if (typeof a === 'object' && a !== null) {
        // t(obj, 'name') -> obj.name_al | obj.name_en
        return a[`${b}_${lang}`];
      }
      // t(alValue, enValue)
      return lang === 'al' ? a : b;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
