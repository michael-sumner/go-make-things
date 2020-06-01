---
title: "How to create a middleman API with CloudFlare Workers and vanilla JS"
date: 2020-06-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how to create a serverless function with Cloudflare Workers and vanilla JS](/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/). We also learned [how to restrict calls to the function to specific domains](/securing-serverless-functions-with-cloudflare-workers/).

Today, I'm going to show you how to use Cloudflare Workers to setup a middleman API.

(*If you haven't read the first two articles in this series, today's article won't make much sense.*)

## What's a middleman API?

A lot of APIs&mdash;particularly ones that write data to a server, access restricted content, or limit how many calls you can make&mdash;require authentication to use.

To authenticate you, the API may require:

1. Your username and password
2. A key and secret
3. An API key or OAuth token

Sometimes these are passed along as a search parameter string on the URL itself.

```http
https://some-awesome-api.com/puppies?api-key=my_api_key_1234
```

For some APIs, you use an `authentication` header.

```js
fetch('https://some-awesome-api.com/puppies', {
	method: 'POST',
	headers: {
		'Authorization': `Bearer 1234`
	}
}).then(function (response) {
	return response.json();
}).then(function (data) {
	// Do stuff with the data...
});
```

**No matter what approach you use, if you include API credentials in your JavaScript, other people can access them and use them.**

Someone can just look at your JS file and find them. If your code is hosted on GitHub, they can search for them. If you obfuscate it with a weird variable name, they can open the *Network* tab in the browser's Developer Tools and see the credentials.

Credentials *must* live on a server to be secure.

### A middleman API keeps credentials on the server

A middleman API is an API you call (on a server you control) that calls the *real* API.

You store your credentials on the server, the middleman API uses them to call the real API, gets data back, and then returns it (in full or partially) back.

Let's build one with Cloudflare Workers.

## Building a middlemap API with Cloudflare Workers

For this example, we'll use the [JSON Placeholder API](https://jsonplaceholder.typicode.com/guide.html#createaresource). It doesn't actually require authentication, but it will work just fine for demo purposes.

We're going to start with [our "domain restricted endpoint"](/securing-serverless-functions-with-cloudflare-workers/) from last week.

```js
addEventListener('fetch', function (event) {
	event.respondWith(handleRequest(event.request));
});

// Allowed domain origins
var allowed = ['https://gomakethings.com', 'https://vanillajstoolkit.com'];

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// If domain is not allowed, return error code
	if (!allowed.includes(request.headers.get('origin'))) {
		return new Response('Not allowed', {
			status: 403,
			headers: headers
		});
	}

	// Make the API call and do stuff with the response...

};
```

Now, inside our `handleRequest()` function, we can make the call to the API endpoint we *actually* want. And since Cloudflare Workers are vanilla JS, we can use `fetch()`.

In order for this to work properly, we need to [use the `await` operator](/how-to-use-async-and-await-with-vanilla-javascript/) to prevent the `handleRequest()` function from returning before our API response comes back.

(*A traditional chained Promise with `then()` and `catch()` will not work here.*)

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// If domain is not allowed, return error code
	if (!allowed.includes(request.headers.get('origin'))) {
		return new Response('Not allowed', {
			status: 403,
			headers: headers
		});
	}

	// Make the API call and do stuff with the response...
	var resp = await fetch('https://jsonplaceholder.typicode.com/posts');
	var data = await resp.json();

};
```

Finally, once the data comes back, we can either return it outright, or manipulate it first.

For example, if the full data set contained sensitive information you wouldn't want exposed in the browser, you might create a new object containing only the relevant data before returning.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// If domain is not allowed, return error code
	if (!allowed.includes(request.headers.get('origin'))) {
		return new Response('Not allowed', {
			status: 403,
			headers: headers
		});
	}

	// Make the API call and do stuff with the response...
	var resp = await fetch('https://jsonplaceholder.typicode.com/posts');
	var data = await resp.json();

	// Return the data
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: headers
	});

};
```

## Try it yourself

Try running this snippet anywhere on [gomakethings.com](https://gomakethings.com) or [vanillajstoolkit.com](https://vanillajstoolkit.com).

The JSONPlaceholder API runs slow sometimes, so it could take a few seconds to show up.

(*Open up developer tools, click on the Console tab, and copy/paste/return.*)

```js
fetch('https://broken-silence-1374.gomakethings.workers.dev').then(function (response) {
	if (response.ok) {
		return response.json();
	};
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

Now, you can create middleman APIs whenever you need to use secure credentials with client side JavaScript. Tomorrow, we'll look at how to add an extra layer of security to those credentials.