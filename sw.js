const CACHE_NAME = "casiguran-cache-v2";

/* Core files that always in-cache to run the site offline */
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

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


self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (!req.url.startsWith(self.location.origin)) return;
  if (req.method !== "GET") return;

  const isHTML = req.headers.get("accept")?.includes("text/html");

  if (isHTML) {
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