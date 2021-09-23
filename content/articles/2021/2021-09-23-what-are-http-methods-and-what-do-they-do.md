---
title: "What are HTTP methods and what do they do?"
date: 2021-09-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I've got one last excerpt from my new pocket guide and video course on [Serverless with vanilla JS](https://vanillajsguides.com/serverless). We'll be looking at HTTP methods: what they are, and when to use which one.

Let's dig in!

## What are HTTP methods?

HTTP methods are verbs that describe the type of request you're making to an endpoint.

The five most common are `GET`, `POST`, `PUT`, `DELETE`, and `OPTIONS`.

- **`GET`** - Retrieve data from an API endpoint.
- **`POST`** - Submit data to an API endpoint. Usually causes something to happen on the server.
- **`PUT`** - Replace the existing data for an item with something new. This method can often be used to create a new item if one doesn't already exist.
- **`DELETE`** - Delete the data associated with an item.
- **`OPTIONS`** - Get a list of allowed HTTP methods.

[In a Cloudflare Worker serverless function](/creating-your-first-serverless-function-with-cloudflare-workers/), the `Access-Control-Allow-Methods` property on the `headers` object defines which HTTP methods are allowed for a request.

```javascript
// Define response headers
let headers = new Headers({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': '*'
});
```

So far, we've been allowing a wide range of HTTP methods, but your API may not use all of those methods. We can restrict which HTTP methods are allowed, and conditionally respond differently to different methods.

## Only allowing certain HTTP methods

To restrict your serverless API to specific HTTP methods, you can remove the methods that are not allowed from comma-separated list of values under `Access-Control-Allow-Methods`.

For example, if we only wanted to support `GET` and `OPTIONS`, we would do this.

```javascript
// Define response headers
let headers = new Headers({
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': '*'
});
```

If you attempted to make a `POST`, `PUT`, or `DELETE` request to this API, for example, you would get back a CORS error.

## Detecting which HTTP method was used to make the API request

Inside the `handleRequest()` function, the `request.method` property returns the type of HTTP method used to make the API request.

```javascript
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Define response headers
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
		'Access-Control-Allow-Headers': '*'
	});

	// Get the request method
	let method = request.method;

	// ...

}
```

Since different HTTP methods imply different behaviors, you might run different serverless function tasks or provide different responses based on the request method.

### The OPTIONS method

For example, in HTTP, the `OPTIONS` method returns a list of allowed HTTP methods.

For many HTTP methods (like `POST`), browsers will first make what's called a _pre-flight request_ to the API with the `OPTIONS` method to make sure that the specified method is allowed. If you're supporting more than just `GET` requests, you should always provide a dedicated response for the `OPTIONS` method to avoid _pre-flight CORS errors_.

To do that, we can check if the `request.method` is equal to `OPTIONS`.

If it is, we'll return a `new Response()` with `null` for the `body`, a `status` of `200`, and our `headers` object. Otherwise, we'll return the full API response.

```javascript
/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

	// Define response headers
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': '*'
	});

	// Handle the OPTIONS method
	if (request.method === 'OPTIONS') {
		return new Response(null, {
			status: 200,
			headers: headers
		});
	}

	// return a Response object
	return new Response(JSON.stringify({
		greeting: 'Hi, Universe!'
	}), {
		status: 200,
		headers: headers
	});

}
```