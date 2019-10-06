/*!
 * gmt v1.19.0
 * The theme for gomakethings.com
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/go-make-things
 */

/**
 * Load custom typeface
 */
;(function () {
	if (!('fonts' in document)) return;
	showFonts();
	Promise.all([
		document.fonts.load('1em PT Serif'),
		document.fonts.load('italic 1em PT Serif'),
		document.fonts.load('bold 1em PT Serif'),
		document.fonts.load('italic bold 1em PT Serif')
	]).then((function () {
		var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = 'fontsLoaded=true; expires=' + expires;
		document.documentElement.className += ' fonts-loaded';
	}));
})();