/* Valeria service worker: offline cache. Bump VERSION on every release.
 * Music/ is not cached (large files, audio range requests): background music needs the network. */
const VERSION = 'valeria-v5';
importScripts('js/data/portraits.js');
const FILES = [
  './', 'index.html', 'manifest.json', 'icons/icon.svg', 'css/style.css',
  'js/i18n.js', 'js/lang/en.js', 'js/lang/fr.js',
  'js/data/traits.js', 'js/data/events.js', 'js/data/pools.js', 'js/data/map.js', 'js/data/portraits.js',
  'js/data/origins.js', 'js/data/talk.js', 'js/data/body.js', 'js/data/books.js', 'js/data/music.js',
  'js/store.js', 'js/bot.js', 'js/gen.js', 'js/effects.js', 'js/map.js', 'js/library.js', 'js/home.js',
  'js/suggest.js', 'js/labs.js', 'js/sound.js', 'js/app.js'
].concat(self.Valeria.PORTRAITS || []);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || e.request.url.includes('/Music/')) return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request)));
});
