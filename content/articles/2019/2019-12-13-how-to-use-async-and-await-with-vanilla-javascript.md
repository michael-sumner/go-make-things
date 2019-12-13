---
title: "How to use async and await with vanilla JavaScript"
date: 2019-12-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

You may have seen `async` and `await` before and been confused about what they do or why you would use them. Today, I'm going to demystify things a bit with some practical examples.

## What `async` and `await` do

The `async` operator turns a traditional function into a Promised-based, asynchronous one.

The `await` operator tells a script to [wait for a Promise to resolve](/promises-in-javascript/) before moving on (kind of like `.then()` does). When used with a variable operator (like `var` or `let`), it assigns the *response* from the promise to the variable rather than the Promise itself.

The `await` operator can only be used inside of an `async` function.

The `async` and `await` operators are useful in letting you write Promise-based functions the same way you would write synchronous ones.

Confused yet? Let's clear things up with a real example.

## Using data from one `fetch()` request to make another

Yesterday, we looked at [how to use data from one `fetch()` request to make another](/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/), and then combine all of the data together.

This was the end result.

```js
var getPost = function () {

	var post;

	// Call the API
	fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (data) {

		// Store the post data to a variable
		post = data;

		// Fetch another API
		return fetch('https://jsonplaceholder.typicode.com/users/' + data.userId);

	}).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).then(function (userData) {
		console.log(post, userData);
	}).catch(function (error) {
		console.warn(error);
	});

};

getPost();
```

Let's use `async` and `await` to write this script a different way.

## Using `async` and `await` with `fetch()` to call an API

The first thing we'll do is add the `async` operator before our function operator. This turns the function into an asynchronous, Promise-based one.

```js
var getPost = async function () {
	// Code goes here...
};

getPost();
```

Next, we'll make our `fetch()` call with the API. Rather than using `then()`, though, we'll prefix it with `await` and assign it to a variable.

Now, our `async getPost()` function will wait until `fetch()` returns its response to assign a value to `postResp` and run the rest of the script. And instead of assigning the Promise that `fetch()` returns, it will assign the actual response it gets back.

```js
var getPost = async function () {

	// Get the post data
	var postResp = await fetch('https://jsonplaceholder.typicode.com/posts/5');

};

getPost();
```

Next, we can use the `json()` method on that response to get the actual data. The `json()` method is also Promise-based, so we'll need to use `await` with that one, too.

```js
var getPost = async function () {

	// Get the post data
	var postResp = await fetch('https://jsonplaceholder.typicode.com/posts/5');
	var post = await postResp.json();

};

getPost();
```

We now have data back, assigned to `post`. We can use the `post.userId` to make our second API call.

We'll again prefix it with `await`, then use the `json()` method to get the data from it.

When both API calls have completed, we can log the `post` and `author` data into the console.

```js
var getPost = async function () {

	// Get the post data
	var postResp = await fetch('https://jsonplaceholder.typicode.com/posts/5');
	var post = await postResp.json();

	// Get the author
	var authorResp = await fetch('https://jsonplaceholder.typicode.com/users/' + post.userId);
	var author = await authorResp.json();

	console.log(post, author);

};

getPost();
```

[Here's a demo in CodePen](https://codepen.io/cferdinandi/pen/bGNwGZr)

As you can see, this has a nice, simple, readable syntax. But there's an issue with this setup.

## Error Handling

The current setup will break very ungracefully if there's an error with the API response.

For example, if you spelled the endpoint `/postses` instead of `/posts`, `post` and `author` will be `undefined`. If you misspelled the URL itself, or if the API was down, the script would break before getting to the `console.log()` part.

```js
var getPost = async function () {

	// Get the post data
	var postResp = await fetch('https://jsonplaceholder.typicode.com/postses/5');
	var post = await postResp.json();

	// Get the author
	var authorResp = await fetch('https://jnosplaceholder.typicode.com/users/' + post.userId);
	var author = await authorResp.json();

	console.log(post, author);

};

getPost();
```

[Here's an example of it failing.](https://codepen.io/cferdinandi/pen/GRgjRaN)

On Monday, we'll look at how to handle errors.

## Browser compatibility

The `async` and `await` methods work in all modern browsers, but have no IE support. They *cannot* be polyfilled, and must be transpiled using a tool like Babel if you want them to run in older browsers.