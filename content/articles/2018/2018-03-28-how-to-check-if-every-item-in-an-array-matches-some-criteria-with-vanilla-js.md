---
title: "How to check if every item in an array matches some criteria with vanilla JavaScript"
date: 2018-03-28T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've been looking at a handful of new ES6 array methods. Today, we're looking at how to check if every item in an array matches some criteria.

## Using the `Array.every()` method

The `Array.every()` method tests whether or not every item in an array meets a specific criteria. You pass in a callback function that should return a comparison to evaluate.

The callback accepts three arguments: the current item in the loop's value, its index, and the array itself. Typically, though, you only really need to pass in the item.

For example, let's check if every item in an array of integers is greater than 10.

```js
// Returns true
[12, 25, 42, 99, 101].every(function (item) {
	return item > 10;
});

// Returns false
[1, 12, 25, 42, 99, 101].every(function (item) {
	return item > 10;
});
```

Pretty useful, and nicer than running a `for` or `forEach()` loop.

## Browser Compatibility

The `Array.every()` method works in all modern browsers, and IE9 and up. You can [push support back to at least IE6 with a polyfill](https://vanillajstoolkit.com/polyfills/arrayevery/).