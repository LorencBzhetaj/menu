import { useLanguage } from '../i18n/LanguageContext';

/** Minimal footer: sourcing note, script line, and contact details. */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="qm-footer">
      <div className="qm-footer-note">
        {t(
          '✓ Produktet tona janë të kultivuara dhe të korrura në vend',
          '✓ Our products are locally grown and harvested'
        )}
      </div>
      <div className="qm-script">{t('Shijoni gatimet tona', 'Enjoy our dishes')}</div>
      <div className="qm-contact">
        Theth, Shkodër · {t('Alpet Shqiptare', 'Albanian Alps')} ·{' '}
        <a href="tel:+355672046333">+355 67 204 6333</a>
      </div>
    </footer>
  );
}
