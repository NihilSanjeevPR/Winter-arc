/* Winter Arc offline cache. Bump VERSION whenever a file changes. */
const VERSION = "wa-2026-11-19.1";
const FILES = [
  "./",
  "index.html",
  "config.js",
  "manifest.webmanifest",
  "vendor/supabase-2.117.3.js",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "fonts/ChakraPetch-SemiBold.woff2",
  "fonts/ChakraPetch-SemiBoldItalic.woff2",
  "fonts/ChakraPetch-BoldItalic.woff2",
  "fonts/DelaGothicOne-Regular.woff2",
  "fonts/MPLUS1p-Regular.woff2",
  "fonts/MPLUS1p-Medium.woff2",
  "fonts/MPLUS1p-Bold.woff2",
  "fonts/MPLUS1p-ExtraBold.woff2"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
/* Same-origin files: serve from cache at once, refresh the cache in the background.
   Anything else (the Supabase API) goes straight to the network. */
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== self.location.origin) return;
  e.respondWith(caches.open(VERSION).then(c => c.match(e.request, {ignoreSearch: true}).then(hit => {
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  })));
});
