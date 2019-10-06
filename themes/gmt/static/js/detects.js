/*!
 * gmt v1.19.0
 * The theme for gomakethings.com
 * (c) 2019 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/go-make-things
 */

/**
 * Get the value of a cookie
 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
 * @param  {String} name  The name of the cookie
 * @return {String}       The cookie value
 */
var getCookie = function (name) {
	var value = "; " + document.cookie;
	var parts = value.split("; " + name + "=");
	if (parts.length == 2) return parts.pop().split(";").shift();
};
var showFonts = function () {
	var fonts = document.querySelector('#fonts');
	if (!fonts) return;
	fonts.media = 'all';
};
/**
 * Load custom typeface
 */
;(function () {
	if (!getCookie('fontsLoaded')) return;
	showFonts();
	document.documentElement.className += ' fonts-loaded';
})();