---
title: "How to get the index of an object in an array with vanilla JS"
date: 2020-11-23T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The `Array.indexOf()` method returns the index of the first matching item in an array (or `-1` if it doesn't exist).

```js
var wizards = ['Gandalf', 'Radagast', 'Saruman', 'Alatar'];

// Returns 1
wizards.indexOf('Radagast');
```

_But_... that doesn't work if the array contains objects instead of simple strings or numbers.

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

// returns -1
wizards.indexOf({
	name: 'Radagast',
	color: 'brown'
});
```

Fortunately, ES6 introduced a new method that does exactly what we want: `Array.findIndex()`.

## The `Array.findIndex()` method

The `Array.findIndex()` method works a lot like some of the other new ES6 array methods.

You call it on the array you want to search in, and pass in a callback function as an argument. The callback function accepts three arguments: the current item in the array, the item's index, and the array itself. All three are optional.

The callback argument should return `true` when the item you're looking for is found. `Array.findIndex()` will return that items index (or `-1` if it's not found).

Looking at our complex array again, we would do this.

```js
// returns 2
wizards.findIndex(function (wizard) {
	return wizard.name === 'Radagast';
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/gOMVxBB)

## Browser compatibility

The `Array.findIndex()` method works in all modern browsers, but not IE. [You can push support back to IE6 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayfindindex/)