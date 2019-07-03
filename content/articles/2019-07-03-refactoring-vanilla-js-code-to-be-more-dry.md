---
title: "Refactoring vanilla JS code to be more DRY"
date: 2019-07-03T10:30:00-04:00
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

In developer-speak, *DRY* is an acronym that stands for *Don't Repeat Yourself*.

Today, I'm going to look at a bit of code that includes some repetition and redundancy, and refactor it to be more *DRY*.

## The starting code

Yesterday, we created [three vanilla JS helper functions for rounding numbers to the nearest integer](/how-to-round-to-the-nearest-number-with-vanilla-js/).

One rounded up. One rounded down. And the last rounded up if the number to be rounded was 5 or greater, and down if it was less than 5.

```js
/**
 * Round to the nearest whole number
 * @param  {Number|String} num       The number to round
 * @param  {Number}        precision The whole number to round to (ex. 10, 100, 1000)
 * @return {String}                  The rounded, delimited number
 */
var round = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.round(num / precision) * precision).toLocaleString();
};

/**
 * Round down to the nearest whole number
 * @param  {Number|String} num       The number to round
 * @param  {Number}        precision The whole number to round to (ex. 10, 100, 1000)
 * @return {String}                  The rounded, delimited number
 */
var roundDown = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.floor(num / precision) * precision).toLocaleString();
};

/**
 * Round up to the nearest whole number
 * @param  {Number|String} num       The number to round
 * @param  {Number}        precision The whole number to round to (ex. 10, 100, 1000)
 * @return {String}                  The rounded, delimited number
 */
var roundUp = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.ceil(num / precision) * precision).toLocaleString();
};
```

As you can see, there's quite a bit of shared code between them. Let's fix that.

## An easy approach: pass in the function as an argument

A simple way to handle this would be to make developers pass in a rounding function as an argument.

First, let's add an argument, `fn`, to the function.

```js
var round = function (num, precision, fn) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.round(num / precision) * precision).toLocaleString();
};
```

Next, let's set a default a value isn't provided.

```js
var round = function (num, precision, fn) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	if (!fn || typeof fn !== 'function') {
		fn = Math.round;
	}
	return (Math.round(num / precision) * precision).toLocaleString();
};
```

Finally, we'll use `fn()` in place of our `Math` method.

```js
var round = function (num, precision, fn) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	if (!fn || typeof fn !== 'function') {
		fn = Math.round;
	}
	return (fn(num / precision) * precision).toLocaleString();
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RzJKxW)

## A more friendly approach: named rounding methods

The previous approach is simple, but requires developers to pass in a rounding function. A more elegant approach would let them pass in their desired rounding type&mdash;`up`, `down`, or `auto`&mdash;and figure out the rest for them.

First, let's add a `method` argument to our function.

```js
var round = function (num, precision, method) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.round(num / precision) * precision).toLocaleString();
};
```

Next, we'll create an object of valid methods, and the `Math` functions that they map to. Instead of forcing users to pass in `ceil` or `floor` as arguments, let's go with the more obvious `up`, `down`, and `auto` (the default if they pass in nothing).

I've also added some comments to the code, since it's grown beyond our original three-liner.

```js
var round = function (num, precision, method) {

	// Convert string numbers to a float
	num = parseFloat(num);

	// If there's no rounding precision, return the number
	if (!precision) return num.toLocaleString();

	// Possible methods and their values
	var methods = {
		auto: 'round',
		up: 'ceil',
		down: 'floor'
	};

	// Do math!
	return (Math.round(num / precision) * precision).toLocaleString();

};
```

Now, we can get the `Math` function for the user's desired rounding style by passing it into our `methods` object. To be safe, if no matching method exists, we'll fallback to `round`.

The `fn` variable will now have a value of `round`, `ceil`, or `floor`.

```js
var round = function (num, precision, method) {

	// Convert string numbers to a float
	num = parseFloat(num);

	// If there's no rounding precision, return the number
	if (!precision) return num.toLocaleString();

	// Possible methods and their values
	var methods = {
		auto: 'round',
		up: 'ceil',
		down: 'floor'
	};

	// Get the method function
	var fn = methods[method];
	if (!fn) {
		fn = 'round';
	}

	// Do math!
	return (Math.round(num / precision) * precision).toLocaleString();

};
```

Finally, because the `.round()`, `.ceil()`, and `.floor()` methods are all properties of the `Math` object, we can call our `fn` variable on `Math` with bracket notation to get the function.

For example, if `fn` had a value of `floor`, `Math[fn]()` would be the same as writing `Math.floor()`.

```js
var round = function (num, precision, method) {

	// Convert string numbers to a float
	num = parseFloat(num);

	// If there's no rounding precision, return the number
	if (!precision) return num.toLocaleString();

	// Possible methods and their values
	var methods = {
		auto: 'round',
		up: 'ceil',
		down: 'floor'
	};

	// Get the method function
	var fn = methods[method];
	if (!fn) {
		fn = 'round';
	}

	// Do math!
	return (Math[fn](num / precision) * precision).toLocaleString();

};
```

[Here's another demo with this approach.](https://codepen.io/cferdinandi/pen/EBRZEr)

## Which one should you use?

It depends on the audience.

For a public "plugin" designed to be used by total beginners, I would use the second "more elegant" approach. It's more "plain English", and prevents the user from messing things up if they pass in a bad/incorrect function.

For my own personal use, and for use by developers looking to keep code as lean as possible, I would use the first because it's tiny and possibly more flexible. For example, if a developer wanted to write their own custom rounding function to use instead of one of the `Math` methods, they could pass that in, too.

I've updated the [Vanilla JS Toolkit](https://vanillajstoolkit.com/) with the second approach.

It still minifies down to less than half the size of the three other methods combined. It's only a little bigger than any one of them, and almost the same size as the first method (after minification).