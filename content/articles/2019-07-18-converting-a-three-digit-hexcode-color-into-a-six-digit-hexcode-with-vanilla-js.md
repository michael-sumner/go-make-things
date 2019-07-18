---
title: "Converting a color from a three-digit hexcolor to a six-digit hexcolor with vanilla JS"
date: 2019-07-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Tuesday, we looked at [how to check the contrast of a background color](/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/) and determine if its text color should be white or black.

In it, I threw in this little snippet on converting three-digit hexcolors into six-digit ones:

```js
// If a three-character hexcolor, make six-character
if (hexcolor.length === 3) {
	hexcolor = hexcolor.split('').map(function (hex) {
		return hex + hex;
	}).join('');
}
```

Reader Laura Montgomery emailed me to ask what this code is actually doing, so that's what we'll be looking at today.

## How hexcolors work

Hexcolors are typically six-digit strings representing color values (often with a leading hash, or `#`).

They're a numerical form of RGB (Red/Green/Blue), with the first two digital representing `R`, digits three and four representing `G`, and digits five and six representing `B`.

```js
var hexcolor = '#RRGGBB';
```

For values where the `R`, `G`, and `B` couplets have the same value, the hexcolor can be shortened to just three digits.

For example, `#FFFFFF` is white. You can also write it as `#FFF`. The color blue I use on my site is `#0088cc`. Since the `R`, `G`, and `B` all contain repeating values, I can also write it as `#08c`.

## How to convert a three-digit hexcolor into a six-digit one

Let's look at this code again.

```js
// If a three-character hexcolor, make six-character
if (hexcolor.length === 3) {
	hexcolor = hexcolor.split('').map(function (hex) {
		return hex + hex;
	}).join('');
}
```

For our purposes, let's assume the value of `hexcolor` is `08c`.

First, we use the `length` property to figure out how many characters are in the string. If it's `3`, we need to convert it. If not, we can move on.

```js
if (hexcolor.length === 3) {
	// Do something...
}
```

[The `String.split()` method](https://vanillajstoolkit.com/reference/strings/string-split/) takes a string and breaks it up into an array based on a *delimiter* (a character or set of characters). If you pass in an empty string (`''`), it will create a new array item for each character in the string.

```js
// if the hexcolor was 08c
// this would return ['0', '8', 'c']
hexcolor.split('');
```

[The `Array.map()` method](https://vanillajstoolkit.com/reference/arrays/array-map/) takes an array, transforms each item in it, and returns a new array.

We can use it to take our array of hexcolor values and create a new array where each item is "doubled up," or shows up twice. In this example, `hex` represents each individual hex character from the array.

```js
// With our ['0', '8', 'c'] array
// This would create this new array: ['00', '88', 'cc']
hexcolor.split('').map(function (hex) {
	return hex + hex;
});
```

Finally, [the `Array.join()` method](https://vanillajstoolkit.com/reference/arrays/array-join/) takes an array of items and combines them all into a single string. By default, it separates them with a comma, but you can pass in a delimiter to use instead. We'll pass in an empty string so that there's no separation at all.

```js
// Called on our ['00', '88', 'cc'] array
// This would return '0088cc'
hexcolor.split('').map(function (hex) {
	return hex + hex;
}).join('');
```

Hope that helps clear things!

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/qeBYvG)