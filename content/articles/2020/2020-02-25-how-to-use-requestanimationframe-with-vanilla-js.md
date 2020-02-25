---
title: "How to use requestAnimationFrame() with vanilla JS"
date: 2020-02-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `requestAnimationFrame()` method tells the browser to run a callback function right before the next repaint happens.

It's particularly useful when using JavaScript for animations and repeating UI updates. Because it ties into the browser's repaint timing, it produces a smoother effect than using something like `setInterval()`.

Let's look at how it works.

## Creating a callback function

The `requestAnimationFrame()` method accepts one argument: a callback function to run.

```js
window.requestAnimationFrame(function () {
	console.log('it ran!');
});
```

The callback function runs just before the next time the browser runs a repaint. On modern devices, that typically happens 60 times per second.

[Here's a demo.](https://codepen.io/cferdinandi/pen/abOpamO)

## Looping animations

The `requestAnimationFrame()` method only runs once. You can make it loop over-and-over again using [a technique called recursion](/recursion-with-vanilla-javascript/).

Let's say you wanted to count from 0 up to 500, and update the UI each time.

First, we'll use `document.querySelector()` to get the element in the UI, and define a starting `number` of `0`.

```js
var counter = document.querySelector('#counter');
var number = 0;
```

With this technique, instead of using an anonymous function with `requestAnimationFrame()`, you create a named one.

For our example, we'll create a `countUp()` function that increases `number` by `1`, then sets it as the `textContent` for the  `counter` element.

```js
var counter = document.querySelector('#counter');
var number = 0;

var countUp = function () {

	// Increase number by 1
	number++;

	// Update the UI
	counter.textContent = number;

};
```

Now, here's where the recursion comes in.

Inside the `countUp()` function, we'll call `window.requestAnimationFrame()`, and pass the `countUp()` function itself in as the callback function. This will cause it to run again just before the next repaint.

```js
var counter = document.querySelector('#counter');
var number = 0;

var countUp = function () {

	// Increase number by 1
	number++;

	// Update the UI
	counter.textContent = number;

	// if the number is less than or equal to 100,000, run it again
	if (number <= 100000) {
		window.requestAnimationFrame(countUp);
	}

};
```

Finally, we'll use `window.requestAnimationFrame()` to start the animation.

```js
var counter = document.querySelector('#counter');
var number = 0;

var countUp = function () {

	// Increase number by 1
	number++;

	// Update the UI
	counter.textContent = number;

	// if the number is less than 500, run it again
	if (number < 500) {
		window.requestAnimationFrame(countUp);
	}

};

// Start the animation
window.requestAnimationFrame(countUp);
```

[Here's a working demo you can play with.](https://codepen.io/cferdinandi/pen/MWwJqpd)

## Canceling `requestAnimationFrame()`

If you assign your `requestAnimationFrame()` method to a variable, you can use the `cancelAnimationFrame()` method to cancel it before it runs.

```js
// Setup the animation
var animation = window.requestAnimationFrame(function () {
	console.log('ran!');
});

// Cancel it
window.cancelAnimationFrame(animation);
```

[In this demo](https://codepen.io/cferdinandi/pen/wvagEex), the callback function never runs.

## Browser Compatibility

The `requestAnimationFrame()` method works in all moderns browsers, and back to IE 10. [You can push support back to IE6 with a polyfill.](https://vanillajstoolkit.com/polyfills/requestanimationframe/)