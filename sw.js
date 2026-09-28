/* Dubai Historical District map — offline service worker (build 20260928-1830) */
var CACHE='dhd-map-20260928-1830';
var SHELL=["./", "index.html", "map.css", "map.js", "data/pois.js", "data/pois.json", "manifest.webmanifest", "assets/map/dhd-map-clean-2k.jpg", "icons/icon-192.png", "icons/icon-512.png", "assets/fonts/Dubai-Bold.woff", "assets/fonts/Dubai-Light.woff", "assets/fonts/Dubai-Medium.woff", "assets/fonts/Dubai-Regular.woff", "assets/brand/dhd-logo-tile.png", "assets/brand/dubai-culture-white.png", "assets/brand/dubai-culture.png"];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return Promise.all(SHELL.map(function(u){return c.add(u).catch(function(){});}));}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){
  var r=e.request; if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin) return;
  e.respondWith(fetch(r).then(function(res){ if(res&&res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp);});} return res; })
    .catch(function(){ return caches.match(r,{ignoreSearch:r.mode==='navigate'}).then(function(m){ return m||(r.mode==='navigate'?caches.match('index.html'):Response.error()); }); }));
});
