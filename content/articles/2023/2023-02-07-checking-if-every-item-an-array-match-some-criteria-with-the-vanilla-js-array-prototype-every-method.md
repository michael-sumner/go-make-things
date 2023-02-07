---
title: Checking if every item an array matches some criteria with the vanilla JS Array.prototype.every() method
date: 2023-02-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to check if every item an array matches some criteria. Let's dig in!

## A sample array

Let's imagine that we have an array of `wizards`.

Each item is an object with a `name`, `spells`, and `tool` property.

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

## The `Array.prototype.every()` method

The `Array.prototype.every()` method accepts a callback function as an argument. 

That callback function accepts three arguments: a variable for the `current` item in the loop, it's `index`, and the `array` itself. All three are optional.

```js
wizards.every(function (wizard, index, arr) {
	// do stuff...
});
```

Inside the callback function, you can test each item in the array, and `return` a boolean value (truth or falsy). If all items `return true`, the `Array.prototype.every()` method returns `true`. Otherwise, it returns `false`.

## Example 1: check if every wizard uses a staff

For example, let's imagine that we want to check if every wizard in the array uses a staff as their `tool`.

We could do this...

```js
// returns false
// (Merlin uses a wand)
let hasStaff = wizards.every(function (wizard) {
	return wizard.tool === 'staff';
});
```

## Example 2: check if every wizard has at least one spell

We could also use the `Array.prototype.every()` method to check if every wizard in the array has at least one spell.

```js
// returns true
let hasSpells = wizards.every(function (wizard) {
	return wizard.spells.length > 0;
});
```