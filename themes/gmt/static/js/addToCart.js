/*! gmt v2.0.0 | (c) 2022 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/go-make-things | Credits: https://github.com/toddmotto/fluidvids */
(function () {
	'use strict';

	// Variables
	let buyNow = document.querySelectorAll('.edd-buy-now-button');

	// Handle "buy now" clicks
	// Don't run if right-click or command/control + click
	function buyNowHandler (event) {
		if (!event.target.classList.contains('edd-buy-now-button')) return;
		if (event.button !== 0 || event.metaKey || event.ctrlKey) return;
		event.target.innerHTML = 'Adding to cart...';
		event.target.classList.add('disabled');
	}

	// Listen for "buy now" clicks
	if (buyNow.length > 0) {
		document.addEventListener('click', buyNowHandler);
	}

}());
