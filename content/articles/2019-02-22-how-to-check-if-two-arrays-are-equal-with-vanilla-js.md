---
title: "How to check if two arrays are equal with vanilla JS"
date: 2019-02-22T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This morning, I was helping a student create a function to find the differences between two objects.

*__Side note:__ I recorded a video of that process, and will be releasing it and an article on the finished helper function on Monday.*

One of the things we needed to check was if two arrays are equal or not. Today, I wanted to share a little helper function I threw together to compare two arrays.

## Creating a helper function

First, let's setup an `arraysMatch()` helper function. It will accept two arguments, one for each array you want to compare.

```js
var arraysMatch = function (arr1, arr2) {
	// Code will go here...
};
```

To check for equality, we first need to make sure the arrays are the same length. If not, they're not equal and we can `return false`.

```js
var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

};
```

Arrays are order-specific. If two arrays have all the same items, but in a different order, they're not strictly equal.

We'll loop through each item in the first array, and check to see if it's index (the `i` variable) is the same as the index of that same item in the second array. If it's not (or if the item doesn't exist at all), we'll `return false`.

I used a simple `for` loop here instead of `forEach()` because we can bail the second an item doesn't match instead of completing the whole loop.

```js
var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; arr1.length < i; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

};
```

If everything checks out, we can `return true`.

```js
var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/exwjoZ) You can also find this on the [Vanilla JS Toolkit](https://vanillajstoolkit.com).

## Browser compatibility

This works in all moderns browsers, and back to at least IE6.