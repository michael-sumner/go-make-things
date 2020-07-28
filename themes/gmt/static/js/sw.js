/**
 * Service Worker
 */


var version = '20200727';
var pageID = version + '_pages';

// On install, cache some stuff
addEventListener('install', function (event) {
	console.log('Installed!');
	caches.open(pageID).then(function (cache) {
		cache.add('/offline');
		cache.add('/mit');
	});
});

addEventListener('fetch', function (event) {
	console.log('The service worker is listening.');
	// event.respondWith();
});