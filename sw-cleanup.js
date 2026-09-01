/* global self, caches */
/* Imported by the generated service worker.

   Runtime caches used to be named `static-v<build>+<sha>` (and likewise for
   images, pages and fonts), so every deploy created a fresh set and left the
   previous ones behind forever. Asset URLs now carry a ?v= build stamp instead,
   which lets the cache names stay stable — but the accumulated caches from the
   old scheme, and from the legacy hand-written sw.js, are still on visitors'
   machines. Delete anything we no longer use, once, on activate. */
(function () {
  "use strict";

  var KEEP = ["static", "images", "pages", "fonts"];

  self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then(function (names) {
        return Promise.all(names.map(function (name) {
          if (KEEP.indexOf(name) !== -1) return null;
          /* Workbox owns its own precache and cleans it up itself. */
          if (name.indexOf("precache") !== -1) return null;
          return caches.delete(name);
        }));
      })
    );
  });
})();
