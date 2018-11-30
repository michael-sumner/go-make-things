/*!
 * gmt v1.19.0
 * The theme for gomakethings.com
 * (c) 2018 Chris Ferdinandi
 * MIT License
 * http://github.com/cferdinandi/go-make-things
 */

var jar = (function () {

	'use strict';

	// Setup the public methods object
	var publicAPIs = {};

	/**
	 * Create an expiration date timestamp
	 * @param  {Number} time How far into the future to expire the cookie
	 * @return {String}      The expiration timestamp
	 */
	var getExpirationDate = function (time) {
		return new Date(+new Date() + time).toUTCString();
	};

	/**
	 * Create a cookie
	 * @param {String} name        The name of the cookie
	 * @param {String} value       The value of the cookie
	 * @param {Number} expiration  How long to keep the cookie [optional]
	 */
	publicAPIs.set = function (name, value, expiration) {
		if (!name || !value) throw new Error('Please provide both aname and value for your cookie.');
		if (typeof value !== 'string') throw new Error('Cookie values can only be strings.');
		var expires = expiration ? ' expires=' + getExpirationDate(expires) : '';
		document.cookie = name + '=' + value + ';' + expires;
	};

	/**
	 * Get the value of a cookie
	 * Source: https://gist.github.com/wpsmith/6cf23551dd140fb72ae7
	 * @param  {String} name  The name of the cookie
	 * @return {String}       The cookie value
	 */
	publicAPIs.get = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};

	// /**
	//  * Delete a cookie
	//  * @param  {String} name  The name of the cookie
	//  */
	// publicAPIs.remove = function (name) {
	// 	document.cookie = name + '=null; expires=' + getExpirationDate(-1);
	// };

	// Return the constructor
	return publicAPIs;

})();
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
		Array.prototype.forEach.call(links, (function (link) {
			link.href = addQueryString(link.href, affiliate);
		}));

	};

	// Get and set affiliate data in the DOM
	getAffiliate();
	setAffiliate();

})(window, document);