---
categories:
- Code
- JavaScript
date: '2017-06-20'
url: /climbing-up-the-dom-until-you-hit-a-match-with-vanilla-javascript/
title: Climbing up the DOM until you hit a match with vanilla JavaScript
---

Yesterday, we looked at [how to get all parent elements](/how-to-get-all-parent-elements-with-vanilla-javascript/) with vanilla JavaScript. Today, we're going to modify our script to stop when it finds an element with a specific selector.

## Getting Setup

Here's yesterday's script, renamed `getParentsUntil`.

```javascript
var getParentsUntil = function (elem, selector) {

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

As we climb up the DOM, we're pushing each parent element to an array. We also provide an option to only add elements that have a particular selector (for example, the class `.pick-me`).

## Stopping when you get to a specific element

To stop when we hit a certain element, we need to do two things:

1. Add a third argument that let's us specify a selector to stop at.
2. Check if each parent element has that selector (and if so, quit our loop).

We'll again use `matches()` to check our new selector, which we'll call `stop`. If the current parent element matches the `stop` selector, we'll use `break` to end our loop.

```javascript
var getParentsUntil = function (elem, selector, stop) {

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

		// Should we stop at this parent element?
		if (stop && elem.matches(stop)) break;

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

To use our new script, you'd do this.

```javascript
var elem = document.querySelector('.some-element');
var parents = getParents(elem, '.pick-me', '.stop-here');
```

You can get the [completed `getParentsUntil()` helper function on GitHub](https://github.com/cferdinandi/getParentsUntil).