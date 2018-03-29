---
title: "How to check if at least one item in an array meets some criteria with vanilla JavaScript"
date: 2018-03-29T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to test if every item in an array meets some criteria](/how-to-check-if-every-item-in-an-array-matches-some-criteria-with-vanilla-javascript/). Today, I want to show you how to check if at least one item in the array is a match.

## Using the `Array.some()` method

The `Array.some()` method tests whether or not at least one item in an array meets a specific criteria. You pass in a callback function that should return a comparison to evaluate.

The callback accepts three arguments: the current item in the loop's value, its index, and the array itself. Typically, though, you only really need to pass in the item.

For example, let’s check if at least one item in an array of integers is greater than 10.

```js
// Returns true
[12, 25, 42, 99, 101].some(function (item) {
	return item > 10;
});

// Returns true
[1, 12, 25, 42, 99, 101].some(function (item) {
	return item > 10;
});

// Returns false
[1, 1, 3, 7, 9, 10].some(function (item) {
	return item > 10;
});
```

Just like `Array.every()`, this is pretty useful, and nicer than running a `for` or `forEach()` loop.

## Browser Compatibility

The `Array.some()` method works in all modern browsers, and IE9 and up. You can [push support back to IE6 with a polyfill](https://vanillajstoolkit.com/polyfills/arraysome/).