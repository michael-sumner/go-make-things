var optOut = function () {

	'use strict';


	//
	// Variables
	//

	var form = document.querySelector('#marketing-opt-out');
	var email = document.querySelector('#opt-out-email');
	var status = document.querySelector('#opt-out-status');
	var endpoint = 'https://gomakethings.com/checkout/wp-json/gmt-mailchimp/v1/subscribe';


	//
	// Methods
	//

	/**
	 * Get the value of a query string from a URL
	 * @param  {String} field The field to get the value of
	 * @return {String}       The value
	 */
	var getQueryString = function (field) {
		var href = window.location.href;
		var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
		var string = reg.exec(href);
		return string ? string[1] : null;
	};

	var showError = function () {
		status.innerHTML = '<p>Unable to opt you out at this time, sorry! Please email Chris directly at <a href="mailto:&#099;&#104;&#114;&#105;&#115;&#064;&#103;&#111;&#109;&#097;&#107;&#101;&#116;&#104;&#105;&#110;&#103;&#115;&#046;&#099;&#111;&#109;?subject=Email%20Opt%20Out">&#099;&#104;&#114;&#105;&#115;&#064;&#103;&#111;&#109;&#097;&#107;&#101;&#116;&#104;&#105;&#110;&#103;&#115;&#046;&#099;&#111;&#109;</a>.</p>';
	};

	var showSuccess = function () {
		var msg = status.getAttribute('data-status');
		status.innerHTML = msg ? msg : '<p>You have been successfully opted out. Thanks!</p>';
	};

	/**
	 * Serialize the form data into a query string
	 * https://stackoverflow.com/a/30153391/1293256
	 * @param  {Node}   form The form to serialize
	 * @return {String}      The serialized form data
	 */
	var serialize = function (form) {

		// Setup our serialized data
		var serialized = [];

		// Loop through each field in the form
		for (var i = 0; i < form.elements.length; i++) {

			var field = form.elements[i];

			// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
			if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

			// Convert field data to a query string
			if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
			}
		}

		return serialized.join('&');

	};

	// Send data to the MailChimp API
	var sendData = function () {

		// Get the form parameters
		var params = serialize(form);

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
		xhr.open('POST', endpoint + '?' + params);
		xhr.send();

	};

	var isEmail = function (addy) {
		return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/.test(addy);
	};

	var getEmail = function () {

		// Get email address
		var addy = getQueryString('email');
		var valid = isEmail(addy);

		// If it's valid, set it
		if (addy && valid) {
			email.value = addy;
			return true;
		}

		// Otherwise, show an err
		showError();
		return false;

	};


	//
	// Event Listeners & Inits
	//

	// Make sure required elements exist
	if (!form || !email || !status) return;

	// Get the user email address
	if (!getEmail()) return;

	// Submit the request
	sendData();

};

optOut();