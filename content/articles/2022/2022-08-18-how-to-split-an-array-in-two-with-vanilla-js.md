---
title: How to split an array in two (or more) with vanilla JS
date: 2022-08-18T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at a few ways you can split an array into two or more separate arrays with JavaScript. Let's dig in!

## A sample array

For today's article, let's imagine that we have an array of wizard names.

```js
let wizards = ['Merlin', 'Gandalf', 'Ursula', 'Radagast'];
```

We want to break this into two arrays: one with `Merlin` and `Gandalf`, and another with `Ursula` and `Radagast`.

## Using the `Array.slice()` method

The `Array.slice()` method copies a segment of an array into a new one, leaving the original untouched.

The first argument is the array index to start at, and the second is the index to end on. Both are optional. If you omit the start index, it will start at the beginning. If you omit the end index, it will go to the end.

To split our `wizards` array in two, we would do something like this.

```js
let wizardsFirst = wizards.slice(0, 2);
let wizardsSecond = wizards.slice(2);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExEGXdj?editors=1111)

## Using the `Array.splice()` method

The `Array.splice()` method does a lot. You can use it to delete, replace, and add items to an array at specific indexes. Unlike `Array.slice()`, it _will_ modify the original array.

The first, start, is the index of the item you want to modify in the array. It’s the only required argument.

If we pass in `2` as an argument, `Array.splice()` will "cut" the array in two, starting with the item at index `2`. It returns the subset of the array, and removes it from the original.

```js
let moreWizards = wizards.splice(2);
```

Now, `wizards` has `Merlin` and `Gandalf`, and `moreWizards` has `Ursula` and `Radagast`.

[Here's another demo.](https://codepen.io/cferdinandi/pen/wvmReQX?editors=1111)