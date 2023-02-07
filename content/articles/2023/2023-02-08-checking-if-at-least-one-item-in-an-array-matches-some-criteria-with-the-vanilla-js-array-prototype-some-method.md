---
title: Checking if at least one item in an array matches some criteria with the vanilla JS Array.prototype.some() method
date: 2023-02-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned [how to test if every item in an array matches some criteria](/checking-if-every-item-an-array-matches-some-criteria-with-the-vanilla-js-array.prototype.every-method/). Today, we're going to learn how to check if _at least one item_ does instead.

Let's dig in!

## A sample array

Let's imagine that we have an array of `wizards`. Each item is an object with a `name`, `spells`, and `tool` property.

```js
let wizards = [
	{
		name: 'Radagast',
		spells: ['Talk to animals', 'Grow plants'],
		tool: 'staff'
	},
	{
		name: 'Merlin',
		spells: ['Dancing teacups', 'Turn into fish'],
		tool: 'wand'
	},
	{
		name: 'Gandalf',
		spells: ['You shall not pass', 'Disappear'],
		tool: 'staff'
	}
];
```

## The `Array.prototype.some()` method

The `Array.prototype.some()` method accepts a callback function as an argument. 

That callback function accepts three arguments: a variable for the `current` item in the loop, it's `index`, and the `array` itself. All three are optional.

```js
wizards.some(function (wizard, index, arr) {
	// do stuff...
});
```

Inside the callback function, you can test each item in the array, and `return` a boolean value (truth or falsy). If _at least one item_ `return true`, the `Array.prototype.some()` method returns `true`. Otherwise, it returns `false`.

Let's look at [the same examples we looked at yesterday](/checking-if-every-item-an-array-matches-some-criteria-with-the-vanilla-js-array.prototype.every-method/) to show the difference between `Array.prototype.every()` and `Array.prototype.some()`.

## Example 1: check if at least one wizard uses a staff

Let's imagine that we want to check if at least one wizard in the array uses a staff as their `tool`.

We could do this...

```js
// returns true
// (Both Radagast and Gandlf use staffs)
let hasStaff = wizards.some(function (wizard) {
	return wizard.tool === 'staff';
});
```

## Example 2: check if at least one wizard has at least one spell

We could also use the `Array.prototype.every()` method to check if every wizard in the array has at least one spell.

```js
// returns true
let hasSpells = wizards.some(function (wizard) {
	return wizard.spells.length > 0;
});
```

## A more complex example: checking for a spell

Let's imagine that you want to make sure at least one wizard in your array can cast the spell "You shall not pass".

Inside the callback function, we could use the `Array.prototype.includes()` method on the `spells` array to look for our spell.

```js
// returns true
let doNotPass = wizards.some(function (wizard) {
	return wizard.spells.includes('You shall not pass');
});
```