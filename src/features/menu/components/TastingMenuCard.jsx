import { useLanguage } from '../i18n/LanguageContext';

/** A fixed tasting menu: script name, meta, price, and its ordered courses. */
export default function TastingMenuCard({ menu }) {
  const { t } = useLanguage();

  return (
    <article className="qm-tasting-card">
      <div className="qm-tasting-name">{menu.name}</div>
      <div className="qm-tasting-meta">{t(menu, 'guests')}</div>
      <div className="qm-tasting-price">
        {menu.price} <span>LEK</span>
      </div>

      {menu.courses.map((course, i) => (
        <div className="qm-tasting-course" key={i}>
          <h4>{t(course, 'title')}</h4>
          <p>{t(course, 'desc')}</p>
        </div>
      ))}
    </article>
  );
}
