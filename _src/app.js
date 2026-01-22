import * as search from "./components/search.js"

// Version injected by webpack at build time
// eslint-disable-next-line no-undef
console.log(`Udbjorg ${__APP_VERSION__}`);

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
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
  }