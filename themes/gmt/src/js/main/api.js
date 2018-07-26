var api = function () {

	'use strict';

	//
	// Variables
	//

	var ctas = document.querySelectorAll('[data-cta]');
	var testimonials = document.querySelectorAll('[data-testimonial]');


	//
	// Methods
	//

	var sanitize = function () {
		var temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	};

	var renderTestimonial = function (node, data) {
		var usePhoto = node.getAttribute('data-use-photo');
		node.innerHTML =
			<div class="row">
				<div class="grid-third">
					<img class="aligncenter margin-bottom-small img-circle" height="150" width="150" src="{{ $testimonial.photo | absURL }}">
				</div>
				<div class="grid-two-thirds">
					<blockquote>
						<cite>- <a href=""></a></cite>
					</blockquote>
				</div>
			</div>
	};

	var renderCTA = function (node, data) {

	};

	var process = function (nodes, data, isCTA) {
		for (var i = 0; i < nodes.length; i++) {

			// Get the content ID
			var id = nodes[i].getAttribute('data-' + type);
			if (!id || !data[id]) continue;

			// Render data into the DOM
			if (isCTA) {
				renderCTA(nodes[i], data[id]);
			} else {
				renderTestimonial(nodes[i], data[id]);
			}

		}
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


	//
	// Inits
	//

	if (ctas.length < 1 && testimonials.length < 1) return;
	getAPI('https://gomakethings.com/api/data.json');

};