---
title: "How to check if two items are equal in vanilla JS"
date: 2021-05-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

You may already be familiar with the _equals_ and _strict equals_ operators in JavaScript.

The _equals_ operator (`==`) checks if two items are equal in value. The _strict equals_ operator (`===`) checks if they're both equal in value _and_ in type.

```js
// returns true
// They have the same value even though they're different types
let equals = 42 == '42';

// returns false
// They have the same value, but one is a number and one is a string
let strictEquals = 42 === '42';
```

This works great for simple primitive values, but falls apart when comparing objects and arrays. Today, we're going to learn how to approach those.

## Equality checks don't work with arrays and objects

Let's say you have two arrays that are identical in value, and two objects that are as well.

```js
let arr1 = [1, 2, 3];
let arr2 = [1, 2, 3];

let obj1 = {
	name: 'Merlin',
	job: 'wizard'
};

let obj2 = {
	name: 'Merlin',
	job: 'wizard'
};
```

Both the _equals_ and _strict equals_ operators will return `false` when comparing these items.

```js
// These both return false
let compareArrs = arr1 === arr2;
let compareObjs = obj1 === obj2;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/abJwZrj)

To check if two arrays or objects are equal, you need to loop through the value of each one and compare each item individually. Let's look at how to do that.

## Creating an `isEqual()` helper function

Let's start by creating an `isEqual()` helper function, with two parameters, `obj1` and `obj2`.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {
	// Code will go here...
}
```

## Comparing type

In order to compare our items, we first need to determine if the items are arrays, objects, or simple primitives.

[The `typeof` operator returns `object` for both arrays _and_ objects](/true-type-checking-with-vanilla-js/), we'll use [the `trueTypeOf()` helper function](https://vanillajstoolkit.com/helpers/truetypeof/) to get the object type.

Let's get the type for each object, and if they're not the same type, we'll return `false`.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * @param  {Object} obj The object
	 * @return {String}     The object type
	 */
	function getType (obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

}
```

Now, we're ready to actually compare the item values.

Let's create three helper functions&mdash;`areArraysEqual()`, `areObjectsEqual()`, and `arePrimitivesEqual()`&mdash;to compare our items based on their `type`.

Each function will `return` a boolean, and we can `return` the function itself to pass that value along.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * @param  {Object} obj The object
	 * @return {String}     The object type
	 */
	function getType (obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	return arePrimitivesEqual();

}
```

## Comparing arrays

Let's create an `areArraysEqual()` helper function.

In it, we'll first check to see if the `length` property of each array is the same. If not, we'll `return false`.

Otherwise, we'll loop through each item with a `for` loop and compare the two items. If any of the items are not equal to each other, we'll `return false`. Otherwise, we'll `return true`.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * ..
	 */

	/**
	 * Check if two arrays are equal
	 * @return {Boolean} Returns true if they're equal
	 */
	function areArraysEqual () {

		// Check length
		if (obj1.length !== obj2.length) return false;

		// Check each item in the array
		for (let i = 0; i < obj1.length; i++) {
			if (obj1[i] !== obj2[i]) return false;
		}

		// If no errors, return true
		return true;

	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	return arePrimitivesEqual();

}
```

## Comparing objects

Inside our `areObjectsEqual()` function, we'll do something similar to compare objects.

Because objects don't have a `length` property, we'll use the `Object.keys()` method to get an array of object keys, and get the `length` of that. If the objects are not the same length, we'll `return false`.

Next, we'll loop through each item with a `for...in` loop and compare the two items. If any of the items are not equal to each other, we'll `return false`. Otherwise, we'll `return true`.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * ..
	 */

	/**
	 * Check if two arrays are equal
	 * ...
	 */

	/**
	 * Check if two objects are equal
	 * @return {Boolean} If true, both objects are equal
	 */
	function areObjectsEqual () {

		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

		// Check each item in the object
		for (let key in obj1) {
			if (Object.prototype.hasOwnProperty.call(obj1, key)) {
				if (obj1[key] !== obj2[key]) return false;
			}
		}

		// If no errors, return true
		return true;

	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	return arePrimitivesEqual();

}
```

## Comparing everything else

Finally, for everything else, we can use basic _strict equals_ comparisons.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * ..
	 */

	/**
	 * Check if two arrays are equal
	 * ...
	 */

	/**
	 * Check if two objects are equal
	 * ...
	 */

	/**
	 * Check if two primitives are equal
	 * @return {Boolean} If true, both primitives are equal
	 */
	function arePrimitivesEqual () {
		return obj1 === obj2;
	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	return arePrimitivesEqual();

}
```

## What about multidimensional arrays and objects?

If the items we're comparing have nested arrays or objects inside them, our current function will fail.

For example, if the value of an object key is an array, or another object, the _strict equals_ operator we use in our loop will always `return false`.

To get around this, we can use a technique called _recursion_.

Rather than using _strict equals_ inside the `areArraysEqual()` and `areObjectsEqual()` functions, we can pass the two items we're comparing back into the `isEqual()` method.

If they're arrays or objects, each property will get looped through and compared, and if not, a basic comparison operator will run instead.

```js
/**
 * Check if two objects or arrays are equal
 * @param  {*}       obj1 The first item
 * @param  {*}       obj2 The second item
 * @return {Boolean}      Returns true if they're equal in value
 */
function isEqual (obj1, obj2) {

	/**
	 * More accurately check the type of a JavaScript object
	 * @param  {Object} obj The object
	 * @return {String}     The object type
	 */
	function getType (obj) {
		return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
	}

	/**
	 * Check if two arrays are equal
	 * @return {Boolean} Returns true if they're equal
	 */
	function areArraysEqual () {

		// Check length
		if (obj1.length !== obj2.length) return false;

		// Check each item in the array
		for (let i = 0; i < obj1.length; i++) {
			if (!isEqual(obj1[i], obj2[i])) return false;
		}

		// If no errors, return true
		return true;

	}

	/**
	 * Check if two objects are equal
	 * @return {Boolean} If true, both objects are equal
	 */
	function areObjectsEqual () {

		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

		// Check each item in the object
		for (let key in obj1) {
			if (Object.prototype.hasOwnProperty.call(obj1, key)) {
				if (!isEqual(obj1[key], obj2[key])) return false;
			}
		}

		// If no errors, return true
		return true;

	}

	/**
	 * Check if two primitives are equal
	 * @return {Boolean} If true, both primitives are equal
	 */
	function arePrimitivesEqual () {
		return obj1 === obj2;
	}

	// Get the object type
	let type = getType(obj1);

	// If the two items are not the same type, return false
	if (type !== getType(obj2)) return false;

	// Compare based on type
	if (type === 'array') return areArraysEqual();
	if (type === 'object') return areObjectsEqual();
	return arePrimitivesEqual();

}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/LYWLbGN) You can also find this helper function on [the Vanilla JS Toolkit](https://vanillajstoolkit.com).