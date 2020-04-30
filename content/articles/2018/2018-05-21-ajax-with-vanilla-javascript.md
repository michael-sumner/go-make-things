---
title: "AJAX and APIs with vanilla JavaScript"
date: 2018-05-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

_**UPDATE:** I now recommend [using `fetch()` over XHR](/how-to-use-the-fetch-api-with-vanilla-js/)._

> AJAX stands for Asynchronous JavaScript And XML. In a nutshell, it is the use of the XMLHttpRequest object to communicate with servers. It can send and receive information in various formats, including JSON, XML, HTML, and text files. AJAX’s most appealing characteristic is its "asynchronous" nature, which means it can communicate with the server, exchange data, and update the page without having to refresh the page. <cite>[Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started)</cite>

AJAX is the primary method you use to get and send data to APIs in JavaScript.

Making AJAX requests with the `XMLHttpRequest()` method, often referred to as XHR, is a three step process:

1. Set up our request by creating a new `XMLHttpRequest()`.
2. Create an `onload` callback to run when the request completes.
3. Open and send our request.

## An Example

Let's put together an example that requests data from [JSON Placeholder](https://jsonplaceholder.typicode.com/), a site that provides real API endpoints and sends back placeholder content.

First, let's set up a new XHR request.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();
```

Next, let's create an `onload` event that will run when our request completes and data is sent back.

The XHR request will return with a `status` property that contains [an HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). Codes from `200` to `299` are consider a success. Anything else is not.

We can check that our request was successful by making sure the `xhr.status` was greater than or equal to `200` *and* less than `300`.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process completed requests
xhr.onload = function () {

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// This will run when the request is successful
		console.log('success!', xhr);
	} else {
		// This will run when it's not
		console.log('The request failed!');
	}

	// This will run either way
	// All three of these are optional, depending on what you're trying to do
	console.log('This always runs...');
};
```

Finally, we'll open our request, specifying the request type (more on that in the next lesson), and the URL to make our request to.

Then, we'll send our request.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process completed requests
xhr.onload = function () {

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// What do when the request is successful
		console.log('success!', xhr);
	} else {
		// What do when the request fails
		console.log('The request failed!');
	}

	// Code that should run regardless of the request status
	console.log('This always runs...');
};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
```

Give this a try yourself!

Copy and paste the code above into the console tab in your browsers developer tools and see what comes back.

## Browser Compatibility

XHR works in all modern browsers, and IE7 and above.