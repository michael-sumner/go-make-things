---
title: How to check if an API error response is JSON or not with vanilla JavaScript
date: 2021-09-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

API error responses are tricky.

Sometimes the response you get back is a simple string message. Sometimes it's a JSON object. Some APIs document well, but many do not. Some handle it inconsistently.

Today, we're going to look at a quick trick for getting more useful data from API errors. Let's dig in!

## An example

Here, I'm calling [the JSON Placeholder API](https://jsonplaceholder.typicode.com/) with an incorrect endpoint.

If the `response` is `ok`, I use the `Response.json()` method to get my data. Otherwise, I `throw` the `response` to `catch()` the error.

Inside my `catch()` handler callback function, I'm warning the error to the console.

```js
fetch('https://jsonplaceholder.typicode.com/tododos').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
});
```

Sometimes, the `error` response contains a useful `statusText` message. But often, that important information is tucked away in the `response.body`.

That data might be a string we can get with the `Response.text()` method, or it might be an object of values that requires the `Response.json()` method.

```js
fetch('https://jsonplaceholder.typicode.com/tododos').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {

	// Do we need this?
	error.text().then(function (msg) {
		console.warn(error, msg);
	});

	// Or this?
	error.json().then(function (msg) {
		console.warn(error, msg);
	});

});
````

So... how do we know which one it is?

## Checking the `response.headers`

Last week, [Jason Watmore shared an interesting technique](https://jasonwatmore.com/post/2021/09/22/fetch-vanilla-js-check-if-http-response-is-json-in-javascript) I hadn't considered before: we can check the `response.headers` to see what kind of data the API sent back.

```js
fetch('https://jsonplaceholder.typicode.com/tododos').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	throw response;
}).then(function (data) {
	console.log(data);
}).catch(function (error) {

	// Check if the response is JSON or not
	let isJSON = error.headers.get('content-type').includes('application/json');

	// If JSON, use text(). Otherwise, use json().
	let getMsg = isJSON ? error.json() : error.text();

	// Warn the error and message when it resolves
	getMsg.then(function (msg) {
		console.warn(error, msg);
	});

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExXMvYd) Thanks to Jason for sharing this trick!