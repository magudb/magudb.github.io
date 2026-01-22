import * as search from "./components/search.js"

// Initialize search on page load
(async () => {
  await search.bootstrap_dom("#search-box", "#search-button");
})();
