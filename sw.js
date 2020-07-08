const CACHE_NAME = "liga-v1";
let urlsToCache = [
    '/',
    '/index.html',
    '/css/index.css',
    '/css/materialize.min.css',
    '/js/api.js',
    '/js/info_liga.js',
    '/js/materialize.min.js',
	'/js/nav.js',
	'/manifest.json',
	'/soccer_line.png'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
	  caches.open(CACHE_NAME)
		.then(function(cache) {
		  console.log('Simpan cache');
		  return cache.addAll(urlsToCache);
		})
	);
  });

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				return response;
			}
			return fetch(event.request);
		})
	);
});