var crowsNest = function () {

	'use strict';

	//
	// Variables
	//

	var form = document.querySelector('#form-search');
	var input = document.querySelector('#input-search');
	var resultList = document.querySelector('#search-results');


	//
	// Methods
	//

	/**
	 * Get the value of a query string from a URL
	 * @param  {String} key The query string key to get the value of
	 * @param  {String} url The URL to search
	 * @return {String}     The query string value
	 */
	var getQueryString = function (key, url) {
		var href = url ? url : window.location.href;
		var reg = new RegExp('[?&]' + key + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	};

	/**
	 * Create the HTML for each result
	 * @param  {Object} article The article
	 * @param  {Number} id      The result index
	 * @return {String}         The markup
	 */
	var createHTML = function (article, id) {
		var html =
			'<div class="margin-bottom" id="search-result-' + id + '">' +
				'<a class="link-block" href="' + article.url + '">' +
					'<h2 class="h3 link-block-styled link-no-underline no-margin-bottom">' + article.title + '</h2>' +
					article.summary.slice(0, 150) + '...<br>' +
					'<span class="link-block-styled link-no-underline">' + article.url + '</span>' +
				'</a>' +
			'</div>';
		return html;
	};

	/**
	 * Create the markup when no results are found
	 * @return {String} The markup
	 */
	var createNoResultsHTML = function () {
		return '<p>Sorry, no matches were found.</p>';
	};

	/**
	 * Update the URL with a query string for the search string
	 * @param  {[type]} query [description]
	 * @return {[type]}       [description]
	 */
	var updateURL = function (query) {
		if (!history.pushState) return;
		history.pushState({}, document.title, window.location.origin + window.location.pathname + '?s=' + encodeURI(query));
	};

	/**
	 * Search for matches
	 * @param  {String} query The term to search for
	 */
	var search = function (query) {

		// Create the results
		var results = '';
		searchIndex.forEach(function (article, index) {
			var contains = new RegExp(query, 'i').test(article.title + ' ' + article.content);
			if (!contains) return;
			results += createHTML(article, index);
		});

		// Display the results
		resultList.innerHTML = results.length > 0 ? results : createNoResultsHTML();

		// Update the URL
		updateURL(query);

	};

	/**
	 * Handle submit events
	 */
	var submitHandler = function (event) {
		event.preventDefault();
		search(input.value);
	};

	/**
	 * If there's a query string search term, search it on page load
	 */
	var onload = function () {
		var query = getQueryString('s');
		if (!query) return;
		var decoded = decodeURI(query);
		input.value = decoded;
		search(decoded);
	};


	//
	// Inits & Event Listeners
	//

	// Make sure required content exists
	if (!form || !input || !resultList || !searchIndex) return;

	// Clear the input field
	input.value = '';

	// Create a submit handler
	form.addEventListener('submit', submitHandler, false);

	// Check for query strings onload
	onload();

};

crowsNest();