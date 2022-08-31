---
title: JavaScript Promises
date: 2022-08-31T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

I've been getting a lot of questions from folks who are confused about Promises in JavaScript, so today, I wanted to explain what they are and how they work a bit better.

Let's dig in!

## What's a Promise in JavaScript?

A Promise is a JavaScript object that _represents_ an asynchronous function.

```js
// Create a Promise object
let sayHello = new Promise(function (resolve, reject) {

	// In 5 seconds, resolve the Promise.
	// Pass along "Hi, universe!" to any callback methods
	setTimeout(function () {
		resolve('Hi, universe!');
	}, 5000);

});
```

In the example above, `sayHello()` is a *Promise* that in 5 seconds, something will happen. You can attach functions that should run when the Promise resolves using the `Promise.then()` method.

```js
// After 5 seconds, if the Promise resolves,
// this will log "Hi, universe!" into the console
sayHello.then(function (msg) {
	console.log(msg);
});
```

When you create a Promise, you pass in a callback function as an argument.

Inside the function, you define two parameters: `resolve` and `reject`. These are implicit arguments the Promise passes into your callback function.

When the Promise should be considered completed, run the `resolve()` method. You can pass in arguments that should get passed into the `Promise.then()` method callback function into the `resolve()` method.

In the example above, we passed `Hi, universe!` into `resolve()`. This was passed along to the `Promise.then()` method as the `msg` argument.

## Rejecting a Promise

Similarly, you run the `reject()` method if the Promise should be considered failed.

You can pass in any error messages or information about the rejection as arguments. You can run a callback when a Promise fails using the `Promise.catch()` method.

In the example above, let's modify `sayHello()` to `reject()` before the timeout completes.

```js
// Create a Promise object
let sayHello = new Promise(function (resolve, reject) {

	reject('Unable to say hi.');

	// In 5 seconds, resolve the Promise.
	// Pass along "Hi, universe!" to any callback methods
	setTimeout(function () {
		resolve('Hi, universe!');
	}, 5000);

});
```

Now, we can add a `Promise.catch()` method to detect this failure and do something about it.

```js
// Will warn "Unable to say hi." in the console.
sayHello.then(function (msg) {
	console.log(msg);
}).catch(function (error) {
	console.warn(error);
});
```

Because `reject()` runs before `resolve()` does, the `catch()` callback method will run and show the error message that was passed in.

## Chaining

You can chain multiple `Promise.then()` methods together, and they'll run in sequence.

Whatever you `return` from the current `Promise.then()` method gets passed along to the next `Promise.then()` method after it in the chain. Let's create a new Promise called `count`.

It will `resolve()` immediately, and pass along `1` as an argument.

```js
// Create a Promise object
let count = new Promise(function (resolve, reject) {
	resolve(1);
});
```

Now, we can chain some `Promise.then()` methods together. In each one one, we'll log `num`, increase it by `1`, and `return` it to the next argument in the sequence.

In the first `Promise.then()` method, `num` is `1`. In the second, it's `2`. In the last one, it's `3`.

```js
// logs 1, then 2, then 3, to the console
count.then(function (num) {
	console.log(num);
	return num + 1;
}).then(function (num) {
	console.log(num);
	return num + 1;
}).then(function (num) {
	console.log(num);
	return num + 1;
});
```

## You can attach Promise.then() methods at any time

One of my favorite thing about Promises is that if you assign one to a variable, you can attach `Promise.then()` methods on it at any time&mdash;even *after* the Promise has already resolved.

If the Promise *hasn't* resolved yet, the callback will run once it does. If it *has resolved*, the callback will run immediately.

```js
// Create a Promise that resolves immediately
let question = new Promise(function (resolve, reject) {
	resolve(42);
});

// Attach a callback 5 seconds after it's resolved
setTimeout(function () {

	// This will run as soon a the timeout completes, because the Promise has already resolved
	question.then(function (answer) {
		console.log(answer);
	});

}, 5000);
```

Hope that helps a bit. Tomorrow, we'll look a practical use of Promises: the `fetch()` method.

If you found this useful, you might like [my course on APIs and Asynchronous JS](https://vanillajsguides.com/apis/).