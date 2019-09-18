---
title: "Waiting for multiple all API responses to complete with the vanilla JS Promise.all() method"
date: 2019-08-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

In yesterday's article, I mentioned that [I recently worked on a pretty big vanilla JS app](/building-an-extensible-app-or-library-with-vanilla-js/).

On some pages, we needed to wait for multiple API requests to complete before rendering content. Today, I want to show you a simple way to do that with the `Promise.all()` method.

## How I learned this

As I was trying to figure this out, I discovered that Steve Griffith (who's [video on composition vs. inheritance](/composition-vs.-inheritance-in-javascript/) I shared the other day) also had [a video on using `fetch` with `Promise.all()`](https://www.youtube.com/watch?v=HTA7pEDGZEU).

<iframe width="560" height="315" src="https://www.youtube.com/embed/HTA7pEDGZEU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you learn better from video, or want another source to complement what I'm going to share today, go check it out. It's really well done!

## How it works

The `Promise.all()` method accepts an array of promises, and let's you run callback functions after all of them resolve or one of them throws an error.

You can use it with [promise-based XHR](/promise-based-xhr/) (my preferred approach), but for simplicity today I'll be using `fetch()` with [JSONPlaceholder](https://jsonplaceholder.typicode.com/) in my examples.

Let's imagine you wanted to get back data from two API endpoints:

- `/posts` to get a list of blog posts
- `/users` to get back a list of users

The `/posts` endpoint provides user IDs for it's authors, so you need data from the `/users` endpoint to display author information.

## Getting a single endpoint

Getting data from a single API is relatively straightforward. To get data back from the `/posts` endpoint, you would do this.

```js
fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		// Get a JSON object from the response
		// This is a weird quirk of Fetch
		return response.json();
	}).then(function (data) {
		// Log the data to the console
		// You would do something with the /posts data here
 		console.log(data);
	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	});
```

## Calling multiple APIs in sequence

Promises are designed to prevent callback hell.

You *could* make your API calls in a sequence, cache the response of each one to a variable, and then do something with them when they're done.

Here's what that would look like.

```js
var posts, users;

fetch('https://jsonplaceholder.typicode.com/posts')
	.then(function (response) {
		// Get a JSON object from the response
		// This is a weird quirk of Fetch
		return response.json();
	}).then(function (data) {

		// Log the data to the console
 		console.log(data);

 		// Cache the data to a variable
 		posts = data;

 		// Make another API call and pass it into the stream
 		return fetch('https://jsonplaceholder.typicode.com/users');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Log the data to the console
		console.log(data);

		// Cache the data to a variable
		users = data;

		// Now that you have both APIs back, you can do something with the data

	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	});
```

As you can see, though, this is long and kind of awkward. It also means that you need to wait for one API responses to complete before the next can begin, which is a big inefficient.

Let's look at a better way.

## Calling multiple APIs at once

With the `Promise.all()` method, we can pass in an array of promises. When all of them have resolved (or one fails), it will run our callback functions.

In this case, we would pass in an array of our fetch calls.

```js
Promise.all([
	fetch('https://jsonplaceholder.typicode.com/posts'),
	fetch('https://jsonplaceholder.typicode.com/users')
]);
```

When they're all completed, `Promise.all()` passes along an array of promises to our first `.then()` callback.

To get a JSON object from each one to pass on, [we can use the `Array.map()` method to create a new array](/what-array.map-does-in-vanilla-js/).

The `data` argument in our second `then()` callback is an array of API data, with each item matching the corresponding API call in the `Promise.all()` array. In this example, the item at index `0` is for `/posts`, and the item at index `1` is for `/users`.

```js
Promise.all([
	fetch('https://jsonplaceholder.typicode.com/posts'),
	fetch('https://jsonplaceholder.typicode.com/users')
])
	.then(function (responses) {
		// Get a JSON object from each of the responses
		return responses.map(function (response) {
			return response.json();
		});
	}).then(function (data) {
		// Log the data to the console
		// You would do something with both sets of data here
 		console.log(data);
	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	});
```

As you can see, this is a lot more condensed than the previous example.

It also means you can make both calls at once, improving the overall performance of your app.

## Try this out yourself

You can copy/paste any of the examples above into the console tab in developer tools to try them out. They'll work on any web page.

## Browser compatibility

The `Promise.all()` method (and promises in general) work in all modern browsers, but have no IE support.

There are several polyfills available. I use the [auto version of this one from Stefan Penner](https://github.com/stefanpenner/es6-promise).