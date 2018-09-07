---
title: "How to get all siblings of an element until a selector is found with vanilla JS"
date: 2018-09-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've looked at [how to get the next and previous siblings of an element](/finding-the-next-and-previous-sibling-elements-that-match-a-selector-with-vanilla-js/), [how to get *all* siblings of an element](/how-to-get-all-of-an-elements-siblings-with-vanilla-js/), and [how to find the next sibling that matches a selector](/how-to-get-the-next-and-previous-siblings-of-an-element-with-vanilla-js/).

But what if you wanted to get all siblings before or after an element *until* you found one with a specific selector?

Today, we'll look at how to do that with vanilla JS.

## An example

Let's say you had a list of items.

```html
<ul>
	<li>Item 1</li>
	<li class="stop-here">Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>
	<li id="find-me">Item 5</li>
	<li>Item 6</li>
	<li>Item 7</li>
	<li class="stop-here">Item 8</li>
	<li>Item 9</li>
</ul>
```

You have the `#find-me` element, and you want to get all the siblings after it *until* you reach the `.stop-here` list item.

## Creating a helper function.

We're going to create a helper function that will loop through each `nextElementSibling`, pushing them to an array, until it finds one that matches our selector.

First, we'll setup an empty array to push the siblings to, and grab the first `nextElementSibling`.

```js
var getNextUntil = function (elem, selector) {

	// Setup siblings array and get next sibling
	var siblings = [];
	var next = elem.nextElementSibling;

};
```

Then, we'll use a `while` loop to iterative over each `nextElementSibling` until we find a match. In the loop, we'll check if the current `next` sibling matches our `selector` using the `matches()` method.

If it does match, we'll `break` from the loop. Otherwise, we'll push the item to the `siblings` array and set `next` to the next sibling.

When the loop ends, we'll return the `siblings`.

```js
var getNextUntil = function (elem, selector) {

	// Setup siblings array and get next sibling
	var siblings = [];
	var next = elem.nextElementSibling;

	// Loop through all siblings
	while (next) {

		// If the matching item is found, quit
		if (next.matches(selector)) break;

		// Otherwise, push to array
		siblings.push(next);

		// Get the next sibling
		next = next.nextElementSibling

	}

	return siblings;

};
```

There's one small tweak we can make to make this even better.

Imagine you wanted to get all siblings after an element, and didn't care about checking for a selector. In our `if` statment, we'll first make sure a selector was provided. If not, we'll get back a list of all siblings after an element.

```js
var getNextUntil = function (elem, selector) {

	// Setup siblings array and get next sibling
	var siblings = [];
	var next = elem.nextElementSibling;

	// Loop through all siblings
	while (next) {

		// If the matching item is found, quit
		if (selector && next.matches(selector)) break;

		// Otherwise, push to array
		siblings.push(next);

		// Get the next sibling
		next = next.nextElementSibling

	}

	return siblings;

};
```

To go in the other direction and get all previous siblings until a selector is found, we'll use more or less the same code. We'll just change `nextElementSibling` to `previousElementSibling`.

```js
var getPreviousUntil = function (elem, selector) {

	// Setup siblings array and get previous sibling
	var siblings = [];
	var prev = elem.previousElementSibling;

	// Loop through all siblings
	while (prev) {

		// If the matching item is found, quit
		if (selector && prev.matches(selector)) break;

		// Otherwise, push to array
		siblings.push(prev);

		// Get the previous sibling
		prev = prev.previousElementSibling

	}

	return siblings;

};
```

## How to use the helpers

Here are some samples of how you would use these helper functions.

```js
var findMe = document.querySelector('#find-me');

// Returns the first two list items after #find-me
var nextStop = getNextUntil(findMe, '.stop-here');

// Returns all list items after #find-me
var nextAll = getNextUntil(findMe);

// Returns the first two list items before #find-me
var prevStop = getPreviousUntil(findMe, '.stop-here');

// Returns all list items before #find-me
var prevAll = getPreviousUntil(findMe);
```

[Here's a working demo](https://codepen.io/cferdinandi/pen/RYjojg) for you to play with.

## Browser compatibility

These helper methods work in all modern browsers, and back to IE9.

*But...* the `matches()` method was implemented inconsistently with vendor prefixes across many browsers for a while. You should [include a polyfill for it](https://vanillajstoolkit.com/polyfills/matches/) to make sure these work properly.

You can download both helper methods at the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers), too.