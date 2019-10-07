(function () {
	if (!('fonts' in document)) return;
	loadCSS('https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i');
	Promise.all([
		document.fonts.load('1em PT Serif'),
		document.fonts.load('italic 1em PT Serif'),
		document.fonts.load('bold 1em PT Serif'),
		document.fonts.load('italic bold 1em PT Serif')
	]).then(function () {
		var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = 'fontsLoaded=true; expires=' + expires;
		document.documentElement.className += ' fonts-loaded';
	});
})();