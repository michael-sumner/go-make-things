---
title: "Generating random numbers with vanilla JS"
date: 2019-10-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how to create random numbers with vanilla JavaScript.

## The `Math.random()` method

The `Math.random()` method generates a random float (a number with decimals) between `0` and `1`.

```js
// Logs something like this: 0.37111265461165543
// It will be different every time
var rand = Math.random();
console.log(rand);
```

The number the `Math.random()` method generates is inclusive of `0` (as in, it *could* sometimes be `0`, though I've never personally seen that happen), but exclusive of `1` (as in, it will never reach `1`).

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJJyGxz)

## Getting numbers bigger than `0`

What if you wanted to get integers, or whole numbers, instead of floats?

To do that, we can multiply whatever `Math.random()` returns by a number that's a power of ten. The bigger the number you multiple by, the more digits in the number.

```js
var randomOverZero = function (pow) {
	return Math.random() * pow;
};

// Logs something like: 14.48985072988853
var rand100 = randomOverZero(100);
console.log(rand100);

// Logs something like: 9005.187977724258
var rand10000 = randomOverZero(10000);
console.log(rand10000);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/mddegKB)

## Getting a random integer

What if you wanted a random integer, or whole number, instead of a float?

For that, we can use the `Math.floor()` method after multiplying the returned value of `Math.random()` by our power of ten.

```js
var randomInteger = function (pow) {
	return Math.floor(Math.random() * pow);
};

// Logs something like: 14
var rand100 = randomInteger(100);
console.log(rand100);

// Logs something like: 9005
var rand10000 = randomInteger(10000);
console.log(rand10000);
```

[Here's a demo of the random integer technique.](https://codepen.io/cferdinandi/pen/RwwWOYL)

## Getting a random integer between two numbers

Finally, let's look at how to get a random integer between two numbers. For example, let's say you wanted a number that was at least 5, but no bigger than 42.

For that, we'll create a helper function that accepts a `min` and `max` for the random number as arguments.

Then, we'll subtract the `min` from the `max`, and add `1` to it (otherwise the `max` would never be reached). We'll multiply the returned value of `Math.random()` by this new number, and add the `min` to it. This gives us a random float between our two values.

Finally, we'll use `Math.floor()` to turn it into an integer, and return the result.

```js
var randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

// Logs something like 37
var rand = randomNumber(5, 42);
console.log(rand);
```

*Props to [the MDN examples section for `Math.random()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Examples) for helping me figure this one out.*

You can [play with a demo on CodePen](https://codepen.io/cferdinandi/pen/BaaoEXq), or [download this on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/).