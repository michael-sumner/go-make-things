---
title: "A *better* better way to generate a random color with vanilla JS"
date: 2019-06-13T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, I shared [an approach to generating random colors with vanilla JS](/how-to-generate-a-random-color-with-vanilla-js/). A few days later, I shared [a simpler approach to doing that](/a-better-way-to-generate-a-random-color-with-vanilla-js/).

A folks wrote to me to let me know about some issues with what I had called the better approach.

1. It's less likely to produce a random result.
2. For colors that start with leading zeros, the leading digits get stripped out.
3. Certain colors are very unlikely to show up (or literally cannot because of number rounding).

With that in mind, here is my official, canonical, preferred approach to this:

```js
/*!
 * Create a random color value.
 * (c) 2009 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @return {String} A random six-digit color hexcode
 */
var createColor = function () {

	// The available hex options
	var hex = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 */
	var shuffle = function () {

		var currentIndex = hex.length;
		var temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = hex[currentIndex];
			hex[currentIndex] = hex[randomIndex];
			hex[randomIndex] = temporaryValue;
		}

	};

	/**
	 * Create a six-digit hex color
	 */
	var hexColor = function () {

		var color = '#';

		for (var i = 0; i < 6; i++) {

			// Shuffle the hex values
			shuffle(hex);

			// Append first hex value to the string
			color += hex[0];

		}

		return color;

	};

	// Return the color string
	return hexColor();

};
```

This is available as [a helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/createcolor/).