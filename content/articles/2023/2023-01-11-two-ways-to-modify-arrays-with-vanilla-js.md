---
title: Two ways to modify arrays (with vanilla JavaScript)
date: 2023-01-11T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [a few approaches for looping over arrays](/how-should-you-loop-over-arrays-and-nodelists-with-javascript/), and how to choose which one to use. Today, we're going to look at two ways to modify the contents of an array.

Let's dig in!

## What we're trying to do

Let's say you have an array of objects. Each object in the array is a wizard, and some details about them.

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

You want to create an array that contains just the names of the `wizards`, like this.

```js
let names = ['Merlin', 'Gandalf', 'Radagast'];
```

Let's look at two ways to do that.

## Creating a new array with a `for...of` loop

With this approach, you create a new empty array (`[]`), and assign it to a variable.

```js
let names = [];
```

Then, you loop through each item in your original array, and `Array.push()` the data you want into the new array.

```js
let names = [];

for (let wizard of wizards) {
	names.push(wizard.name);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/PoBmbVv?editors=0011)

If you prefer, you could use a `for` or `Array.forEach()` loop.

```js
wizards.forEach(function (wizard) {
	names.push(wizard.name);
});
```

The method used doesn't matter. The main thing with this approach is that you're looping over the items and pushing them into a new array.

## Using the `Array.prototype.map()` method

The `Array.prototype.map()` method loops over each item in the array you call it on, runs a callback function against that item, and returns a new array.

In the callback function, you `return` a value, and that value is what's assigned as to the current index in the array.

```js
let names = wizards.map(function (wizard) {
	return wizard.name;
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/bGjWBJG?editors=0011)

This approach is nice because it consolidates a few steps into one, and uses a method that's explicitly built for doing exactly one thing.

## Which approach should you use?

I find most of my beginner students really like using a loop to create a new array because it's very clear from looking at it exactly what's happening. Nothing is hidden "behind the scenes" like with the `Array.prototype.map()` method.

I also find that my more experienced students tend to favor `Array.prototype.map()` because it involves less typing and fewer steps.

One of my deeply held beliefs about coding is that readable code is far more important than clever code, though, so whichever approach you personally find easier to read, write, and reason about is the one you should use. Either one will do the job just fine!