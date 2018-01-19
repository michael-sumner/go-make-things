---
categories:
- Code
- JavaScript
date: '2017-06-19'
permalink: /how-to-get-all-parent-elements-with-vanilla-javascript/
title: How to get all parent elements with vanilla JavaScript
url: /2017/06/19/how-to-get-all-parent-elements-with-vanilla-javascript
---

Last week, I showed you how to [climb up the DOM](/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/) and find the closest element with a matching selector.

Today, let's look at how to get *all* parent elements of a specific element.

## Setting up our helper function

Here's our script from last week.

```lang-javascript
var getClosest = function (elem, selector) {

    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get the closest matching element
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) return elem;
    }
    return null;

};
```

Let's first change it's name to `getParents()`.

```lang-javascript
var getParents = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};
```

## Climbing up the DOM

Instead of matching against a selector and returning the first match, we want to get *all* parent nodes. Let's create an array that we'll add each of our parent elements to.

```lang-javascript
var getParents = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Set up a parent array
	var parents = [];

	// Get the closest matching element
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}
	return null;

};
```

When we climb up the DOM, we want to push each parent element to our array. When the loop is done, we'll return the entire array.

```lang-javascript
var getParents = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Set up a parent array
	var parents = [];

	// Push each parent element to the array
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		parents.push(elem);
	}

	// Return our parent array
	return parents;

};
```

## Finishing touches

At this point, you have two options:

1. Keep the script simple, and just get every parent element every time.
2. Provide an option to filter parent elements by a selector (only returning parent elements that have a class of `.pick-me`, for example.

### 1. Get all parents

If you go this route, we can remove the `selector` argument from the function, and pull out the `matches()` polyfill.

Here's the finished script.

```lang-javascript
var getParents = function (elem) {

	// Set up a parent array
	var parents = [];

	// Push each parent element to the array
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		parents.push(elem);
	}

	// Return our parent array
	return parents;

};
```

You would use it like this.

```lang-javascript
var elem = document.querySelector('.some-element');
var parents = getParents(elem);
```

### 2. Filter by selector

If you want to filter by selector, we'll leave both the `selector` argument and our `matches()` polyfill in place.

We need to make a small tweak to our `for` loop.

If a `selector` is provided:

1. If the current parent element matches the selector, add it to the `parent` array.
2. Skip to the next item in the loop with `continue`.

If no `selector` is provided, push the current parent element to the `parent` array.

```lang-javascript
var getParents = function (elem, selector) {

	// Element.matches() polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}

	// Set up a parent array
	var parents = [];

	// Push each parent element to the array
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if (selector) {
			if (elem.matches(selector)) {
				parents.push(elem);
			}
			continue;
		}
		parents.push(elem);
	}

	// Return our parent array
	return parents;

};
```

You would use it like this.

```lang-javascript
var elem = document.querySelector('.some-element');
var parents = getParents(elem, '.pick-me');
```

You can get the [completed version of the script on GitHub](https://github.com/cferdinandi/getParents).