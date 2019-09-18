---
title: "How to test if a number is a power of ten with vanilla js"
date: 2019-07-04T10:30:00-04:00
draft: false
url: "/how-to-test-if-a-number-is-a-multiple-of-ten-with-vanilla-js/"
categories:
- Code
- JavaScript
---

This week, we looked at [how to round a number to the nearest whole number with vanilla JS](/how-to-round-to-the-nearest-number-with-vanilla-js/), and [how to keep our code DRY](/refactoring-vanilla-js-code-to-be-more-dry/).

In our original `round()` function, the `precision` argument has to be a power of ten: `10`, `100`, `1000`, etc.

```js
var round = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.round(num / precision) * precision).toLocaleString();
};
```

One of my readers asked me if it's worth checking that it is before continuing with the function.

Today, let's look at how we might do that.

## Checking multiples of

Vanilla JS provides a *remainder operator*: `%`. It will divide a number by another number, and return whatever amount is leftover.

```js
// Returns 1
// 2 goes into 5 twice with 1 left over
5 % 2;

// Return 3
// 4 goes into 7 once, with 3 left over
7 % 4;

// Returns 0
// 3 goes into 9 three times, with 0 left over
9 % 3;
```

You can use is to check if one number is a multiple of another by testing if the remainder is `0` or not.

```js
// logs "yep!"
if (1000 % 10 === 0) {
	console.log('yep!');
}

// also logs "yep!"
if (100 % 10 === 0) {
	console.log('yep!');
}

// does NOT log "yep!"
if (243 % 10 === 0) {
	console.log('yep!');
}
```

There's a problem with this approach, though: numbers like `20`, `42000`, etc. are also multiples of ten, but don't fit our formula.

```js
// logs "yep!"
if (20 % 10 === 0) {
	console.log('yep!');
}

// also logs "yep!"
if (42000 % 10 === 0) {
	console.log('yep!');
}
```

## Creating a helper function

For this to work, we'll need to create our own little test. Here's the plan:

1. Convert the number to a string.
2. Get the first digit, and check that it's `1`.
3. Get the rest of the string, convert it back to a number, and make sure it's `0` (since the string `"0000"` converted to a number is `0`).

If both items 2 and 3 are true, the number is *ten-based*. If not, it's not.

First, let's setup our helper function and convert the number to a string using [the `Number.toString()` method](https://vanillajstoolkit.com/reference/numbers/number-tostring/).

```js
var isTenBased = function (num) {
	var str = num.toString();
};
```

Next, we'll get the first digit and the rest of the number and store both to variables. We'll use [the `String.slice()` method](https://vanillajstoolkit.com/reference/strings/string-slice/) to split the string into a substring at specific integers.

```js
var isTenBased = function (num) {
	var str = num.toString();
	var first = str.slice(0, 1);
	var rest = str.slice(1, str.length);
};
```

Finally, we'll check that `first` is `1` (remember, it's a string, not a number). We'll also use [the `parseFloat()` method](https://vanillajstoolkit.com/reference/numbers/parsefloat/) to convert `rest` into a number and check that it's `0`.

We'll return the result of the check to get a `true`/`false` boolean we can use.

```js
var isTenBased = function (num) {
	var str = num.toString();
	var first = str.slice(0, 1);
	var rest = str.slice(1, str.length);
	return first === '1' & parseFloat(rest) === 0;
};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wLXyRB)