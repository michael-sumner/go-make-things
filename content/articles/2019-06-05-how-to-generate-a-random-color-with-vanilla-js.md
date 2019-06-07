---
title: "How to generate a random color with vanilla JS"
date: 2019-06-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

*__Note:__ I wrote [an update to this article with a better approach](/a-better-way-to-generate-a-random-color-with-vanilla-js/).*

Yesterday, we looked at [how to pick a random color with vanilla JS](/how-to-pick-a-random-color-with-vanilla-js/). It required that you provide a list of colors to choose from.

Today, let's look at how to generate a random color from the entire range of valid hex colors.

## Getting started

Hex colors follow a six-digit pattern: `#rrggbb`, where `r` is the red value, `g` is the green value, and `b` is the blue value. Each character can be a letter from `a` to `f`, or a number from `0` to `9`.

To get started, let's first create a `generateColor()` function.

In it, will create an array with all of the valid characters for a hex color value.

```js
var generateColor = function () {

	// The available hex options
	var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

};
```

## Creating the hex color

Now, let's create the actual hex color. We'll setup a color variable with the leading `#`.

```js
var generateColor = function () {

	// The available hex options
	var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var color = '#';

};
```

A hex color code has six digits. We'll setup a `for` loop, and run it six times.

```js
var generateColor = function () {

	// The available hex options
	var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var color = '#';

	// Create a six-digit hex color
	for (var i = 0; i < 6; i++) {
		// Do stuff...
	}

};
```

Inside the loop, we'll use [the `shuffle()` method](https://vanillajstoolkit.com/helpers/shuffle/) we used in yesterday's article to shuffle the array of hex characters.

Then, we'll concatenate the first one onto the end of the `color` string.

When the loop is done, we'll return the `color` string, which is now a random hex color code.

```js
var generateColor = function () {

	// The available hex options
	var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	var color = '#';

	// Create a six-digit hex color
	for (var i = 0; i < 6; i++) {

		// Shuffle the hex values
		shuffle(hex);

		// Append first hex value to the string
		color += hex[0];

	}

	// Return the color string
	return color;

};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KLYWZR)