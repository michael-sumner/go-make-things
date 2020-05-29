---
title: "Securing serverless functions with CloudFlare Workers"
date: 2020-05-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to create a simple serverless function with CloudFlare Workers and vanilla JS](/getting-started-with-serverless-using-cloudflare-workers-and-vanilla-js/).

Today, we're going to learn how to secure the API endpoint.

## Using CORS headers

In yesterday's article, our `handleRequest()` function looked like this.

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

	return new Response(JSON.stringify({
		greeting: 'Hi there, friend!'
	}), {
		status: 200,
		headers: headers
	});

};
```

In the `headers` object, we can restrict calls to this API so a specific URL, or _origin_, using the `Access-Control-Allow-Origin` property.

For example, if I only wanted to allow API calls from `gomakethings.com`, I could do this.

```js
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	let headers = new Headers({
		'Access-Control-Allow-Origin': 'https://gomakethings.com',
		'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	return new Response(JSON.stringify({
		greeting: 'Hi there, friend!'
	}), {
		status: 200,
		headers: headers
	});

};
```

If you tried to make a `fetch()` request to the API from somewhere else (like `vanillajsguides.com`), the API would return an error.

That's great if you're restricting to calls to a single domain, but what about multiple domains?

## An allowed domains array

Let's leave `Access-Control-Allow-Origin` with a value of `*`, and instead create an array of allowed origins.

```js
// Allowed domain origins
var allowed = ['https://gomakethings.com', 'https://vanillajstoolkit.com'];
```

The `handleRequest()` method has an argument: `request`. This is the actual API request object.

It has a property, `headers`, that includes all of the headers that came with the API request. You can use the `get()` method, passing in `origin` as an argument, to get the request origin.

```js
request.headers.get('origin');
```

We can use [the `Array.includes()` method](/how-to-check-for-an-item-in-an-array-with-vanilla-js/) to check if the origin is in our array of `allowed` domains. If not, we'll return a `403` error. Otherwise, we'll return the actual response.

```js
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

	return new Response(JSON.stringify({
		greeting: 'Hi there, friend!'
	}), {
		status: 200,
		headers: headers
	});

};
```

## Try it yourself

Try running this snippet anywhere on [gomakethings.com](https://gomakethings.com) or [vanillajstoolkit.com](https://vanillajstoolkit.com). Then trying running it somewhere else (like [vanillajsguides.com](https://vanillajsguides.com)).

(*Open up developer tools, click on the `Console` tab, and copy/paste/return.*)

```js
fetch('https://falling-scene-37ce.gomakethings.workers.dev').then(function (response) {
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

Neat, huh?

Next week, we'll cover more serverless topics, including using environment variables and creating a middleman API.