import { useEffect, useMemo, useState } from 'react';

import { menuData } from '../../data/menuData';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { observeIframeHeight, reportIframeHeight } from './iframeHeight';

import Header from './components/Header';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import LanguageToggle from './components/LanguageToggle';
import MenuCard from './components/MenuCard';
import SubcategoryGroups from './components/SubcategoryGroups';
import TastingMenuCard from './components/TastingMenuCard';
import Footer from './components/Footer';

/**
 * When the page is opened with `?embed=1` (i.e. inside an <iframe> on the main
 * site), the header + hero are hidden because the parent page already shows the
 * brand. The AL/EN switcher stays functional as a compact control by the menu
 * heading. Opened directly (no ?embed=1) the page is unchanged.
 */
const IS_EMBED =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('embed') === '1';

import './styles/menu.css';

/**
 * Standalone bilingual QR menu (Phase 1).
 *
 * This whole feature is self-contained — bring `<QrMenu />` (with its
 * LanguageProvider) into the main site later for the Phase 2 integration.
 */

function MainMenu() {
  const { t, lang } = useLanguage();
  const { categories } = menuData;
  const [activeCat, setActiveCat] = useState(categories[0].id);

  const active = useMemo(
    () => categories.find((c) => c.id === activeCat) ?? categories[0],
    [categories, activeCat]
  );

  // Category tab changes alter content height → tell the parent iframe.
  useEffect(() => {
    reportIframeHeight();
  }, [activeCat, lang]);

  return (
    <>
      {IS_EMBED ? (
        <div className="qm-embed-bar">
          <LanguageToggle className="qm-lang-toggle--light" />
        </div>
      ) : null}

      <div className="qm-section-heading">
        <div className="qm-section-eyebrow">{t('MENUJA', 'THE MENU')}</div>
        <h2 className="qm-section-title">{t('Zbuloni Shijet Tona', 'Discover Our Flavours')}</h2>
      </div>

      <CategoryTabs categories={categories} activeId={activeCat} onSelect={setActiveCat} />

      {active.subcategories ? (
        <SubcategoryGroups subcategories={active.subcategories} />
      ) : (
        <div className="qm-items">
          {active.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}

// Temporarily disabled — only the main menu is shown for now. Kept (with its
// data in menuData.tastingMenus) so it can be re-enabled by restoring the mode
// toggle in Hero + MenuContent. eslint-disable-next-line no-unused-vars
function TastingMenu() {
  const { t } = useLanguage();

  return (
    <>
      <div className="qm-section-heading">
        <div className="qm-section-eyebrow">{t('DEGUSTIM', 'TASTING')}</div>
        <h2 className="qm-section-title">{t('Sofra e Malësisë', 'The Highland Table')}</h2>
      </div>

      <div className="qm-tasting-wrap">
        {menuData.tastingMenus.map((menu) => (
          <TastingMenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </>
  );
}

function MenuContent() {
  const { lang } = useLanguage();

  // Set up auto height reporting once (load / resize / ResizeObserver).
  useEffect(() => observeIframeHeight(), []);

  // Language change alters content height → report it to the parent iframe.
  useEffect(() => {
    reportIframeHeight();
  }, [lang]);

  return (
    <div className={`qr-menu ${IS_EMBED ? 'qr-menu--embed' : ''}`}>
      {IS_EMBED ? null : <Header />}
      {IS_EMBED ? null : <Hero />}
      <main>
        <MainMenu />
      </main>
      <Footer />
    </div>
  );
}

export default function QrMenu() {
  return (
    <LanguageProvider>
      <MenuContent />
    </LanguageProvider>
  );
}
