# QR Menu — Blueprint i Plotë (Ripërdorshëm për çdo restorant)

> Ky dokument është njëkohësisht **prompt fillestar** dhe **referencë teknike** për të ndërtuar një
> faqe menuje standalone, dygjuhëshe, që hapet duke skanuar një QR-code në tavolina, dhe që më vonë
> embed-ohet brenda një website-i WordPress. Bazuar te implementimi real i **Gjeçaj Restaurant**.
>
> **Si ta përdorësh në një sesion të ri:** hape këtë skedar, jepja agjentit, dhe thuaj:
> *"Ndërto këtë sipas blueprint-it për restorantin **[EMRI]**. Ja asetet: [logo, menu, foto, PDF, ngjyra, URL rezervimi]."*

---

## 0. Prompti fillestar (kopjo-ngjit dhe plotëso kllapat)

```
Po ndërtoj një faqe QR-menu standalone për restorantin [EMRI], sipas blueprint-it bashkëngjitur
(QR-MENU-BLUEPRINT.md). FAZA 1: vetëm faqja standalone dygjuhëshe (Shqip/Anglisht) që hapet nga QR
në tavolina. FAZA 2 (më vonë): integrimi në website-in kryesor.

Stack: Vite + React + react-router-dom, CSS me design tokens (PA Tailwind).
Projekti standalone në: C:\Users\Krris\projects\[emri]-menu   (folder i pastër, jashtë repo-ve të tjera)

Asetet që kam:
- Logo: [path / a është transparent? a është SVG?]
- Menu bilinguale (kategori, çmime, përshkrime): [path PDF ose tekst]
- Foto ushqimesh (emërtuar sipas pjatës): [path folder]
- PDF i menusë për shkarkim: [path]
- Ngjyrat e brandit / gradient hero: [ose "sugjero ti"]
- URL i rezervimit: [URL]
- Kontakt (adresë, telefon): [...]
- URL i faqes WordPress ku çon QR-i aktual: [ose "s'ka ende"]

Ndiq rrjedhën logjike te seksioni 17 i blueprint-it. Mobile-first, performancë maksimale
(hapet mbi wifi restoranti). Testo në 375px. Default gjuha: [EN ose AL].
```

---

## 1. Përmbledhje & Fazat

- **Faza 1 (kjo):** Faqe **standalone** që shfaq menunë. Aksesohet duke skanuar QR në tavolinë → hapet direkt menuja, pa navigim tjetër. Deployohet vetë.
- **Faza 2 (më vonë):** Embed brenda website-it kryesor (WordPress via `<iframe>`, ose integrim në React-in e sitit). Komponenti `<QrMenu/>` është i izoluar (gjuhë lokale, pa Redux, pa chrome të sitit) që të lëvizet lehtë.

**Parimi kryesor:** komponenti kryesor i menusë mbetet **i vetëmjaftueshëm dhe i ripërdorshëm**.

---

## 2. Tech Stack

- **Vite** + **React 18** + **react-router-dom 6**
- **CSS i thjeshtë me design tokens** (ndryshore CSS) — JO Tailwind. Arsyeja: port besnik i dizajnit, i pavarur, lehtë i transferueshëm në Fazën 2.
- Fonts nga Google Fonts (preconnect + `display=swap`).
- Ikona: **SVG inline** (pa librari ikonash — bundle i vogël).
- Deploy: **Vercel**. Repo: GitHub.

---

## 3. Arkitektura & Struktura e Folderave

```
[emri]-menu/
  index.html                     # meta mobile + preconnect fontesh + favicon
  vite.config.js                 # server.host=true (test nga telefoni në LAN)
  vercel.json                    # SPA rewrites
  package.json
  .gitignore                     # node_modules, dist, backup-e origjinale
  public/
    favicon.svg
    [logo].(svg|png)             # logo (ideale transparente/e çelët)
    [menu].pdf                    # PDF për shkarkim
    ushqimet/                    # foto pjatash (emërtuar sipas pjatës)
      *.jpg
  src/
    main.jsx                     # entry + React Router
    styles/
      tokens.css                 # design tokens (ngjyra, fonte) + reset + @font-face ampersand
    data/
      menuData.js                # E GJITHË përmbajtja bilinguale
    features/
      menu/                      # feature i vetëmjaftueshëm (lëvize në Fazën 2)
        QrMenu.jsx               # container
        iframeHeight.js          # auto-resize për embedding
        i18n/
          LanguageContext.jsx    # gjuha AL/EN + localStorage
        styles/
          menu.css               # stilet e komponentëve
        components/
          Header.jsx
          Hero.jsx
          CategoryTabs.jsx
          MenuCard.jsx           # kartë me foto opsionale
          SubcategoryGroups.jsx  # nën-kategori (2 kolona) + rreshta me foto opsionale
          TastingMenuCard.jsx    # opsionale (mund të çaktivizohet)
          Footer.jsx             # kontakt + butona Rezervo/Shkarko PDF
          Crest.jsx              # logo (SVG ose <img> me filtër)
          icons.jsx              # ikona SVG të kategorive
```

---

## 4. Design Tokens (te `src/styles/tokens.css`)

Personalizo ngjyrat për çdo restorant. Shembulli (Gjeçaj — paletë "letër e ngrohtë + mesnatë alpine"):

```css
:root {
  --cream: #f8f4e9;        /* sfondi kryesor */
  --cream-deep: #efe6d2;
  --paper: #fbf8f1;        /* sfondi i kartave */
  --ink: #24344a;          /* teksti/titujt/badge çmimi */
  --ink-soft: #5b6b7e;     /* tekst dytësor/përshkrime */
  --charcoal: #17181a;     /* header */
  --olive: #7c8a5e;
  --olive-dark: #566241;
  --iris: #8d86b8;
  --iris-deep: #635c8e;    /* tekst script */
  --gold: #b9a365;         /* aksente çmimi/divider */
  --gold-soft: #d9cba0;    /* tekst mbi sfond të errët */
  --line: rgba(36,52,74,0.15);
  --shadow: 0 10px 30px rgba(36,52,74,0.08);

  --hero-bg: linear-gradient(160deg, #14202b 0%, #1f3b3a 55%, #3e5a45 100%); /* gradient hero */

  --font-display: 'AmpSerif', 'Playfair Display', serif;  /* shih ampersand-in te §9 */
  --font-body: 'Cormorant Garamond', serif;
  --font-script: 'Dancing Script', cursive;
  --font-ui: 'Jost', sans-serif;
}
```

Plus: reset (`*{box-sizing;margin;padding}`), `body` me sfond token + `min-height:100vh`, `-webkit-font-smoothing`.

**Fonte (Google Fonts):** Display = Playfair Display; Body = Cormorant Garamond (italic për përshkrime); Script = Dancing Script; UI/labels = Jost (uppercase, letter-spacing). Ndryshoji sipas brandit.

---

## 5. Modeli i të Dhënave (`src/data/menuData.js`)

```js
export const menuData = {
  categories: [
    // Kategori e RRAFSHËT (kartat me foto opsionale):
    {
      id: 'antipasta',
      name_al: 'Antipasta', name_en: 'Starters',
      icon: 'antipasta',                      // çelës te icons.jsx
      items: [
        {
          id: 'x',
          image: '/ushqimet/meze.jpg',        // OPSIONALE — thumbnail
          name_al: '...', name_en: '...',
          price: 650,
          desc_al: '...', desc_en: '...',     // OPSIONALE (p.sh. pijet s'kanë)
        },
      ],
    },
    // Kategori me NËN-KATEGORI (2 kolona; p.sh. Pjata Kryesore, Pije):
    {
      id: 'kryesore',
      name_al: 'Pjata Kryesore', name_en: 'Main Course',
      icon: 'kryesore',
      subcategories: [
        {
          name_al: 'Vegjetariane', name_en: 'Vegetarian',
          items: [
            { image: '/ushqimet/byrek.jpg', name_al: 'Byrek', name_en: 'Byrek', price: 450,
              desc_al: '...', desc_en: '...' },
          ],
        },
      ],
    },
  ],

  tastingMenus: [   // opsionale — mund të çaktivizohet nga UI (shih §9)
    { id: 'x', name: 'Aromat e Alpeve', price: 4000,
      guests_al: 'PËR 2 PERSONA', guests_en: 'FOR 2 PEOPLE',
      courses: [ { title_al:'Mesoret', title_en:'Starter', desc_al:'...', desc_en:'...' } ] },
  ],
};
export default menuData;
```

**Rregulla:** një kategori ka **ose** `items` **ose** `subcategories`. `image` dhe `desc_*` janë opsionale.

---

## 6. Sistemi Dygjuhësh (`i18n/LanguageContext.jsx`)

- State lokal (pa Redux). Ruaj në `localStorage` (çelës p.sh. `[emri]-menu-lang`).
- Shfaq **VETËM** gjuhën aktive (kurrë të dyja njëkohësisht).
- Default: zakonisht **EN** (turistë), por konfirmoje.
- Helper `t`: `t(obj, 'name')` → `obj.name_al|name_en`; `t(alVal, enVal)` → sipas gjuhës.
- Në `useEffect`: shkruaj localStorage + vendos `document.documentElement.lang = 'sq'|'en'`.

```jsx
const t = (a, b) => (typeof a === 'object' && a !== null ? a[`${b}_${lang}`] : (lang === 'al' ? a : b));
```

---

## 7. Komponentët (sjellja)

- **Header** — sticky, sfond charcoal. Stemë + emri + nën-titull ("RESTORANT · EST. YYYY") majtas; toggle **AL/EN** djathtas. PA nav, PA burger (klienti në tavolinë s'lundron gjetkë). Nën-titulli `white-space:nowrap`.
- **Hero** — gradient `--hero-bg`; stemë 78px; eyebrow "EST. YYYY · [VENDI]"; H1 emri (letter-spacing i madh); divider me `◇`; tagline script; nën-titull uppercase. (Opsionale: toggle Main/Tasting — shih §9.)
- **CategoryTabs** — horizontal scroll-snap; ikona SVG + emër; aktivi sfond `--ink`, tekst `--gold-soft`; `fade-right` overlay + `margin-right` te tab-i i fundit që të mos priten.
- **MenuCard** — kartë; **thumbnail 72px majtas nëse ka `image`**, përndryshe teksti merr tërë gjerësinë; emër (display) + badge çmimi (`--ink` sfond, `--gold-soft` numri, `--gold` "LEK"); përshkrim italic.
- **SubcategoryGroups** — nën-kategoritë në **çifte**; çdo çift = kartë me **2 kolona** (desktop) me **vijë pikash gold vertikale** mes tyre (`::before`, vetëm desktop), **1 kolonë** (mobile). Rreshta kompakt (`ItemRow`): **thumbnail 52px opsional** + emër + çmim ("L" gold) + përshkrim i vogël vetëm nëse ekziston.
- **Footer** — shënim origjine (✓), rresht script, kontakt (adresë · telefon `tel:`), dhe **butona veprimi**: "Rezervo Tavolinë" (solid) + "Shkarko Menunë (PDF)" (outline).
- **Crest** — shih §9 (logo).
- **icons.jsx** — SVG inline të kategorive (antipasta, supa, sallata, kryesore, pije, embelsira...), me `stroke="currentColor"`.

---

## 8. Container (`QrMenu.jsx`)

- Mbështjell gjithçka me `<LanguageProvider>`.
- `MenuContent`: `<Header/> <Hero/> <main>{...}</main> <Footer/>`.
- `MainMenu`: state `activeCat`; nëse kategoria ka `subcategories` → `<SubcategoryGroups/>`, përndryshe grid me `<MenuCard/>`.
- (Opsionale) state `mode` main/tasting nëse aktivizohet tasting.

---

## 9. Veçoritë Kritike & "Gotchas" (mësime nga Gjeçaj)

### Logo / Crest (⚠️ e rëndësishme)
- Header + hero janë **të errët**. Logo **e zezë del e padukshme**.
- Zgjidhjet:
  1. **Foto reale** te `public/[logo].png` **transparente** → `Crest` e rendon me `<img>` + filtër CSS që e kthen në të çelët:
     ```css
     .qm-crest-img { filter: brightness(0) saturate(100%) invert(90%) sepia(18%)
       saturate(420%) hue-rotate(3deg) brightness(96%); }  /* afërsi gold-soft */
     ```
     Për hero-n që ka edhe `drop-shadow`, kombino të dyja në një selektor `.qm-hero-crest.qm-crest-img` (një `filter` s'trashëgohet nga dy rregulla).
  2. **Fallback SVG vektor** i çelët (stroke `--gold-soft`) nëse skedari mungon (`onError`).
- Optimizo logon (p.sh. 1024px → 320px, ~25KB).
- `favicon.svg` me të njëjtën stemë (sfond charcoal + vija gold).

### Foto ushqimesh
- Vendosen te `public/ushqimet/`, **emërtuar sipas pjatës** (p.sh. `byrek.jpg`).
- Lidhen te `menuData` me fushën `image`.
- **OPTIMIZO GJITHMONË** (kritike për wifi restoranti). Skript PowerShell (Windows), cover-crop 400×400, JPEG q82 (~40KB secila):
  ```powershell
  Add-Type -AssemblyName System.Drawing
  $dir="...\public\ushqimet"; $size=400
  $jpg=[System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|?{$_.MimeType-eq'image/jpeg'}
  $ep=New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0]=New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality,[long]82)
  Get-ChildItem "$dir\*.jpg"|%{
    $o=[System.Drawing.Image]::FromFile($_.FullName)
    $s=[Math]::Max($size/$o.Width,$size/$o.Height); $nw=[int]($o.Width*$s); $nh=[int]($o.Height*$s)
    $x=[int](($size-$nw)/2); $y=[int](($size-$nh)/2)
    $b=New-Object System.Drawing.Bitmap($size,$size,[System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g=[System.Drawing.Graphics]::FromImage($b)
    $g.InterpolationMode='HighQualityBicubic'; $g.SmoothingMode='HighQuality'; $g.PixelOffsetMode='HighQuality'
    $g.DrawImage($o,$x,$y,$nw,$nh); $g.Dispose(); $o.Dispose(); $b.Save($_.FullName,$jpg,$ep); $b.Dispose()
  }
  ```
- Kartat/rreshtat pa foto rrinë **tekst i plotë** (pa kuti bosh).

### Ampersand tradicional
- Playfair Display ka "&" shumë ornamental. Zëvendëso vetëm "&" me serif klasik përmes `@font-face` me `unicode-range` te tokens.css:
  ```css
  @font-face { font-family:'AmpSerif'; src:local('Georgia'),local('Times New Roman'),local('Times');
    unicode-range:U+0026; }
  /* pastaj: --font-display: 'AmpSerif','Playfair Display',serif; */
  ```

### Iframe auto-resize (`iframeHeight.js`)
- Kur embed-ohet, faqja i dërgon **prindit** lartësinë reale që iframe-i të mos ketë scrollbar të vetin.
- `reportIframeHeight()`: mat `#root` (JO `body`, se ka `min-height:100vh`) → `postMessage({type:'[emri]-menu-height', height}, '*')`.
- `observeIframeHeight()`: thirr në `load`, `resize`, dhe `ResizeObserver(#root)`.
- **Thirr EKSPLICIT** `reportIframeHeight()` nga React në `useEffect` kur ndryshon **gjuha / kategoria / modaliteti** (ResizeObserver s'garantohet kudo).

### Butoni Shkarko PDF
- `<a href="/[menu].pdf" download="Menu-[Emri].pdf" target="_blank" rel="noopener">`.
- `download` → ruan direkt; `target=_blank` mbetet si rezervë.
- ⚠️ Nëse iframe-i i WordPress ka `sandbox`, duhet `allow-downloads`.

### Butoni Rezervo
- `<a href="[URL_REZERVIMIT]" target="_blank" rel="noopener">` — pa JS/modal.

### Tasting menu (opsionale)
- Nëse s'duhet tani: hiq toggle-in nga Hero dhe rendoro vetëm `MainMenu`; **mbaje** komponentin + të dhënat për rikthim të lehtë.

---

## 10. Routing (`main.jsx`)

```jsx
<BrowserRouter><Routes>
  <Route path="/"  element={<QrMenu/>} />   {/* rrënja = URL më e pastër për QR */}
  <Route path="/m" element={<QrMenu/>} />   {/* alias i shkurtër */}
  <Route path="*"  element={<QrMenu/>} />
</Routes></BrowserRouter>
```

---

## 11. Performancë & Mobile (kritike)

- Fonts: `preconnect` + `display=swap`.
- Ikona SVG inline (pa librari).
- Foto të optimizuara (~40KB); logo e vogël.
- Meta: `viewport` (+`viewport-fit=cover`), `theme-color`, `apple-mobile-web-app-capable`, `mobile-web-app-capable`, `apple-mobile-web-app-title`.
- Touch targets ≥ 44px.
- Testo te **375px** (iPhone SE): asnjë overflow horizontal.

---

## 12. Build & Run

```bash
npm install
npm run dev        # vite; server.host=true → hape nga telefoni në LAN për të testuar QR-in
npm run build      # -> dist/
npm run preview
```

---

## 13. Deploy: Vercel + Nëndomen

1. `npm i -g vercel` → `vercel --prod` (ose lidh repo-n GitHub te vercel.com/new për auto-deploy në çdo push).
2. `vercel.json` (SPA rewrites):
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
3. **Nëndomen** `menu.[domaini].com`: Vercel → Settings → Domains → Add → merr rekordin (zakonisht **CNAME** `menu` → `xxx.vercel-dns.com`).
4. Te DNS-i i domainit (p.sh. **Bluehost → Domains → DNS / Zone Editor → Add Record → CNAME**). **MOS** përdor mjetin "Subdomains" (ai tregon te folder lokal). SSL bëhet vetë.
5. Prit propagimin (min → orë). Nëse SSL del "Invalid" fillimisht sepse DNS s'kish propaguar → prit dhe **Refresh** te Vercel.

---

## 14. Integrimi në WordPress (Faza 2)

**Dy rrugë — zgjidh njërën:**

### A) Embed me `<iframe>` (rekomanduar; QR-i vazhdon te faqja ekzistuese)
Në faqen ku çon QR-i, **fshi përmbajtjen e vjetër** dhe vendos bllok **Custom HTML**:
```html
<style>
  /* heq hapësirat e temës VETËM në këtë faqe (përshtat selektorët sipas temës) */
  .site-content { padding-top:0!important; padding-bottom:0!important; }
  .site-main { margin-top:0!important; }
  .elementor-element-populated { padding:0!important; }
</style>
<div style="width:100vw; margin-left:calc(50% - 50vw); line-height:0;">
  <iframe id="rmenu" src="https://menu.[domaini].com" title="Menu" loading="lazy"
    scrolling="no" style="width:100%; height:100vh; border:0; display:block; overflow:hidden;"></iframe>
</div>
<script>
  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://menu.[domaini].com') return;
    if (e.data && e.data.type === '[emri]-menu-height' && e.data.height)
      document.getElementById('rmenu').style.height = e.data.height + 'px';
  });
</script>
```
- `width:100vw; margin-left:calc(50% - 50vw)` → **full-width** (heq margjinat anash).
- Për të gjetur saktë selektorët e hapësirave: inspekto etërit e `.elementor-top-section` deri te `<body>`.
- Nëse WP heq `<script>`-in → përdor plugin **WPCode**.
- **Pastro cache-in** (plugin cache / CDN) pas ndryshimeve.

### B) Redirect (nëse s'do embed)
- QR → `[domaini].com/[faqja-vjeter]/` → **301 redirect** te `https://menu.[domaini].com`.
- Faqe WP: plugin **Redirection** (Source `/[faqja]/`, Target URL, 301).
- Skedar (PDF): rregull `.htaccess` `Redirect 301 /path/file.pdf https://menu.[domaini].com`.

---

## 15. QR Code
- Pikoje te `https://menu.[domaini].com` (ose te faqja WP nëse përdor embed/redirect).
- Nëse QR-i është **i fiksuar/shpërndarë tashmë**, mos e ndrysho — përdor **redirect** ose **embed** në URL-n ekzistuese.

---

## 16. Asetet për t'u mbledhur nga klienti (checklist)

- [ ] **Logo** — ideale **SVG vektor** ose **PNG transparent**; nëse vetëm e zezë, do rikolorohet me filtër/SVG.
- [ ] **Menu bilinguale e plotë** — kategori, nën-kategori, çmime, përshkrime (AL+EN).
- [ ] **Foto ushqimesh** — emërtuar sipas pjatës (p.sh. `byrek.jpg`).
- [ ] **PDF i menusë** (për butonin e shkarkimit).
- [ ] **Ngjyrat e brandit** + preferencë gradient hero (ose "sugjero").
- [ ] **URL i rezervimit**.
- [ ] **Kontakt**: adresë, telefon, vendndodhje.
- [ ] **Domaini** + akses DNS (për nëndomen).
- [ ] **URL i faqes WP** ku çon QR-i (nëse ekziston) + akses WP admin.
- [ ] Default gjuha (EN/AL) dhe a duhet **Tasting Menu**.

---

## 17. Rrjedha Logjike e Ndërtimit (hap pas hapi)

1. **Skano asetet & vendimet** (§16). Konfirmo ngjyrat, fontet, kategoritë, default gjuhën, tasting po/jo.
2. **Scaffold** projekt Vite+React në folder të pastër: `package.json`, `vite.config.js` (host:true), `index.html` (meta mobile + fonts), `.gitignore`, `vercel.json`, `public/`.
3. **tokens.css** — ngjyra, fonte, reset, `@font-face` ampersand.
4. **menuData.js** — mbush nga PDF/tekst (kategori të rrafshëta + nën-kategori + tasting opsional).
5. **LanguageContext** — AL/EN + localStorage + `t`.
6. **icons.jsx** + **Crest.jsx** (logo: img+filtër ose SVG fallback).
7. **Komponentët**: Header, Hero, CategoryTabs, MenuCard (me foto opsionale), SubcategoryGroups (2 kolona + rreshta me foto), Footer (butona), TastingMenuCard (opsional).
8. **QrMenu.jsx** container + **main.jsx** router.
9. **menu.css** — të gjitha stilet (kartat, tabs, nën-kategori, footer, butona).
10. **iframeHeight.js** + lidhje në `useEffect` (mount + lang/kategori/mode).
11. **Optimizo fotot** (PowerShell 400×400) + **logon** (320px) + `favicon.svg`.
12. **PDF** te `public/` + butoni "Shkarko" me `download`.
13. **Verifiko live** (dev server): 375px, pa overflow, pa error konsole; toggle AL/EN; tabs; foto; butona.
14. **Build** → git init → push në GitHub.
15. **Deploy Vercel** + nëndomen (CNAME në DNS) + SSL.
16. **Integrim WordPress** (embed ose redirect) + full-width + heq hapësirat + pastro cache.
17. **QR code** te URL-ja finale. Testo skanimin real nga telefoni.

---

## 18. Referencë
Implementimi i plotë real: **Gjeçaj Restaurant** — repo `github.com/LorencBzhetaj/menu`, live `menu.villagjecaj.com`, embed te `villagjecaj.com/menu-online/`. Ky blueprint është abstraguar prej tij.
