require("whatwg-fetch");
require('babel-core/register');
require('babel-polyfill');

import * as search from "./components/search.js"
import * as tracking from "./components/tracking.js"

tracking.for_google();
search.init().then((index) => {
    search.bootstrap_dom("#search-box", "#search-button", search.For);
});

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {

    Array.prototype.forEach = function(callback, thisArg) {

        var T, k;

        if (this === null) {
            throw new TypeError(' this is null or not defined');
        }

        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);

        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;

        // 4. If isCallable(callback) is false, throw a TypeError exception. 
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = thisArg;
        }

        // 6. Let k be 0
        k = 0;

        // 7. Repeat, while k < len
        while (k < len) {

            var kValue;

            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c
            // c. If kPresent is true, then
            if (k in O) {

                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];

                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined
    };
}


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