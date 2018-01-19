---
categories:
- Code
- JavaScript
date: '2014-12-31'
title: Getting HTML asynchronously from another page (with native JavaScript)
---

On a recent project, I needed to load the form on a contact page in a modal window on a different page.

That's typically something you'd turn to jQuery for, but I want to show you can achieve the same effect with native JavaScript.

## Asynchronous HTML

This approach uses [XMLHttpRequest web API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest).

While this API is supported back to IE 7, HTML requests are only supported in IE10 and higher. The method below includes a feature test and won't run in unsupported browsers.

```javascript
/**
 * Get HTML asynchronously
 * @param  {String}   url      The URL to get HTML from
 * @param  {Function} callback A callback funtion. Pass in "response" variable to use returned HTML.
 */
var getHTML = function ( url, callback ) {

	// Feature detection
	if ( !window.XMLHttpRequest ) return;

	// Create new request
	var xhr = new XMLHttpRequest();

	// Setup callback
	xhr.onload = function() {
		if ( callback && typeof( callback ) === 'function' ) {
			callback( this.responseXML );
		}
	}

	// Get the HTML
	xhr.open( 'GET', url );
	xhr.responseType = 'document';
	xhr.send();

};
```

To replace the entire contents of a page with content from another, you would do this:

```javascript
getHTML( '/about', function (response) {
	document.documentElement.innerHTML = response.documentElement.innerHTML;
});
```

You can also get specific elements on the page by treating the `response` variable the same way you would the `document` element on any other page.


```javascript
getHTML( '/about', function (response) {
	var someElem = document.querySelector( '#some-elem' );
	var someOtherElem = response.querySelector( '#some-other-elem' );
	someElem.innerHTML = someOtherElem.innerHTML;
});
```