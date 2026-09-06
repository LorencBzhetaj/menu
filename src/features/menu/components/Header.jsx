import { useLanguage } from '../i18n/LanguageContext';
import Crest from './Crest';
import LanguageToggle from './LanguageToggle';

/**
 * Minimal sticky header for the QR page — crest + wordmark on the left,
 * AL/EN toggle on the right. No nav links, no burger: a guest at the table
 * has nowhere else to go.
 */
export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="qm-header">
      <div className="qm-brand">
        <Crest size={34} className="qm-crest" />
        <div>
          <div className="qm-brand-name">GJEÇAJ</div>
          <span className="qm-brand-sub">{t('RESTORANT · EST. 1922', 'RESTAURANT · EST. 1922')}</span>
        </div>
      </div>

      <LanguageToggle />
    </header>
  );
}
