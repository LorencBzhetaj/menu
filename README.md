# Gjeçaj Restaurant — QR Menu (Phase 1)

Standalone, bilingual (Shqip / English) menu shown when a guest scans the QR code
at the table. Mobile-first, no site navigation — just the menu.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints. The menu lives at **`/m`** (short & QR-friendly); `/` redirects there.
`npm run dev` is exposed on the LAN (`host: true`) so you can open it on a phone
to test the real QR flow.

```bash
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## The QR code

Point the QR at `https://<your-domain>/m`.

## Structure

```
src/
  main.jsx                     # entry + React Router (/m)
  styles/tokens.css            # confirmed design tokens (colors, fonts)
  data/menuData.js             # bilingual menu content (categories + tasting menus)
  features/menu/               # self-contained, reusable feature
    QrMenu.jsx                 # <QrMenu/> container (bring this into the main site in Phase 2)
    i18n/LanguageContext.jsx   # AL/EN state, persisted to localStorage
    styles/menu.css
    components/                # Header, Hero, CategoryTabs, MenuCard, TastingMenuCard, Footer, Crest, icons
```

## Phase 2 (later)

`<QrMenu />` is deliberately isolated (local language state, no Redux, no site chrome).
To embed it in the main React site, render `<QrMenu />` on a route there; move
`data/menuData.js` and `styles/tokens.css` alongside the shared code.

## Logo / crest

The crest is a self-contained **SVG vector** re-creation of the real Gjeçaj mark
(shield + "G" monogram + flower) — see `src/features/menu/components/Crest.jsx`.
No image file is needed. It renders in a light color (`color` prop, default
gold-soft) so it reads on the dark header and hero; pass a darker `color` if you
ever use it on a light background. If you later receive the official vector, you
can swap the paths in `Crest.jsx`.
