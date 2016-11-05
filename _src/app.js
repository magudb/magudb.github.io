require("whatwg-fetch");
require('babel-core/register');
require('babel-polyfill');

import * as search from "./components/search.js"
import * as tracking from "./components/tracking.js"

tracking.for_google();
search.init().then((index) => {
    search.bootstrap_dom("#search-box", "#search-button", search.For);
});


if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // If this fires we should check if there's a new Service Worker
        // waiting to be activated. If so, ask the user to force refresh.
        if (registration.waiting && registration.waiting.state !== "installed") {
            document.location.reload(true);
            return;
        }

        // We should also start tracking for any updates to the Service Worker.
        registration.onupdatefound = function(event) {
            console.log("A new version has been found... Installing..." + this.state);
            // If an update is found the spec says that there is a new Service Worker
            // installing, so we should wait for that to complete then show a
            // notification to the user.
            registration.installing.onstatechange = function(event) {
                if (this.state === 'installed') {
                    document.location.reload(true);
                } else {
                    console.log("New Service Worker state: ", this.state);
                }
            };
        };
    }, function(err) {
        console.log(err);
    });
} else {
    console.log("No service worker :(");
}