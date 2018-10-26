---
title: "Debouncing your JavaScript events"
date: 2018-10-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

*Debouncing* is a way of forcing a function to wait a certain period of time before running again.

Why would you want to do that? JavaScript events like `scroll` and `resize` can cause huge performance issues on certain browsers. [Paul Irish explains:](https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/)

> If you’ve ever attached an event handler to the window’s `resize` event, you have probably noticed that while Firefox fires the event slow and sensibly, IE and Webkit go totally spastic.

Chrome has since fixed this issue, behaving more like Firefox. But Safari (at least version 12, the one on my machine) still fires an insane number of events.

If you're trying to do DOM manipulation in reaction to a `scroll` or `resize` event, you may see a ton of jank and performance issues in certain browsers.

Today, I'm going to show you how to *debounce* functions to improve performance and remove janky UI issues.

## `requestAnimationFrame()`

Older debounce techniques relied on `setTimeout()`. The modern approach is to use `requestAnimationFrame()`.

The `requestAnimationFrame()` method fires a callback function the next time the browser does a frame animation. It helps produce super smooth animations and UI renders.

Using `requestAnimationFrame()` to debounce works like this:

1. Set your function as a `requestAnimationFrame()` callback, and assign it to a variable.
2. If the function tries to fire again *before* the next frame animation, cancel the existing `requestAnimationFrame()` and set a new one.

This ensures that your function will only run once a frame refresh, and only the latest one will run.

Here's the code for that.

```js
// Setup a timer
var timeout;

// Listen for resize events
window.addEventListener('scroll', function (event) {

	console.log('no debounce');

	// If there's a timer, cancel it
	if (timeout) {
		window.cancelAnimationFrame(timeout);
	}

	// Setup the new requestAnimationFrame()
	timeout = window.requestAnimationFrame(function () {

		// Run our scroll functions
		console.log('debounced');

	});

}, false);
```

[And here's a demo.](https://codepen.io/cferdinandi/pen/vVbJrK) Try scrolling with the console open in Safari.

If you scroll quickly, you should see multiple `no debounce` logs for every one `debounced` log.

## A helper function

You don't want to have to manually write this out every time you need to debounce a function. I've put together a helper function that turns any regular function into a debounced one.

To use it, pass a function into the `debounce()` method as a callback, and assign it to a variable. This variable becomes the debounced function that you can run.

You can pass the callback function in anonymously, *or* setup a named function and pass that in.

```js
// An anonymous callback function
var logDebounce = debounce(function (msg) {
	console.log(msg);
});

// A named callback function
var log = function (msg) {
	console.log(msg);
};

var logDebounce = debounce(log);

// Run the method in your event listener
window.addEventListener('scroll', function () {
	logDebounce('debounced');
}, false);
```

[Here's a demo of it in action.](https://codepen.io/cferdinandi/pen/VEgzVa) Again, try it in Safari.

And [here's the helper function itself](https://vanillajstoolkit.com/helpers/debounce/).

```js
/**
 * Debounce functions for better performance
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Function} fn The function to debounce
 */
var debounce = function (fn) {

	// Setup a timer
	var timeout;

	// Return a function to run debounced
	return function () {

		// Setup the arguments
		var args = arguments;

		// If there's a timer, cancel it
		if (timeout) {
			window.cancelAnimationFrame(timeout);
		}

		// Setup the new requestAnimationFrame()
		timeout = window.requestAnimationFrame(function () {
			fn.apply(this, args);
		});

	}

};
```

## Browser Compatibility

The `requestAnimationFrame()` method works in all modern browsers, and back to IE10. You can [push support back to IE6 with this polyfill from Paul Irish](https://vanillajstoolkit.com/polyfills/requestanimationframe/).