---
title: "A vanilla JS forEach() helper method"
date: 2018-11-14T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The browser-native `Array.forEach()` method is super handy and has great browser support (it works all the way back to IE9).

```js
var jobs = ['web developer', 'carpenter', 'one-man band', 'ukulele tuner'];

jobs.forEach(function (job) {
	console.log(job + ' is a great job!');
});
```

So, why on earth would you need a helper function for it?

Unfortunately, it only works on arrays. If you wanted to loop through a NodeList, an HTMLElementCollection, or some other array-like object that's not officially a proper array, it wouldn't work.

## A workaround

There are two ways around this:

1. Convert the thing into an array.
2. [Use the `call()` method.](/what-the-hell-is-the-call-method-and-when-should-you-use-it/)

Option 2 looks like this in practice.

```js
var jobs = document.querySelectorAll('.jobs');

Array.prototype.forEach.call(jobs, function (job) {
	console.log(job.textContent + ' is a great job!');
});
```

That works great, but it's a bit verbose to write each out each time. Let's create a helper method!

## A `forEach()` helper method

In our helper, we'll accept the array-like object and callback as arguments. Then, we'll plug them in to `Array.prototype.forEach.call()`.

```js
var forEach = function (arr, callback) {
	Array.prototype.forEach.call(arr, callback);
};
```

Now you can do this instead.

```js
forEach(jobs, function (job) {
	console.log(job.textContent + ' is a great job!');
});
```

## What about other Array methods?

What about other Array methods, like `map` and `filter`? Those also work in IE9 and up, but only on proper Arrays and no array-like object.

We use the same approach as before, but with a few small changes.

We'll accept a third argument---`method`---for the Array method we want to run. If you leave it blank, let's default to `forEach()`. Inside the helper function, we'll use bracket notation instead of dot notation to call the method on the `Array.prototype`.

```js
var forEach = function (arr, callback, method) {
	method = method || 'forEach';
	Array.prototype[method].call(arr, callback);
};
```

Since `Array.map()` and `Array.filter()` return new arrays, we'll `return` the result. And finally, let's rename it to `loop` since it does more than `forEach()` now.

```js
var loop = function (arr, callback, method) {
	method = method || 'forEach';
	return Array.prototype[method].call(arr, callback);
};
```

Now you can do things like this...

```js
var jobs = document.querySelectorAll('.jobs');

// Creates a new array with the content of each item
var jobList = loop(jobs, function (job) {
	return job.textContent;
}, 'map');

// Filters out items that don't have the `.awesome` class on them
var jobList = loop(jobs, function (job) {
	return job.classList.contains('awesome');
}, 'filter');
```