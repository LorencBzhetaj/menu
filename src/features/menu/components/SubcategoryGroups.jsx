import { useLanguage } from '../i18n/LanguageContext';

/**
 * Renders a category that has sub-categories (Pjata Kryesore, Pije).
 * Sub-categories are grouped in pairs; each pair is a paper card showing two
 * columns on desktop (with a dotted gold vertical divider between them) and a
 * single stacked column on mobile. Items are compact rows: name + price, with
 * a small italic description below only when one exists (drinks have none).
 */

function chunkPairs(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

function ItemRow({ item }) {
  const { t } = useLanguage();
  const desc = t(item, 'desc');
  return (
    <div className="qm-item-row">
      <div className="qm-item-row-top">
        <span className="qm-item-name">{t(item, 'name')}</span>
        <span className="qm-item-price">{item.price}</span>
      </div>
      {desc ? <p className="qm-item-desc-sm">{desc}</p> : null}
    </div>
  );
}

function SubcatColumn({ subcat }) {
  const { t } = useLanguage();
  return (
    <div className="qm-subcat-col">
      <div className="qm-subcat-title">{t(subcat, 'name')}</div>
      {subcat.items.map((item, i) => (
        <ItemRow key={i} item={item} />
      ))}
    </div>
  );
}

export default function SubcategoryGroups({ subcategories }) {
  const pairs = chunkPairs(subcategories);

  return (
    <div className="qm-subcats-wrap">
      {pairs.map((pair, i) => (
        <div key={i} className={`qm-subcat-pair ${pair.length === 2 ? 'two-col' : ''}`}>
          {pair.map((subcat, j) => (
            <SubcatColumn key={j} subcat={subcat} />
          ))}
        </div>
      ))}
    </div>
  );
}
