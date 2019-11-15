---
title: "How to use the Fetch API with vanilla JS"
date: 2019-09-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The Fetch API is used to make Ajax requests, such as calling an API or fetching a remote resource or HTML file from a server.

In the past, I've been *very* vocal about [my preference for XHR over Fetch](/why-i-still-use-xhr-instead-of-the-fetch-api/). I was wrong. Fetch is objectively superior. It does everything I need it to with a simpler syntax.

Let's look at how it works.

## The Basic Fetch API Syntax

For today's article, we'll use [JSON Placeholder](https://jsonplaceholder.typicode.com/) to make real API requests.

Let's say you wanted to get a list of posts from the API using the `https://jsonplaceholder.typicode.com/posts` endpoint. First, you would pass that into the `fetch()` method as an argument.

```js
fetch('https://jsonplaceholder.typicode.com/posts');
```

Yesterday, we looked at [Promises in JavaScript](/promises-in-javascript/).

The `fetch()` method returns a Promise. We can handle API responses using `then()` and `catch()`. Let's log the response to the console.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	console.log('success!', response);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYBRdaQ)

If you look at the response in the console, you'll notice that the `response.body` *isn't* usable JSON. It's something called a `ReadableStream`.

The Fetch API uses streams. To get our API data as a JSON object, we can use a method native to the Fetch API: `json()`. We'll call it on our `response` object, and return its value.

We can then work with the actual response JSON in a chained `then()` method.

```js
fetch('https://jsonplaceholder.typicode.com/posts').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

[Here's a demo of the Fetch `json()` method.](https://codepen.io/cferdinandi/pen/RwbMQev)

## Error handling with the Fetch API

Because it returns a Promise, the Fetch API handles errors with the `catch()` method.

However, the Promise only rejects and and triggers the `catch()` method if there request fails to resolve. If there's a response from the server, even if it's a `404` or `500` error, the `then()` methods still run.

For example, in this request below, I've misspelled `/posts` as `postses`, causing a `404`.

```js
fetch('https://jsonplaceholder.typicode.com/postses').then(function (response) {
	// The API call was successful!
	return response.json();
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

[Here's a demo of what this does.](https://codepen.io/cferdinandi/pen/dybmmPw) Notice that an empty JSON object is logged, and our warning doesn't show in the console.

### How to properly handle error codes with the Fetch API

To "fix" this behavior, we can use the `ok` property on the `response` that the Fetch Promise returns.

If the `response.ok` property is `true`, we'll return the `response.json()`. If not, we'll return a rejected Promise object, passing in the `response`, to trigger our `catch()` method.

```js
fetch('https://jsonplaceholder.typicode.com/postses').then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

[Here's a demo of a Fetch request with better error handling.](https://codepen.io/cferdinandi/pen/MWgVVXG)

### XHR does this, too

This behavior used to *really* bother me. [It was one of my main arguments about why XHR is actually better.](/why-i-still-use-xhr-instead-of-the-fetch-api/#the-fetch-api-is-a-failed-promise)

But here's where I was completely, utterly, stupidly wrong: XHR does this, too.

An XHR `onreadystatechange` handler runs whether the response was successful or failed. You still need to check if the response falls between the `200` and `300` range before working with it.

```js
// Setup our listener to process compeleted requests
xhr.onreadystatechange = function () {

	// Only run if the request is complete
	if (xhr.readyState !== 4) return;

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// What do when the request is successful
		console.log('success', JSON.parse(xhr.responseText));
	} else {
		// What to do when the request has failed
		console.log('error', xhr);
	}

};
```

Looking at this now, the Fetch API approach is a lot cleaner.

## Making other request types

By default, the Fetch API makes `GET` requests. Let's say you instead wanted to make a `POST` request to publish a new article via an API.

The `fetch()` method accepts a second argument you can use to pass in an object of options. One of those is `method`.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST'
}).then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

For certain types of requests, you may also need to pass data along with the request. You can do this with the `body` property on on your options object.

This is typically a string, but could also be [a `FormData` object](https://developer.mozilla.org/en-US/docs/Web/API/FormData) if you were doing something like submitting a form with JavaScript.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: 'title=' + encodeURIComponent('My awesome new article') + '&body=' + encodeURIComponent('This is the text of my article')
}).then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

[Here's a demo of a `POST` request with the Fetch API.](https://codepen.io/cferdinandi/pen/oNvqdWx)

## Setting headers with the Fetch API

Another common thing you might need to do is set headers and other properties for your request. This can also be done with the options object.

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: 'title=' + encodeURIComponent('My awesome new article') + '&body=' + encodeURIComponent('This is the text of my article'),
	headers: {
		'Content-Type': 'application/json'
	},
	referrer: 'no-referrer'
}).then(function (response) {
	// The API call was successful!
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (data) {
	// This is the JSON from our response
	console.log(data);
}).catch(function (err) {
	// There was an error
	console.warn('Something went wrong.', err);
});
```

You can view [a full list of options and values on the Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters).

## Browser Compatibility

The Fetch API works in all modern browsers, including Edge, but has no IE support. It works in newer mobile browsers but may not work on older ones (and it's common for people to not update the OS on their phones).

You should [include the Fetch polyfill](https://github.com/github/fetch) when using it. It also requires a polyfill for Promises. [This one from Taylor Hakes](https://github.com/taylorhakes/promise-polyfill) is quite good.

If you prefer to use [polyfill.io](https://polyfill.io), it includes Promises by default, but *not* the Fetch API. You should use the `features` flag to include it.

```
https://polyfill.io/v3/polyfill.min.js?features=default%2Cfetch
```