(function () {
	if (!('fonts' in document)) return;
	loadCSS('https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700,700i');
	document.fonts.load('1em PT Serif').then(function (res) {
		document.documentElement.className += ' fonts-loaded';
	});
})();