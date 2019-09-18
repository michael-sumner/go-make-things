---
categories:
- Code
- JavaScript
date: '2017-08-31'
url: /how-to-get-all-sibling-elements-until-a-match-is-found-with-vanilla-javascript/
title: How to get all sibling elements until a match is found with vanilla JavaScript
---

One of the students in my Vanilla JS Slack channel (a private channel included with my [pocket guides](/guides/)) asked me how to replicate [jQuery's `nextUntil()` method](https://api.jquery.com/nextUntil/) in vanilla JavaScript.

`nextUntil()` gets all sibling elements following an element *until* you reach an element with a particular selector. You can optionally filter sibling elements by a selector as well (for example, only returning elements with a certain class or data attribute).

Today, let's build a vanilla JS version of this.

## Setting up our function

First, let's create a function named `nextUntil()`.

```javascript
var nextUntil = function () {
    // Code goes here...
};
```

Next, let's pass in a few arguments.

We need to know the element to start our search with. We also need to know what selector to check for and stop at (the "until" part of the script).

```javascript
var nextUntil = function (elem, selector) {
	// Code goes here...
};
```

Now we're ready to start coding.

## Getting sibling elements

First, let's setup an array to push our sibling elements into.

```javascript
var nextUntil = function (elem, selector) {

	// Setup siblings array
	var siblings = [];

};
```

Then, we'll get the first sibling for our starting element. To do this, we'll use the `nextElementSibling` property. There's also a `nextSibling` property, but this returns all types of nodes (text strings, for example), and we only want elements.

```javascript
var nextUntil = function (elem, selector) {

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

};
```

Now that we've got our first sibling, we want to do a few things:

1. Make sure it doesn't match our selector.
2. Add it to the list of siblings.
3. Get the next sibling element.

We'll wrap all of this functionality in a `while` loop.

`while` loops run as long as the condition you've specified is true. In our case, we'll reset the `elem` variable to the next sibling, and as long as an `elem` exists, we'll continue looping through.

We'll use `matches()` to check if the element has our selector or not, and `push()` to add the current element in the loop to our array.

```javascript
var nextUntil = function (elem, selector) {

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

	// As long as a sibling exists
	while (elem) {

		// If we've reached our match, bail
		if (elem.matches(selector)) break;

		// Otherwise, push it to the siblings array
		siblings.push(elem);

		// Get the next sibling element
		elem = elem.nextElementSibling;

	}

};
```

Once our loop is done, we can return the `siblings` array.

```javascript
var nextUntil = function (elem, selector) {

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

	// As long as a sibling exists
	while (elem) {

		// If we've reached our match, bail
		if (elem.matches(selector)) break;

		// Otherwise, push it to the siblings array
		siblings.push(elem);

		// Get the next sibling element
		elem = elem.nextElementSibling;

	}

	return siblings;

};
```

Looking good so far!

## Optional filter

The jQuery version of `nextUntil()` let's you filter your siblings by a selector. I'd like to support that, too.

First, we'll add a new argument to our function.

```javascript
var nextUntil = function (elem, selector, filter) {
    // ...
};
```

Then, in our loop, after we check to see if the element matches our selector, we'll check to see if a filter was specified. If it was, we'll then check to see if the element matches the filter.

If it doesn't, we'll skip to the next sibling element. Otherwise, we'll carry on as normal.

```javascript
var nextUntil = function (elem, selector, filter) {

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

	// As long as a sibling exists
	while (elem) {

		// If we've reached our match, bail
		if (elem.matches(selector)) break;

		// If filtering by a selector, check if the sibling matches
		if (filter && !elem.matches(filter)) {
			elem = elem.nextElementSibling;
			continue;
		}

		// Otherwise, push it to the siblings array
		siblings.push(elem);

		// Get the next sibling element
		elem = elem.nextElementSibling;

	}

	return siblings;

};
```

## Polyfilling `matches()`

The `matches()` method was implemented with a browser prefix in some older browsers. A simple polyfill normalizes behavior in older versions of webkit and MS browsers.

Let's add one to our script to ensure maximum cross-browser compatibility. This brings us to IE9+.

```javascript
var nextUntil = function (elem, selector, filter) {

	// matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	// Setup siblings array
	var siblings = [];

	// Get the next sibling element
	elem = elem.nextElementSibling;

	// As long as a sibling exists
	while (elem) {

		// If we've reached our match, bail
		if (elem.matches(selector)) break;

		// If filtering by a selector, check if the sibling matches
		if (filter && !elem.matches(filter)) {
			elem = elem.nextElementSibling;
			continue;
		}

		// Otherwise, push it to the siblings array
		siblings.push(elem);

		// Get the next sibling element
		elem = elem.nextElementSibling;

	}

	return siblings;

};
```

And that's it! [You can also download this script on GitHub.](https://github.com/cferdinandi/nextUntil)