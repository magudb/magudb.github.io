!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}var o=n(2),i=r(o);if(console.log("Udbjorg V1.0.4"),i.init().then(function(t){i.bootstrap_dom("#search-box","#search-button",i.For)}),window.errorpage){var s=decodeURI(location.pathname),a=s.split("/"),c=a[a.length-1];console.log(c,index),i.For(c,index).then(function(t){console.log(t)}).catch(function(t){return console.log(t)})}"serviceWorker"in navigator?navigator.serviceWorker.register("/sw.js").then(function(t){return t.waiting&&"installed"!==t.waiting.state?void document.location.reload(!0):void(t.onupdatefound=function(e){console.log("A new version has been found... Installing..."+this.state),t.installing.onstatechange=function(t){"installed"===this.state?document.location.reload(!0):console.log("New Service Worker state: ",this.state)}})},function(t){console.log(t)}):console.log("No service worker :(")},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(){var t=document.querySelector("#search-results");return t?fetch("/search.json").then(function(t){return t.json()}).then(function(t){return index=new c.default(t,options),index}).catch(function(t){return console.log(t)}):new Promise(function(t,e){t()})}function i(t){var e=index.search(t);return e.length<1?'<article class="post-item">       \n        <div class="article-title">Could not find anything with <em>'+t+"</em></div>\n      </article>":e.map(function(e){return e.value=t,p(e)}).join("\r\n")}function s(t,e,n){var r=document.querySelector(t),o=document.querySelector("#search"),i=document.querySelector(e),s=document.querySelector("#search-results"),a=l.default.parse(location.search);if(a.searched){var c=new f.default(document.querySelector(".post"));return void c.mark(a.searched,{accuracy:"complementary",debug:!0})}if(a.query){var u=n(a.query);r.value=a.query,o.value=a.query,d(s).then(function(t){s.innerHTML=u}).catch(function(t){return console.log(t)})}i&&i.addEventListener("click",function(t){t.preventDefault();var e=n(r.value);d(s).then(function(t){s.innerHTML=e}).catch(function(t){return console.log(t)})})}Object.defineProperty(e,"__esModule",{value:!0}),e.init=o,e.For=i,e.bootstrap_dom=s;var a=n(3),c=r(a),u=n(4),l=r(u),h=n(7),f=r(h);n(8);var p=function(t){return'<article class="post-item">\n        <span class="post-meta date-label">'+t.date+'</span>\n        <div class="article-title"><span class="badge-default"><a href="/categories#'+t.category+'">'+t.category+'</a></span>  <a class="post-link" href="'+t.url+"?searched="+t.value+'">'+t.title+"</a></div>\n      </article>"},d=function(t){return new Promise(function(e,n){return Array.prototype.slice.call(document.querySelectorAll(".post-item")).forEach(function(e){console.log(e),e.animate("animated fadeOut").then(function(e){t.removeChild(e)}).catch(function(t){return console.log(t)})}),e(t)})}},function(t,e,n){var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(i){"use strict";function s(){console.log.apply(console,arguments)}function a(t,e){var n;this.list=t,this.options=e=e||{};for(n in h)h.hasOwnProperty(n)&&("boolean"==typeof h[n]?this.options[n]=n in e?e[n]:h[n]:this.options[n]=e[n]||h[n])}function c(t,e,n){var r,o,i,s,a,l;if(e){if(i=e.indexOf("."),i!==-1?(r=e.slice(0,i),o=e.slice(i+1)):r=e,s=t[r],null!==s&&void 0!==s)if(o||"string"!=typeof s&&"number"!=typeof s)if(u(s))for(a=0,l=s.length;a<l;a++)c(s[a],o,n);else o&&c(s,o,n);else n.push(s)}else n.push(t);return n}function u(t){return"[object Array]"===Object.prototype.toString.call(t)}function l(t,e){e=e||{},this.options=e,this.options.location=e.location||l.defaultOptions.location,this.options.distance="distance"in e?e.distance:l.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:l.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||l.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}var h={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:l,sortFn:function(t,e){return t.score-e.score},getFn:c,keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g,minMatchCharLength:1,findAllMatches:!1};a.VERSION="2.7.3",a.prototype.set=function(t){return this.list=t,t},a.prototype.search=function(t){this.options.verbose&&s("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort();var e=this._format();return e},a.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,n=t.searchFn,r=e.split(t.tokenSeparator),o=0,i=r.length;if(this.options.tokenize)for(this.tokenSearchers=[];o<i;o++)this.tokenSearchers.push(new n(r[o],t));this.fullSeacher=new n(e,t)},a.prototype._startSearch=function(){var t,e,n,r,o=this.options,i=o.getFn,s=this.list,a=s.length,c=this.options.keys,u=c.length,l=null;if("string"==typeof s[0])for(n=0;n<a;n++)this._analyze("",s[n],n,n);else for(this._keyMap={},n=0;n<a;n++)for(l=s[n],r=0;r<u;r++){if(t=c[r],"string"!=typeof t){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,i(l,t,[]),l,n)}},a.prototype._analyze=function(t,e,n,r){var o,i,a,c,l,h,f,p,d,y,v,g,m,b,k,x=this.options,S=!1;if(void 0!==e&&null!==e){i=[];var E=0;if("string"==typeof e){if(o=e.split(x.tokenSeparator),x.verbose&&s("---------\nKey:",t),this.options.tokenize){for(b=0;b<this.tokenSearchers.length;b++){for(p=this.tokenSearchers[b],x.verbose&&s("Pattern:",p.pattern),d=[],g=!1,k=0;k<o.length;k++){y=o[k],v=p.search(y);var w={};v.isMatch?(w[y]=v.score,S=!0,g=!0,i.push(v.score)):(w[y]=1,this.options.matchAllTokens||i.push(1)),d.push(w)}g&&E++,x.verbose&&s("Token scores:",d)}for(c=i[0],h=i.length,b=1;b<h;b++)c+=i[b];c/=h,x.verbose&&s("Token score average:",c)}f=this.fullSeacher.search(e),x.verbose&&s("Full text score:",f.score),l=f.score,void 0!==c&&(l=(l+c)/2),x.verbose&&s("Score average:",l),m=!this.options.tokenize||!this.options.matchAllTokens||E>=this.tokenSearchers.length,x.verbose&&s("Check Matches",m),(S||f.isMatch)&&m&&(a=this.resultMap[r],a?a.output.push({key:t,score:l,matchedIndices:f.matchedIndices}):(this.resultMap[r]={item:n,output:[{key:t,score:l,matchedIndices:f.matchedIndices}]},this.results.push(this.resultMap[r])))}else if(u(e))for(b=0;b<e.length;b++)this._analyze(t,e[b],n,r)}},a.prototype._computeScore=function(){var t,e,n,r,o,i,a,c,u,l=this._keyMap,h=this.results;for(this.options.verbose&&s("\n\nComputing score:\n"),t=0;t<h.length;t++){for(n=0,r=h[t].output,o=r.length,c=1,e=0;e<o;e++)i=r[e].score,a=l?l[r[e].key].weight:1,u=i*a,1!==a?c=Math.min(c,u):(n+=u,r[e].nScore=u);1===c?h[t].score=n/o:h[t].score=c,this.options.verbose&&s(h[t])}},a.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&s("\n\nSorting...."),this.results.sort(t.sortFn))},a.prototype._format=function(){var t,e,n,r,o=this.options,i=o.getFn,a=[],c=this.results,u=o.include;for(o.verbose&&s("\n\nOutput:\n\n",c),n=o.id?function(t){c[t].item=i(c[t].item,o.id,[])[0]}:function(){},r=function(t){var e,n,r,o,i,s=c[t];if(u.length>0){if(e={item:s.item},u.indexOf("matches")!==-1)for(r=s.output,e.matches=[],n=0;n<r.length;n++)o=r[n],i={indices:o.matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);u.indexOf("score")!==-1&&(e.score=c[t].score)}else e=s.item;return e},t=0,e=c.length;t<e;t++)n(t),a.push(r(t));return a},l.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},l.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},l.prototype._bitapScore=function(t,e){var n=t/this.patternLen,r=Math.abs(this.options.location-e);return this.options.distance?n+r/this.options.distance:r?1:n},l.prototype.search=function(t){var e,n,r,o,i,s,a,c,u,l,h,f,p,d,y,v,g,m,b,k,x,S,E,w=this.options;if(t=w.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>w.maxPatternLength){if(m=t.match(new RegExp(this.pattern.replace(w.tokenSeparator,"|"))),b=!!m)for(x=[],e=0,S=m.length;e<S;e++)E=m[e],x.push([t.indexOf(E),E.length-1]);return{isMatch:b,score:b?.5:1,matchedIndices:x}}for(o=w.findAllMatches,i=w.location,r=t.length,s=w.threshold,a=t.indexOf(this.pattern,i),k=[],e=0;e<r;e++)k[e]=0;for(a!=-1&&(s=Math.min(this._bitapScore(0,a),s),a=t.lastIndexOf(this.pattern,i+this.patternLen),a!=-1&&(s=Math.min(this._bitapScore(0,a),s))),a=-1,v=1,g=[],l=this.patternLen+r,e=0;e<this.patternLen;e++){for(c=0,u=l;c<u;)this._bitapScore(e,i+u)<=s?c=u:l=u,u=Math.floor((l-c)/2+c);for(l=u,h=Math.max(1,i-u+1),f=o?r:Math.min(i+u,r)+this.patternLen,p=Array(f+2),p[f+1]=(1<<e)-1,n=f;n>=h;n--)if(y=this.patternAlphabet[t.charAt(n-1)],y&&(k[n-1]=1),p[n]=(p[n+1]<<1|1)&y,0!==e&&(p[n]|=(d[n+1]|d[n])<<1|1|d[n+1]),p[n]&this.matchmask&&(v=this._bitapScore(e,n-1),v<=s)){if(s=v,a=n-1,g.push(a),a<=i)break;h=Math.max(1,2*i-a)}if(this._bitapScore(e+1,i)>s)break;d=p}return x=this._getMatchedIndices(k),{isMatch:a>=0,score:0===v?.001:v,matchedIndices:x}},l.prototype._getMatchedIndices=function(t){for(var e,n=[],r=-1,o=-1,i=0,s=t.length;i<s;i++)e=t[i],e&&r===-1?r=i:e||r===-1||(o=i-1,o-r+1>=this.options.minMatchCharLength&&n.push([r,o]),r=-1);return t[i-1]&&i-1-r+1>=this.options.minMatchCharLength&&n.push([r,i-1]),n},"object"===o(e)?t.exports=a:(r=function(){return a}.call(e,n,e,t),!(void 0!==r&&(t.exports=r)))}(void 0)},function(t,e,n){"use strict";function r(t){switch(t.arrayFormat){case"index":return function(e,n,r){return null===n?[i(e,t),"[",r,"]"].join(""):[i(e,t),"[",i(r,t),"]=",i(n,t)].join("")};case"bracket":return function(e,n){return null===n?i(e,t):[i(e,t),"[]=",i(n,t)].join("")};default:return function(e,n){return null===n?i(e,t):[i(e,t),"=",i(n,t)].join("")}}}function o(t){var e;switch(t.arrayFormat){case"index":return function(t,n,r){return e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===r[t]&&(r[t]={}),void(r[t][e[1]]=n)):void(r[t]=n)};case"bracket":return function(t,n,r){return e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0===r[t]?void(r[t]=[n]):void(r[t]=[].concat(r[t],n)):void(r[t]=n)};default:return function(t,e,n){return void 0===n[t]?void(n[t]=e):void(n[t]=[].concat(n[t],e))}}}function i(t,e){return e.encode?e.strict?c(t):encodeURIComponent(t):t}function s(t){return Array.isArray(t)?t.sort():"object"===("undefined"==typeof t?"undefined":a(t))?s(Object.keys(t)).sort(function(t,e){return Number(t)-Number(e)}).map(function(e){return t[e]}):t}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=n(5),u=n(6);e.extract=function(t){return t.split("?")[1]||""},e.parse=function(t,e){e=u({arrayFormat:"none"},e);var n=o(e),r=Object.create(null);return"string"!=typeof t?r:(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var e=t.replace(/\+/g," ").split("="),o=e.shift(),i=e.length>0?e.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),n(decodeURIComponent(o),i,r)}),Object.keys(r).sort().reduce(function(t,e){var n=r[e];return Boolean(n)&&"object"===("undefined"==typeof n?"undefined":a(n))&&!Array.isArray(n)?t[e]=s(n):t[e]=n,t},Object.create(null))):r},e.stringify=function(t,e){var n={encode:!0,strict:!0,arrayFormat:"none"};e=u(n,e);var o=r(e);return t?Object.keys(t).sort().map(function(n){var r=t[n];if(void 0===r)return"";if(null===r)return i(n,e);if(Array.isArray(r)){var s=[];return r.slice().forEach(function(t){void 0!==t&&s.push(o(n,t,s.length))}),s.join("&")}return i(n,e)+"="+i(r,e)}).filter(function(t){return t.length>0}).join("&"):""}},function(t,e){"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}},function(t,e){/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
"use strict";function n(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function r(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;var r=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==r.join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(t){o[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(t){return!1}}var o=Object.getOwnPropertySymbols,i=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=r()?Object.assign:function(t,e){for(var r,a,c=n(t),u=1;u<arguments.length;u++){r=Object(arguments[u]);for(var l in r)i.call(r,l)&&(c[l]=r[l]);if(o){a=o(r);for(var h=0;h<a.length;h++)s.call(r,a[h])&&(c[a[h]]=r[a[h]])}}return c}},function(t,e,n){var r,o,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};/*!***************************************************
	* mark.js v8.11.1
	* https://markjs.io/
	* Copyright (c) 2014–2018, Julian Kühnel
	* Released under the MIT license https://git.io/vwTVl
	*****************************************************/
!function(s,a){"object"===i(e)&&"undefined"!=typeof t?t.exports=a():(r=a,o="function"==typeof r?r.call(e,n,e,t):r,!(void 0!==o&&(t.exports=o)))}(void 0,function(){"use strict";function t(t){var e=this,n=new a(t);return this.mark=function(t,r){return n.mark(t,r),e},this.markRegExp=function(t,r){return n.markRegExp(t,r),e},this.markRanges=function(t,r){return n.markRanges(t,r),e},this.unmark=function(t){return n.unmark(t),e},this}var e="function"==typeof Symbol&&"symbol"===i(Symbol.iterator)?function(t){return"undefined"==typeof t?"undefined":i(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":"undefined"==typeof t?"undefined":i(t)},n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},s=function(){function t(e){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;n(this,t),this.ctx=e,this.iframes=r,this.exclude=o,this.iframesTimeout=i}return r(t,[{key:"getContexts",value:function(){var t=void 0,e=[];return t="undefined"!=typeof this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[],t.forEach(function(t){var n=e.filter(function(e){return e.contains(t)}).length>0;e.indexOf(t)!==-1||n||e.push(t)}),e}},{key:"getIframeContents",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var o=t.contentWindow;if(r=o.document,!o||!r)throw new Error("iframe inaccessible")}catch(t){n()}r&&e(r)}},{key:"isIframeBlank",value:function(t){var e="about:blank",n=t.getAttribute("src").trim(),r=t.contentWindow.location.href;return r===e&&n!==e&&n}},{key:"observeIframeLoad",value:function(t,e,n){var r=this,o=!1,i=null,s=function s(){if(!o){o=!0,clearTimeout(i);try{r.isIframeBlank(t)||(t.removeEventListener("load",s),r.getIframeContents(t,e,n))}catch(t){n()}}};t.addEventListener("load",s),i=setTimeout(s,this.iframesTimeout)}},{key:"onIframeReady",value:function(t,e,n){try{"complete"===t.contentWindow.document.readyState?this.isIframeBlank(t)?this.observeIframeLoad(t,e,n):this.getIframeContents(t,e,n):this.observeIframeLoad(t,e,n)}catch(t){n()}}},{key:"waitForIframes",value:function(t,e){var n=this,r=0;this.forEachIframe(t,function(){return!0},function(t){r++,n.waitForIframes(t.querySelector("html"),function(){--r||e()})},function(t){t||e()})}},{key:"forEachIframe",value:function(e,n,r){var o=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},s=e.querySelectorAll("iframe"),a=s.length,c=0;s=Array.prototype.slice.call(s);var u=function(){--a<=0&&i(c)};a||u(),s.forEach(function(e){t.matches(e,o.exclude)?u():o.onIframeReady(e,function(t){n(e)&&(c++,r(t)),u()},u)})}},{key:"createIterator",value:function(t,e,n){return document.createNodeIterator(t,e,n,!1)}},{key:"createInstanceOnIframe",value:function(e){return new t(e.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(t,e,n){var r=t.compareDocumentPosition(n),o=Node.DOCUMENT_POSITION_PRECEDING;if(r&o){if(null===e)return!0;var i=e.compareDocumentPosition(n),s=Node.DOCUMENT_POSITION_FOLLOWING;if(i&s)return!0}return!1}},{key:"getIteratorNode",value:function(t){var e=t.previousNode(),n=void 0;return n=null===e?t.nextNode():t.nextNode()&&t.nextNode(),{prevNode:e,node:n}}},{key:"checkIframeFilter",value:function(t,e,n,r){var o=!1,i=!1;return r.forEach(function(t,e){t.val===n&&(o=e,i=t.handled)}),this.compareNodeIframe(t,e,n)?(o!==!1||i?o===!1||i||(r[o].handled=!0):r.push({val:n,handled:!0}),!0):(o===!1&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(t,e,n,r){var o=this;t.forEach(function(t){t.handled||o.getIframeContents(t.val,function(t){o.createInstanceOnIframe(t).forEachNode(e,n,r)})})}},{key:"iterateThroughNodes",value:function(t,e,n,r,o){for(var i=this,s=this.createIterator(e,t,r),a=[],c=[],u=void 0,l=void 0,h=function(){var t=i.getIteratorNode(s);return l=t.prevNode,u=t.node};h();)this.iframes&&this.forEachIframe(e,function(t){return i.checkIframeFilter(u,l,t,a)},function(e){i.createInstanceOnIframe(e).forEachNode(t,function(t){return c.push(t)},r)}),c.push(u);c.forEach(function(t){n(t)}),this.iframes&&this.handleOpenIframes(a,t,n,r),o()}},{key:"forEachNode",value:function(t,e,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},i=this.getContexts(),s=i.length;s||o(),i.forEach(function(i){var a=function(){r.iterateThroughNodes(t,i,e,n,function(){--s<=0&&o()})};r.iframes?r.waitForIframes(i,a):a()})}}],[{key:"matches",value:function(t,e){var n="string"==typeof e?[e]:e,r=t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;if(r){var o=!1;return n.every(function(e){return!r.call(t,e)||(o=!0,!1)}),o}return!1}}]),t}(),a=function(){function t(e){n(this,t),this.ctx=e,this.ie=!1;var r=window.navigator.userAgent;(r.indexOf("MSIE")>-1||r.indexOf("Trident")>-1)&&(this.ie=!0)}return r(t,[{key:"log",value:function t(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"debug",t=this.opt.log;this.opt.debug&&"object"===("undefined"==typeof t?"undefined":e(t))&&"function"==typeof t[r]&&t[r]("mark.js: "+n)}},{key:"escapeStr",value:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(t){return"disabled"!==this.opt.wildcards&&(t=this.setupWildcardsRegExp(t)),t=this.escapeStr(t),Object.keys(this.opt.synonyms).length&&(t=this.createSynonymsRegExp(t)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),this.opt.diacritics&&(t=this.createDiacriticsRegExp(t)),t=this.createMergedBlanksRegExp(t),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.createJoinersRegExp(t)),"disabled"!==this.opt.wildcards&&(t=this.createWildcardsRegExp(t)),t=this.createAccuracyRegExp(t)}},{key:"createSynonymsRegExp",value:function(t){var e=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var o in e)if(e.hasOwnProperty(o)){var i=e[o],s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o),a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i);""!==s&&""!==a&&(t=t.replace(new RegExp("("+this.escapeStr(s)+"|"+this.escapeStr(a)+")","gm"+n),r+("("+this.processSynomyms(s)+"|")+(this.processSynomyms(a)+")")+r))}return t}},{key:"processSynomyms",value:function(t){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),t}},{key:"setupWildcardsRegExp",value:function(t){return t=t.replace(/(?:\\)*\?/g,function(t){return"\\"===t.charAt(0)?"?":""}),t.replace(/(?:\\)*\*/g,function(t){return"\\"===t.charAt(0)?"*":""})}},{key:"createWildcardsRegExp",value:function(t){var e="withSpaces"===this.opt.wildcards;return t.replace(/\u0001/g,e?"[\\S\\s]?":"\\S?").replace(/\u0002/g,e?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(t){return t.replace(/[^(|)\\]/g,function(t,e,n){var r=n.charAt(e+1);return/[(|)\\]/.test(r)||""===r?t:t+"\0"})}},{key:"createJoinersRegExp",value:function(t){var e=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&e.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&e.push("\\u00ad\\u200b\\u200c\\u200d"),e.length?t.split(/\u0000+/).join("["+e.join("")+"]*"):t}},{key:"createDiacriticsRegExp",value:function(t){var e=this.opt.caseSensitive?"":"i",n=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],r=[];return t.split("").forEach(function(o){n.every(function(n){if(n.indexOf(o)!==-1){if(r.indexOf(n)>-1)return!1;t=t.replace(new RegExp("["+n+"]","gm"+e),"["+n+"]"),r.push(n)}return!0})}),t}},{key:"createMergedBlanksRegExp",value:function(t){return t.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(t){var e=this,n="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿",r=this.opt.accuracy,o="string"==typeof r?r:r.value,i="string"==typeof r?[]:r.limiters,s="";switch(i.forEach(function(t){s+="|"+e.escapeStr(t)}),o){case"partially":default:return"()("+t+")";case"complementary":return s="\\s"+(s?s:this.escapeStr(n)),"()([^"+s+"]*"+t+"[^"+s+"]*)";case"exactly":return"(^|\\s"+s+")("+t+")(?=$|\\s"+s+")"}}},{key:"getSeparatedKeywords",value:function(t){var e=this,n=[];return t.forEach(function(t){e.opt.separateWordSearch?t.split(" ").forEach(function(t){t.trim()&&n.indexOf(t)===-1&&n.push(t)}):t.trim()&&n.indexOf(t)===-1&&n.push(t)}),{keywords:n.sort(function(t,e){return e.length-t.length}),length:n.length}}},{key:"isNumeric",value:function(t){return Number(parseFloat(t))==t}},{key:"checkRanges",value:function(t){var e=this;if(!Array.isArray(t)||"[object Object]"!==Object.prototype.toString.call(t[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(t),[];var n=[],r=0;return t.sort(function(t,e){return t.start-e.start}).forEach(function(t){var o=e.callNoMatchOnInvalidRanges(t,r),i=o.start,s=o.end,a=o.valid;a&&(t.start=i,t.length=s-i,n.push(t),r=s)}),n}},{key:"callNoMatchOnInvalidRanges",value:function(t,e){var n=void 0,r=void 0,o=!1;return t&&"undefined"!=typeof t.start?(n=parseInt(t.start,10),r=n+parseInt(t.length,10),this.isNumeric(t.start)&&this.isNumeric(t.length)&&r-e>0&&r-n>0?o=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(t)),this.opt.noMatch(t))):(this.log("Ignoring invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:n,end:r,valid:o}}},{key:"checkWhitespaceRanges",value:function(t,e,n){var r=void 0,o=!0,i=n.length,s=e-i,a=parseInt(t.start,10)-s;return a=a>i?i:a,r=a+parseInt(t.length,10),r>i&&(r=i,this.log("End range automatically set to the max value of "+i)),a<0||r-a<0||a>i||r>i?(o=!1,this.log("Invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)):""===n.substring(a,r).replace(/\s+/g,"")&&(o=!1,this.log("Skipping whitespace only range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:a,end:r,valid:o}}},{key:"getTextNodes",value:function(t){var e=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,function(t){r.push({start:n.length,end:(n+=t.textContent).length,node:t})},function(t){return e.matchesExclude(t.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},function(){t({value:n,nodes:r})})}},{key:"matchesExclude",value:function(t){return s.matches(t,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(t,e,n){var r=this.opt.element?this.opt.element:"mark",o=t.splitText(e),i=o.splitText(n-e),s=document.createElement(r);return s.setAttribute("data-markjs","true"),this.opt.className&&s.setAttribute("class",this.opt.className),s.textContent=o.textContent,o.parentNode.replaceChild(s,o),i}},{key:"wrapRangeInMappedTextNode",value:function(t,e,n,r,o){var i=this;t.nodes.every(function(s,a){var c=t.nodes[a+1];if("undefined"==typeof c||c.start>e){if(!r(s.node))return!1;var u=e-s.start,l=(n>s.end?s.end:n)-s.start,h=t.value.substr(0,s.start),f=t.value.substr(l+s.start);if(s.node=i.wrapRangeInTextNode(s.node,u,l),t.value=h+f,t.nodes.forEach(function(e,n){n>=a&&(t.nodes[n].start>0&&n!==a&&(t.nodes[n].start-=l),t.nodes[n].end-=l)}),n-=l,o(s.node.previousSibling,s.start),!(n>s.end))return!1;e=s.end}return!0})}},{key:"wrapMatches",value:function(t,e,n,r,o){var i=this,s=0===e?0:e+1;this.getTextNodes(function(e){e.nodes.forEach(function(e){e=e.node;for(var o=void 0;null!==(o=t.exec(e.textContent))&&""!==o[s];)if(n(o[s],e)){var a=o.index;if(0!==s)for(var c=1;c<s;c++)a+=o[c].length;e=i.wrapRangeInTextNode(e,a,a+o[s].length),r(e.previousSibling),t.lastIndex=0}}),o()})}},{key:"wrapMatchesAcrossElements",value:function(t,e,n,r,o){var i=this,s=0===e?0:e+1;this.getTextNodes(function(e){for(var a=void 0;null!==(a=t.exec(e.value))&&""!==a[s];){var c=a.index;if(0!==s)for(var u=1;u<s;u++)c+=a[u].length;var l=c+a[s].length;i.wrapRangeInMappedTextNode(e,c,l,function(t){return n(a[s],t)},function(e,n){t.lastIndex=n,r(e)})}o()})}},{key:"wrapRangeFromIndex",value:function(t,e,n,r){var o=this;this.getTextNodes(function(i){var s=i.value.length;t.forEach(function(t,r){var a=o.checkWhitespaceRanges(t,s,i.value),c=a.start,u=a.end,l=a.valid;l&&o.wrapRangeInMappedTextNode(i,c,u,function(n){return e(n,t,i.value.substring(c,u),r)},function(e){n(e,t)})}),r()})}},{key:"unwrapMatches",value:function(t){for(var e=t.parentNode,n=document.createDocumentFragment();t.firstChild;)n.appendChild(t.removeChild(t.firstChild));e.replaceChild(n,t),this.ie?this.normalizeTextNode(e):e.normalize()}},{key:"normalizeTextNode",value:function(t){if(t){if(3===t.nodeType)for(;t.nextSibling&&3===t.nextSibling.nodeType;)t.nodeValue+=t.nextSibling.nodeValue,t.parentNode.removeChild(t.nextSibling);else this.normalizeTextNode(t.firstChild);this.normalizeTextNode(t.nextSibling)}}},{key:"markRegExp",value:function(t,e){var n=this;this.opt=e,this.log('Searching with expression "'+t+'"');var r=0,o="wrapMatches",i=function(t){r++,n.opt.each(t)};this.opt.acrossElements&&(o="wrapMatchesAcrossElements"),this[o](t,this.opt.ignoreGroups,function(t,e){return n.opt.filter(e,t,r)},i,function(){0===r&&n.opt.noMatch(t),n.opt.done(r)})}},{key:"mark",value:function(t,e){var n=this;this.opt=e;var r=0,o="wrapMatches",i=this.getSeparatedKeywords("string"==typeof t?[t]:t),s=i.keywords,a=i.length,c=this.opt.caseSensitive?"":"i",u=function t(e){var i=new RegExp(n.createRegExp(e),"gm"+c),u=0;n.log('Searching with expression "'+i+'"'),n[o](i,1,function(t,o){return n.opt.filter(o,e,r,u)},function(t){u++,r++,n.opt.each(t)},function(){0===u&&n.opt.noMatch(e),s[a-1]===e?n.opt.done(r):t(s[s.indexOf(e)+1])})};this.opt.acrossElements&&(o="wrapMatchesAcrossElements"),0===a?this.opt.done(r):u(s[0])}},{key:"markRanges",value:function(t,e){var n=this;this.opt=e;var r=0,o=this.checkRanges(t);o&&o.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(o)),this.wrapRangeFromIndex(o,function(t,e,r,o){return n.opt.filter(t,e,r,o)},function(t,e){r++,n.opt.each(t,e)},function(){n.opt.done(r)})):this.opt.done(r)}},{key:"unmark",value:function(t){var e=this;this.opt=t;var n=this.opt.element?this.opt.element:"*";n+="[data-markjs]",this.opt.className&&(n+="."+this.opt.className),this.log('Removal selector "'+n+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,function(t){e.unwrapMatches(t)},function(t){var r=s.matches(t,n),o=e.matchesExclude(t);return!r||o?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT},this.opt.done)}},{key:"opt",set:function(t){this._opt=o({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},t)},get:function(){return this._opt}},{key:"iterator",get:function(){return new s(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),t}();return t})},function(t,e){"use strict";var n=function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},r=function(t,e){return t.classList?t.classList.add(e):t.className+=" "+e,t},o=function(t,e){return t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "),t};NodeList.prototype.toArray=function(){return Array.prototype.slice.call(this)},Element.prototype.addClass=function(t){return r(this,t)},Element.prototype.removeClass=function(t){return o(this,t)},Element.prototype.hasClass=function(t){return n(this,t)},NodeList.prototype.addClass=function(t){return this.toArray().map(function(e){return e.addClass(t)}),this},NodeList.prototype.removeClass=function(t){return this.toArray().map(function(e){return e.removeClass(t)}),this},NodeList.prototype.hasClass=function(t){return n(this,t)},Node.prototype.addClass=function(t){return r(this,t)},Node.prototype.removeClass=function(t){return o(this,t)},Node.prototype.hasClass=function(t){return n(this,t)},Element.prototype.toggleClass=function(t){return n(this,t)?o(this,t):r(this,t),this},Node.prototype.toggleClass=function(t){return n(this,t)?o(this,t):r(this,t),this},NodeList.prototype.toggleClass=function(t){return this.toArray().map(function(e){return e.toggleClass(t)}),this},NodeList.prototype.blur=function(){return this.toArray().map(function(t){t.style.display="none",t.blur()}),this},Element.prototype.show=function(){return this.style.display="block",this},Node.prototype.show=function(){return this.style.display="block",this},NodeList.prototype.show=function(){return this.toArray().map(function(t){t.style.display="block"}),this},Element.prototype.hide=function(){return this.style.display="none",this},Node.prototype.hide=function(){return this.style.display="none",this},NodeList.prototype.hide=function(){return this.toArray().map(function(t){t.style.display="none"}),this},Element.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1},Node.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1},NodeList.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1};var i=function(){var t,e=document.createElement("fakeelement"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in n)if(void 0!==e.style[t])return n[t]};Element.prototype.animate=function(t){var e=this;return new Promise(function(n,r){try{var o=i();e.addClass(t),e.addEventListener(o,function(){n(e)},!1)}catch(t){return r(t)}})},Node.prototype.animate=function(t){var e=this;return new Promise(function(n,r){try{var o=i();e.addClass(t),e.addEventListener(o,function(){return n(e)},!1)}catch(t){return r(t)}})}}]);
//# sourceMappingURL=app.js.map