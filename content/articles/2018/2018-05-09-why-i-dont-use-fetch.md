---
title: "Why I still use XHR instead of the Fetch API"
date: 2018-05-09T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last year, I've had quite a few people ask me to write about the Fetch API for making Ajax requests.

Truth is, I still prefer using good old XHR. Today, I want to explain why.

## A quick overview of XHR vs. `fetch()`

[JSON Placeholder](https://jsonplaceholder.typicode.com/) is an awesome service for testing API calls. Let's say you wanted to make a call to their `/posts` endpoint.

Here's what that looks like in traditional XHR.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

// Setup our listener to process compeleted requests
xhr.onreadystatechange = function () {

	// Only run if the request is complete
	if (xhr.readyState !== 4) return;

	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
		// What do when the request is successful
		console.log(JSON.parse(xhr.responseText));
	}

};

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.send();
```

And here's what that looks like in with `fetch()`.

```js
fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
	});
```

At first glance, the Fetch API version appears to be a lot more simple and straightforward.

There's the second `.then()`, because the `response` does *not* contain the actual data in readable form. It's a stream, so you need to pass `response.json()` (a method on the Fetch object) along to actually get and do anything with the data, but this is still a pretty clean, readable bit of code.

This is an illusion.

## The Fetch API is a failed promise

(👆 *See what I did there?*)

The simplicity of the Fetch API falls apart pretty quickly once you start dealing with error handling.

For example, let's say you typed the endpoint wrong. Instead of `/posts`, you did `/postses`.

In the XHR version, you would add an `else` to our `if` statement checking the `status` property.

```js
// Set up our HTTP request
var xhr = new XMLHttpRequest();

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

// Create and send a GET request
// The first argument is the post type (GET, POST, PUT, DELETE, etc.)
// The second argument is the endpoint URL
xhr.open('GET', 'https://jsonplaceholder.typicode.com/postses');
xhr.send();
```

With `fetch()`, you would add `catch()` with a callback.

```js
fetch('https://jsonplaceholder.typicode.com/postses')
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log('success', data);
	})
	.catch(function (error) {
		console.log('error', error);
	});
```

Here are demos of [XHR](https://jsfiddle.net/cferdinandi/2mc2wnc7/) and [Fetch API](https://jsfiddle.net/cferdinandi/zwptnzjv/) error handling for you.

You'll notice that the XHR version returns an error as expected, while the Fetch API version returns a successful call. Huh?

## What's going on here?

From the [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch):

> The Promise returned from `fetch()` won’t reject on HTTP error status even if the response is an HTTP `404` or `500`. Instead, it will resolve normally (with `ok` status set to `false`), and it will only reject on network failure or if anything prevented the request from completing.

In other words, even if your call fails, it `fetch()` will still treat it like a success.

To make the above call work as expected, you need to check if `response.ok` is true, and then return the data or throw an error accordingly.

```js
fetch('https://jsonplaceholder.typicode.com/postses')
	.then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject({
				status: response.status,
				statusText: response.statusText
			});
		}
	})
	.then(function (data) {
		console.log('success', data);
	})
	.catch(function (error) {
		console.log('error', error);
	});
```

[Here's an updated demo.](https://jsfiddle.net/cferdinandi/zwptnzjv/1/)

Better, but you're not done! [Zell Liew](https://zellwk.com/) explains in [this detailed primer on CSS Tricks](https://css-tricks.com/using-fetch/):

> It's not enough to just tell our `.catch` statement there's a bad request. We need more information to tell what's missing. Did your user forget their first name? Email? Or maybe their credit card information? We won't know!
> ...
> The solution is to return a promise that contains two `then` calls. This way, we can first read what's in `response.json`, then decide what to do with it.

He suggests setting up a handling function that you pass into your first `then()`.

```js
var handleResponse = function (response) {
	return response.json()
		.then(function (json) {
			if (response.ok) {
				return json;
			} else {
				return Promise.reject(response);
			}
		});
};

fetch('https://jsonplaceholder.typicode.com/postses')
	.then(handleResponse)
	.then(function (data) {
		console.log('success', data);
	})
	.catch(function (error) {
		console.log('error', error);
	});
```

[Here's a new, updated demo.](https://jsfiddle.net/cferdinandi/zwptnzjv/2/)

Even this isn't enough, though, because it doesn't account for XML responses&mdash;only JSON. For that you need to [get the content type from the `response.headers` and do a conditional check on it](https://css-tricks.com/using-fetch/#article-header-id-6).

## And this is where I officially throw my hands up in the air and say "to hell with it!"

Because this is complete and utter madness.

I think most people think of the Fetch API as this high-level helper that makes API calls easier. And at first glance it is.

But once you get into actually working with it, you realize `fetch()` is actually a low-level API that requires a lot of scaffolding around it. This gives it tremendous flexibility, but takes away much of the ease.

The Fetch API works in all modern browsers, but has no IE support, only works in Safari 10 and up, and Edge support starts at 14.

Honestly, this doesn't seem easier to me than XHR, error handling is weird, and the browser support sucks.

## So why *do* people like the Fetch API

In a word, promises.

When working with APIs, you might need to make an API call, then get that response and make another call, and then another one, or do something with that data.

This can result in nested XHR calls several layers deep. The Fetch API uses promises, so you can chain `.then()` methods together as many times as needed to keep working with your data.

For example, you can return a new `fetch()` call using the ID of one of the posts in your response.

```js
fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject({
				status: response.status,
				statusText: response.statusText
			});
		}
	})
	.then(function (data) {
		console.log('success', data);
		return fetch('https://jsonplaceholder.typicode.com/posts/' + data[0].id);
	})
	.then(function (response) {
		return response.json();
	})
	.then(function (post) {
		console.log('success', post);
	})
	.catch(function (error) {
		console.log('error', error);
	});
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/zwptnzjv/3/)

The thing is, you can get the benefits of this using XHR, too. Tomorrow, I'll show you how to do.