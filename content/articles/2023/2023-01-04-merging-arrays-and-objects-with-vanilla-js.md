---
title: Merging arrays and objects with vanilla JavaScript
date: 2023-01-04T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to create a unique copy of an array or object](/cloning-arrays-and-objects-in-vanilla-javascript/). Today, we're going to talk about how to merge multiple arrays or objects together.

Let's dig in!

## Merging arrays

You can use the `Array.prototype.concat()` method to merge two or more arrays together. 

Call the `concat()` method on the first array, and pass each array to merge with it in as arguments. It returns a new array.

```js
let wizards1 = ['Gandalf', 'Radagast'];
let wizards2 = ['Merlin', 'Ursula'];
let allWizards = wizards1.concat(wizards2);

// logs ["Gandalf", "Radagast", "Merlin", "Ursula"]
console.log(allWizards);
```

You can alternatively use the spread operator (`...`) to create a new array with the values of your other arrays.

```js
let allWizards = [...wizards1, ...wizards2];
```

## Merging objects

You can use the `Object.assign()` method to merge two or more objects together.

Pass in each object to merge as an argument. By default, all subsequent objects are merged into the first. To create a new object, use an empty object (`{}`) as your first argument.

```js
let merlin = {
	job: 'Wizard',
	age: 142,
	wand: true
};

let radagast = {
	job: 'Druid',
	age: 442,
	staff: true
};

let mergedWizards = Object.assign({}, merlin, radagast);

// logs {job: 'Druid', age: 442, wand: true, staff: true}
console.log(mergedWizards);
```

You can alternatively use the spread operator (`...`) to create a new object with the values of your other objects.

```js
let mergedWizards = {...merlin, ...gandalf};
```

## Deep merging

The methods included here all do what's called a _shallow merge_. If the array or object contains a nested array or object, it's properties overwrite the previous value rather than being merged into it.

For example, here, both our objects contain an array of `spells`.

```js
let merlin = {
	job: 'Wizard',
	spells: ['Dancing teacups', 'Disappear']
};

let radagast = {
	job: 'Druid',
	spells: ['Talk to animals', 'Navigate']
};

let mergedWizards = Object.assign({}, merlin, radagast);
```

When merging these together, the `radagast.spells` array completely overwrites the `merlin.spells` array. They're _not_ merged together.

In a _deep merge_, the properties of the `spells` arrays would be merged together.

Tomorrow, we'll take a look at how to deep merge objects and arrays.