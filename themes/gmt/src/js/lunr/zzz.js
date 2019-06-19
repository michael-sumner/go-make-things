/**
 * Script initializations
 */

;(function () {

	'use strict';

	//
	// Variables
	//

	var form = document.querySelector('#form-search');
	var input = document.querySelector('#input-search');
	var resultList = document.querySelector('#search-results');
	var searchIndex, idx;


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
					'<aside class="text-muted text-small">' +
						'<time datetime="' + article.datetime + '" pubdate>' + article.date + '</time>' +
					'</aside>' +
					'<h2 class="h3 link-block-styled link-no-underline no-padding-top no-margin-bottom">' + article.title + '</h2>' +
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
	 * Create the markup for results
	 * @param  {Array} results The results to display
	 * @return {String}        The results HTML
	 */
	var createResultsHTML = function (results) {
		var html = '<p>Found ' + results.length + ' matching articles</p>';
		html += results.map(function (result, index) {
			return createHTML(searchIndex[result.ref], index);
		}).join('');
		return html;
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
	 * @param {String} query The term to search for
	 */
	var search = function (query) {

		// Find matches
		var results = idx.search(query + '~1');

		// Display the results
		resultList.innerHTML = results.length < 1 ? createNoResultsHTML() : createResultsHTML(results);

	};

	/**
	 * Run pre-search checks
	 * @param {String} query The term to search for
	 */
	var preSearch = function (query) {

		// Update the URL
		updateURL(query);

		// If there's no search value
		if (query.length < 1) {
			resultList.textContent = '';
			return;
		}

		// If there's no search index, create one
		if (!idx) {
			resultList.textContent = 'Searching...';
			setupLunr(query);
			return;
		}

		// Otherwise, run the search
		search(query);

	};

	/**
	 * Create a searchable index in Lunr
	 * @param  {String} query The search query
	 */
	var createIndex = function (query) {

		// Setup the Lunr index
		idx = lunr(function () {
			var search = this;
			search.ref('id');
			search.field('title');
			search.field('content');

			if (searchIndex.length > 0) {
				for (var i = 0; i < searchIndex.length; i++) {
					searchIndex[i].id = i;
					search.add(searchIndex[i]);
				}
			}
		});

		// Save index to sessionStorage
		sessionStorage.setItem('searchIndex', JSON.stringify(idx));

		// Search
		search(query);

	};

	/**
	 * Setup LunrJS
	 * @param  {String} query The search query
	 */
	var setupLunr = function (query) {

		// Set up our HTTP request
		var xhr = new XMLHttpRequest();

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {

			// Only run if the request is complete
			if (xhr.readyState !== 4) return;

			// What do when the request is successful
			if (xhr.status >= 200 && xhr.status < 300) {
				searchIndex = JSON.parse(xhr.responseText);
				createIndex(query);
				return;
			}

			// What do when the request fails
			displayResults([]);

		};

		// Create and send a GET request
		xhr.open('GET', '/api/search.json');
		xhr.send();

	};

	/**
	 * Handle submit events
	 */
	var submitHandler = function (event) {

		// Stop the form from submitting
		event.preventDefault();

		// Prep for search
		preSearch(input.value);

	};

	/**
	 * Clear the input and load any saved index from sessionStorage
	 */
	var setupDOM = function () {
		input.value = input.value.replace(' site:gomakethings.com', '');
		var savedIndex = sessionStorage.getItem('searchIndex');
		console.log(savedIndex);
		if (!savedIndex) return;
		idx = lunr.Index.load(JSON.parse(savedIndex));
	};

	/**
	 * If there's a query string search term, search it on page load
	 */
	var querySearch = function () {
		// @todo
		return;
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
	if (!form || !input || !resultList) return;

	// Clear the input field and load saved search index
	setupDOM();

	// Create a submit handler
	form.addEventListener('submit', submitHandler, false);

	// Check for query strings and automatically search
	querySearch();

})();