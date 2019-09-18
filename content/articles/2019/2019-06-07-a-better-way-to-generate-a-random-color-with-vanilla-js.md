---
title: "A better way to generate a random color with vanilla JS"
date: 2019-06-07T10:30:00-04:00
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

On Wednesday, I wrote about [how to generate a random color using vanilla JS](/how-to-generate-a-random-color-with-vanilla-js/).

[Wes Bos replied to me on Twitter](https://twitter.com/wesbos/status/1136280932900622338) to let me know about an even better approach that [he picked up from Paul Irish](https://www.paulirish.com/2009/random-hex-color-code-snippets/).

```js
var createColor = function () {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
```

Let's break down how this works.

First, we use `Math.random()` to generate a random number between `0` and `1`.

```js
var createColor = function () {
	return Math.random();
};
```

Next, we multiply it by a longish number. Paul Irish uses `16777215` because it's the decimal representation of `ffffff`.

```js
var createColor = function () {
	return Math.random() * 16777215;
};
```

This gives us a returned value that looks something like this (it varies each time because of `Math.random()`, but follows a similar pattern).

```js
14220420.962586708
```

Next, we need to remove the decimal places. There are a few ways to do this, including `parseInt()`, but Paul's approach uses `Math.floor()` to get the smallest whole number from a number with decimals.

```js
var createColor = function () {
	return Math.floor(Math.random() * 16777215);
};
```

We're almost there!

Now we use the `toString()` method to convert the number to a string. The method accepts an optional argument for the `radix`, the mathematical base used for representing numeric values. A value of `16` gets you a hexcode value (with numbers and letters).

```js
var createColor = function () {
	return Math.floor(Math.random() * 16777215).toString(16);
};
```

And finally, we add the leading hash.

```js
var createColor = function () {
	return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
```

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/yWdZmr) I also added this to [the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/createcolor/).