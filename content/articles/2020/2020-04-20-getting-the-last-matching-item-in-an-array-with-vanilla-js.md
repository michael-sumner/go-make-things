---
title: "Getting the last matching item in an array with vanilla JS"
date: 2020-04-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The [`Array.indexOf()` method returns the index of the first item in an array](/how-to-check-for-an-item-in-an-array-with-vanilla-js/#the-array-indexof-method) that matches the value you've provided (or `-1` if it's not found).

```js
var wizards = ['Harry', 'Hermione', 'Neville', 'Ron', 'Hermione', 'Gandalf', 'Neville'];

// Find "Neville"
// returns 2
wizards.indexOf('Neville');

// Find "Radagast"
// returns -1
wizards.indexOf('Radagast');
```

But what if you want to find the *last* matching item in an array?

## The `Array.lastIndexOf()` method

As the name implies, the `Array.lastIndexOf()` method returns the index of the last matching item in an array, or `-1` if a match is not found.

```js
// Find "Neville"
// returns 6
wizards.lastIndexOf('Neville');

// Find "Radagast"
// returns -1
wizards.lastIndexOf('Radagast');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJyRgPr)

## Starting at a specific index

The `Array.lastIndexOf()` method accepts a second argument: `fromIndex`.

It defaults to the index of last item in the array (`array.length - 1`). If you pass in a positive integer, it will start that many items from the start of the array. If you pass in a negative integer, it will start that many items from the end.

```js
// This skips the item at index 6 because it starts at index 4
// returns 2
wizards.lastIndexOf('Neville', 4);

// This starts with index 5 (two in from the last item)
// returns 4
wizards.lastIndexOf('Hermione', -2);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/pojEwrg)

## Browser compatibility

The `Array.lastIndexOf()` method works in all modern browsers, and IE9 and above.