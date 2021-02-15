---
title: "How to use async and await in vanilla JS"
date: 2021-02-15T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In previous articles, I've [written about JavaScript Promises](/promises-in-javascript/) and [how to use Fetch](/how-to-use-the-fetch-api-with-vanilla-js/) to get asynchronous data.

Today and tomorrow, I want to dig into the `async` and `await` operators: what they do, how they work, and when and why you'd want to use them.

## How Promises traditionally work in JavaScript

In the `traditionalFn()` function below, we make an asynchronous API call with the `window.fetch()` method.

When the response comes back and is parsed into JSON, we log it to the console. Immediately after making the call, we also log a message to the console.

```js
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

[Here's a demo.](https://codepen.io/cferdinandi/pen/GRNWmPp)

Because `fetch()` is asynchronous, the rest of our function does not wait for it to complete before continuing. But we if we wanted to do just that?

## How to make asynchronous code wait before continuing

The `async` and `await` operators allow you to treat asynchronous code like synchronous code.

When you use the `async` operator before a `function`, you turn it into an _async function_. Inside an _async function_, you can use the `await` operator before asynchronous code to tell the function to wait for that operation to complete before moving on.

In this example, we've turned `asyncFn()` into an async function. We've also prefaced the `window.fetch()` call with the `await` operator.

```js
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

When this runs, `Async Fetch` and the returned `data` are logged into the console _before_ `Async Message`. The function waited for the `window.fetch()` Promise to settle before continuing.

[Here's another demo.](https://codepen.io/cferdinandi/pen/jOVBmXL)

## An async function always returns a promise

One side-effect of using the `async` operator is that an async function always returns a promise, even if you're not actually making any asynchronous calls in it.

```js
// This returns a promise
async function getTheAnswer () {
	return 42;
}

let answer = getTheAnswer();
```

Here, `answer` does not have a value of 42. Instead, it's value is a resolved promise that you can use `Promise.then()` and `Promise.catch()` with.

```js
// logs 42 into the console
answer.then(function (data) {
	console.log(data);
});
```

[Here's one last demo for you.](https://codepen.io/cferdinandi/pen/vYyxmbY)

## Should you use `Promise.then()` or `async`/`await`?

I'll be honest: I personally find `async`/`await` harder to read and write than traditional `Promise.then()` chains. For most asynchronous code, I prefer to use `Promise.then()`.

This is absolutely a personal preference, though, so if `async`/`await` are simpler for you, by all means use them.

In situations where you actually need to wait for asynchronous code to resolve before continuing, though, `async`/`await` is the correct choice.

Tomorrow, we're going to look at how you might structure your code differently when using `async` and `await`, as well as how to handle errors.