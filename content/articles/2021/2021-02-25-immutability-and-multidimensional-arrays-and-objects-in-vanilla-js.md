---
title: "Immutability with multidimensional arrays and objects in vanilla JS"
date: 2021-02-25T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned about [immutability with arrays and objects in JavaScript](/immutable-arrays-and-objects-in-vanilla-js/).

The approaches we discussed work great for simple arrays and objects. But they have some shortcomings when working with _multidimensional arrays and objects_.

Today, we're going to learn how to address that.

## What's a multidimensional array or object?

A _multidimensional array or object_ is one that has one or more nested arrays or objects as property values.

```js
// A multidimensional array
let wizards = [{
	name: 'Radagast',
	color: 'brown'
}, {
	name: 'Gandalf',
	color: 'gray'
}];

// A multidimensional object
let movies = {
	studio: 'Pixar',
	films: ['Soul', 'Onward', 'Up', 'WALL-E'],
	directors: ['Brad Bird', 'Pete Docter', 'Andrew Stanton'],
	details: {
		founded: '1986',
		founders: ['Edwin Catmull', 'Alvy Ray Smith']
	}
};
```

## Nested arrays and objects are _not_ immutable

With multidimensional arrays and objects, using `Array.from()` and `Object.assign()` (or the spread operator) creates an immutable copy of the parent array or object only.

Any nested arrays or objects inside it are still mutable.

```js
// Create an immutable copy of the wizards array
let wizardsCopy = Array.from(wizards);

// Update a nested property
wizards[0].druid = true;

// logs {name: "Radagast", color: "brown", druid: true}
console.log(wizardsCopy[0]);
```

## How to create immutable multidimensional arrays and objects

To get around this, we need to loop through each property in an object or array and copy it to a new one. If the property is itself an array or object, we need to repeat the process, creating a unique immutable copy of it.

Let's create a helper function for this called `copy()`.

```js
/**
 * Create an immutable clone of an array or object
 * @param  {*} obj The array or object to copy
 * @return {*}     The clone of the array or object
 */
function copy (obj) {
	// Code goes here...
}
```

First, we want to determine what type of object the `obj` is.

The `typeof` property is shockingly inaccurate at this, so we're going to [use the `Object.prototype.toString.call()` technique to get the true object type](/true-type-checking-with-vanilla-js/).

If the `type` is `object` or `array`, we'll create an immutable copy of it using some helper functions. If not, we'll return the item as-is.

```js
/**
 * Create an immutable clone of an array or object
 * @param  {*} obj The array or object to copy
 * @return {*}     The clone of the array or object
 */
function copy (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// Return a clone based on the object type
	if (type === 'object') return cloneObj();
	if (type === 'array') return cloneArr();
	return obj;

}
```

Inside the `cloneObj()` helper, we'll create a new object (`{}`) and save it to the `clone` variable.

Then, we'll [use a `for...in` loop](https://vanillajstoolkit.com/reference/loops/for-in/) to loop through each item in the object and assign its value to that same `key` in the `clone` object. Since the property at that `key` could itself be an array or object, however, we're going to [pass it recursively back into the `copy()` function](/recursion-with-vanilla-javascript/) and use that returned result.

Finally, we'll return the `clone`.

```js
/**
 * Create an immutable clone of an array or object
 * @param  {*} obj The array or object to copy
 * @return {*}     The clone of the array or object
 */
function copy (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	/**
	 * Create an immutable copy of an object
	 * @return {Object}
	 */
	function cloneObj () {
		let clone = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				clone[key] = copy(obj[key]);
			}
		}
		return clone;
	}

	// Return a clone based on the object type
	if (type === 'object') return cloneObj();
	if (type === 'array') return cloneArr();
	return obj;

}
```

We'll do something similar in the `cloneArr()` function.

We can [use the `Array.map()` method](https://vanillajstoolkit.com/reference/arrays/array-map/) to create a new array from the existing array's values. Again, since the `item` could itself be an array or object, we'll pass it recursively into the `copy()` function and used the returned value.

```js
/**
 * Create an immutable clone of an array or object
 * @param  {*} obj The array or object to copy
 * @return {*}     The clone of the array or object
 */
function copy (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	/**
	 * Create an immutable copy of an object
	 * @return {Object}
	 */
	function cloneObj () {
		let clone = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				clone[key] = copy(obj[key]);
			}
		}
		return clone;
	}

	/**
	 * Create an immutable copy of an array
	 * @return {Array}
	 */
	function cloneArr () {
		return obj.map(function (item) {
			return copy(item);
		});
	}

	// Return a clone based on the object type
	if (type === 'object') return cloneObj();
	if (type === 'array') return cloneArr();
	return obj;

}
```

Now, we can use the `copy()` function to create immutable copies of multidimensional arrays and objects by individually copying over each item and creating a new array or object when needed.

To use the helper function, include it in your code base, then pass the array or object to copy in as an argument.

```js
/**
 * Create an immutable clone of an array or object
 * @param  {*} obj The array or object to copy
 * @return {*}     The clone of the array or object
 */
function copy () {
	// The helper function code...
 }

 // Create an immutable copy of wizards
 let immutableWizards = copy(wizards);

  // Update a nested property
 wizards[0].druid = true;

 // logs {name: "Radagast", color: "brown"}
 // Here, the copy is unaffected by changes to the original
 console.log(wizardsCopy[0]);
 ```

You can find [an advanced version of the `copy()` function](https://vanillajstoolkit.com/helpers/copy/) that also creates immutable copies of `Set()`, `Map()`, and function objects on the [Vanilla JS Toolkit](https://vanillajstoolkit.com).