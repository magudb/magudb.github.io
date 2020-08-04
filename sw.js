/* global self, caches, fetch, URL, Response */

var prefix = 'udbjorg';

var version = 2;
var previousVersion = version - 1;
var offline_version = "0.0.1";

var CACHE_NAME = `${prefix}-v${version}`;
var PREVIOUS_CACHE_NAME = `${prefix}-v${previousVersion}`;
var OFFLINE_PAGE = `/offline/offline-${offline_version}.html`;

var urlsToCache = [
    "/",
    "/assets/css/main.css",
    "/assets/js/app.js"
];
var ignoreUrl = function (url) {
    const uri = new URL(url); 
    return false;
};

self.addEventListener('fetch', function(event) {
    if (ignoreUrl(event.request.url) || event.request.method !== 'GET') {
        return;
    }
    
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        var fetchPromise = fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});


self.addEventListener('install', function (event) {
   
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function (event) {
    
    var cacheWhitelist = [CACHE_NAME, PREVIOUS_CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );

});