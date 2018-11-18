---
title: "How to find a single item in an array with vanilla JS"
date: 2018-11-19T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `Array.find()` method is a super useful ES6 method that returns the first item an array that matches some criteria you specify. If not match is found, it returns `undefined`.

## How it works

In the callback function, you define an argument variable that you'll use as the current item as it iterates.

```js
var sandwiches = ['turkey', 'tuna', 'chicken salad', 'pb&j'];

// Find the "tuna" entry
var tuna = sandwiches.find(function (sandwich) {
	return sandwich === 'tuna';
});

// logs "tuna"
console.log(tuna);
```

## Why would you use this over other options?

You may be wondering why you'd use this over `Array.indexOf()`, which returns the index of the item in an array, or `-1` if there's no match.

```js
var tuna = sandwiches.indexOf('tuna');

// logs 1
console.log(tuna);

// logs "tuna"
console.log(sandwiches[tuna]);
```

The `Array.find()` method *really* shines with more complex arrays.

```js
var sandwiches = [
	{
		filling: 'turkey',
		topping: 'tomato',
		mayo: true
	},
	{
		filling: 'tuna',
		topping: 'pickles',
		mayo: true
	},
	{
		filling: 'pb&j',
		topping: null,
		mayo: false
	}
];

// Find the item with a filling of tuna
var tuna = sandwiches.find(function (sandwich) {
	return sandwich.filling === 'tuna';
});

// logs {filling: "tuna", topping: "pickles", mayo: true}
console.log(tuna);
```

## Browser Compatibility

The `Array.find()` method works in all modern browsers including MS Edge, but has no IE support at all. [A polyfill pushes support back to IE6.](https://vanillajstoolkit.com/polyfills/arrayfind/)

## Alternative to a polyfill: a helper method

If you don't want to include the polyfill, you can use `Array.filter()` instead.

The `Array.filter()` method works back to IE9, and returns a new array containing only items that match some criteria. You can check if there are any matches, and grab the first one.

```js
// Filter the sandwiches array
var tunaFilter = sandwiches.filter(function (sandwich) {
	return sandwich.filling === 'tuna';
});

// If there's no matches, use null, otherwise, grab the first one
var tuna = tunaFilter.length < 1 ? null : tunaFilter[0];
```

And if you might do this often, here's a little helper method you can use instead.

```js
/*!
 * Find the first matching item in an array
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Array}    arr      The array to search in
 * @param  {Function} callback The callback to run to find a match
 * @return {*}                 The matching item
 */
var find = function (arr, callback) {
	var matches = arr.filter(callback);
	if (matches.length < 1) return null;
	return matches[0];
};
```

You would use it like this.

```js
var tuna = find(sandwiches, function (sandwich) {
	return sandwich.filling === 'tuna';
});
```