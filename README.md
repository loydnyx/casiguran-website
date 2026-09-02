# Discover Casiguran — restructured

## Bagong folder structure

```
casiguran/
├── index.html
├── spots.html
├── gallery.html
├── location.html
├── css/
│   ├── base.css        ← shared: navbar, footer, toast, back-to-top, AI chat widget
│   ├── home.css         ← index.html lang
│   ├── spots.css        ← spots.html lang
│   ├── gallery.css      ← gallery.html lang
│   └── location.css     ← location.html lang
├── js/
│   ├── common.js        ← shared: navbar, hamburger, announce bar, toast, AI chat
│   ├── firebase-config.js ← shared Firebase init (ginagamit ng home.js at spots.js)
│   ├── home.js           ← hero slider, weather, visitor counter (index.html)
│   ├── spots.js          ← search/filter, modal, likes (spots.html)
│   ├── gallery.js        ← filter, lightbox (gallery.html)
│   └── location.js       ← map tabs, fade-in (location.html)
├── netlify/
│   └── functions/
│       └── chat.js       ← AI chat backend (Gemini API)
└── image/                ← ilagay dito lahat ng larawan (see note sa baba)
```

Dati, halos 1,500–2,000+ lines ang bawat `.html` file dahil naka-inline lahat
ang CSS at JS. Ngayon, ~250–420 lines na lang bawat page, at ang mga common
na parte (navbar, footer, chat widget, atbp.) ay iisang beses na lang
nakasulat sa `css/base.css` at `js/common.js` — kaya kapag nag-edit ka ng
navbar o chat widget, sa isang file mo lang babaguhin, hindi na sa apat.

## Mga na-fix na bug

1. **AI Chat function hindi gumagana — dalawang dahilan:**
   - `netlify/functions/chat.js` dati ay may
     `export const config = { path: "/.netlify/functions/chat.js" };`
     Ito ang naging URL ng function — pero ang tawag mula sa frontend ay
     `/.netlify/functions/chat` (walang `.js`). Kaya laging 404 at
     bumabagsak sa catch block ("Oops! May problema sa koneksyon...").
     **Fix:** tinanggal ang custom `config.path` — default na Netlify path
     na lang (`/.netlify/functions/chat`, base sa filename), tugma na sa
     frontend calls.
   - Ang model na ginagamit, `gemini-2.0-flash`, ay **shinut down na ng
     Google noong June 1, 2026**, kaya kahit maayos ang path, mag-e-error
     pa rin ang Gemini API call. **Fix:** pinalitan ng `gemini-2.5-flash`
     (current stable model). Tandaan: Google's model lifecycle ay
     nagbabago-bago; kung sakaling mag-deprecate ulit ito, tingnan ang
     https://ai.google.dev/gemini-api/docs/models para sa pinakabagong
     model name.

2. **Broken images sa Netlify (case-sensitive filesystem):** tatlong
   larawan ang naka-lowercase sa code (`bulawan-falls.jpg`,
   `casapsapan-beach.jpg`, `tibu-tidal.jpg`) pero ang aktwal na filename sa
   `image/` folder ay may malaking unang letra
   (`Bulawan-Falls.jpg`, `Casapsapan-Beach.jpg`, `Tibu-Tidal.jpg`).
   Sa Windows/Mac okay lang ito kasi case-insensitive ang filesystem, pero
   sa Netlify (Linux, case-sensitive) hindi lumalabas ang mga larawang ito
   sa hero slider, highlights section, at gallery. **Fix:** itinama na ang
   lahat ng reference para tugma sa aktwal na filename.

3. **Duplicate function declaration** sa dating `spots.html` script
   (`function saveMine(o) {...}` na declared ng dalawang beses) — inayos
   na sa bagong `js/spots.js`.

## Paano i-deploy

1. I-upload ang buong `image/` folder mo papasok dito (gamitin ang
   **eksaktong case** ng filename gaya ng nasa iyong project — tignan ang
   listahan sa taas).
2. Siguraduhin na naka-set ang `GEMINI_API_KEY` environment variable sa
   Netlify site settings (Site settings → Environment variables).
3. I-push/deploy ang buong folder structure papunta sa Netlify — dapat
   parehong nasa root ang `index.html`/`css`/`js`/`image`, at ang
   `netlify/functions/chat.js` ay dapat manatili sa parehong path
   (Netlify auto-detects functions dito).
4. I-test ang AI chat widget — dapat may sagot na ito ngayon.
