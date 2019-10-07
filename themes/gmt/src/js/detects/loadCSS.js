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
			setTimeout(function () {
				onloadcssdefined(cb);
			});
		}
	};

	// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
	ss.onloadcssdefined = onloadcssdefined;
	onloadcssdefined(function () {
		ss.media = 'all';
	});

	return ss;

};