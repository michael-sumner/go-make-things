---
title: "A better way to create an immutable copy of an array or object with vanilla JS"
date: 2019-06-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [why you'd want to create an immutable copy of an array or object](/the-challenge-with-immutable-objects-and-arrays-in-vanilla-js/), and some of the challenges with doing so.

Today, we're going to create a helper function for making deep, immutable copies of arrays and objects with vanilla JS.

## Getting started

First, let's create a helper function named `copy()`. It will accept an object or array to create an immutable copy of as an argument.

```js
var copy = function (obj) {
	// Code will go here...
};
```

## Checking for type

The way we copy our item will vary depending on whether it's an array or an object.

The `typeof` operator returns `object` for both arrays *and* objects, but [there's another method we can use to figure out what type of item we have](/true-type-checking-with-vanilla-js/):

```js
Object.prototype.toString.call();
```

We'll use that with `slice()` to remove the `[object *]` from around the object type and get back just a name like `object`, `array`, and so on.

If the item is an object, we'll run a `cloneObj()` function and return it's result. If it's an array, we'll run a `cloneArr()` function and return it's result. And if it's anything else, we'll just pass it right on through as-is.

(*Strings, numbers, and so on don't have the mutability issues that arrays and objects do.*)

```js
var copy = function (obj) {

	// Get object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object
	if (type === 'object') {
		return cloneObj();
	}

	// If an array
	if (type === 'array') {
		return cloneArr();
	}

	// Otherwise, return it as-is
	return obj;

};
```

## Cloning an array

In our `cloneArr()` function, we'll use [the `map()` method to create a new array](/what-array.map-does-in-vanilla-js/).

You may remember from yesterday's article that one of the issues with immutability is that if an array or object has nested arrays or objects inside it, those need to be immutable as well.

We'll pass each item from the array back into our `copy()` function and assign it's output to the new array item. This is called *recursion*.

If it's an array or object, `copy()` will create new immutable copies of it. If it's anything else, it gets spit back out as-is.

```js
var copy = function (obj) {

	//
	// Methods
	//

	/**
	 * Create an immutable copy of an array
	 * @return {Array}
	 */
	var cloneArr = function () {
		return obj.map(function (item) {
			return copy(item);
		});
	};


	//
	// Inits
	//

	// Get object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// The rest of the code...

};
```

## Cloning an object

Cloning an object is a bit more work.

We'll create a new, empty object and cache it to a variable, `clone`. Then we'll use [a `for...in` loop](/the-for...in-loop-with-vanilla-javascript/) to loop through each item in the object.

We'll pass it's value into the `copy()` function *recursively*, and assign the returned result to the `clone` object, using the same key.

```js
var copy = function (obj) {

	//
	// Methods
	//

	/**
	 * Create an immutable copy of an object
	 * @return {Object}
	 */
	var cloneObj = function () {

		// Create new object
		var clone = {};

		// Loop through each item in the original
		// Recursively copy it's value and add to the clone
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				clone[key] = copy(obj[key]);
			}
		}

		return clone;


	};

	/**
	 * Create an immutable copy of an array
	 * @return {Array}
	 */
	var cloneArr = function () {
		// ...
	};


	//
	// Inits
	//

	// Get object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// The rest of the code...
};
```

## Putting it all together

You can [download the completed helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/copy/). And [here's a demo on CodePen](https://codepen.io/cferdinandi/pen/arXrpJ) so that you can play around with it.

```js
/*!
 * Create an immutable clone of an array or object
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Array|Object} obj The array or object to copy
 * @return {Array|Object}     The clone of the array or object
 */
var copy = function (obj) {

	//
	// Methods
	//

	/**
	 * Create an immutable copy of an object
	 * @return {Object}
	 */
	var cloneObj = function () {

		// Create new object
		var clone = {};

		// Loop through each item in the original
		// Recursively copy it's value and add to the clone
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				clone[key] = copy(obj[key]);
			}
		}

		return clone;


	};

	/**
	 * Create an immutable copy of an array
	 * @return {Array}
	 */
	var cloneArr = function () {
		return obj.map(function (item) {
			return copy(item);
		});
	};


	//
	// Inits
	//

	// Get object type
	var type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object
	if (type === 'object') {
		return cloneObj();
	}

	// If an array
	if (type === 'array') {
		return cloneArr();
	}

	// Otherwise, return it as-is
	return obj;

};
```