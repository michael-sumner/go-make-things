var api = function () {

	'use strict';

	var sanitize = function () {
		var temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	};

	var renderCTAs = function (data) {

		// 1. Loop through each testimonial div on the page
		// 2. Get its ID
		// 3. Look for it's ID in the data
		// 4. Create the element and inject

	};

	var render = function (data, type) {

		// 1. Loop through each testimonial div on the page
		// 2. Get its ID
		// 3. Look for it's ID in the data
		// 4. Create the element and inject



	};

	/**
	 * Get data from the GMT API
	 * @param  {String} url The JSON file URL
	 */
	var getAPI = function (url) {

		// Set up our HTTP request
		var xhr = new XMLHttpRequest();

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {

			// Only run if the request is complete
			if (xhr.readyState !== 4) return;

			// Process our return data
			if (xhr.status === 200) {
				// @todo
			}

		};

		// Create and send a GET request
		// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
		// The second argument is the endpoint URL
		xhr.open('GET', url);
		xhr.send();

	};

};