---
title: A more easy way to write if...or checks with vanilla JavaScript
date: 2022-01-31T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

A few days ago, my friend [Nathan Smith reminded me of my favorite way to write `if...or` checks](https://twitter.com/nathansmith/status/1487201768585023494) when you want to see if a variable is one of a handful of values: using `Array.includes()` instead.

Let's dig in!

## A traditional `if...or` check

Let's say you have a variable, `wizard`. You want to check if it has a value of `Merlin` or `Gandalf`.

Traditionally, you might do something like this.

```js
let wizard = 'Merlin';

if (wizard === 'Merlin' || wizard === 'Gandalf') {
	console.log(`It's one of the good ones!`);
} else {
	console.log('This wizard sucks...');
}
```

This example would log `It's one of the good ones!`. [Here's a demo.](https://codepen.io/cferdinandi/pen/oNobwzB?editors=0011)

It works, but if the values are long or you have a lot of them, you code can become pretty unruly. Fortunately, the `Array.includes()` method provides a simpler way.

## Using the `Array.includes()` method

This this approach, you put all of the values you want to check for (in this example, `Merlin` and `Gandalf`) in an array (`[]`).

Then, you call the `Array.includes()` method on it, and pass the value you want to check (in this case, the `wizard` variable) in as an argument.

```js
if (['Merlin', 'Gandalf'].includes(wizard)) {
	console.log(`It's one of the good ones!`);
} else {
	console.log('This wizard sucks...');
}
```

If the variable contains one of the values, the `Array.includes()` method returns `true`. Otherwise, it returns `false`.

[Here's another demo.](https://codepen.io/cferdinandi/pen/WNXrOpL?editors=0011)

## When should you use this?

With just two short values, this approach doesn't really add much.

But if your values are longer, or you have a lot of them, or you just generally find it more readable, it's a great alternative to a bunch of `if...or` checks.