---
title: "Promise-based XHR"
date: 2018-05-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I talked about [why I still use XHR over `fetch()`](/why-i-still-use-xhr-instead-of-the-fetch-api/). The Fetch API does have one advantage over out-of-the-box XHR, though: Promises.

Today, I want to show you how to use Promise-based XHR to get the best of both worlds.

## Why Promises are great

The big advantage promises have when working with APIs is that help avoid deeply nested callbacks.

Imagine you're making an API call. You get back a list of posts. Then you want to make another call to get details on the first post in the list. Then you want to take that data and clean it up a bit before finally using it to render some DOM content.

Here's what that might look like in a traditional callback model.

```js
getPosts('https://some-api.com/posts', function (posts) {
	getFirstPost('https://some-api.com/post/' + posts[0].id, function (post) {
		scrubData(post, function (postData) {
			renderPostInDom(postData);
		});
	});
});
```

This is often referred to as "Callback Hell," and Promises help fix it by allowing you to chain methods together using `.then()`, which does exactly what it sounds like. First this, then that, then that, then that.

Here's what the above approach might look like using a Promise-based approach.

```js
getPosts('https://some-api.com/posts')
	.then(function (posts) {
		return getFirstPost('https://some-api.com/post/' + posts[0].id);
	})
	.then(function (post) {
		return scrubData(post);
	})
	.then(function (postData) {
		renderPostInDom(postData);
	})
	.catch(function (error) {
		// If there's an error at any point in the chain, do something
	});
```

[Chris Buecheler gives a pretty good rundown on Promises over at CloseBrace](https://closebrace.com/tutorials/2018-04-25/js-quick-hits-14-es2015-promises) if you want to learn more.

## Making XHR Promise-based

Out-of-the-box, XHR relies on callbacks that run once the data loads.

However, making XHR Promise-based is as simple as wrapping it in a Promise object.

First, we'll setup a helper function, `makeRequest()`, that accepts a URL and optional method type. In our function, we'll create our XHR request.

```js
var makeRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

};
```

Next, we'll create a Promise object, and return it.

```js
var makeRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// The rest of our XHR stuff will go here...

	});
};
```

Inside our Promise, we'll setup an `onreadystatechange` listener, just like we would with a traditional XHR request. If we get back  a `2xx` status (a successful response), we'll use `resolve()` to pass along the response. Otherwise, we'll use `reject()` to pass along the error information.

```js
var makeRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

	});
};
```

Finally, we'll use the XHR `open()` method to setup our request with the URL and method (or if one wasn't provided, `GET`). Then we'll `send()` it.

```js
var makeRequest = function (url, method) {

	// Create the XHR request
	var request = new XMLHttpRequest();

	// Return it as a Promise
	return new Promise(function (resolve, reject) {

		// Setup our listener to process compeleted requests
		request.onreadystatechange = function () {

			// Only run if the request is complete
			if (request.readyState !== 4) return;

			// Process the response
			if (request.status >= 200 && request.status < 300) {
				// If successful
				resolve(request);
			} else {
				// If failed
				reject({
					status: request.status,
					statusText: request.statusText
				});
			}

		};

		// Setup our HTTP request
		request.open(method || 'GET', url, true);

		// Send the request
		request.send();

	});
};
```

## Using Promise-Based XHR

Now, you can make your XHR request by passing in a URL, and optionally a method.

```js
makeRequest('https://some-url.com/posts')
	.then(function (posts) {
		console.log('Success!', posts);
	})
	.catch(function (error) {
		console.log('Something went wrong', error);
	});
```

Where this gets really powerful is when you want to make multiple API calls, passing data from one into the next.

```js
makeRequest('https://some-url.com/posts')
	.then(function (posts) {
		return makeRequest('https://some-url.com/post/' + posts[0].id);
	})
	.then(function (post) {
		return {
			title: post.title.toUpperCase(),
			content: post.body,
			date: post.date
		}
	})
	.then(function (postData) {
		renderPost(postData);
	})
	.catch(function (error) {
		console.log('Something went wrong', error);
	});
```

## Making this easier

I just converted [my simple XHR plugin, Atomic](https://github.com/cferdinandi/atomic), to use Promises.

It works more-or-less like the sample code above, but allows you to pass in an object of options to set headers, the content type, credentials, and so on.

You can [play around with live examples on the demo page](https://cferdinandi.github.io/atomic/).

## Browser Compatibility

Promises only work natively in modern browsers. However, [a Promises polyfill pushes support back to IE7](https://github.com/stefanpenner/es6-promise). There's a polyfill loaded by default in [polyfill.io](https://polyfill.io) as well.

Atomic comes with two versions: a standalone version if you're loading your own polyfill or don't want broader backwards support, and one with a polyfill baked in.