import { useLanguage } from '../i18n/LanguageContext';
import Crest from './Crest';

/**
 * Shortened hero (fast to paint). Confirmed "Mesnatë Alpine" gradient background,
 * crest, wordmark, and script tagline.
 *
 * The Main/Tasting mode toggle was removed for now — only the main menu is
 * shown. Re-add the pill toggle here (and the mode state in QrMenu) to bring
 * the tasting menu back.
 */
export default function Hero() {
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
    </section>
  );
}
