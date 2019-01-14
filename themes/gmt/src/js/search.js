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
		html += results.map(function (article, index) {
			return createHTML(article, index);
		}).join('');
		return html;
	};

	/**
	 * Search for matches
	 * @param  {String} query The term to search for
	 */
	var search = function (query) {

		var reg = new RegExp(query, 'gi');
		var priority1 = [];
		var priority2 = [];

		searchIndex.forEach(function (article, index) {
			if (reg.test(article.title)) return priority1.push(article);
			if (reg.test(article.content)) priority2.push(article);
		});

		var results = [].concat(priority1, priority2);
		// if (results.length < 1) return createNoResultsHTML();

		// Display the results
		resultList.innerHTML = results.length < 1 ? createNoResultsHTML() : createResultsHTML(results);

		// Update the URL
		updateURL(query);

	};

	var clearInput = function () {
		input.value = input.value.replace(' site:gomakethings.com', '');
		input.name = 's';
		form.action = '';
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
	clearInput();

	// Check for query strings onload
	onload();

};

crowsNest();