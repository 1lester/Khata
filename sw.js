const CACHE = 'khata-v2';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(async c => {
    await c.addAll(FILES);
    // jsPDF is optional: if it can't be fetched now it is cached on first use
    try { await c.add(new Request(CDN, { mode: 'no-cors' })); } catch (err) {}
  }));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // remove caches from older versions so updates actually reach users
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
