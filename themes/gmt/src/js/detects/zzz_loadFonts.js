/**
 * Load custom typeface
 */
;(function () {
	var css = 'https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i|PT+Serif:400,400i,700';
	if (getCookie('fontsLoaded')) {
		loadCSS(css);
		document.documentElement.className += ' fonts-loaded';
	} else {
		loadCSS(css);
		var fontSans = new FontFaceObserver('PT Sans');
		var fontSerif = new FontFaceObserver('PT Serif');
		Promise.all([fontSans.load(), fontSerif.load()]).then(function () {
			var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
			document.cookie = 'fontsLoaded=true; expires=' + expires;
			document.documentElement.className += ' fonts-loaded';
		});
	}
})();