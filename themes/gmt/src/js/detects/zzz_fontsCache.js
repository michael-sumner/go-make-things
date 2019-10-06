/**
 * Load custom typeface
 */
;(function () {
	if (!getCookie('fontsLoaded')) return;
	showFonts();
	document.documentElement.className += ' fonts-loaded';
})();