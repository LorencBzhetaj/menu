import { useLanguage } from '../i18n/LanguageContext';

/**
 * AL/EN toggle. Reused in the header (dark) and, in embed mode, as a compact
 * light-background control near the menu heading. Same behaviour in both places.
 * Pass `className` (e.g. 'qm-lang-toggle--light') to restyle for a light ground.
 */
export default function LanguageToggle({ className = '' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      className={`qm-lang-toggle ${className}`}
      role="group"
      aria-label={t('Zgjidh gjuhën', 'Choose language')}
    >
      <button
        type="button"
        className={lang === 'al' ? 'active' : ''}
        aria-pressed={lang === 'al'}
        onClick={() => setLang('al')}
      >
        AL
      </button>
      <button
        type="button"
        className={lang === 'en' ? 'active' : ''}
        aria-pressed={lang === 'en'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>
  );
}
