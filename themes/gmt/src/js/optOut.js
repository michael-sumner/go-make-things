;(function () {

	'use strict';


	//
	// Variables
	//

	var status = document.querySelector('#opt-out-status');
	var endpoint = 'https://gomakethings.com/checkout/wp-json/gmt-mailchimp/v1/subscribe';
	var query = [
		'do-not-create=1',
		'TbVktzD9dNZiQyZQ3Dk64w6L=WqJELdqqHHFTLUrEWJLu4DspKjeoBawWdWnZVVwti7RYpCyLr8WoWtm7UozshPy6'
	];
	var params;


	//
	// Methods
	//

	/**
	 * Get the URL parameters
	 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
	 * @param  {String} url The URL
	 * @return {Object}     The URL parameters
	 */
	var getParams = function (url) {
		var params = {};
		var parser = document.createElement('a');
		parser.href = url ? url : window.location.href;
		var query = parser.search.substring(1);
		var vars = query.split('&');
		if (vars.length < 1 || vars[0].length < 1) return params;
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return params;
	};

	/**
	 * Show error message if opt-out unsuccessful
	 */
	var showError = function () {
		status.innerHTML = 'Unable to opt you out at this time, sorry! Please email Chris directly at <a href="mailto:&#099;&#104;&#114;&#105;&#115;&#064;&#103;&#111;&#109;&#097;&#107;&#101;&#116;&#104;&#105;&#110;&#103;&#115;&#046;&#099;&#111;&#109;?subject=Email%20Opt%20Out">&#099;&#104;&#114;&#105;&#115;&#064;&#103;&#111;&#109;&#097;&#107;&#101;&#116;&#104;&#105;&#110;&#103;&#115;&#046;&#099;&#111;&#109;</a>.';
	};

	/**
	 * Show message if successfully opted out
	 */
	var showSuccess = function () {
		status.textContent = params.success ? params.success : 'You have been successfully opted out. Thanks!';
	};

	/**
	 * Build query string to send to API
	 * @return {String} The query string of parameters
	 */
	var buildQuery = function () {
		query.push('email=' + encodeURIComponent(params.email));
		query.push('group[' + encodeURIComponent(params.group) + ']=1');
		return query.join('&');
	};

	/**
	 * Send data to the MailChimp API
	 */
	var sendData = function () {

		// Set up our HTTP request
		var xhr = new XMLHttpRequest();

		// Setup our listener to process compeleted requests
		xhr.onreadystatechange = function () {

			// Only run if the request is complete
			if (xhr.readyState !== 4) return;

			// Process our return data
			if (xhr.status >= 200 && xhr.status < 300) {
				showSuccess();
			} else {
				showError();
			}

		};

		// Create and send a GET request
		// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
		// The second argument is the endpoint URL
		xhr.open('POST', endpoint + '?' + buildQuery());
		xhr.send();

	};

	/**
	 * Validate email
	 * @return {Boolean} Returns true if valid email
	 */
	var isEmail = function () {
		return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(params.email);
	};

	/**
	 * Update the page heading if needed
	 * @return {[type]} [description]
	 */
	var updateHeading = function () {
		if (!params.heading) return;
		var h1 = document.querySelector('h1');
		if (!h1) return;
		h1.textContent = decodeURIComponent(params.heading);
	};


	//
	// Event Listeners & Inits
	//

	// Make sure required element exists
	if (!status) return;

	// Get params
	params = getParams();

	// Update the heading
	updateHeading();

	// Make sure we have all of the required params
	if (!params.email || !params.group || !isEmail()) {
		showError();
		return;
	}

	// Submit the request
	sendData();

})();