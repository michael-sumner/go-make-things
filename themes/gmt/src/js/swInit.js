if (navigator && navigator.serviceWorker) {
	navigator.serviceWorker.register('/sw.js');
}

if (navigator.serviceWorker.controller) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.controller.postMessage('cleanUp');
	});
}