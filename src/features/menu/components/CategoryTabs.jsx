import { useLanguage } from '../i18n/LanguageContext';
import { CategoryIcon } from './icons';

/**
 * Horizontal, scroll-snapping category tabs. The last tab gets extra right
 * margin and a fade overlay so it's never visually clipped.
 */
export default function CategoryTabs({ categories, activeId, onSelect }) {
  const { t } = useLanguage();

  return (
    <div className="qm-tabs-wrap">
      <div className="qm-tabs" role="tablist" aria-label={t('Kategoritë', 'Categories')}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={cat.id === activeId}
            className={`qm-tab ${cat.id === activeId ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
          >
            <CategoryIcon name={cat.icon} />
            <span>{t(cat, 'name')}</span>
          </button>
        ))}
      </div>
      <div className="qm-fade-right" aria-hidden="true" />
    </div>
  );
}
