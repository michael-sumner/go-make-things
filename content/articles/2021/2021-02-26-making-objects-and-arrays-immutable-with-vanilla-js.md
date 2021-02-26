---
title: "Making objects and arrays immutable with vanilla JS"
date: 2021-02-26T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this week, we learned [how to make immutable copies of objects and arrays](/immutable-arrays-and-objects-in-vanilla-js/) (copies that _don't_ mutate the original). Then, yesterday, we learned [how to create immutable copies with multidimensional objects and arrays](/immutability-with-multidimensional-arrays-and-objects-in-vanilla-js/).

But as a few of my students pointed out, while changes to the copies don't affect the original (and vice-versa), the arrays and objects _can_ still be changed. They're not really _immutable_.

Today, let's look at how to prevent an object or array from being changed at all.

## The `Object.freeze()` method

The `Object.freeze()` method makes an object or array itself immutable. You can't add, update, or delete items or properties from it.

For example, let's say we have a `wizard` object, with `name` and `age` properties.

```js
let wizard = {
	name: 'Merlin',
	age: 'old AF'
};
```

We can pass it into the `Object.freeze()` method to prevent it from being updated.

```js
Object.freeze(wizard);
```

Now, trying to update it will not work.

```js
wizard.age = 42;
wizard.wand = true;
delete wizard.name;

// logs {name: "Merlin", age: "old AF"}
console.log(wizard);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOVZaRN)

## Editing immutable objects and arrays

If you want to edit the original object, you need to create a copy of it first using [one of the techniques we learned the other day](/immutable-arrays-and-objects-in-vanilla-js/).

```js
let wizardClone = Array.from(wizard);
wizardClone.age = 42;
```

## `Object.freeze()` and multi-dimensional arrays and objects

Just like with creating immutable copies, the `Object.freeze()` method does not freeze nested arrays or objects inside a multi-dimensional object or array.

```js
let wizard = {
	name: 'Merlin',
	age: 'old AF',
	spells: ['Disappear', 'Levitate', 'Heal']
};

Object.freeze(wizard);

wizard.spells.push('Dancing brooms');

// logs ["Disappear", "Levitate", "Heal", "Dancing brooms"]
console.log(wizard.spells);
```

[You see it in action here.](https://codepen.io/cferdinandi/pen/xxRYpXY)

The `wizard` object is _immutable_, but the `wizard.spells` array is not.

## How to freeze multi-dimensional arrays and objects

To freeze a multi-dimensional array or object, we need to loop through each item, and recursively freeze nested arrays and objects.

First, let's create a helper function, `freeze()`.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {
	// Code goes here...
}
```

In it, we'll [use the Object.prototype.toString.call() technique](https://gomakethings.com/true-type-checking-with-vanilla-js/) to determine the object `type`.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

}
```

If the `type` equals `object`, we'll loop through each item in it with a `for...in` loop. If the property at that `key` is an array or object, we'll recursively pass it into our `freeze()` function.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, recursively freeze
	if (type === 'object') {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (['array', 'object'].includes(Object.prototype.toString.call(obj[key]).slice(8, -1).toLowerCase())) {
					freeze(obj[key]);
				}
			}
		}
	}

}
```

If the `type` equals `array`, we'll use a `for...of` loop to do the same thing with each of its items.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, recursively freeze
	if (type === 'object') {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (['array', 'object'].includes(Object.prototype.toString.call(obj[key]).slice(8, -1).toLowerCase())) {
					freeze(obj[key]);
				}
			}
		}
	}

	// If an array, recursively freeze
	if (type === 'array') {
		for (let item of obj) {
			if (['array', 'object'].includes(Object.prototype.toString.call(item).slice(8, -1).toLowerCase())) {
				freeze(item);
			}
		}
	}

}
```

Finally, we'll freeze the `obj` itself and return it.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	// If an object, recursively freeze
	if (type === 'object') {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (['array', 'object'].includes(Object.prototype.toString.call(obj[key]).slice(8, -1).toLowerCase())) {
					freeze(obj[key]);
				}
			}
		}
	}

	// If an array, recursively freeze
	if (type === 'array') {
		for (let item of obj) {
			if (['array', 'object'].includes(Object.prototype.toString.call(item).slice(8, -1).toLowerCase())) {
				freeze(item);
			}
		}
	}

	// Freeze and return the object
	return Object.freeze(obj);

}
```

One last thing we can do to make this a little bit cleaner is move the check to determine if the item is an array or object into a function.

```js
/**
 * Freeze a multi-dimensional array or object
 * @param  {Array|Object} obj The array or object to freeze
 * @return {Array|Object}     The frozen array or object
 */
function freeze (obj) {

	// Get object type
	let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

	/**
	 * Check if the item is an array or object
	 * @param  {Array|Object}  item The item to check
	 * @return {Boolean}            If true, item is an array or object
	 */
	function isArrOrObj (item) {
		return ['array', 'object'].includes(Object.prototype.toString.call(item).slice(8, -1).toLowerCase());
	}

	// If an object, recursively freeze
	if (type === 'object') {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (isArrOrObj(obj[key])) {
					freeze(obj[key]);
				}
			}
		}
	}

	// If an array, recursively freeze
	if (type === 'array') {
		for (let item of obj) {
			if (isArrOrObj(item)) {
				freeze(item);
			}
		}
	}

	// Freeze and return the object
	return Object.freeze(obj);

}
```

Then, we can use it like this.

```js
let wizard = {
	name: 'Merlin',
	age: 'old AF',
	spells: ['Disappear', 'Levitate', 'Heal']
};

freeze(wizard);
```

You could also use it like this.

```js
let wizard = freeze({
	name: 'Merlin',
	age: 'old AF',
	spells: ['Disappear', 'Levitate', 'Heal']
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/rNWJpmm) You can find this on the [Vanilla JS Toolkit](https://vanillajstoolkit.com).

## When do you need to freeze objects and arrays?

This pattern is useful when you want to _force_ developers to create a copy before making updates to an array or object. That might not always be required or desired, though. It largely depends on your project.