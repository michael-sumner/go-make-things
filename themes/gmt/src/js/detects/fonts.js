/**
 * Lazy Load Custom Fonts
 */
(function () {

	// If fonts property is not supported, bail
	if (!('fonts' in document)) return;

	// On load, add class
	Promise.all([
		document.fonts.load('1em PT Serif'),
		document.fonts.load('700 1em PT Serif'),
		document.fonts.load('italic 1em PT Serif'),
		document.fonts.load('italic 700 1em PT Serif')
	]).then(function () {
		document.documentElement.className += ' fonts-loaded';
	});

})();