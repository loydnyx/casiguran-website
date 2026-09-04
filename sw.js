/* ═══════════════════════════════════════════════
   SW.JS — Service Worker para sa Discover Casiguran
   Cache-first para sa static assets, network-first
   para sa HTML pages (para laging updated kapag online,
   pero may fallback pa rin kapag offline).
═══════════════════════════════════════════════ */

const CACHE_NAME = "casiguran-cache-v1";

/* Core files na dapat laging naka-cache para gumana ang site offline */
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/spots.html",
  "/gallery.html",
  "/location.html",
  "/css/base.css",
  "/css/home.css",
  "/css/spots.css",
  "/css/gallery.css",
  "/css/location.css",
  "/js/common.js",
  "/js/home.js",
  "/js/spots.js",
  "/js/gallery.js",
  "/js/location.js",
  "/js/firebase-config.js",
  "/image/logo.png",
  "/image/logo2.png",
  "/image/Casiguran-Aurora-Logo.png",
];

/* ── INSTALL: i-cache ang core assets ─────────── */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

/* ── ACTIVATE: burahin ang mga lumang cache versions ─── */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

/* ── FETCH: network-first para sa HTML (laging fresh),
   cache-first para sa lahat ng iba (CSS/JS/images) ── */
self.addEventListener("fetch", (event) => {
  const req = event.request;

  /* Huwag i-cache ang Firebase, Google Maps, Gemini API, o external calls */
  if (!req.url.startsWith(self.location.origin)) return;
  if (req.method !== "GET") return;

  const isHTML = req.headers.get("accept")?.includes("text/html");

  if (isHTML) {
    /* Network-first: subukan munang kumuha online, fallback sa cache */
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("/index.html")))
    );
  } else {
    /* Cache-first para sa static assets (mas mabilis, tipid sa data) */
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        });
      })
    );
  }
});