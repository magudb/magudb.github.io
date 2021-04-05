import * as search from "./components/search.js"
console.log("Udbjorg V1.0.4");
(async ()=>{
    await search.bootstrap_dom("#search-box", "#search-button", search.For);
})()


// @ts-ignore
if (window.errorpage) {
    let path = decodeURI(location.pathname);
    let spilt = path.split("/");
    let query = spilt[spilt.length-1];
    console.log(query, index)
    search.For(query, index)
        .then(results => {
            console.log(results)
        })
        .catch(_ => console.log(_));
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/assets/js/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }