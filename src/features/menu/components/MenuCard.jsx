import { useLanguage } from '../i18n/LanguageContext';

/** A single dish: name + price badge, gold rule, italic description. */
export default function MenuCard({ item }) {
  const { t } = useLanguage();

  return (
    <article className="qm-card">
      <div className="qm-card-top">
        <h3 className="qm-card-name">{t(item, 'name')}</h3>
        <div className="qm-price-badge">
          <span className="qm-num">{item.price}</span>
          <span className="qm-cur">LEK</span>
        </div>
      </div>
      <div className="qm-card-rule" />
      <p className="qm-card-desc">{t(item, 'desc')}</p>
    </article>
  );
}
