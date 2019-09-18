---
title: "Find every matching item in an array with vanilla JavaScript"
date: 2018-03-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

ES6 introduce a handful of new methods you can use to manipulate and work with arrays.

Last week, we looked at [some cool stuff you can do with the `Array.from()` method](/how-to-copy-an-array-with-vanilla-javascript/). This week, let's look at some more of the ES6 array methods.

First up: how to find every matching item in an array using the `Array.filter()` method.

## What the `Array.filter()` does

The `Array.filter()` method creates a new array with only elements that pass a test you include as a callback function.

In that callback, pass in an argument name to represent the current item the `filter()` method is evaluating (it can be anything). In the callback itself, test if the current item matches what you're looking for and `return` a boolean (`true` or `false`) accordingly.

```js
var original = [1, 2, 7, 42, 99, 101];

// Get items bigger than 10
var biggerThanTen = original.filter(function (item) {
	return item > 10;
});

// Get items smaller than 10
var smallerThanTen = original.filter(function (item) {
	if (item < 10) {
		return true;
	}
});

// Logs [42, 99, 101]
console.log(biggerThanTen);

// Logs [1, 2, 7]
console.log(smallerThanTen);
```

Much nicer and cleaner than a `for` or `forEach()` loop.

## Browser Compatibility

The `Array.filter()` method works in all modern browsers, and IE9 and above. You can push support [back to at least IE6 with a polyfill](https://vanillajstoolkit.com/polyfills/arrayfilter/).