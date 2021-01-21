---
title: "The for...of loop in vanilla JS"
date: 2021-01-22T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, I wrote about how [I'm officially dropping support for IE in all of my stuff](/its-time-to-drop-ie-support/).

Today, I want to look at a simple, humble modern feature: the `for...of` loop.

## What it is

A `for...of` loop provides a way to loop over _iterable objects_.

That includes strings, arrays, and other array-like objects such as [NodeLists](/nodelists-vs-arrays/) and [the arguments object](/getting-all-arguments-passed-into-a-function-with-vanilla-javascript/). It also includes new object types like `Set()` and `Map()`, which we'll be looking at in the near future.

It's more-or-less like the `for...in` loop for iterative over objects, but for everything else.

## How it works

In a `for...of` of loop, you define a _variable_ to represent the current item `of` the iterable you're looping through. Inside the _block_ (the stuff between curly brackets), you can use that variable to reference the current item.

```js
let wizards = ['Gandalf', 'Radagst', 'Hermione', 'Neville'];

for (let wizard of wizards) {
	// logs the current wizard in the loop
	console.log(wizard);
}
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/KKgYodz)

## Why is this needed?

We've always had a way to loop over arrays, NodeLists, and such: the `for` loop.

But also, the `for` loop sucks. Having to define a counter variable and then access the item by its index is messy and clunky and not very nice.

```js
for (let i = 0; i < wizards.length; i++) {
	// also logs the current wizard in the loop
	console.log(wizards[i]);
}
```

The `Array.forEach()` method provides a nicer syntax, but does not provide a way to `break` a loop before iterating through every item.

It also only works with arrays, and requires you to use `Array.from()` to convert an iterable into an array before using it.

```js
wizards.forEach(function (wizard) {
	// ALSO also logs the current wizard in the loop
	console.log(wizard)
});
```

The `Array.forEach()` method still has its place, but for simple looping, the `for...of` method is a solid choice.