// self.addEventListener("fetch", function (event) {
//     event.respondWith(
//         fetch(event.request)
//             .catch(function (error) {
//                 console.log("[Service Worker] Network request Failed. Serving content from cache: " + error);
//                 //Check to see if you have it in the cache
//                 //Return response
//                 //If not in the cache, then return error page
//                 return caches
//                     .open("sw-precache-v3-sw-precache-webpack-plugin-https://silent-things.surge.sh")
//                     .then(function (cache) {
//                         return cache
//                             .match(event.request)
//                             .then(function (matching) {
//                                 const match = matching.status == 404
//                                     ? Promise.reject("no-match")
//                                     : matching;
//                                 return !matching || match;
//                             });
//                     });
//             })
//     );
// });

/**
 * 
 */
self.addEventListener('install', event => {
    // console.log('[SV install]', event);
    // event.waitUntil(
    //     caches.open('airhorner').then(cache => {
    //         return cache.addAll([
    //             '/',
    //             '/?utm_source=homescreen',
    //             '/Home/About',
    //             '/Home/Index',
    //             '/Home/Contact'
    //         ]).then(() => self.skipWaiting());
    //     })
    // );
});

/**
 * 
 */
self.addEventListener('activate', event => {
    // console.log('[SV activate]', event);
    // event.waitUntil(self.clients.claim());
});

/**
 * 
 */
self.addEventListener('fetch', event => {
    // console.log('[SV fetch]', event);
    // const cache = caches.match(event.request).then(response => {
    //     caches.add();
    //     return response;
    // });
    event.respondWith(
        caches
            .match(event.request)
            .then(response => response || fetch(event.request))
    );
});
