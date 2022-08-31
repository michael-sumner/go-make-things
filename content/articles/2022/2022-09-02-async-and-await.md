---
title: async and await in JavaScript
date: 2022-09-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

This week, we learned about [JavaScript Promises](/javascript-promises/) and [the `fetch()` method](/the-javascript-fetch-method/). Today, we're going to learn how `async` and `await` can make writing Promises easier.

Let's dig in!

## What are `async` and `await`?

The `async` and `await` operators allow you to treat asynchronous code like synchronous code.

For example, in the `traditionalFn()` function, we make an asynchronous API call with the `window.fetch()` method. When the response comes back and is parsed into JSON, we log it to the console. Immediately after making the call, we also log a message to the console.

```javascript
function traditionalFn () {
	fetch('https://jsonplaceholder.typicode.com/posts/').then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log('Traditional Fetch', data);
	});
	console.log('Traditional Message');
}
traditionalFn();
```

When we run the `traditionalFn()` function, `Traditional Message` is logged into the console before `Traditional Fetch` and the `data` are.

Because `fetch()` is asynchronous, the rest of our function does not wait for it to complete before continuing. But we if we wanted to do just that?

## How to make asynchronous code wait before continuing

When you use the `async` operator before a `function`, you turn it into an _async function_.

Inside an _async function_, you can use the `await` operator before asynchronous code to tell the function to wait for that operation to complete before moving on.

In this example, we've turned `asyncFn()` into an async function. We've also prefaced the `window.fetch()` call with the `await` operator.

```javascript
async function asyncFn () {
	await fetch('https://jsonplaceholder.typicode.com/posts/').then(function (response) {
		return response.json();
	}).then(function (data) {
		console.log('Async Fetch', data);
	});
	console.log('Async Message');
}
asyncFn();
```

When this runs, `Async Fetch` and the returned `data` are logged into the console before `Async Message`. The function waited for the `window.fetch()` Promise to settle before continuing.

## An async function always returns a promise

One side-effect of using the `async` operator is that an async function always returns a promise, even if you're not actually making any asynchronous calls in it.

```javascript
// This returns a promise
async function getTheAnswer () {
	return 42;
}

let answer = getTheAnswer();
```

Here, `answer` does not have a value of 42. Instead, it's value is a resolved promise that you can use `Promise.then()` and `Promise.catch()` with.

```javascript
// logs 42 into the console
answer.then(function (data) {
	console.log(data);
});
```

## You might structure your code differently with async functions

Here's a function that makes a call to [the JSONPlaceholder API's](https://jsonplaceholder.typicode.com/) `/posts` endpoint.

You pass in a post ID as an argument, and it fetches the data, parses it to JSON, and handles errors.

```javascript
/**
 * Get an article by its ID
 * @param  {Integer} id The article ID
 */
function getArticleByID (id) {
	fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(function (response) {

		// If the response is successful, get the JSON data
		if (response.ok) {
			return response.json();
		}

		// Otherwise, throw an error
		throw 'Something went wrong.';

	}).then(function (data) {
		console.log(data);
	}).catch(function (error) {
		console.warn(error);
	});
}

// Get the article with an ID of 3
getArticleByID(3);
```

If we convert `getArticleByID()` into an async function, we can structure it a bit differently.

First, let's use the `await` operator with our `window.fetch()` call, and assign the returned response to the `response` variable. Our async function will wait until the response is returned before continuing.

```javascript
async function getArticleByID(id) {

	// Get the post data
	let post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

}
```

Next, we can check if the `response.ok` property is `true`. If it's not, we'll `throw` an error.

If the response is OK, though, we'll use the `await` operator with `response.json()` to get the body JSON data from the `response` object, and assign it to the `data` variable. Again, our async function will wait for that to complete before moving on.

Once `data` is set, we can log it to the console.

```javascript
async function getArticleByID(id) {

	// Get the post data
	let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

	// If the call failed, throw an error
	if (!response.ok) {
		throw 'Something went wrong.';
	}

	// Otherwise, get the post JSON
	let data = await response.json();

	// Log the data to the console
	console.log(data);

}
```

## Handling errors with async functions

In our async `getArticleByID()` function, we `throw` an error, but don't actually catch it or handle it anywhere. There are a few ways you can deal with this.

Because an async function always returns a promise, we can chain a `Promise.catch()` method to it.

```javascript
// Get the article with an ID of 999999
// log a warning in the console if something goes wrong
getArticleByID(999999).catch(function (error) {
	console.warn(error);
});
```

That works, but many developers prefer to use a `try...catch` block inside their async function instead.

```javascript
async function getArticleByID(id) {
	try {

		// Get the post data
		let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

		// If the call failed, throw an error
		if (!response.ok) {
			throw 'Something went wrong.';
		}

		// Otherwise, get the post JSON
		let data = await response.json();

		// Log the data to the console
		console.log(data);

	} catch (error) {
		console.warn(error);
	}

}

// Get the article with an ID of 999999
// if there's an error, a warning is logged to the console by the catch() block in the function
getArticleByID(999999);
```

If you enjoyed this series, you might like [my course on APIs and Asynchronous JS](https://vanillajsguides.com/apis/).