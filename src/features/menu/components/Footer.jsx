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

      <div className="qm-footer-actions">
        <a
          className="qm-reserve-btn"
          href="https://villagjecaj.com/restaurant-reservations/"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          {t('REZERVO TAVOLINË', 'RESERVE A TABLE')}
        </a>

        <a
          className="qm-download-btn"
          href="/gjecaj-menu.pdf"
          download="Menu-Gjecaj.pdf"
          target="_blank"
          rel="noopener"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 3v12M8 11l4 4 4-4" />
            <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
          </svg>
          {t('SHKARKO MENUNË (PDF)', 'DOWNLOAD MENU (PDF)')}
        </a>
      </div>
    </footer>
  );
}
