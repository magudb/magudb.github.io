import * as search from "./components/search.js"
console.log("Udbjorg V1.0.4");
(async ()=>{
    await search.bootstrap_dom("#search-box", "#search-button");
})()


// @ts-ignore
if (window.errorpage) {
    let path = decodeURI(location.pathname);
    let spilt = path.split("/");
    let query = spilt[spilt.length-1];    
    search.For(query)
        .then(results => {
            console.log(results)
        })
        .catch(_ => console.log(_));
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }