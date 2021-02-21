---
title: "How to structure asynchronous JavaScript with async and await"
date: 2021-02-16T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to use the `async` and `await` operators](/how-to-use-async-and-await-in-vanilla-js/) to make asynchronous JavaScript behave like synchronous JS.

Today, we're going to look at what that means for how you structure your code.

## You might structure your code differently with async functions

Here's a function that makes a call to [the JSONPlaceholder API's](https://jsonplaceholder.typicode.com/) `/posts` endpoint.

You pass in a post ID as an argument, and it fetches the data, parses it to JSON, and handles errors.

```js
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

```js
async function getArticleByID(id) {

	// Get the post data
	let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

}
```

Next, we can check if the `response.ok` property is `true`. If it's not, we'll `throw` an error.

If the response is OK, though, we'll use the `await` operator with `response.json()` to get the body JSON data from the `response` object, and assign it to the `data` variable. Again, our async function will wait for that to complete before moving on.

Once `data` is set, we can log it to the console.

```js
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

[Here's a demo.](https://codepen.io/cferdinandi/pen/vYymBPo)

Using `async` and `await` lets you write your asynchronous JavaScript the way you would synchronous JS, which is a big part of its appeal for a lot of folks.

## Handling errors with async functions

In our async `getArticleByID()` function, we `throw` an error, but don't actually catch it or handle it anywhere. There are a few ways you can deal with this.

Because an async function always returns a promise, we can chain a `Promise.catch()` method to it.

```js
// Get the article with an ID of 999999
// log a warning in the console if something goes wrong
getArticleByID(999999).catch(function (error) {
	console.warn(error);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/yLVbBrz)

That works, but many developers prefer to use a `try...catch` block inside their async function instead.

```js
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

[Here's one last demo.](https://codepen.io/cferdinandi/pen/vYymBwB)