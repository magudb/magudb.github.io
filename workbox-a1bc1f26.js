define("./workbox-a1bc1f26.js",["exports"],(function(t){"use strict";try{self["workbox:core:6.1.2"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.1.2"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class i{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class r extends i{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class a{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:i,route:r}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=r&&r.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:i})}catch(t){c=Promise.reject(t)}const h=r&&r.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:i})}catch(t){n=t}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const i=this.t.get(s.method)||[];for(const r of i){let i;const a=r.match({url:t,sameOrigin:e,request:s,event:n});if(a)return i=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(i=void 0),{route:r,params:i}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let o;const c=()=>(o||(o=new a,o.addFetchListener(),o.addCacheListener()),o);function h(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new i((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new r(t,e,n);else if("function"==typeof t)a=new i(t,e,n);else{if(!(t instanceof i))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return c().registerRoute(a),a}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},l=t=>[u.prefix,t,u.suffix].filter((t=>t&&t.length>0)).join("-"),f=t=>t||l(u.googleAnalytics),w=t=>t||l(u.precache),d=t=>t||l(u.runtime);function y(){return(y=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t}).apply(this,arguments)}function p(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}class m{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}const g=new Set;function q(t){return new Promise((e=>setTimeout(e,t)))}try{self["workbox:strategies:6.1.2"]&&_()}catch(t){}function R(t){return"string"==typeof t?new Request(t):t}class v{constructor(t,e){this.h={},Object.assign(this,e),this.event=e.event,this.u=t,this.l=new m,this.p=[],this.m=[...t.plugins],this.g=new Map;for(const t of this.m)this.g.set(t,{});this.event.waitUntil(this.l.promise)}async fetch(t){const{event:e}=this;let n=R(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const i=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){throw new s("plugin-error-request-will-fetch",{thrownError:t})}const r=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.u.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:r,response:t});return t}catch(t){throw i&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:i.clone(),request:r.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=R(t);let s;const{cacheName:n,matchOptions:i}=this.u,r=await this.getCacheKey(e,"read"),a=y({},i,{cacheName:n});s=await caches.match(r,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:i,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,e){const n=R(t);await q(0);const i=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const a=await this.q(e);if(!a)return!1;const{cacheName:o,matchOptions:c}=this.u,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await async function(t,e,s,n){const i=p(e.url,s);if(e.url===i)return t.match(e,n);const r=y({},n,{ignoreSearch:!0}),a=await t.keys(e,r);for(const e of a)if(i===p(e.url,s))return t.match(e,n)}(h,i.clone(),["__WB_REVISION__"],c):null;try{await h.put(i,u?a.clone():a)}catch(t){throw"QuotaExceededError"===t.name&&await async function(){for(const t of g)await t()}(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:a.clone(),request:i,event:this.event});return!0}async getCacheKey(t,e){if(!this.h[e]){let s=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))s=R(await t({mode:e,request:s,event:this.event,params:this.params}));this.h[e]=s}return this.h[e]}hasCallback(t){for(const e of this.u.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.u.plugins)if("function"==typeof e[t]){const s=this.g.get(e),n=n=>{const i=y({},n,{state:s});return e[t](i)};yield n}}waitUntil(t){return this.p.push(t),t}async doneWaiting(){let t;for(;t=this.p.shift();)await t}destroy(){this.l.resolve()}async q(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class b{constructor(t={}){this.cacheName=d(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,i=new v(this,{event:e,request:s,params:n}),r=this.R(i,s,e);return[r,this.v(r,i,s,e)]}async R(t,e,n){let i;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(i=await this.U(e,t),!i||"error"===i.type)throw new s("no-response",{url:e.url})}catch(s){for(const r of t.iterateCallbacks("handlerDidError"))if(i=await r({error:s,event:n,request:e}),i)break;if(!i)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))i=await s({event:n,request:e,response:i});return i}async v(t,e,s,n){let i,r;try{i=await t}catch(r){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:i}),await e.doneWaiting()}catch(t){r=t}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:i,error:r}),e.destroy(),r)throw r}}try{self["workbox:navigation-preload:6.1.2"]&&_()}catch(t){}function U(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.1.2"]&&_()}catch(t){}function x(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const i=new URL(n,location.href),r=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",e),{cacheKey:i.href,url:r.href}}class L{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class E{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=e&&e.cacheKey||this._.getCacheKeyForURL(t.url);return s?new Request(s):t},this._=t}}let T,N;async function P(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const i=t.clone(),r={headers:new Headers(i.headers),status:i.status,statusText:i.statusText},a=e?e(r):r,o=function(){if(void 0===T){const t=new Response("");if("body"in t)try{new Response(t.body),T=!0}catch(t){T=!1}T=!1}return T}()?i.body:await i.blob();return new Response(o,a)}class O extends b{constructor(t={}){t.cacheName=w(t.cacheName),super(t),this.L=!1!==t.fallbackToNetwork,this.plugins.push(O.copyRedirectedCacheableResponsesPlugin)}async U(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.T(t,e):await this.N(t,e))}async N(t,e){let n;if(!this.L)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});return n=await e.fetch(t),n}async T(t,e){this.P();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}P(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==O.copyRedirectedCacheableResponsesPlugin&&(n===O.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(O.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}O.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},O.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await P(t):t};class k{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.O=new Map,this.k=new Map,this.S=new Map,this.u=new O({cacheName:w(t),plugins:[...e,new E({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.u}precache(t){this.addToCacheList(t),this.C||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.C=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:i}=x(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this.O.has(i)&&this.O.get(i)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.O.get(i),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.S.has(t)&&this.S.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:i});this.S.set(t,n.integrity)}if(this.O.set(i,t),this.k.set(i,r),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return U(t,(async()=>{const e=new L;this.strategy.plugins.push(e);for(const[e,s]of this.O){const n=this.S.get(s),i=this.k.get(e),r=new Request(e,{integrity:n,cache:i,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return U(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.O.values()),n=[];for(const i of e)s.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.O}getCachedURLs(){return[...this.O.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.O.get(e.href)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=y({cacheKey:e},s.params),this.strategy.handle(s))}}const S=()=>(N||(N=new k),N);class C extends i{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const t of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:i}={}){const r=new URL(t,location.href);r.hash="",yield r.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(r,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(i){const t=i({url:r});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(t);if(e)return{cacheKey:e}}}),t.strategy)}}class D{constructor(t,e,{onupgradeneeded:s,onversionchange:n}={}){this.D=null,this.K=t,this.j=e,this.W=s,this.A=n||(()=>this.close())}get db(){return this.D}async open(){if(!this.D)return this.D=await new Promise(((t,e)=>{let s=!1;setTimeout((()=>{s=!0,e(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this.K,this.j);n.onerror=()=>e(n.error),n.onupgradeneeded=t=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.W&&this.W(t)},n.onsuccess=()=>{const e=n.result;s?e.close():(e.onversionchange=this.A.bind(this),t(e))}})),this}async getKey(t,e){return(await this.getAllKeys(t,e,1))[0]}async getAll(t,e,s){return await this.getAllMatching(t,{query:e,count:s})}async getAllKeys(t,e,s){return(await this.getAllMatching(t,{query:e,count:s,includeKeys:!0})).map((t=>t.key))}async getAllMatching(t,{index:e,query:s=null,direction:n="next",count:i,includeKeys:r=!1}={}){return await this.transaction([t],"readonly",((a,o)=>{const c=a.objectStore(t),h=e?c.index(e):c,u=[],l=h.openCursor(s,n);l.onsuccess=()=>{const t=l.result;t?(u.push(r?t:t.value),i&&u.length>=i?o(u):t.continue()):o(u)}}))}async transaction(t,e,s){return await this.open(),await new Promise(((n,i)=>{const r=this.D.transaction(t,e);r.onabort=()=>i(r.error),r.oncomplete=()=>n(),s(r,(t=>n(t)))}))}async I(t,e,s,...n){return await this.transaction([e],s,((s,i)=>{const r=s.objectStore(e),a=r[t].apply(r,n);a.onsuccess=()=>i(a.result)}))}close(){this.D&&(this.D.close(),this.D=null)}}D.prototype.OPEN_TIMEOUT=2e3;const K={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[t,e]of Object.entries(K))for(const s of e)s in IDBObjectStore.prototype&&(D.prototype[s]=async function(e,...n){return await this.I(s,e,t,...n)});try{self["workbox:background-sync:6.1.2"]&&_()}catch(t){}const j="requests",W="queueName";class A{constructor(t){this.M=t,this.D=new D("workbox-background-sync",3,{onupgradeneeded:this.$})}async pushEntry(t){delete t.id,t.queueName=this.M,await this.D.add(j,t)}async unshiftEntry(t){const[e]=await this.D.getAllMatching(j,{count:1});e?t.id=e.id-1:delete t.id,t.queueName=this.M,await this.D.add(j,t)}async popEntry(){return this.B({direction:"prev"})}async shiftEntry(){return this.B({direction:"next"})}async getAll(){return await this.D.getAllMatching(j,{index:W,query:IDBKeyRange.only(this.M)})}async deleteEntry(t){await this.D.delete(j,t)}async B({direction:t}){const[e]=await this.D.getAllMatching(j,{direction:t,index:W,query:IDBKeyRange.only(this.M),count:1});if(e)return await this.deleteEntry(e.id),e}$(t){const e=t.target.result;t.oldVersion>0&&t.oldVersion<3&&e.objectStoreNames.contains(j)&&e.deleteObjectStore(j);e.createObjectStore(j,{autoIncrement:!0,keyPath:"id"}).createIndex(W,W,{unique:!1})}}const I=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class M{constructor(t){"navigate"===t.mode&&(t.mode="same-origin"),this.F=t}static async fromRequest(t){const e={url:t.url,headers:{}};"GET"!==t.method&&(e.body=await t.clone().arrayBuffer());for(const[s,n]of t.headers.entries())e.headers[s]=n;for(const s of I)void 0!==t[s]&&(e[s]=t[s]);return new M(e)}toObject(){const t=Object.assign({},this.F);return t.headers=Object.assign({},this.F.headers),t.body&&(t.body=t.body.slice(0)),t}toRequest(){return new Request(this.F.url,this.F)}clone(){return new M(this.toObject())}}const $="workbox-background-sync",B=new Set,F=t=>{const e={request:new M(t.requestData).toRequest(),timestamp:t.timestamp};return t.metadata&&(e.metadata=t.metadata),e};class G{constructor(t,{onSync:e,maxRetentionTime:n}={}){if(this.G=!1,this.H=!1,B.has(t))throw new s("duplicate-queue-name",{name:t});B.add(t),this.K=t,this.V=e||this.replayRequests,this.J=n||10080,this.X=new A(this.K),this.Y()}get name(){return this.K}async pushRequest(t){await this.Z(t,"push")}async unshiftRequest(t){await this.Z(t,"unshift")}async popRequest(){return this.tt("pop")}async shiftRequest(){return this.tt("shift")}async getAll(){const t=await this.X.getAll(),e=Date.now(),s=[];for(const n of t){const t=60*this.J*1e3;e-n.timestamp>t?await this.X.deleteEntry(n.id):s.push(F(n))}return s}async Z({request:t,metadata:e,timestamp:s=Date.now()},n){const i={requestData:(await M.fromRequest(t.clone())).toObject(),timestamp:s};e&&(i.metadata=e),await this.X[`${n}Entry`](i),this.G?this.H=!0:await this.registerSync()}async tt(t){const e=Date.now(),s=await this.X[`${t}Entry`]();if(s){const n=60*this.J*1e3;return e-s.timestamp>n?this.tt(t):F(s)}}async replayRequests(){let t;for(;t=await this.shiftRequest();)try{await fetch(t.request.clone())}catch(e){throw await this.unshiftRequest(t),new s("queue-replay-failed",{name:this.K})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register(`${$}:${this.K}`)}catch(t){}}Y(){"sync"in self.registration?self.addEventListener("sync",(t=>{if(t.tag===`${$}:${this.K}`){const e=async()=>{let e;this.G=!0;try{await this.V({queue:this})}catch(t){throw e=t,e}finally{!this.H||e&&!t.lastChance||await this.registerSync(),this.G=!1,this.H=!1}};t.waitUntil(e())}})):this.V({queue:this})}static get et(){return B}}class H{constructor(t,e){this.fetchDidFail=async({request:t})=>{await this.st.pushRequest({request:t})},this.st=new G(t,e)}}const V={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};class J extends b{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(V),this.nt=t.networkTimeoutSeconds||0}async U(t,e){const n=[],i=[];let r;if(this.nt){const{id:s,promise:a}=this.it({request:t,logs:n,handler:e});r=s,i.push(a)}const a=this.rt({timeoutId:r,request:t,logs:n,handler:e});i.push(a);const o=await e.waitUntil((async()=>await e.waitUntil(Promise.race(i))||await a)());if(!o)throw new s("no-response",{url:t.url});return o}it({request:t,logs:e,handler:s}){let n;return{promise:new Promise((e=>{n=setTimeout((async()=>{e(await s.cacheMatch(t))}),1e3*this.nt)})),id:n}}async rt({timeoutId:t,request:e,logs:s,handler:n}){let i,r;try{r=await n.fetchAndCachePut(e)}catch(t){i=t}return t&&clearTimeout(t),!i&&r||(r=await n.cacheMatch(e)),r}}class Q extends b{constructor(t={}){super(t),this.nt=t.networkTimeoutSeconds||0}async U(t,e){let n,i;try{const s=[e.fetch(t)];if(this.nt){const t=q(1e3*this.nt);s.push(t)}if(i=await Promise.race(s),!i)throw new Error(`Timed out the network response after ${this.nt} seconds.`)}catch(t){n=t}if(!i)throw new s("no-response",{url:t.url,error:n});return i}}try{self["workbox:google-analytics:6.1.2"]&&_()}catch(t){}const z="www.google-analytics.com",X="www.googletagmanager.com",Y=/^\/(\w+\/)?collect/,Z=t=>{const e=({url:t})=>t.hostname===z&&Y.test(t.pathname),s=new Q({plugins:[t]});return[new i(e,s,"GET"),new i(e,s,"POST")]},tt=t=>{const e=new J({cacheName:t});return new i((({url:t})=>t.hostname===z&&"/analytics.js"===t.pathname),e,"GET")},et=t=>{const e=new J({cacheName:t});return new i((({url:t})=>t.hostname===X&&"/gtag/js"===t.pathname),e,"GET")},st=t=>{const e=new J({cacheName:t});return new i((({url:t})=>t.hostname===X&&"/gtm.js"===t.pathname),e,"GET")};t.CacheFirst=class extends b{async U(t,e){let n,i=await e.cacheMatch(t);if(!i)try{i=await e.fetchAndCachePut(t)}catch(t){n=t}if(!i)throw new s("no-response",{url:t.url,error:n});return i}},t.cleanupOutdatedCaches=function(){self.addEventListener("activate",(t=>{const e=w();t.waitUntil((async(t,e="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==t));return await Promise.all(s.map((t=>self.caches.delete(t)))),s})(e).then((t=>{})))}))},t.clientsClaim=function(){self.addEventListener("activate",(()=>self.clients.claim()))},t.enable=function(t){Boolean(self.registration&&self.registration.navigationPreload)&&self.addEventListener("activate",(e=>{e.waitUntil(self.registration.navigationPreload.enable().then((()=>{t&&self.registration.navigationPreload.setHeaderValue(t)})))}))},t.initialize=(t={})=>{const e=f(t.cacheName),s=new H("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=t,async({queue:t})=>{let e;for(;e=await t.shiftRequest();){const{request:s,timestamp:i}=e,r=new URL(s.url);try{const t="POST"===s.method?new URLSearchParams(await s.clone().text()):r.searchParams,e=i-(Number(t.get("qt"))||0),a=Date.now()-e;if(t.set("qt",String(a)),n.parameterOverrides)for(const e of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[e];t.set(e,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,t),await fetch(new Request(r.origin+r.pathname,{body:t.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await t.unshiftRequest(e),s}}})});var n;const i=[st(e),tt(e),et(e),...Z(s)],r=new a;for(const t of i)r.registerRoute(t);r.addFetchListener()},t.precacheAndRoute=function(t,e){!function(t){S().precache(t)}(t),function(t){const e=S();h(new C(e,t))}(e)},t.registerRoute=h}));
