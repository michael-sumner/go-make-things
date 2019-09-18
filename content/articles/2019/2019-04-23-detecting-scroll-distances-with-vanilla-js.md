---
title: "Detecting scroll distances with vanilla JS"
date: 2019-04-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This morning, [Sami Keijonen](https://foxland.fi/), one of my students, asked me if there was a way to detect how far a user has scrolled (and in what direction) using vanilla JS.

There's not a native method for this, but lets cobble a small helper function together.

## Getting setup

First, let's create a helper function called `scrollDistance()`, that accepts a callback function to run when the scroll is complete.

If there's no callback, or if it's not a function, we'll just bail.

```js
var scrollDistance = function (callback) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

};
```

Next, let's setup some variables to hold details about whether or not the user is actively scrolling, their starting and ending positions, and the total distance they scrolled.

```js
var scrollDistance = function (callback) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

};
```

Now we're ready to actually detect scrolls.

## Detecting scrolling distances

To make this work, we need to detect `scroll` events using `addEventListener()`.

```js
var scrollDistance = function (callback) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {\
		// Scrolling has happened...
	}, false);

};
```

When scrolling starts, if the `start` variable has no value, we'll cache the `window.pageYOffset`&mdash;the user's current position on the page&mdash;to it.

Then, we'll assign a `setTimeout()` function to the `isScrolling` variable.

By default, we'll have it run every 66 milliseconds (roughly the refresh rate of computer screens). This will defer our callback function from running until the scroll is complete. Let's add a `refresh` argument to our function so that the delay can be customized.

```js
var scrollDistance = function (callback, refresh) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Set starting position
		if (!start) {
			start = window.pageYOffset;
		}

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {
			// Calculate distances and run our callback
		}, refresh || 66);

	}, false);

};
```

On every `scroll` event, we'll run `clearTimeout()` to prevent the callback from running while there's scrolling actively happening.

```js
var scrollDistance = function (callback, refresh) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Set starting position
		if (!start) {
			start = window.pageYOffset;
		}

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {
			// Calculate distances and run our callback
		}, refresh || 66);

	}, false);

};
```

## Calculating the distance scrolled

Once our `setTimeout()` function actually runs, we can calculate the distance scrolled.

We'll set `end` to the new current `window.pageYOffset`, and `distance` to the difference between `start` and `end`. If `distance` is negative, the user scrolled up. If it's positive, they scrolled down.

We'll pass all three variables into the `callback()` function.

```js
var scrollDistance = function (callback, refresh) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Set starting position
		if (!start) {
			start = window.pageYOffset;
		}

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {

			// Calculate distance
			end = window.pageYOffset;
			distance = end - start;

			// Run the callback
			callback(distance, start, end);

		}, refresh || 66);

	}, false);

};
```

Finally, we'll reset all of our variables for the next scroll.

```js
var scrollDistance = function (callback, refresh) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Variables
	var isScrolling, start, end, distance;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Set starting position
		if (!start) {
			start = window.pageYOffset;
		}

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(function() {

			// Calculate distance
			end = window.pageYOffset;
			distance = end - start;

			// Run the callback
			callback(distance, start, end);

			// Reset calculations
			start = null;
			end = null;
			distance = null;

		}, refresh || 66);

	}, false);

};
```

## Demos and such

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/BEOVOa) You can also snag the completed helper method on [the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/).

This works in all modern browsers, and IE9 and up.