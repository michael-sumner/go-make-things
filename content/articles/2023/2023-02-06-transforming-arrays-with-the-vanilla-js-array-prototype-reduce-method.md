---
title: Transforming arrays with the vanilla JS Array.prototype.reduce() method
date: 2023-02-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last month, we looked at a bunch of different ways to work with arrays.

We talked about things like [how to loop over arrays](/how-should-you-loop-over-arrays-and-nodelists-with-javascript/), [how to modify](/two-ways-to-modify-arrays-with-vanilla-javascript/) and [filter them](/two-ways-to-filter-arrays-with-vanilla-javascript/), and [how to chop them up](/four-ways-to-chop-up-arrays-with-vanilla-javascript/) and [sort them](how-to-sort-arrays-with-vanilla-javascript/).

Today, we're going to look at a powerful method for transforming arrays in a multitude of ways: `Array.prototype.reduce()`.

Let's dig in!

## The `Array.prototype.reduce()` method

The `Array.prototype.reduce()` method takes the content of an array and returns a single value. That value can be anything: a string, number, object, or even another array.

It's flexibility makes it a bit more confusing than some of the other array methods, so we'll first look at how it works, then we'll look at some practical examples.

The `Array.prototype.reduce()` method accepts two arguments: a callback method to run against each item in the array, and a starting value.

The callback method accepts two arguments: the `accumulator`, which is the current combined value, and the `current` item in the loop. Whatever you return is used as the accumulator for the next item in the loop. On the very first loop, that starting value is used instead.

To make this make sense, let's look at some examples.

## Getting an array of names from an array of objects

A few weeks ago, we looked at [how you can chain certain array methods](/chaining-array-methods-with-vanilla-javascript/).

We took an array of `wizards`...

```js
let wizards = [
	{
		name: 'Radagast',
		spells: ['Talk to animals', 'Make plants grow'],
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

And use the `Array.prototype.filter()` and `Array.prototype.map()` methods to create an array with just the `names` of `wizards` who use a staff as their `tool`...

```js
// returns ["Gandalf", "Radagast"]
let wizardsWithStaffs = wizards.filter(function (wizard) {
	return wizard.tool === 'staff';
}).map(function (wizard) {
	return wizard.name;
}).sort();
```

We can reach the same outcome using the `Array.prototype.reduce()` method.

In our callback, we'll define the new array, `arr`, as the _accumulator_, and the current `wizard`, as arguments. Then, we'll pass in an empty array (`[]`) as our starting value.

```js
let wizardsWithStaffs = wizards.reduce(function (arr, wizard) {
	// ...
}, []);
```

Inside the callback, we'll check if the `wizard.tool` is a `staff`. If it is, we'll `Array.push()` it into our `arr`.

Either way, we'll return `arr` to use as the accumulator for the next `wizard`.

```js
let wizardsWithStaffs = wizards.reduce(function (arr, wizard) {
	if (wizard.tool === 'staff') {
		arr.push(wizard.name);
	}
	return arr;
}, []);
```

Let's look at another example

## Getting the number of times an item appears in an array

For this example, imagine you have an array of `wizards` with some duplicate values.

```js
let wizards = [
	'Gandalf',
	'Radgast',
	'Ursula',
	'Radagast',
	'Merlin',
	'Ursula',
	'Ursula'
];
```

We want our output to be an object (`{}`), where each `wizard` is a property, and its value is the number of times it appears in the array.

```js
let wizardCount = {
	Gandalf: 1,
	Radagast: 2,
	Ursula: 2,
	Merlin: 1
};
```

We could do that with a `for...of` loop...

```js
let wizardCount = {};

for (let wizard of wizards) {

	// If the item already doesn't exist yet, create it
	if (!wizardCount[wizard]) {
		wizardCount[wizard] = 0;
	}

	// Increase its value by 1
	wizardCount[wizard]++;

}
```

And here's how you can do the same thing with the `Array.prototype.reduce()` method...

```js
let wizardCount = wizards.reduce(function (obj, wizard) {

	// If the item already doesn't exist yet, create it
	if (!obj[wizard]) {
		obj[wizard] = 0;
	}

	// Increase its value by 1
	obj[wizard]++;

	return obj;

}, {});
```

## When should you use the `Array.prototype.reduce()` method over other approaches?

There was a time where I would have recommended using `Array.prototype.reduce()` over simple `for...of` loops or chaining Array methods. 

It is arguably a little better for performance when dealing with high-volume transactions.

That said... I strongly believe that readability is more important that clever or hyper-optimized code. Look at the examples above, I feel pretty confident that for most folks, the chained Array methods and `for...of` loops are easier to read and more clear to understand that anything you can do with `Array.prototype.reduce()`.

In many cases, the version produced with `Array.prototype.reduce()` is also more lines of code.

This is all a long-winded way of saying that it's important to understand how this method works, but I think you'd generally be better served using other, simpler approaches instead.