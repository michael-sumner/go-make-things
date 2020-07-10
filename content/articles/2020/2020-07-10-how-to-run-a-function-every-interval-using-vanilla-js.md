---
title: "How to run a function repeatedly at a desired interval using vanilla JS"
date: 2020-07-10T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to run a function after a certain period of time with the `setInterval()` method](/run-a-function-after-a-specified-amount-of-time-using-vanilla-js/).

Today, we're going to look at how to run a function repeatedly as an interval of your choice. Let's dig in.

## The `setInterval()` method

The `setInterval()` method works more-or-less the same as the `setTimeout()` method, except instead of running once, it runs over and over again.

It accepts two arguments: the function to run, and how long to wait (in milliseconds) between functions.

```js
setInterval(function () {
	console.log('I will run every 2 seconds');
}, 2000);
```

It's worth noting that [the *interval time* is a minimum amount of time the browser should wait](/the-delay-on-settimeout-and-setinterval-is-just-a-suggestion/), and not a specific time.

If another function is actively running, the user's tab has gone idle, or a handful of other things are going on, the function may take longer than the time you provided to run.

## The callback function can be anonymous or named

Just like with `setTimeout()`, if you want, you can use a named function instead of an anonymous one to keep your code a bit more organized.

If you do, omit the parentheses (`()`) and just include the function name.

```js
var logMe = function () {
	console.log('I ran');
};

setInterval(logMe, 2000);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/pogKzGX)

## Stopping the interval

You can also stop the interval from running any more callback functions using the `clearInterval()` method.

Let's say you need a dynamically rendered element to be in the DOM before doing something. It might be available immediately, or might take a few moments to get rendered.

Ideally, the JS that renders the element would surface a callback or event you can hook into, but what if it doesn't?

You can use `setInterval()` to check for the element once a second until it's available.

```js
var getElem = setInterval(function () {

	// Look for the element in the DOM
	var elem = document.querySelector('#my-elem');

}, 1000);
```

Once you find it, you can call `clearInterval()` from inside the interval itself to stop it from running.

```js
var getElem = setInterval(function () {

	// Look for the element in the DOM
	var elem = document.querySelector('#my-elem');

	// If the element is in the DOM, stop the interval and do something
	if (elem) {
		clearInterval(getElem);
		// Do something else...
	}

}, 1000);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWKXgdW)

## Browser compatibility

The `setInterval()` method works in all modern browsers, and back to at least IE6.