import { useLanguage } from '../i18n/LanguageContext';

/**
 * A single dish card. If the item has an `image`, a small thumbnail sits on the
 * left (Option 2 layout); otherwise the text simply takes the full width.
 */
export default function MenuCard({ item }) {
  const { t } = useLanguage();

  return (
    <article className="qm-card">
      {item.image ? (
        <img className="qm-card__thumb" src={item.image} alt="" loading="lazy" />
      ) : null}
      <div className="qm-card__main">
        <div className="qm-card__top">
          <h3 className="qm-card-name">{t(item, 'name')}</h3>
          <div className="qm-price-badge">
            <span className="qm-num">{item.price}</span>
            <span className="qm-cur">LEK</span>
          </div>
        </div>
        <p className="qm-card-desc">{t(item, 'desc')}</p>
      </div>
    </article>
  );
}
