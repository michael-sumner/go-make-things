---
categories:
- Code
- JavaScript
date: '2014-12-29'
permalink: /working-with-jsonp/
title: Working with JSONP
url: /2014/12/29/working-with-jsonp
---

In [petfinderAPI4everybody.js](https://github.com/cferdinandi/petfinderAPI4everybody), I fetch data from Petfinder's API on the client side using only native JavaScript&mdash;no jQuery needed.

Today, I want to share my code and talk about my approach.

## The Technique

To use API data hosted on a domain other than your own, you need to use a technique called JSONP. [From Wikipedia](http://en.wikipedia.org/wiki/JSONP):

> JSONP or "JSON with padding" is a communication technique used in JavaScript programs running in web browsers to request data from a server in a different domain, something prohibited by typical web browsers because of the same-origin policy. JSONP takes advantage of the fact that browsers do not enforce the same-origin policy on `<script>` tags.

Here's how it works: The API request URL is set as the `src` of a `<script>` tag, which gets appended to the DOM. That data is then passed into a callback method on load. The callback is included in the request url as `?callback=callbackMethodName`;

### The Code

```javascript
/**
 * Get JSONP data for cross-domain AJAX requests
 * @private
 * @link http://cameronspear.com/blog/exactly-what-is-jsonp/
 * @param  {String} url      The URL of the JSON request
 * @param  {String} callback The name of the callback to run on load
 */
var loadJSONP = function ( url, callback ) {

	// Create script with url and callback (if specified)
	var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
	var script = window.document.createElement( 'script' );
	script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'callback=' + callback;

	// Insert script tag into the DOM (append to <head>)
	ref.parentNode.insertBefore( script, ref );

	// After the script is loaded (and executed), remove it
	script.onload = function () {
		this.remove();
	};

};
```

And here's an example using the [Petfinder API](https://www.petfinder.com/developers/api-docs):

```javascript
var logAPI = function ( data ) {
	console.log( data );
}

getJSONP( 'http://api.petfinder.com/shelter.getPets?format=json&key=12345&shelter=AA11', 'logAPI' );
```

## Client-Side Performance

Loading data from APIs can be slow, so you want to minimize the amount of times you have to request data.

With petfinderAPI4everybody.js, I decided to store API data in localStorage so that after initial page load, the data is immediately available for use on each subsequent page load. I added an expiration date so that after a certain period of time, new data will be fetched to replace it.

## The Code

Here's the code that makes it all work:

```javascript
var getJSONP = ( function( window, document, undefined ) {

	// Set Variables
	var getJSONP = {}; // Object for public APIs
	var settings = {}; // Object for settings
	var url, localAPI;

	/**
	 * Get JSONP data for cross-domain AJAX requests
	 * @private
	 * @link http://cameronspear.com/blog/exactly-what-is-jsonp/
	 * @param  {String} url      The URL of the JSON request
	 * @param  {String} callback The name of the callback to run on load
	 */
	var loadJSONP = function () {

		// Create script with url and callback (if specified)
		var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
		var script = window.document.createElement( 'script' );
		script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + 'setAPIData';

		// Insert script tag into the DOM (append to <head>)
		ref.parentNode.insertBefore( script, ref );

		// After the script is loaded (and executed), remove it
		script.onload = function () {
			this.remove();
		};

	};

	/**
	 * Save remote API data to localStorage and set variable for use
	 * @public
	 * @param {Object} data API data object from Petfinder
	 */
	getJSONP.setAPIData = function ( data ) {

		// Check for error codes
		// Replace with relevant name and code from your API
		if ( data.someCode === '000' ) {
			console.log('Unable to get data from the API. Using expired localStorage data instead.');
			run();
			return;
		}

		// Save API Data to localStorage with expiration date
		var expirationMS = parseInt( settings.expiration, 10 ) * 60 * 1000;
		localAPI = {
			data: data,
			timestamp: new Date().getTime() + expirationMS
		};
		localStorage.setItem( settings.localAPIid, JSON.stringify(localAPI) );

		// Run methods after data loads
		run();

	};

	/**
	 * Get API data from localStorage
	 * @private
	 */
	var getAPIData = function () {

		// Get API data from localStorage
		localAPI = JSON.parse( localStorage.getItem( settings.localAPIid ) );

		// If local data exists and hasn't expired, use it
		if ( localAPI ) {
			if ( new Date().getTime() < localAPI.timestamp ) {
				run();
				return;
			}
		}

		// If local data doesn't exist or has expired, get fresh data
		getJSONP( url );

	};

	/**
	 * Do stuff after API is loaded
	 * @private
	 */
	var run = function () {

		// If no API data is available, log error
		if ( !localAPI ) {
			console.log( 'Unable to retrieve data from the API or localStorage.' );
			return;
		}

		// Do stuff here...
		console.log( localAPI );

	};

	getJSONP.init = function ( url, options ) {

		// Check for localStorage support before running
		if ( !window.localStorage ) return;

		// If no URL is supplied, quit
		if ( !url ) return;

		// Merge options with defaults
		settings.expiration = options.expiration || 60;
		settings.localAPIid = options.localAPIid || 'localJSONP';

		// Get API data
		getAPIData();

	};

	// Return public methods
	return getJSONP;

})( window, document );
```

And here's an example using the Petfinder API:

```javascript
getJSONP.init( 'http://api.petfinder.com/shelter.getPets?format=json&key=12345&shelter=AA11' );
```