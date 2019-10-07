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
/*! loadCSS: load a CSS file asynchronously. [c]2015 @scottjehl, Filament Group, Inc. Licensed MIT */
var loadCSS = function (href) {

	// Variables
	var refs = document.querySelectorAll('style,link[rel=stylesheet],script');
	var ref = refs[refs.length - 1];
	var sheets = document.styleSheets;

	// Create stylesheet
	var ss = document.createElement('link');
	ss.rel = 'stylesheet';
	ss.href = href;
	ss.media = 'only x';

	// Inject link
	ref.parentNode.insertBefore(ss, ref.nextSibling);

	// A method (exposed on return object for external use) that mimics onload by polling until document.styleSheets until it includes the new sheet.
	var onloadcssdefined = function (cb) {
		var defined;
		for (var i = 0; i < sheets.length; i++) {
			var sheet = sheets[i];
			if (sheet.href && sheet.href === ss.href) {
				defined = true;
			}
		}
		if (defined) {
			cb();
		} else {
			setTimeout((function () {
				onloadcssdefined(cb);
			}));
		}
	};

	// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
	ss.onloadcssdefined = onloadcssdefined;
	onloadcssdefined((function () {
		ss.media = 'all';
	}));

	return ss;

};
(function () {
	if (!('fonts' in document)) return;
	loadCSS('https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i');
	document.fonts.load('1em PT Serif').then((function (res) {
		document.documentElement.className += ' fonts-loaded';
	}));
})();