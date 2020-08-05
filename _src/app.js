import * as search from "./components/search.js"
console.log("Udbjorg V1.0.3");


search.bootstrap_dom("#search-box", "#search-button", search.For, search.init());

// @ts-ignore
if (window.errorpage) {
    let query = decodeURI(location.pathname);
    let spilt = query.split("/");
    console.log(spilt[spilt.length])
    search.For(spilt[spilt.length], search.init())
        .then(results => {
            console.log(results)
        })
        .catch(_ => console.log(_));
}

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('/sw.js').then(function (registration) {
        if (registration.waiting && registration.waiting.state !== "installed") {
            document.location.reload(true);
            return;
        }
        registration.onupdatefound = function (event) {
            console.log("A new version has been found... Installing..." + this.state);
            registration.installing.onstatechange = function (event) {
                if (this.state === 'installed') {
                    document.location.reload(true);
                } else {
                    console.log("New Service Worker state: ", this.state);
                }
            };
        };
    }, function (err) {
        console.log(err);
    });
} else {
    console.log("No service worker :(");
}