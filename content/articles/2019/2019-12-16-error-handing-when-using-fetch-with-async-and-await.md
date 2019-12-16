---
title: "Error handing when using the vanilla JS fetch() method with async and await"
date: 2019-12-16T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [how to use the `async` and `await` operators with the `fetch()` method](/how-to-use-async-and-await-with-vanilla-javascript/).

At the end of the article, I mentioned...

> The current setup will break very ungracefully if there’s an error with the API response.

Today, we're going to look at how to handle errors when using the `fetch()` method with `async` and `await`.

## The problem

On Friday, I showed you how you can call the `json()` method directly on the `postResp` and `authorResp` variables, because they returned response gets assigned to them instead of the Promise that `fetch()` returns.

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

However, if the API doesn't return a response for some reason&mdash;a mistyped URL, an error on the server, and so on&mdash;the `json()` method won't have anything to run on.

## Using `then()` and `catch()`

The most obvious solution is to use the method specifically designed to handle catching errors with Promises: `catch()`.

If the response is successful, you can `return` the `response.json()`. If not, you'll use `catch()` to log an error and `post` and `author` will be set to `undefined`.

You can check to see if `post` and `author` have values before moving on in your script.

```js
var getPost = async function () {

	// Get the post data
	var post = await fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
		return response.json();
	}).catch(function (err) {
		console.warn('Could not find a post');
	});

	// If there's no post, warn
	if (!post) return;

	var author = await fetch('https://jsonplaceholder.typicode.com/users/' + post.userId).then(function (response) {
		return response.json();
	}).catch(function (err) {
		console.warn('Could not find an author');
	});

	// If there's no author, warn
	if (!author) return;

	console.log(post, author);

};

getPost();
```

[The `fetch()` method only throws an error if the call does not resolve.](/how-to-use-the-fetch-api-with-vanilla-js/) A response that returns a status code of `400` or `500` would still be considered a "success".

We can also check in our `then()` methods to make sure the `response.ok` property is `true`, and force an error if it's not.

```js
var getPost = async function () {

	// Get the post data
	var post = await fetch('https://jsonplaceholder.typicode.com/posts/5').then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).catch(function (err) {
		console.warn('Could not find a post');
	});

	// If there's no post, warn
	if (!post) return;

	var author = await fetch('https://jsonplaceholder.typicode.com/users/' + post.userId).then(function (response) {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject(response);
		}
	}).catch(function (err) {
		console.warn('Could not find an author');
	});

	// If there's no author, warn
	if (!author) return;

	console.log(post, author);

};

getPost();
```

[Here's a demo with the script catching errors](https://codepen.io/cferdinandi/pen/ExaNyep), and [here's one with it working correctly](https://codepen.io/cferdinandi/pen/wvBoWQz).

So, this works. But as you can see, it's absurdly verbose.

## A more compact way to handle errors

Major kudos to Steve Griffith for showing me [a more concise way to handle errors when using `fetch()` with `async` and `await`](https://www.youtube.com/watch?v=ycJOZp_wWak).

The trick starts by wrapping our `fetch()` method in parentheses (`()`), and calling the `catch()` method directly on it. To keep our code DRY, we'll pass a named `handleError()` callback function into the `catch()` method.

```js
var getPost = async function () {

	// Get the post data
	var post = await (fetch('https://jsonplaceholder.typicode.com/posts/5').catch(handleError));

	// Get the author
	var author = await (fetch('https://jsonplaceholder.typicode.com/users/' + post.userId).catch(handleError));

	console.log(post, author);

};

getPost();
```

Inside the `handleError()` method, we'll return a `new Response()` object. In the object, we'll stringify an object with an error `code` and `message`.

```js
var handleError = function (err) {
	console.warn(err);
	return new Response(JSON.stringify({
		code: 400,
		message: 'Stupid network Error'
	}));
};
```

Next, we prefix `fetch()` with `await` *inside* the parentheses, and attach our `json()` method *outside* of them.

If the `fetch()` call is successful, it will automatically return a stringified response object to parse. If not, our `handleError()` method will create and return one.

Either way, the `json()` method has a stringified object to parse so no errors will be thrown.

```js
var getPost = async function () {

	// Get the post data
	var post = await (await fetch('https://jsonplaceholder.typicode.com/posts/5').catch(handleError)).json();

	// Get the author
	var author = await (await fetch('https://jsonplaceholder.typicode.com/users/' + post.userId).catch(handleError)).json();

	console.log(post, author);

};

getPost();
```

Finally, after each call, we'll check to see if the returned data has a `code` property with a value of `400`.

If it does, there was an error and we won't more forward. Otherwise, we're good to go.

```js
var getPost = async function () {

	// Get the post data
	var post = await (await fetch('https://jsonplaceholder.typicode.com/posts/5').catch(handleError)).json();
	if (post.code && post.code === 400) return;

	// Get the author
	var author = await (await fetch('https://jsonplaceholder.typicode.com/users/' + post.userId).catch(handleError)).json();
	if (author.code && author.code === 400) return;

	console.log(post, author);

};

getPost();
```

[Here's a demo with successful API calls](https://codepen.io/cferdinandi/pen/eYmBdmj), and [here's one with errors](https://codepen.io/cferdinandi/pen/gObLwpM).

The one hiccup here is that if the method returned successfully but was not `ok`, this approach won't catch that.

## Which approach should you use?

Personally, I still use [the traditional `then()` and `catch()` approach with returned `fetch()` methods](/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/).

I find the way it reads&mdash;first do this, *then* do this, *then* do that&mdash;easier to understand and wrap my head around.

I also think it offers more straightforward error handling and has better backwards compatibility *without* having to transpile code. It can be polyfilled if needed.

I do like that `async` and `await` read similar to synchronous functions, but I also don't find `then()` and `catch()` any harder to read.