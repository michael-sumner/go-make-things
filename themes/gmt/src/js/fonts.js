// Lazy Load Custom Fonts
(function () {
	if (!('fonts' in document)) return;
	Promise.all([
		document.fonts.load('1em PT Serif'),
		document.fonts.load('700 1em PT Serif'),
		document.fonts.load('italic 1em PT Serif'),
		document.fonts.load('italic 700 1em PT Serif')
	]).then(function () {
		document.documentElement.className += ' fonts-loaded';
		// Optimization for Repeat Views
		// sessionStorage.fontsLoadedFoutWithClass = true;
	});
})();