import { useLanguage } from '../i18n/LanguageContext';
import Crest from './Crest';

/**
 * Shortened hero (fast to paint). Confirmed "Mesnatë Alpine" gradient background,
 * crest, wordmark, script tagline, and the two menu-mode pill toggles.
 */
export default function Hero({ mode, onModeChange }) {
  const { t } = useLanguage();

  return (
    <section className="qm-hero">
      <Crest size={78} className="qm-hero-crest" />
      <div className="qm-hero-est">EST. 1922 · THETH</div>
      <h1>GJEÇAJ</h1>
      <div className="qm-hero-divider" />
      <div className="qm-hero-script">{t('Shije të Alpeve', 'Flavours of the Alps')}</div>
      <div className="qm-hero-tagline">
        {t('Kuzhinë Tradicionale · Theth, Alpet Shqiptare', 'Traditional Cuisine · Theth, Albanian Alps')}
      </div>

      <div className="qm-menu-toggle">
        <button
          type="button"
          className={mode === 'main' ? 'active' : ''}
          aria-pressed={mode === 'main'}
          onClick={() => onModeChange('main')}
        >
          {t('MENU KRYESORE', 'MAIN MENU')}
          <span className="qm-toggle-sub">
            {t('Antipasta, sallata, pjata & pije', 'Starters, salads, mains & drinks')}
          </span>
        </button>
        <button
          type="button"
          className={mode === 'tasting' ? 'active' : ''}
          aria-pressed={mode === 'tasting'}
          onClick={() => onModeChange('tasting')}
        >
          {t('MENU DEGUSTUESE', 'TASTING MENU')}
          <span className="qm-toggle-sub">
            {t('Menu fikse, për 2 persona', 'Fixed menu, for 2 people')}
          </span>
        </button>
      </div>
    </section>
  );
}
