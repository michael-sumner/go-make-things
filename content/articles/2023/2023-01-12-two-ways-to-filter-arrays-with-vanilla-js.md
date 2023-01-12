---
title: Two ways to filter arrays (with vanilla JavaScript)
date: 2023-01-12T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to modify arrays with vanilla JS](/two-ways-to-modify-arrays-with-vanilla-javascript/). Today, we're going to look at how to filter them.

Let's dig in!

## What we’re trying to do

Let’s say you have an array of objects. Each object in the array is a wizard, and some details about them.

```js
let wizards = [
	{
		name: 'Merlin',
		spells: ['Dancing teacups', 'Turn into fish'],
		tool: 'wand'
	},
	{
		name: 'Gandalf',
		spells: ['You shall not pass', 'Disappear'],
		tool: 'staff'
	},
	{
		name: 'Radagast',
		spells: ['Talk to animals', 'Make plants grow'],
		tool: 'staff'
	}
];
```

You want to create an array that contains just the wizards that use a staff.

```js
let wizardsWithStaffs = [
	{
		name: 'Gandalf',
		spells: ['You shall not pass', 'Disappear'],
		tool: 'staff'
	},
	{
		name: 'Radagast',
		spells: ['Talk to animals', 'Make plants grow'],
		tool: 'staff'
	}
];
```

Let’s look at two ways to do that.

## Filtering an array with a `for...of` loop

With this approach, you create a new empty array (`[]`), and assign it to a variable.

```js
let wizardsWithStaffs = [];
```

Then, you loop through each item in your original array, and check if the current item matches the criteria you want to filter against. If it does, you `Array.push()` it into the new array.

```js
let wizardsWithStaffs = [];

for (let wizard of wizards) {
	if (wizard.tool !== 'staff') continue;
	wizardsWithStaffs.push(wizard);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/zYLwQEB?editors=0011)

If you prefer, you could use a `for` or `Array.forEach()` loop instead.

```js
wizards.forEach(function (wizard) {
	if (wizard.tool !== 'staff') return;
	wizardsWithStaffs.push(wizard);
});
```

The method used doesn't matter. The main thing with this approach is that you're looping over the items and pushing them into a new array.

## Using the `Array.prototype.filter()` method

The `Array.prototype.filter()` method loops over each item in the array you call it on, runs a callback function against that item, and returns a new array.

In the callback function, you `return` [a boolean (_truthy_ or _falsey_)](/boolean-shorthands-and-truthiness/). If the returned value is _truthy_, the current item is included in the new array. If it's _falsey_, it's not.

```js
let wizardsWithStaffs = wizards.filter(function (wizard) {
	return wizard.tool === 'staff';
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/MWBmdBa?editors=0011)

This approach is nice because it consolidates a few steps into one, and uses a method that's explicitly built for doing exactly one thing.

## Which approach should you use?

Like with yesterday's article, I find most of my beginner students really like using a loop to create a new array because it's very clear from looking at it exactly what's happening. Nothing is hidden "behind the scenes" like with the `Array.prototype.filter()` method.

I also find that my more experienced students tend to favor `Array.prototype.filter()` because it involves less typing and fewer steps.

As always, pick the one that's more readable to you. I personally tend to prefer the `filter()` method, but either one works just fine!