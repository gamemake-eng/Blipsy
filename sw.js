importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);
const CACHE_NAME = `blipsy`;



workbox.core.setCacheNameDetails({
  prefix: CACHE_NAME,
  precache: "precache",
  runtime: "runtime"
})

workbox.routing.registerRoute(
    new RegExp('\.js$'),
    workbox.strategies.cacheFirst({
        cacheName: CACHE_NAME,
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 259200
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp('\.(png|svg|jpg|jpeg)$'),
    workbox.strategies.cacheFirst({
        cacheName: CACHE_NAME,
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 259200
            })
        ]
    })
);

workbox.skipWaiting();
workbox.clientsClaim();
workbox.precaching.addPlugins([
  new workbox.broadcastUpdate.Plugin('precache-channel')
])
workbox.precaching.precacheAndRoute([
      '/',
      '/blipsyworker.js',
      '/globals.js',
      '/preview.js',
      '/spritecanvas.js'
    ]);


// Use the install event to pre-cache all initial resources.
/*self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/blipsyworker.js',
      '/globals.js',
      '/preview.js',
      '/spritecanvas.js'
    ]);
  })());
});*/

/*self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});*/

