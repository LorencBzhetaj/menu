import { useLanguage } from '../i18n/LanguageContext';
import Crest from './Crest';

/**
 * Minimal sticky header for the QR page — crest + wordmark on the left,
 * AL/EN toggle on the right. No nav links, no burger: a guest at the table
 * has nowhere else to go.
 */
export default function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="qm-header">
      <div className="qm-brand">
        <Crest size={34} className="qm-crest" />
        <div>
          <div className="qm-brand-name">GJEÇAJ</div>
          <span className="qm-brand-sub">{t('RESTORANT · EST. 1922', 'RESTAURANT · EST. 1922')}</span>
        </div>
      </div>

      <div className="qm-lang-toggle" role="group" aria-label={t('Zgjidh gjuhën', 'Choose language')}>
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
    </header>
  );
}
