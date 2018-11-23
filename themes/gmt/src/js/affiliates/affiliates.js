;(function (window, document, undefined) {

	'use strict';

	/**
	 * Get the value of a query string from a URL
	 * @param  {String} field The field to get the value of
	 * @return {String}       The value
	 */
	var getQueryString = function (field) {
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(window.location.href);
		return string ? string[1] : null;
	};

	/**
	 * Add query string to a link
	 * @param {String} url The link URL
	 * @param {String} val The value to use for the query string
	 */
	var addQueryString = function (url, val) {
		var prefix = url.indexOf('?') < 0 ? '?' : '&';
		return url + prefix + 'ref=' + val;
	};

	/**
	 * Get affiliate ID from query string and store it to a cookie
	 */
	var getAffiliate = function () {

		// Get affiliate ID
		var ref = getQueryString('ref');
		if (!ref) return;

		// If there's an existing affiliate and it's not the current one, bail
		var current = jar.get('affwp_ref');
		if (current && current !== ref) return;

		// Set/update the affiliate cookie
		// Expire it in 2 weeks
		jar.set('affwp_ref', ref, 1000 * 60 * 60 * 24 * 7 * 2)

	};

	/**
	 * Add affiliate IDs to all product links
	 */
	var setAffiliate = function () {

		// Get the affiliate ID
		var affiliate = jar.get('affwp_ref');
		if (!affiliate) return;

		// Get all product links on the page
		var links = document.querySelectorAll('[href*="vanillajsguides.com"], [href*="vanillajsacademy.com"]');

		// Add the affiliate query string to each one
		Array.prototype.forEach.call(links, function (link) {
			link.href = addQueryString(link.href, affiliate);
		});

	};

	// Get and set affiliate data in the DOM
	getAffiliate();
	setAffiliate();

})(window, document);