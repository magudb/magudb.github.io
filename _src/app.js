require("whatwg-fetch");
require('babel-core/register');
require('babel-polyfill');

import * as search from "./components/search.js"
import * as tracking from "./components/tracking.js"

tracking.for_google();
search.init().then((index)=>{
    search.bootstrap_dom("#search-box", "#search-button", search.For);
});
