# 🌊 Discover Casiguran

**A fan-made tourism website for Casiguran, Aurora, Philippines — showcasing hidden beaches, waterfalls, and landmarks through a modern, multilingual, PWA-enabled web experience.**

🔗 **Live Site:** [casiguran-website.netlify.app](https://casiguran-website.netlify.app)
📁 **Repo:** [github.com/loydnyx/casiguran-website](https://github.com/loydnyx/casiguran-website)

> ⚠️ **Disclaimer:** This is an independent, unofficial fan project built for portfolio and learning purposes. It is not affiliated with or endorsed by the Casiguran Municipal Tourism Office.

---

## 📖 Short Description

Discover Casiguran is a responsive, multi-page tourism website built to promote Casiguran, Aurora — a remote coastal municipality on the Pacific side of Luzon, Philippines. The site combines an AI-powered travel assistant, real-time visitor analytics, a bilingual (English/Filipino) interface, and offline-ready PWA support into a single, cohesive experience for prospective travelers.

What started as a single-file, hard-to-maintain prototype was rebuilt from the ground up into a modular, production-grade site — and then continuously improved with real-world features: video storytelling, search engine optimization, database security, and internationalization.

---

## 🛠️ Technologies

**Frontend**
- HTML5, CSS3 (Custom Properties, Grid, Flexbox, `clamp()` for fluid typography)
- Vanilla JavaScript (ES Modules) — no frontend framework
- Custom `data-i18n` attribute-based internationalization system (built from scratch)

**Backend / Serverless**
- Netlify Functions (Node.js, v2 API with Web Standard `Request`/`Response`)
- Google Gemini API (`gemini-2.5-flash`) — powers the AI travel guide chatbot

**Database**
- Firebase Realtime Database — likes, favorites, and visitor counters
- Custom security rules with delta-based validation (no auth required, abuse-resistant)

**Infrastructure & Hosting**
- Netlify (hosting, serverless functions, Netlify Forms, continuous deployment via GitHub)
- Git / GitHub (version control)

**Analytics & SEO**
- Google Analytics 4 (GA4)
- Google Search Console
- Open Graph + Twitter Card meta tags
- `sitemap.xml` + `robots.txt`

**PWA (Progressive Web App)**
- Web App Manifest (`manifest.json`)
- Custom Service Worker (`sw.js`) with network-first (HTML) / cache-first (assets) strategy
- Custom install banner using the `beforeinstallprompt` API

**Media**
- Google Earth Studio (custom flyover video, Manila → Casiguran)
- CapCut (video compression, background music)

---

## ✨ Features

### 🏠 Home
- Auto-rotating hero image slider with fade transitions
- Live weather widget (Open-Meteo API)
- Real-time visitor counter (Firebase Realtime Database)
- Expandable "About" section
- Featured destinations, best-time-to-visit calendar, photo gallery teaser, embedded map

### 🏖️ Tourist Spots
- Searchable, filterable spot directory (by category: Featured, Beach, Nature, Landmark)
- Detail modal per spot with embedded video (YouTube/Facebook)
- Firebase-backed **like/favorite system** with optimistic UI + heart animation

### 🖼️ Gallery
- Category-filtered masonry photo grid
- Custom lightbox with keyboard, swipe, and click navigation

### 📍 Location
- Custom **Google Earth Studio flyover video** hero (Manila → Bulawan → Casiguran → Parang Hills) with a manual sound toggle
- Tabbed Google Maps embeds (Town Center / Bay / Region)
- Sticky map layout on desktop, fully responsive on mobile
- Route options, seasonal guide, travel tips, nearby towns

### ✉️ Contact
- Inquiry form powered by **Netlify Forms** (no backend needed) with honeypot spam protection
- AJAX submission with inline success/error feedback

### 🤖 AI Travel Guide
- Gemini-powered chatbot answering questions about routes, seasons, and attractions
- Bilingual responses (Filipino/English)
- **Rate limiting**: 2-second client-side cooldown + server-side IP-based limit (10 msgs / 10 min)

### 🌐 Multi-language Support
- Full English ⇄ Filipino toggle across all 5 pages
- Persistent language preference via `localStorage`
- Custom-built `data-i18n` / `data-i18n-html` / `data-i18n-placeholder` translation engine

### 📲 Progressive Web App
- Installable on desktop and mobile (Add to Home Screen)
- Offline caching of core pages and assets
- Custom install banner with dismiss/remember logic

### 🔒 Security & Performance
- Firebase rules enforcing delta-only writes (±1 per like/visit) — abuse-resistant without requiring user auth
- `-webkit-` prefixed CSS for Safari/iOS compatibility (backdrop blur effects)
- Compressed video assets (61MB → 28MB)

### 📈 SEO & Analytics
- Per-page meta descriptions, Open Graph, and Twitter Card tags
- Google Search Console verified, sitemap submitted
- Google Analytics 4 real-time tracking

---

## 🚀 How to Deploy

### 1. Clone the repository
```bash
git clone https://github.com/loydnyx/casiguran-website.git
cd casiguran-website
```

### 2. Project structure
```
casiguran-website/
├── css/                  # base.css (shared) + per-page stylesheets
├── js/                   # i18n.js, common.js, firebase-config.js, per-page scripts
├── image/                # static images
├── video/                # trail flyover video
├── netlify/functions/    # chat.js (Gemini API proxy)
├── manifest.json         # PWA manifest
├── sw.js                 # Service worker
├── sitemap.xml
├── robots.txt
└── *.html                # index, spots, gallery, location, contact
```

### 3. Set up environment variables (Netlify dashboard)
| Variable | Description |
|---|---|
| `GEMINI_API_KEY` (or `GOOGLE_API_KEY`) | API key for the Gemini model, used by `netlify/functions/chat.js` |

> ⚠️ The variable name **must exactly match** what `chat.js` reads via `process.env.*` — a mismatch here is the most common cause of a broken AI chat widget.

### 4. Set up Firebase
- Create a Firebase project → enable **Realtime Database**
- Copy your config into `js/firebase-config.js`
- Apply the security rules (see `firebase-rules.json` if included, or the Security section below)

### 5. Set up Google Analytics
- Create a GA4 property → get your Measurement ID (`G-XXXXXXXXXX`)
- It's already wired into the `<head>` of every page — just confirm the ID matches yours

### 6. Deploy to Netlify
- Connect your GitHub repo to Netlify (enables continuous deployment)
- Every `git push` to `main` triggers an automatic rebuild
- Enable **Netlify Forms** (automatic once a form with `data-netlify="true"` is detected in the HTML)

### 7. Verify
- Check the AI chat widget responds correctly
- Check Firebase likes/visitor counters update
- Check PWA install prompt appears (Application tab in DevTools)
- Submit `sitemap.xml` in Google Search Console

---

## 🧭 The Process

This project didn't start clean — it started as a **monolithic prototype**: each page was a single HTML file with 1,500+ inline lines of CSS and JavaScript. Before any new feature could be added, the codebase needed a full **restructure**: shared styles and behavior (navbar, footer, chat widget) were extracted into `base.css` and `common.js`, while page-specific logic moved into its own file per page.

From there, development moved in iterative passes, each solving a real, observed problem rather than a hypothetical one:

1. **Fixing what was broken** — the AI chat widget had silently stopped working due to a mismatched environment variable name and a deprecated Gemini model reference.
2. **Adding a signature visual** — a custom Google Earth Studio flyover video was recorded, compressed, and wired into the Location page as a looping hero background, complete with a manual sound toggle (working around browser autoplay-with-audio restrictions).
3. **Making it installable and resilient** — a full PWA layer (manifest, service worker, install banner) was added so the site works offline and can be added to a phone's home screen — directly addressing a real pain point mentioned in the site's own content: spotty mobile signal in Casiguran.
4. **Making it discoverable** — SEO fundamentals (meta tags, sitemap, Search Console verification, Open Graph previews) were layered in so the site could actually be found via search and shared attractively on social platforms.
5. **Hardening the backend** — Firebase security rules were rewritten from a fully open read/write policy to one that validates data shape and enforces incremental (±1) changes only, closing off obvious abuse vectors without requiring user authentication.
6. **Going bilingual** — a custom internationalization system was built from scratch (no library), using `data-i18n` attributes and a JSON-like dictionary, to serve both English and Filipino-speaking visitors.
7. **Closing the loop with visitors** — a Contact page with a working inquiry form (via Netlify Forms) was added, giving interested travelers an actual way to reach out.

Throughout, debugging was done directly against the live, deployed site — reading DevTools Network/Console output, Firebase Rules Playground behavior, and Netlify deploy logs to diagnose real production issues (CSS cascade order bugs, stale service worker caches, Safari-specific rendering gaps) rather than guessing.

---

## 🎓 What I Learned

- **CSS cascade order is not optional knowledge** — a media query placed *before* the rule it's meant to override will silently lose, even if its condition matches. This caused a real, hard-to-spot mobile layout bug.
- **Service workers cache aggressively by design** — "cache-first" strategies mean code changes can appear to "not work" purely because the browser is still serving an old cached file. Cache versioning (`CACHE_NAME`) is essential for iterating quickly.
- **Browser autoplay policies shape UX decisions** — video-with-sound cannot autoplay; the correct pattern is muted autoplay + an explicit user-triggered unmute control.
- **Security doesn't require authentication** — Firebase Realtime Database rules can meaningfully reduce abuse (delta validation, shape validation) even for a fully public, login-free site.
- **Internationalization is an architectural decision, not a translation task** — building the `data-i18n` system revealed how much dynamically-generated content (like a JS-driven hero slider) needs to be explicitly designed to be language-aware; static translation alone isn't enough.
- **Cross-browser CSS support still requires vendor prefixes** — `backdrop-filter` silently fails on Safari/iOS without `-webkit-backdrop-filter`, even in 2026.
- **Real debugging beats guessing** — nearly every bug in this project was diagnosed using actual browser DevTools output (Network tab, Console errors, Application tab) rather than assumption.

---

## 📈 Overall Growth

This project shifted from "make a pretty tourism site" into something closer to a real, production-supported web application: it now has a security posture, an analytics pipeline, an internationalization system, offline support, and a documented deployment process — categories of work that don't show up in a first draft but define whether a site is actually *maintainable*.

The most valuable growth wasn't any single feature — it was the debugging loop itself: forming a hypothesis about *why* something broke (a stale cache, a cascade order issue, a missing validation rule), verifying it directly in DevTools, and only then writing the fix. That habit transfers to any web project, not just this one.

---

## 🔭 How It Can Be Improved

- [ ] **Image optimization** — convert `.jpg`/`.png` assets to `.webp` for faster load times (~25–35% smaller)
- [ ] **Complete i18n coverage** — a few dynamically-rendered strings (e.g., some chatbot UI feedback text) are still hardcoded and don't yet respond to the language toggle
- [ ] **Video hosting via Git LFS or external CDN** — the trail flyover video is currently committed directly to the repo; Git LFS or a dedicated video host would keep the repository lean
- [ ] **Testimonials / Reviews section** — social proof from real (or illustrative) visitors
- [ ] **Blog / Updates section** — for seasonal announcements, events, and long-form content (also helps SEO)
- [ ] **Automated Lighthouse CI** — catch PWA/performance/accessibility regressions automatically on each deploy
- [ ] **Firebase App Check** — an additional layer of abuse protection beyond the current rules-based validation
- [ ] **Accessibility audit** — deeper pass on ARIA labeling, focus management (especially in the modal and lightbox components), and color contrast

---

## 🙏 Acknowledgments

- Trail flyover video created with **Google Earth Studio**, edited in **CapCut**
- Weather data via **Open-Meteo API**
- Maps via **Google Maps Embed API**
- AI Guide powered by **Google Gemini**

---

## 📄 License

This is a personal portfolio project. Feel free to explore the code for learning purposes; please don't present it as an official Casiguran tourism resource.