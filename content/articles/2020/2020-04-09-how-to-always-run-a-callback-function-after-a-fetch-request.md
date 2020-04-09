---
title: "How to always run a callback function after a vanilla JS fetch() request (regardless of whether it failed or succeeded)"
date: 2020-04-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to show you how to run a callback function on a `fetch()` call, regardless of whether it succeeds or fails.

## An example

Let's say you want to call the [JSONPlaceholder `/posts` endpoint](https://jsonplaceholder.typicode.com/). Whether the call succeeds or fails, you want to run a `render()` function afterwards to update the UI.

Using `then()` and `catch()`, you would run the `render()` method in both your success and failure callbacks.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
	render();
}).catch(function (error) {
	console.warn(error);
	render();
});
```

But, there's another callback handler you can attach to `fetch()` (and other Promises) that will run no matter what.

## The `Promise.finally()` method

The `finally()` method runs regardless of whether or not a Promise resolves.

Using our example from above, we would attach it after the `catch()` method, and run on `render()` function only there.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	if (response.ok) {
		return response.json();
	}
	return Promise.reject(response);
}).then(function (data) {
	console.log(data);
}).catch(function (error) {
	console.warn(error);
}).finally(function () {
	render();
});
```

[Here's a demo for you to play with.](https://codepen.io/cferdinandi/pen/abvbwjp)

It contains a `getEndpoint()` method that randomly returns either a valid or invalid endpoint. The API call will fail about half the time, but the `finally()` method always runs.

## Browser compatibility

The `finally()` method has the same browser support as Promises and the Fetch API.

It works in all modern browser, but has no IE support. [You can push support back to IE9 with a Promise polyfill.](https://vanillajstoolkit.com/polyfills/promise/)