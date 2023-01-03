---
title: Cloning arrays and objects in vanilla JavaScript
date: 2023-01-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to look at copying arrays and objects, how JavaScript handles some things under-the-hood, and some modern approaches that make things a bit easier.

Let's dig in!

## Arrays, objects, and references

Let's imagine you have an array of wizards.

```js
let wizards = ['Gandalf', 'Radagast', 'Merlin'];
```

You want to make a copy of that array, so you assign the array to another variable.

```js
let moreWizards = wizards;
```

Here, `moreWizards` is _not_ a copy of `wizards`. Instead, it's a _reference_ to the original array. If you were to modify one or the other, both would look the same.

Here, both `wizards` and `moreWizards` have a new item, `Ursula`.

```js
moreWizards.push('Ursula');

// logs ["Gandalf", "Radagast", "Merlin", "Ursula"]
console.log(wizards);
```

This is true for objects as well. If you assign an existing object to a new variable, the new variable is a _reference_ to the original, _not_ a copy of its values.

```js
let merlin = {
	job: 'Wizard',
	spells: ['Turn into an animal', 'Dancing teacups']
};

// This is a reference to merlin
let gandalf = merlin;
```

## How to create a copy of an array or object in JavaScript

To copy an array, you can use [the `Array.from()` method](https://vanillajstoolkit.com/reference/arrays/array-from/) or [`Array.slice()` method](https://vanillajstoolkit.com/reference/arrays/array-slice/).

```js
let moreWizards = Array.from(wizards);
let evenMoreWizards = wizards.slice();
```

To copy an object, you can use [the `Object.assign()` method](https://vanillajstoolkit.com/reference/objects/object-assign/), with an empty object (`{}`) as the first argument.

```js
let gandalf = Object.assign({}, merlin);
```

For both arrays and objects, you can also use [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/).

```js
let stillMoreWizards = [...wizards];
let radagast = {...merlin};
```

## Deep copies of an array or object

The `Array.from()`, `Array.slice()`, and `Object.assign()` methods, as well as the spread operator, all create _shallow copies_ of an array or object.

If the array or object has a nested or array or object in it (like the `spells` array in the `merlin` object), that item is actually a _reference_ to the original rather than a unique copy.

Here, adding a spell to the `merlin.spells` array also adds it to the `gandalf.spells` array.

```js
// Copy merlin
let gandalf = Object.assign({}, merlin);

// Add a spell to merlin
merlin.spells.push('Disappear');

// gandalf.spells has the new spell, too
// logs ["Turn into an animal", "Dancing teacups", "Disappear"]
console.log(gandalf.spells);
```

To create a _deep copy_, one in which any nested array or objects are also unique copies, we need to use a newer JavaScript method: `structuredClone()`.

```js
let gandalf = structuredClone(merlin);
```

## Merging arrays and objects

Tomorrow, we'll look at how to merge arrays and objects together.