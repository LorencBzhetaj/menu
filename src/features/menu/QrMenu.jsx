import { useMemo, useState } from 'react';

import { menuData } from '../../data/menuData';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

import Header from './components/Header';
import Hero from './components/Hero';
import CategoryTabs from './components/CategoryTabs';
import MenuCard from './components/MenuCard';
import SubcategoryGroups from './components/SubcategoryGroups';
import TastingMenuCard from './components/TastingMenuCard';
import Footer from './components/Footer';

import './styles/menu.css';

/**
 * Standalone bilingual QR menu (Phase 1).
 *
 * This whole feature is self-contained — bring `<QrMenu />` (with its
 * LanguageProvider) into the main site later for the Phase 2 integration.
 */

function MainMenu() {
  const { t } = useLanguage();
  const { categories } = menuData;
  const [activeCat, setActiveCat] = useState(categories[0].id);

  const active = useMemo(
    () => categories.find((c) => c.id === activeCat) ?? categories[0],
    [categories, activeCat]
  );

  return (
    <>
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
  const [mode, setMode] = useState('main'); // 'main' | 'tasting'

  return (
    <div className="qr-menu">
      <Header />
      <Hero mode={mode} onModeChange={setMode} />
      <main>{mode === 'main' ? <MainMenu /> : <TastingMenu />}</main>
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
