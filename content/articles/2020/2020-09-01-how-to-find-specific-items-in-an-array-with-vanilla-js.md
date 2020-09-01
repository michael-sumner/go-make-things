---
title: "How to find specific items in an array with vanilla JS"
date: 2020-09-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at two different approaches for finding specific items in an array.

Let's dig in.

## An example array

Let's say you have an array of wizards from *Lord of the Rings*, like this.

```js
var wizards = [
	{
		name: 'Saruman',
		color: 'white'
	},
	{
		name: 'Gandalf',
		color: 'gray'
	},
	{
		name: 'Radagast',
		color: 'brown'
	},
	{
		name: 'Alatar',
		color: 'blue'
	},
	{
		name: 'Pallando',
		color: 'blue'
	}
];
```

Because each item in the array is an object, you can't use [a simpler approach like `Array.indexOf()`](/how-to-check-for-an-item-in-an-array-with-vanilla-js/) to find specific items in the array.

Let's look at two alternatives.

## The `Array.filter()` method

The `Array.filter()` method creates a new array containing only items that match some criteria you specify.

Call it on the method you want to filter, and pass in a callback function as an argument. The callback function automatically receives the current item in the array and its index as arguments.

```js
wizards.filter(function (item, index) {

	// This is the current item
	// logs "Saruman", "Radagast", etc.
	console.log(item);

	// This is its index
	// logs 0, 1, etc.
	console.log(index);

});
```

The callback function needs to return a *boolean* value: `true` to add the item to the new array, and `false` to omit it.

For example, to create an array with only the wizards whose `color` is `blue`, we would do this.

```js
var blueWizards = wizards.filter(function (item) {

	// If the item's color is blue, add it
	if (item.color === 'blue') return true;

	// Otherwise, exclude it
	return false;

});
```

Since `item.color === 'blue'` returns a `true`/`false` value, you could alternatively write it like this.

```js
var blueWizards = wizards.filter(function (item) {
	return item.color === 'blue';
});
```

Either way, this will create a new array that looks like this.

```js
var blueWizards = [
	{
		name: 'Alatar',
		color: 'blue'
	},
	{
		name: 'Pallando',
		color: 'blue'
	}
];
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWdaZqX)

*The `Array.filter()` method works in all modern browsers, and back to IE9.*

## The `Array.find()` method

Where the `Array.filter()` method returns a new array of all matching items, the `Array.find()` method returns the first matching item in an array.

Just like the `Array.filter()` method, you call it on the array, and pass in a callback function that returns a *boolean*: `true` if the item is a match, and `false` if it's not.

Here's how we would find the `gray` wizard.

```js
var grayWizard = wizards.find(function (item) {
	return item.color === 'gray';
});
```

This returns the following object.

```js
grayWizard = 	{
	name: 'Gandalf',
	color: 'gray'
};
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/JjXypZE)

*The `Array.find()` method works in all modern browsers, but not IE. [It can be polyfilled back to IE6.](https://vanillajstoolkit.com/polyfills/arrayfind/)*

## An alternative to `Array.find()` without a polyfill

If you don't want to polyfill `Array.find()`, you can use `Array.filter()` to do the same thing.

Look for the item you want, and if the new array has any items, return the first one.

```js
var grayWizard = wizards.filter(function (item) {
	return item.color === 'gray';
})[0];
```