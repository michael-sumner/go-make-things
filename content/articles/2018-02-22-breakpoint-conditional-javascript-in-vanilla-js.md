---
title: "Breakpoint conditional JavaScript in vanilla JS"
date: 2018-02-22T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

If you wanted to have JavaScript that worked differently depending on how wide the viewport was, how would you handle it?

There are a bunch of reasons why you might need to do this: JavaScript enhancements that are only applied on smaller viewports (or bigger ones), values that vary based on viewport size (for example, offsetting the height of your header, which is taller on wider viewports), and so on.

Today, I'll show you how!

## Part 1: Checking the viewport width

In some browsers, you would use `window.innerWidth` to get the viewport width. In others, you use `document.documentElement.clientWidth`.

Combine them for maximum browser support.

```js
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
```

We can then do things conditionally based on the width.

For example, let's log `Wide viewport` into the console if the width is greater than 640px, and `Small viewport` if it's smaller than that.

```js
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth > 640) {
	console.log('Wide viewport');
} else {
	console.log('Small viewport');
}
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/3bgcqrfm/) Adjust the layout and reload to see how the logged value changes (it's using the results window, not your browser, in this example).

## Part 2: Listening for resize events

One often forgotten aspect of this is that viewport width can change.

While most users don't resize their browser windows (only web designers and developers do that), they *do* rotate their mobile devices, which changes the viewport width.

Use `addEventListener` to listen for `resize` events. For performance reasons, you should [debounce the event listener](/event-listener-performance-with-vanilla-js/), but I *won't* be doing that here to keep the example easier to read.

```js
var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
if (viewportWidth > 640) {
	console.log('Wide viewport');
} else {
	console.log('Small viewport');
}

window.addEventListener('resize', function () {
	viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	if (viewportWidth > 640) {
		console.log('Wide viewport');
	} else {
		console.log('Small viewport');
	}
}, false);
```

[Here's an updated demo.](https://jsfiddle.net/cferdinandi/3bgcqrfm/1/) Use the `Bottom Results` view under settings and resize your browser window.

## Step 3: Making your code DRY

In this example, we've repeated the same code (the one that checks the viewport width) a couple of times.

We can move that into a function to keep our code more DRY (an acronym for "Don't Repeat Yourself") and easier to maintain.

```js
// Define our viewportWidth variable
var viewportWidth;

// Set/update the viewportWidth value
var setViewportWidth = function () {
	viewportWidth = window.innerWidth || document.documentElement.clientWidth;
}

// Log the viewport width into the console
var logWidth = function () {
	if (viewportWidth > 640) {
		console.log('Wide viewport');
	} else {
		console.log('Small viewport');
	}
}

// Set our initial width and log it
setViewportWidth();
logWidth();

// On resize events, recalculate and log
window.addEventListener('resize', function () {
	setViewportWidth();
	logWidth();
}, false);
```

[And here's our finished code.](https://jsfiddle.net/cferdinandi/3bgcqrfm/3/)