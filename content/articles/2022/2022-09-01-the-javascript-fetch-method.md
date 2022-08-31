---
title: The JavaScript fetch() method
date: 2022-09-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [JavaScript Promises](/javascript-promises/). Today, we're going to look at a practical use of Promises: the `fetch()` method.

Let's dig in!

## What's `fetch()`?

The `window.fetch()` method is used to make Ajax requests, such as calling an API or fetching a remote resource or HTML file from a server.

For this lesson, we'll use [JSON Placeholder](https://jsonplaceholder.typicode.com/) to make real API requests. 

Let's say you wanted to get a list of posts from the API using the `https://jsonplaceholder.typicode.com/posts` endpoint. First, you would pass that into the `fetch()` method as an argument.

```js
fetch('https://jsonplaceholder.typicode.com/posts');
```

The `fetch()` method returns a Promise. We can handle API responses chaining `Promise.then()` and `Promise.catch()` methods to it. Let's pass the `response` object into our `Promise.then()` callback function, and log it to the console.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	console.log(response);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});
```

If you look at the response in the console, you'll notice that the `response.body` *isn't* usable text or JSON. It's something called a `ReadableStream`.

The `fetch()` method uses streams.

To get our API data as text or a JSON object, we can use one of two methods native to the Fetch object: `Body.text()` and `Body.json()`. The `Body.text()` method gets the body data as a text string, while the `Body.json()` method gets it as a JSON object. Both return a Promise.

In most cases, you'll likely want JSON data. Call the method on the `response` object, and return. We can then work with the actual response JSON in a chained `Promise.then()` method.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});
```

## Catching errors with the Fetch API

Because it returns a Promise, the Fetch API handles errors with the `Promise.catch()` method.

However, the Promise only rejects and triggers the `Promise.catch()` method if the request fails to resolve. If there's a response from the server, even if it's a `404` or `500` error, the `Promise.then()` methods still run.

For example, in this request below, I've misspelled `/posts` as `/postses`, causing a `404` error.

```js
fetch('https://jsonplaceholder.typicode.com/postses').then(function (response) {
	// The API call was successful
	// (wait, it was?)
	console.log(response.status);
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});
```

If you try this yourself, you'll notice that an empty JSON object is logged, and our warning doesn't show in the console.

#### The Response.ok property

The `Response.ok` property returns a boolean, with a value of `true` if the response has a status code between `200` and `299`, and `false` if it does not.

If the `response.ok` property is `true`, we can `return response.json()` just like before. If not, we can `throw response` to trigger the `Promise.catch()` method.

```js
fetch('https://jsonplaceholder.typicode.com/postses').then(function (response) {

	// If the response is successful, get the JSON
	if (response.ok) {
		return response.json();
	}

	// Otherwise, throw an error
	throw response.status;

}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});
```

While that triggers the `Promise.catch()` handler, the `error` parameter is the `response` object. Sometimes the `response.status` code or the `response.statusText` are all you need. But often, details about the error are in the `response.body` body.

Instead of immediately running `throw`, you can instead `return response.json()` or `return response.text()` with a chained `Promise.then()` function. Inside its callback function, `throw` the parsed JSON or text to trigger the `Promise.catch()` method, with the error data as the `error` argument.

```js
fetch('https://jsonplaceholder.typicode.com/postses').then(function (response) {

	// If the response is successful, get the JSON
	if (response.ok) {
		return response.json();
	}

	// Otherwise, throw an error
	return response.json().then(function (json) {
		throw json;
	});

}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (error) {
	// There was an error
	console.warn(error);
});
```

Some APIs return a simple string error message instead of an object. If that's the case, you'll get a JSON error in the console.

For APIs that don't return an error object, use `response.text()` instead of `response.json()`.

```js
// Otherwise, throw an error
return response.text().then(function (msg) {
	throw msg;
});
```

Tomorrow, we'll look at the `async` and `await` keywords, and how they can make Promises a bit easier to work with.

If you're enjoying this series, you might like [my course on APIs and Asynchronous JS](https://vanillajsguides.com/apis/).