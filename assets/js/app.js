/*! For license information please see app.js.LICENSE.txt */
(()=>{var t={897:()=>{let t=function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},e=function(t,e){return t.classList?e.split(" ").forEach((e=>{t.classList.add(e)})):t.className+=" "+e,t},n=function(t,e){return t.classList?e.split(" ").forEach((e=>{t.classList.remove(e)})):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "),t};NodeList.prototype.toArray=function(){return Array.prototype.slice.call(this)},Element.prototype.addClass=function(t){return e(this,t)},Element.prototype.removeClass=function(t){return n(this,t)},Element.prototype.hasClass=function(e){return t(this,e)},NodeList.prototype.addClass=function(t){return this.toArray().map((e=>e.addClass(t))),this},NodeList.prototype.removeClass=function(t){return this.toArray().map((e=>e.removeClass(t))),this},NodeList.prototype.hasClass=function(e){return t(this,e)},Node.prototype.addClass=function(t){return e(this,t)},Node.prototype.removeClass=function(t){return n(this,t)},Node.prototype.hasClass=function(e){return t(this,e)},Element.prototype.toggleClass=function(r){return t(this,r)?n(this,r):e(this,r),this},Node.prototype.toggleClass=function(r){return t(this,r)?n(this,r):e(this,r),this},NodeList.prototype.toggleClass=function(t){return this.toArray().map((e=>e.toggleClass(t))),this},NodeList.prototype.blur=function(){return this.toArray().map((t=>{t.style.display="none",t.blur()})),this},Element.prototype.show=function(){return this.style.display="block",this},Node.prototype.show=function(){return this.style.display="block",this},NodeList.prototype.show=function(){return this.toArray().map((t=>{t.style.display="block"})),this},Element.prototype.hide=function(){return this.style.display="none",this},Node.prototype.hide=function(){return this.style.display="none",this},NodeList.prototype.hide=function(){return this.toArray().map((t=>{t.style.display="none"})),this},Element.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1},Node.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1},NodeList.prototype.eq=function(t){return t>=0&&t<this.length?this[t]:-1};let r=()=>{var t,e=document.createElement("fakeelement"),n={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in n)if(void 0!==e.style[t])return n[t]};Element.prototype.animate=function(t){var e=this;return new Promise((function(n,o){try{var i=r();e.addClass(`${t}`),e.addEventListener(i,(function(){n(e)}),!1)}catch(t){return o(t)}}))},Node.prototype.animate=function(t){var e=this;return new Promise((function(n,o){try{var i=r();e.addClass(t),e.addEventListener(i,(function(){return n(e)}),!1)}catch(t){return o(t)}}))}},57:function(t){!function(e){"use strict";function n(){console.log.apply(console,arguments)}var r={id:null,caseSensitive:!1,include:[],shouldSort:!0,searchFn:s,sortFn:function(t,e){return t.score-e.score},getFn:function t(e,n,r){var o,s,a,c,u,h;if(n){if(-1!==(a=n.indexOf("."))?(o=n.slice(0,a),s=n.slice(a+1)):o=n,null!=(c=e[o]))if(s||"string"!=typeof c&&"number"!=typeof c)if(i(c))for(u=0,h=c.length;u<h;u++)t(c[u],s,r);else s&&t(c,s,r);else r.push(c)}else r.push(e);return r},keys:[],verbose:!1,tokenize:!1,matchAllTokens:!1,tokenSeparator:/ +/g,minMatchCharLength:1,findAllMatches:!1};function o(t,e){var n;for(n in this.list=t,this.options=e=e||{},r)r.hasOwnProperty(n)&&("boolean"==typeof r[n]?this.options[n]=n in e?e[n]:r[n]:this.options[n]=e[n]||r[n])}function i(t){return"[object Array]"===Object.prototype.toString.call(t)}function s(t,e){e=e||{},this.options=e,this.options.location=e.location||s.defaultOptions.location,this.options.distance="distance"in e?e.distance:s.defaultOptions.distance,this.options.threshold="threshold"in e?e.threshold:s.defaultOptions.threshold,this.options.maxPatternLength=e.maxPatternLength||s.defaultOptions.maxPatternLength,this.pattern=e.caseSensitive?t:t.toLowerCase(),this.patternLen=t.length,this.patternLen<=this.options.maxPatternLength&&(this.matchmask=1<<this.patternLen-1,this.patternAlphabet=this._calculatePatternAlphabet())}o.VERSION="2.7.3",o.prototype.set=function(t){return this.list=t,t},o.prototype.search=function(t){return this.options.verbose&&n("\nSearch term:",t,"\n"),this.pattern=t,this.results=[],this.resultMap={},this._keyMap=null,this._prepareSearchers(),this._startSearch(),this._computeScore(),this._sort(),this._format()},o.prototype._prepareSearchers=function(){var t=this.options,e=this.pattern,n=t.searchFn,r=e.split(t.tokenSeparator),o=0,i=r.length;if(this.options.tokenize)for(this.tokenSearchers=[];o<i;o++)this.tokenSearchers.push(new n(r[o],t));this.fullSeacher=new n(e,t)},o.prototype._startSearch=function(){var t,e,n,r,o=this.options.getFn,i=this.list,s=i.length,a=this.options.keys,c=a.length,u=null;if("string"==typeof i[0])for(n=0;n<s;n++)this._analyze("",i[n],n,n);else for(this._keyMap={},n=0;n<s;n++)for(u=i[n],r=0;r<c;r++){if("string"!=typeof(t=a[r])){if(e=1-t.weight||1,this._keyMap[t.name]={weight:e},t.weight<=0||t.weight>1)throw new Error("Key weight has to be > 0 and <= 1");t=t.name}else this._keyMap[t]={weight:1};this._analyze(t,o(u,t,[]),u,n)}},o.prototype._analyze=function(t,e,r,o){var s,a,c,u,h,l,p,f,d,g,y,v,m,k,b,x=this.options,E=!1;if(null!=e){a=[];var S=0;if("string"==typeof e){if(s=e.split(x.tokenSeparator),x.verbose&&n("---------\nKey:",t),this.options.tokenize){for(k=0;k<this.tokenSearchers.length;k++){for(f=this.tokenSearchers[k],x.verbose&&n("Pattern:",f.pattern),d=[],v=!1,b=0;b<s.length;b++){g=s[b];var w={};(y=f.search(g)).isMatch?(w[g]=y.score,E=!0,v=!0,a.push(y.score)):(w[g]=1,this.options.matchAllTokens||a.push(1)),d.push(w)}v&&S++,x.verbose&&n("Token scores:",d)}for(u=a[0],l=a.length,k=1;k<l;k++)u+=a[k];u/=l,x.verbose&&n("Token score average:",u)}p=this.fullSeacher.search(e),x.verbose&&n("Full text score:",p.score),h=p.score,void 0!==u&&(h=(h+u)/2),x.verbose&&n("Score average:",h),m=!this.options.tokenize||!this.options.matchAllTokens||S>=this.tokenSearchers.length,x.verbose&&n("Check Matches",m),(E||p.isMatch)&&m&&((c=this.resultMap[o])?c.output.push({key:t,score:h,matchedIndices:p.matchedIndices}):(this.resultMap[o]={item:r,output:[{key:t,score:h,matchedIndices:p.matchedIndices}]},this.results.push(this.resultMap[o])))}else if(i(e))for(k=0;k<e.length;k++)this._analyze(t,e[k],r,o)}},o.prototype._computeScore=function(){var t,e,r,o,i,s,a,c,u=this._keyMap,h=this.results;for(this.options.verbose&&n("\n\nComputing score:\n"),t=0;t<h.length;t++){for(r=0,i=(o=h[t].output).length,a=1,e=0;e<i;e++)c=o[e].score*(s=u?u[o[e].key].weight:1),1!==s?a=Math.min(a,c):(r+=c,o[e].nScore=c);h[t].score=1===a?r/i:a,this.options.verbose&&n(h[t])}},o.prototype._sort=function(){var t=this.options;t.shouldSort&&(t.verbose&&n("\n\nSorting...."),this.results.sort(t.sortFn))},o.prototype._format=function(){var t,e,r,o,i=this.options,s=i.getFn,a=[],c=this.results,u=i.include;for(i.verbose&&n("\n\nOutput:\n\n",c),r=i.id?function(t){c[t].item=s(c[t].item,i.id,[])[0]}:function(){},o=function(t){var e,n,r,o,i,s=c[t];if(u.length>0){if(e={item:s.item},-1!==u.indexOf("matches"))for(r=s.output,e.matches=[],n=0;n<r.length;n++)i={indices:(o=r[n]).matchedIndices},o.key&&(i.key=o.key),e.matches.push(i);-1!==u.indexOf("score")&&(e.score=c[t].score)}else e=s.item;return e},t=0,e=c.length;t<e;t++)r(t),a.push(o(t));return a},s.defaultOptions={location:0,distance:100,threshold:.6,maxPatternLength:32},s.prototype._calculatePatternAlphabet=function(){var t={},e=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]=0;for(e=0;e<this.patternLen;e++)t[this.pattern.charAt(e)]|=1<<this.pattern.length-e-1;return t},s.prototype._bitapScore=function(t,e){var n=t/this.patternLen,r=Math.abs(this.options.location-e);return this.options.distance?n+r/this.options.distance:r?1:n},s.prototype.search=function(t){var e,n,r,o,i,s,a,c,u,h,l,p,f,d,g,y,v,m,k,b,x,E,S,w=this.options;if(t=w.caseSensitive?t:t.toLowerCase(),this.pattern===t)return{isMatch:!0,score:0,matchedIndices:[[0,t.length-1]]};if(this.patternLen>w.maxPatternLength){if(k=!!(m=t.match(new RegExp(this.pattern.replace(w.tokenSeparator,"|")))))for(x=[],e=0,E=m.length;e<E;e++)S=m[e],x.push([t.indexOf(S),S.length-1]);return{isMatch:k,score:k?.5:1,matchedIndices:x}}for(o=w.findAllMatches,i=w.location,r=t.length,s=w.threshold,a=t.indexOf(this.pattern,i),b=[],e=0;e<r;e++)b[e]=0;for(-1!=a&&(s=Math.min(this._bitapScore(0,a),s),-1!=(a=t.lastIndexOf(this.pattern,i+this.patternLen))&&(s=Math.min(this._bitapScore(0,a),s))),a=-1,y=1,v=[],h=this.patternLen+r,e=0;e<this.patternLen;e++){for(c=0,u=h;c<u;)this._bitapScore(e,i+u)<=s?c=u:h=u,u=Math.floor((h-c)/2+c);for(h=u,l=Math.max(1,i-u+1),p=o?r:Math.min(i+u,r)+this.patternLen,(f=Array(p+2))[p+1]=(1<<e)-1,n=p;n>=l;n--)if((g=this.patternAlphabet[t.charAt(n-1)])&&(b[n-1]=1),f[n]=(f[n+1]<<1|1)&g,0!==e&&(f[n]|=(d[n+1]|d[n])<<1|1|d[n+1]),f[n]&this.matchmask&&(y=this._bitapScore(e,n-1))<=s){if(s=y,a=n-1,v.push(a),a<=i)break;l=Math.max(1,2*i-a)}if(this._bitapScore(e+1,i)>s)break;d=f}return{isMatch:a>=0,score:0===y?.001:y,matchedIndices:x=this._getMatchedIndices(b)}},s.prototype._getMatchedIndices=function(t){for(var e,n=[],r=-1,o=-1,i=0,s=t.length;i<s;i++)(e=t[i])&&-1===r?r=i:e||-1===r||((o=i-1)-r+1>=this.options.minMatchCharLength&&n.push([r,o]),r=-1);return t[i-1]&&i-1-r+1>=this.options.minMatchCharLength&&n.push([r,i-1]),n},t.exports=o}()},813:function(t){t.exports=function(){"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},n=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},o=function(){function t(n){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;e(this,t),this.ctx=n,this.iframes=r,this.exclude=o,this.iframesTimeout=i}return n(t,[{key:"getContexts",value:function(){var t=[];return(void 0!==this.ctx&&this.ctx?NodeList.prototype.isPrototypeOf(this.ctx)?Array.prototype.slice.call(this.ctx):Array.isArray(this.ctx)?this.ctx:"string"==typeof this.ctx?Array.prototype.slice.call(document.querySelectorAll(this.ctx)):[this.ctx]:[]).forEach((function(e){var n=t.filter((function(t){return t.contains(e)})).length>0;-1!==t.indexOf(e)||n||t.push(e)})),t}},{key:"getIframeContents",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=void 0;try{var o=t.contentWindow;if(r=o.document,!o||!r)throw new Error("iframe inaccessible")}catch(t){n()}r&&e(r)}},{key:"isIframeBlank",value:function(t){var e="about:blank",n=t.getAttribute("src").trim();return t.contentWindow.location.href===e&&n!==e&&n}},{key:"observeIframeLoad",value:function(t,e,n){var r=this,o=!1,i=null,s=function s(){if(!o){o=!0,clearTimeout(i);try{r.isIframeBlank(t)||(t.removeEventListener("load",s),r.getIframeContents(t,e,n))}catch(t){n()}}};t.addEventListener("load",s),i=setTimeout(s,this.iframesTimeout)}},{key:"onIframeReady",value:function(t,e,n){try{"complete"===t.contentWindow.document.readyState?this.isIframeBlank(t)?this.observeIframeLoad(t,e,n):this.getIframeContents(t,e,n):this.observeIframeLoad(t,e,n)}catch(t){n()}}},{key:"waitForIframes",value:function(t,e){var n=this,r=0;this.forEachIframe(t,(function(){return!0}),(function(t){r++,n.waitForIframes(t.querySelector("html"),(function(){--r||e()}))}),(function(t){t||e()}))}},{key:"forEachIframe",value:function(e,n,r){var o=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},s=e.querySelectorAll("iframe"),a=s.length,c=0;s=Array.prototype.slice.call(s);var u=function(){--a<=0&&i(c)};a||u(),s.forEach((function(e){t.matches(e,o.exclude)?u():o.onIframeReady(e,(function(t){n(e)&&(c++,r(t)),u()}),u)}))}},{key:"createIterator",value:function(t,e,n){return document.createNodeIterator(t,e,n,!1)}},{key:"createInstanceOnIframe",value:function(e){return new t(e.querySelector("html"),this.iframes)}},{key:"compareNodeIframe",value:function(t,e,n){if(t.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_PRECEDING){if(null===e)return!0;if(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_FOLLOWING)return!0}return!1}},{key:"getIteratorNode",value:function(t){var e=t.previousNode();return{prevNode:e,node:(null===e||t.nextNode())&&t.nextNode()}}},{key:"checkIframeFilter",value:function(t,e,n,r){var o=!1,i=!1;return r.forEach((function(t,e){t.val===n&&(o=e,i=t.handled)})),this.compareNodeIframe(t,e,n)?(!1!==o||i?!1===o||i||(r[o].handled=!0):r.push({val:n,handled:!0}),!0):(!1===o&&r.push({val:n,handled:!1}),!1)}},{key:"handleOpenIframes",value:function(t,e,n,r){var o=this;t.forEach((function(t){t.handled||o.getIframeContents(t.val,(function(t){o.createInstanceOnIframe(t).forEachNode(e,n,r)}))}))}},{key:"iterateThroughNodes",value:function(t,e,n,r,o){for(var i=this,s=this.createIterator(e,t,r),a=[],c=[],u=void 0,h=void 0;l=void 0,l=i.getIteratorNode(s),h=l.prevNode,u=l.node;)this.iframes&&this.forEachIframe(e,(function(t){return i.checkIframeFilter(u,h,t,a)}),(function(e){i.createInstanceOnIframe(e).forEachNode(t,(function(t){return c.push(t)}),r)})),c.push(u);var l;c.forEach((function(t){n(t)})),this.iframes&&this.handleOpenIframes(a,t,n,r),o()}},{key:"forEachNode",value:function(t,e,n){var r=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){},i=this.getContexts(),s=i.length;s||o(),i.forEach((function(i){var a=function(){r.iterateThroughNodes(t,i,e,n,(function(){--s<=0&&o()}))};r.iframes?r.waitForIframes(i,a):a()}))}}],[{key:"matches",value:function(t,e){var n="string"==typeof e?[e]:e,r=t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector;if(r){var o=!1;return n.every((function(e){return!r.call(t,e)||(o=!0,!1)})),o}return!1}}]),t}(),i=function(){function i(t){e(this,i),this.ctx=t,this.ie=!1;var n=window.navigator.userAgent;(n.indexOf("MSIE")>-1||n.indexOf("Trident")>-1)&&(this.ie=!0)}return n(i,[{key:"log",value:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"debug",r=this.opt.log;this.opt.debug&&"object"===(void 0===r?"undefined":t(r))&&"function"==typeof r[n]&&r[n]("mark.js: "+e)}},{key:"escapeStr",value:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}},{key:"createRegExp",value:function(t){return"disabled"!==this.opt.wildcards&&(t=this.setupWildcardsRegExp(t)),t=this.escapeStr(t),Object.keys(this.opt.synonyms).length&&(t=this.createSynonymsRegExp(t)),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),this.opt.diacritics&&(t=this.createDiacriticsRegExp(t)),t=this.createMergedBlanksRegExp(t),(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.createJoinersRegExp(t)),"disabled"!==this.opt.wildcards&&(t=this.createWildcardsRegExp(t)),this.createAccuracyRegExp(t)}},{key:"createSynonymsRegExp",value:function(t){var e=this.opt.synonyms,n=this.opt.caseSensitive?"":"i",r=this.opt.ignoreJoiners||this.opt.ignorePunctuation.length?"\0":"";for(var o in e)if(e.hasOwnProperty(o)){var i=e[o],s="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(o):this.escapeStr(o),a="disabled"!==this.opt.wildcards?this.setupWildcardsRegExp(i):this.escapeStr(i);""!==s&&""!==a&&(t=t.replace(new RegExp("("+this.escapeStr(s)+"|"+this.escapeStr(a)+")","gm"+n),r+"("+this.processSynomyms(s)+"|"+this.processSynomyms(a)+")"+r))}return t}},{key:"processSynomyms",value:function(t){return(this.opt.ignoreJoiners||this.opt.ignorePunctuation.length)&&(t=this.setupIgnoreJoinersRegExp(t)),t}},{key:"setupWildcardsRegExp",value:function(t){return(t=t.replace(/(?:\\)*\?/g,(function(t){return"\\"===t.charAt(0)?"?":""}))).replace(/(?:\\)*\*/g,(function(t){return"\\"===t.charAt(0)?"*":""}))}},{key:"createWildcardsRegExp",value:function(t){var e="withSpaces"===this.opt.wildcards;return t.replace(/\u0001/g,e?"[\\S\\s]?":"\\S?").replace(/\u0002/g,e?"[\\S\\s]*?":"\\S*")}},{key:"setupIgnoreJoinersRegExp",value:function(t){return t.replace(/[^(|)\\]/g,(function(t,e,n){var r=n.charAt(e+1);return/[(|)\\]/.test(r)||""===r?t:t+"\0"}))}},{key:"createJoinersRegExp",value:function(t){var e=[],n=this.opt.ignorePunctuation;return Array.isArray(n)&&n.length&&e.push(this.escapeStr(n.join(""))),this.opt.ignoreJoiners&&e.push("\\u00ad\\u200b\\u200c\\u200d"),e.length?t.split(/\u0000+/).join("["+e.join("")+"]*"):t}},{key:"createDiacriticsRegExp",value:function(t){var e=this.opt.caseSensitive?"":"i",n=this.opt.caseSensitive?["aàáảãạăằắẳẵặâầấẩẫậäåāą","AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćč","CÇĆČ","dđď","DĐĎ","eèéẻẽẹêềếểễệëěēę","EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïī","IÌÍỈĨỊÎÏĪ","lł","LŁ","nñňń","NÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøō","OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rř","RŘ","sšśșş","SŠŚȘŞ","tťțţ","TŤȚŢ","uùúủũụưừứửữựûüůū","UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿ","YÝỲỶỸỴŸ","zžżź","ZŽŻŹ"]:["aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ","cçćčCÇĆČ","dđďDĐĎ","eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ","iìíỉĩịîïīIÌÍỈĨỊÎÏĪ","lłLŁ","nñňńNÑŇŃ","oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ","rřRŘ","sšśșşSŠŚȘŞ","tťțţTŤȚŢ","uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ","yýỳỷỹỵÿYÝỲỶỸỴŸ","zžżźZŽŻŹ"],r=[];return t.split("").forEach((function(o){n.every((function(n){if(-1!==n.indexOf(o)){if(r.indexOf(n)>-1)return!1;t=t.replace(new RegExp("["+n+"]","gm"+e),"["+n+"]"),r.push(n)}return!0}))})),t}},{key:"createMergedBlanksRegExp",value:function(t){return t.replace(/[\s]+/gim,"[\\s]+")}},{key:"createAccuracyRegExp",value:function(t){var e=this,n=this.opt.accuracy,r="string"==typeof n?n:n.value,o="string"==typeof n?[]:n.limiters,i="";switch(o.forEach((function(t){i+="|"+e.escapeStr(t)})),r){case"partially":default:return"()("+t+")";case"complementary":return"()([^"+(i="\\s"+(i||this.escapeStr("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~¡¿")))+"]*"+t+"[^"+i+"]*)";case"exactly":return"(^|\\s"+i+")("+t+")(?=$|\\s"+i+")"}}},{key:"getSeparatedKeywords",value:function(t){var e=this,n=[];return t.forEach((function(t){e.opt.separateWordSearch?t.split(" ").forEach((function(t){t.trim()&&-1===n.indexOf(t)&&n.push(t)})):t.trim()&&-1===n.indexOf(t)&&n.push(t)})),{keywords:n.sort((function(t,e){return e.length-t.length})),length:n.length}}},{key:"isNumeric",value:function(t){return Number(parseFloat(t))==t}},{key:"checkRanges",value:function(t){var e=this;if(!Array.isArray(t)||"[object Object]"!==Object.prototype.toString.call(t[0]))return this.log("markRanges() will only accept an array of objects"),this.opt.noMatch(t),[];var n=[],r=0;return t.sort((function(t,e){return t.start-e.start})).forEach((function(t){var o=e.callNoMatchOnInvalidRanges(t,r),i=o.start,s=o.end;o.valid&&(t.start=i,t.length=s-i,n.push(t),r=s)})),n}},{key:"callNoMatchOnInvalidRanges",value:function(t,e){var n=void 0,r=void 0,o=!1;return t&&void 0!==t.start?(r=(n=parseInt(t.start,10))+parseInt(t.length,10),this.isNumeric(t.start)&&this.isNumeric(t.length)&&r-e>0&&r-n>0?o=!0:(this.log("Ignoring invalid or overlapping range: "+JSON.stringify(t)),this.opt.noMatch(t))):(this.log("Ignoring invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:n,end:r,valid:o}}},{key:"checkWhitespaceRanges",value:function(t,e,n){var r=void 0,o=!0,i=n.length,s=e-i,a=parseInt(t.start,10)-s;return(r=(a=a>i?i:a)+parseInt(t.length,10))>i&&(r=i,this.log("End range automatically set to the max value of "+i)),a<0||r-a<0||a>i||r>i?(o=!1,this.log("Invalid range: "+JSON.stringify(t)),this.opt.noMatch(t)):""===n.substring(a,r).replace(/\s+/g,"")&&(o=!1,this.log("Skipping whitespace only range: "+JSON.stringify(t)),this.opt.noMatch(t)),{start:a,end:r,valid:o}}},{key:"getTextNodes",value:function(t){var e=this,n="",r=[];this.iterator.forEachNode(NodeFilter.SHOW_TEXT,(function(t){r.push({start:n.length,end:(n+=t.textContent).length,node:t})}),(function(t){return e.matchesExclude(t.parentNode)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),(function(){t({value:n,nodes:r})}))}},{key:"matchesExclude",value:function(t){return o.matches(t,this.opt.exclude.concat(["script","style","title","head","html"]))}},{key:"wrapRangeInTextNode",value:function(t,e,n){var r=this.opt.element?this.opt.element:"mark",o=t.splitText(e),i=o.splitText(n-e),s=document.createElement(r);return s.setAttribute("data-markjs","true"),this.opt.className&&s.setAttribute("class",this.opt.className),s.textContent=o.textContent,o.parentNode.replaceChild(s,o),i}},{key:"wrapRangeInMappedTextNode",value:function(t,e,n,r,o){var i=this;t.nodes.every((function(s,a){var c=t.nodes[a+1];if(void 0===c||c.start>e){if(!r(s.node))return!1;var u=e-s.start,h=(n>s.end?s.end:n)-s.start,l=t.value.substr(0,s.start),p=t.value.substr(h+s.start);if(s.node=i.wrapRangeInTextNode(s.node,u,h),t.value=l+p,t.nodes.forEach((function(e,n){n>=a&&(t.nodes[n].start>0&&n!==a&&(t.nodes[n].start-=h),t.nodes[n].end-=h)})),n-=h,o(s.node.previousSibling,s.start),!(n>s.end))return!1;e=s.end}return!0}))}},{key:"wrapMatches",value:function(t,e,n,r,o){var i=this,s=0===e?0:e+1;this.getTextNodes((function(e){e.nodes.forEach((function(e){e=e.node;for(var o=void 0;null!==(o=t.exec(e.textContent))&&""!==o[s];)if(n(o[s],e)){var a=o.index;if(0!==s)for(var c=1;c<s;c++)a+=o[c].length;e=i.wrapRangeInTextNode(e,a,a+o[s].length),r(e.previousSibling),t.lastIndex=0}})),o()}))}},{key:"wrapMatchesAcrossElements",value:function(t,e,n,r,o){var i=this,s=0===e?0:e+1;this.getTextNodes((function(e){for(var a=void 0;null!==(a=t.exec(e.value))&&""!==a[s];){var c=a.index;if(0!==s)for(var u=1;u<s;u++)c+=a[u].length;var h=c+a[s].length;i.wrapRangeInMappedTextNode(e,c,h,(function(t){return n(a[s],t)}),(function(e,n){t.lastIndex=n,r(e)}))}o()}))}},{key:"wrapRangeFromIndex",value:function(t,e,n,r){var o=this;this.getTextNodes((function(i){var s=i.value.length;t.forEach((function(t,r){var a=o.checkWhitespaceRanges(t,s,i.value),c=a.start,u=a.end;a.valid&&o.wrapRangeInMappedTextNode(i,c,u,(function(n){return e(n,t,i.value.substring(c,u),r)}),(function(e){n(e,t)}))})),r()}))}},{key:"unwrapMatches",value:function(t){for(var e=t.parentNode,n=document.createDocumentFragment();t.firstChild;)n.appendChild(t.removeChild(t.firstChild));e.replaceChild(n,t),this.ie?this.normalizeTextNode(e):e.normalize()}},{key:"normalizeTextNode",value:function(t){if(t){if(3===t.nodeType)for(;t.nextSibling&&3===t.nextSibling.nodeType;)t.nodeValue+=t.nextSibling.nodeValue,t.parentNode.removeChild(t.nextSibling);else this.normalizeTextNode(t.firstChild);this.normalizeTextNode(t.nextSibling)}}},{key:"markRegExp",value:function(t,e){var n=this;this.opt=e,this.log('Searching with expression "'+t+'"');var r=0,o="wrapMatches";this.opt.acrossElements&&(o="wrapMatchesAcrossElements"),this[o](t,this.opt.ignoreGroups,(function(t,e){return n.opt.filter(e,t,r)}),(function(t){r++,n.opt.each(t)}),(function(){0===r&&n.opt.noMatch(t),n.opt.done(r)}))}},{key:"mark",value:function(t,e){var n=this;this.opt=e;var r=0,o="wrapMatches",i=this.getSeparatedKeywords("string"==typeof t?[t]:t),s=i.keywords,a=i.length,c=this.opt.caseSensitive?"":"i";this.opt.acrossElements&&(o="wrapMatchesAcrossElements"),0===a?this.opt.done(r):function t(e){var i=new RegExp(n.createRegExp(e),"gm"+c),u=0;n.log('Searching with expression "'+i+'"'),n[o](i,1,(function(t,o){return n.opt.filter(o,e,r,u)}),(function(t){u++,r++,n.opt.each(t)}),(function(){0===u&&n.opt.noMatch(e),s[a-1]===e?n.opt.done(r):t(s[s.indexOf(e)+1])}))}(s[0])}},{key:"markRanges",value:function(t,e){var n=this;this.opt=e;var r=0,o=this.checkRanges(t);o&&o.length?(this.log("Starting to mark with the following ranges: "+JSON.stringify(o)),this.wrapRangeFromIndex(o,(function(t,e,r,o){return n.opt.filter(t,e,r,o)}),(function(t,e){r++,n.opt.each(t,e)}),(function(){n.opt.done(r)}))):this.opt.done(r)}},{key:"unmark",value:function(t){var e=this;this.opt=t;var n=this.opt.element?this.opt.element:"*";n+="[data-markjs]",this.opt.className&&(n+="."+this.opt.className),this.log('Removal selector "'+n+'"'),this.iterator.forEachNode(NodeFilter.SHOW_ELEMENT,(function(t){e.unwrapMatches(t)}),(function(t){var r=o.matches(t,n),i=e.matchesExclude(t);return!r||i?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),this.opt.done)}},{key:"opt",set:function(t){this._opt=r({},{element:"",className:"",exclude:[],iframes:!1,iframesTimeout:5e3,separateWordSearch:!0,diacritics:!0,synonyms:{},accuracy:"partially",acrossElements:!1,caseSensitive:!1,ignoreJoiners:!1,ignoreGroups:0,ignorePunctuation:[],wildcards:"disabled",each:function(){},noMatch:function(){},filter:function(){return!0},done:function(){},debug:!1,log:window.console},t)},get:function(){return this._opt}},{key:"iterator",get:function(){return new o(this.ctx,this.opt.iframes,this.opt.exclude,this.opt.iframesTimeout)}}]),i}();return function(t){var e=this,n=new i(t);return this.mark=function(t,r){return n.mark(t,r),e},this.markRegExp=function(t,r){return n.markRegExp(t,r),e},this.markRanges=function(t,r){return n.markRanges(t,r),e},this.unmark=function(t){return n.unmark(t),e},this}}()},418:t=>{"use strict";var e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;function o(t){if(null==t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach((function(t){r[t]=t})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,i){for(var s,a,c=o(t),u=1;u<arguments.length;u++){for(var h in s=Object(arguments[u]))n.call(s,h)&&(c[h]=s[h]);if(e){a=e(s);for(var l=0;l<a.length;l++)r.call(s,a[l])&&(c[a[l]]=s[a[l]])}}return c}},563:(t,e,n)=>{"use strict";var r=n(610),o=n(418);function i(t,e){return e.encode?e.strict?r(t):encodeURIComponent(t):t}function s(t){return Array.isArray(t)?t.sort():"object"==typeof t?s(Object.keys(t)).sort((function(t,e){return Number(t)-Number(e)})).map((function(e){return t[e]})):t}e.extract=function(t){return t.split("?")[1]||""},e.parse=function(t,e){var n=function(t){var e;switch(t.arrayFormat){case"index":return function(t,n,r){e=/\[(\d*)\]$/.exec(t),t=t.replace(/\[\d*\]$/,""),e?(void 0===r[t]&&(r[t]={}),r[t][e[1]]=n):r[t]=n};case"bracket":return function(t,n,r){e=/(\[\])$/.exec(t),t=t.replace(/\[\]$/,""),e?void 0!==r[t]?r[t]=[].concat(r[t],n):r[t]=[n]:r[t]=n};default:return function(t,e,n){void 0!==n[t]?n[t]=[].concat(n[t],e):n[t]=e}}}(e=o({arrayFormat:"none"},e)),r=Object.create(null);return"string"!=typeof t?r:(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach((function(t){var e=t.replace(/\+/g," ").split("="),o=e.shift(),i=e.length>0?e.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),n(decodeURIComponent(o),i,r)})),Object.keys(r).sort().reduce((function(t,e){var n=r[e];return Boolean(n)&&"object"==typeof n&&!Array.isArray(n)?t[e]=s(n):t[e]=n,t}),Object.create(null))):r},e.stringify=function(t,e){var n=function(t){switch(t.arrayFormat){case"index":return function(e,n,r){return null===n?[i(e,t),"[",r,"]"].join(""):[i(e,t),"[",i(r,t),"]=",i(n,t)].join("")};case"bracket":return function(e,n){return null===n?i(e,t):[i(e,t),"[]=",i(n,t)].join("")};default:return function(e,n){return null===n?i(e,t):[i(e,t),"=",i(n,t)].join("")}}}(e=o({encode:!0,strict:!0,arrayFormat:"none"},e));return t?Object.keys(t).sort().map((function(r){var o=t[r];if(void 0===o)return"";if(null===o)return i(r,e);if(Array.isArray(o)){var s=[];return o.slice().forEach((function(t){void 0!==t&&s.push(n(r,t,s.length))})),s.join("&")}return i(r,e)+"="+i(o,e)})).filter((function(t){return t.length>0})).join("&"):""}},610:t=>{"use strict";t.exports=function(t){return encodeURIComponent(t).replace(/[!'()*]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=n(57),e=n.n(t),r=n(563),o=n(813),i=n.n(o);n(897);const s=async t=>{let n=await fetch("/search.json"),r=await n.json(),o=new(e())(r,{tokenize:!0,threshold:.1,location:0,distance:10,keys:["category","body"]}).search(t);return o.length<1?`<article class="post-item">       \n        <div class="article-title">Could not find anything with <em>${t}</em></div>\n      </article>`:o.sort(((t,e)=>new Date(e.date)-new Date(t.date))).map((e=>(e.value=t,(t=>`<article class="post-item">\n        <span class="post-meta date-label">${t.date}</span>\n        <div class="article-title"><span class="badge-default"><a href="/categories#${t.category}">${t.category}</a></span>  <a class="post-link" href="${t.url}?searched=${t.value}">${t.title}</a></div>\n      </article>`)(e)))).join("\r\n")};let a=t=>new Promise(((e,n)=>(Array.prototype.slice.call(document.querySelectorAll(".post-item")).forEach((e=>{console.log(e),e.animate("animated fadeOut").then((e=>{t.removeChild(e)})).catch((t=>console.log(t)))})),e(t))));if(console.log("Udbjorg V1.0.5"),(async()=>{await async function(t,e){let n=document.querySelector("#search-results");if(!n)return;let o=document.querySelector("#search-box"),c=document.querySelector("#search"),u=document.querySelector("#search-button");const h=r.parse(location.search);if(h.searched)new(i())(document.querySelector(".post")).mark(h.searched,{accuracy:"complementary",debug:!0});else{if(h.query){var l=await s(h.query);console.log(l),o.value=h.query,c.value=h.query,await a(n),n.innerHTML=l}u&&u.addEventListener("click",(async t=>{t.preventDefault();var e=await s(o.value);console.log(e),await a(n),n.innerHTML=e}))}}()})(),window.errorpage){let t=decodeURI(location.pathname).split("/");(async function(t){return await s(t)})(t[t.length-1]).then((t=>{console.log(t)})).catch((t=>console.log(t)))}"serviceWorker"in navigator&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/sw.js").then((t=>{console.log("SW registered: ",t)})).catch((t=>{console.log("SW registration failed: ",t)}))}))})()})();