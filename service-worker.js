// self.addEventListener("fetch", function(event) {
//   const a = fetch(event.request).catch(function(error) {
//     console.log("[Service Worker] Network request Failed. Serving content from cache: " + error);
//     //Check to see if you have it in the cache
//     //Return response
//     //If not in the cache, then return error page
//     return caches
//       .open("sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh")
//       .then(function(cache) {
//         return cache.match(event.request).then(function(matching) {
//           var report =
//             !matching || matching.status == 404
//               ? Promise.reject("no-match")
//               : matching;
//           return report;
//         });
//       });
//   });
//   event.respondWith(a);
// });

self.addEventListener('install', event => {
    console.log('[SV]', event);
    event.waitUntil(
        caches.open('airhorner').then(cache => {
            return cache.addAll([
                '/',
                '/?utm_source=homescreen',
                '/Home/About',
                '/Home/Index',
                '/Home/Contact'
            ]).then(() => self.skipWaiting());
        })
    )
});

self.addEventListener('activate', event => {
    console.log('[SV]', event);
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    console.log('[SV]', event);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
