---
title: "What Array.find() does in vanilla JS"
date: 2019-03-07T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

This week, we're looking at how several of the array methods in vanilla JS actually work. So far, we've looked at [`Array.map()`](/what-array.map-does-in-vanilla-js/) and [`Array.filter()`](/what-array.filter-does-in-vanilla-js/).

Today, we're going to look at `Array.find()`.

## An example

Like yesterday, let's use an array of data about various wizards from Hogwarts. We want to find the first wizard in our data set that competed in the Triwizard Tournament.

```js
var wizards = [
	{
		name: 'Hermione Granger',
		house: 'Gryfindor',
		triwizard: false
	},
	{
		name: 'Tonks',
		house: 'Hufflepuff',
		triwizard: false
	},
	{
		name: 'Cedric Diggory',
		house: 'Hufflepuff',
		triwizard: true
	},
	{
		name: 'Harry Potter',
		house: 'Gryfindor',
		triwizard: true
	},

	{
		name: 'Ronald Weasley',
		house: 'Gryfindor',
		triwizard: false
	}
];
```

## Using `Array.forEach()`

With `Array.forEach()`, we would set up a variable to assign our wizard to.

In our `forEach()` callback, if there was no value assigned to `triwizard` *and* the current item in the loop's `triwizard` property has a value of `true`, we'll assign it to the `triwizard` variable.

```js
var triwizard;
wizards.forEach(function (wizard) {
	if (!triwizard && wizard.triwizard) {
		triwizard = wizard;
	}
});
```

## Using `Array.find()`

With `Array.find()`, you don’t have to create the variable beforehand. You can define the variable as the output of `Array.find()`.

Inside the `Array.find()` callback function, return `true` if the item's `triwizard` property has a value of `true`. The method will return the item and stop looping.

Instead of using an `if` statement, we can return the `triwizard` property itself, since it's already a boolean (`true`/`false`).

```js
var triwizard = wizards.find(function (wizard) {
	return wizard.triwizard;
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/GeWQYa)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="GeWQYa" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="forEach() vs find()"></p>

## Browser compatibility

`Array.find()` works in all modern browsers, including Edge, but not in IE. [You can push support back to IE6 with a polyfill.](https://vanillajstoolkit.com/polyfills/arrayfind/)