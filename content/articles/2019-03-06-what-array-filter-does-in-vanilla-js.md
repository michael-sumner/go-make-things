---
title: "What Array.filter() does in vanilla JS"
date: 2019-03-06T10:30:00-05:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

Continuing [my series on what various array methods do](/what-array.map-does-in-vanilla-js/) and how they work, today we're looking at `Array.filter()`.

## An example

Imagine that you have an array of data. Perhaps it's a list of wizards and the house they belong to.

```js
var wizards = [
	{
		name: 'Harry Potter',
		house: 'Gryfindor'
	},
	{
		name: 'Cedric Diggory',
		house: 'Hufflepuff'
	},
	{
		name: 'Tonks',
		house: 'Hufflepuff'
	},
	{
		name: 'Ronald Weasley',
		house: 'Gryfindor'
	},
	{
		name: 'Hermione Granger',
		house: 'Gryfindor'
	}
];
```

You want to get a list of *only* the wizards in Gryfindor.

## Using `Array.forEach()`

With `Array.forEach()`, you would create a new array. Then you would loop through the `wizards` array and push matching wizards to your new array.

```js
// Create a new array
var gryfindor = [];

// Loop through each wizard
wizards.forEach(function (wizard) {
	// If the wizard is in Gryfindor, push to the new array
	if (wizard.house === 'Gryfindor') {
		gryfindor.push(wizard);
	}
});
```

## Using `Array.filter()`

With `Array.filter()`, you don’t have to create the new array beforehand. You can define the variable as the output of `Array.filter()`.

Inside the `Array.filter()` callback function, return `true` if the item should be added to the new array, and `false` if it shouldn't. Under-the-hood, `Array.filter()` loops through each item in the original array, runs your callback method on each item, creates a new array, and pushes the items that return `true`.

```js
// Create a new array from the wizard array
var gryfindor = wizards.filter(function (wizard) {
	// Only include wizards from the Gryfindor house
	if (wizard.house === 'Gryfindor') return true;
	return false;
});
```

You could write this even more succinctly like this.

```js
// Create a new array from the wizard array
var gryfindor = wizards.filter(function (wizard) {
	// Only include wizards from the Gryfindor house
	return wizard.house === 'Gryfindor';
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ywVQWr)

<p class="codepen" data-height="265" data-theme-id="0" data-default-tab="js,result" data-user="cferdinandi" data-slug-hash="ywVQWr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="forEach() vs. filter()"></p>