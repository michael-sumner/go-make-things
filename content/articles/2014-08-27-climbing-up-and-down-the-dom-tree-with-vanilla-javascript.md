---
categories:
- Code
date: '2014-08-27'
url: /climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
title: Climbing up and down the DOM tree with vanilla JavaScript
---

On a recent Javascript project, I needed to climb up the DOM tree looking for the first element that had a particular class, ID, or data attribute.

This is really easy to do with jQuery, but today I wanted to share some simple vanilla JavaScript methods to duplicate jQuery's `.closest()`, `.parent/s()`, and `.find()` APIs.

***Note:*** *Updated on December 16, 2014, to include tag selectors.*

[snippet id="8395"]

## Climbing up the DOM tree

jQuery offers a few methods for climbing up the DOM tree. Let's explore a few of the tasks you might want to achieve.

### Getting the first match up the tree

In jQuery, <code>.closest()</code> climbs up the DOM tree and finds the first element that has the selector you're trying to match against. It starts with the first element, and then climbs. Here's a vanilla JS method that does the same thing:

```javascript
/**
 * Get the closest matching element up the DOM tree.
 * @private
 * @param  {Element} elem     Starting element
 * @param  {String}  selector Selector to match against
 * @return {Boolean|Element}  Returns null if not match found
 */
var getClosest = function ( elem, selector ) {

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

	// Get closest match
	for ( ; elem && elem !== document; elem = elem.parentNode ) {
		if ( elem.matches( selector ) ) return elem;
	}

	return null;

};
```

And to use it:

```javascript
var elem = document.querySelector('#example');
var closestElem = getClosest(elem, '.sample-class');
```

If you wanted to start with the element's parent instead of the element itself (equivalent to the `.parent()` method), you would do this:


```javascript
var elem = document.querySelector('#example');
var closestElem = getClosest(elem.parentNode, '#sample-id');
```

### Getting all matches up the tree

In jQuery, `.parents()` climbs the DOM tree and returns all parent elements. If you include a selector, it will only return those that match. Here's the vanilla JavaScript equivalent:

```javascript
/**
 * Get all of an element's parent elements up the DOM tree
 * @param  {Node}   elem     The element
 * @param  {String} selector Selector to match against [optional]
 * @return {Array}           The parent elements
 */
var getParents = function ( elem, selector ) {

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

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		// Add matching parents to array
		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
		} else {
			parents.push( elem );
		}

	}

	return parents;

};
```

And to use it:

```javascript
var elem = document.querySelector('#some-element');
var parents = getParents(elem, '.some-class');
var allParents = getParents(elem.parentNode);
```

Once again, if you wanted to start with the element's parent instead of the element itself, you would do this:

```javascript
var elem = document.querySelector('#example');
var parents = getClosest(elem.parentNode, '[data-sample]');
```

### Getting all matches up the tree until a matching parent is found

In jQuery, `.parentsUntil()` climbs the DOM tree and returns all parent elements until a matching parent is found. If you include a selector, it will only return those that match. Here's the vanilla JavaScript equivalent:

```javascript
/**
 * Get all of an element's parent elements up the DOM tree until a matching parent is found
 * @param  {Node}   elem     The element
 * @param  {String} parent   The selector for the parent to stop at
 * @param  {String} selector The selector to filter against [optionals]
 * @return {Array}           The parent elements
 */
var getParentsUntil = function ( elem, parent, selector ) {

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

	// Setup parents array
	var parents = [];

	// Get matching parent elements
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		if ( parent ) {
			if ( elem.matches( parent ) ) break;
		}

		if ( selector ) {
			if ( elem.matches( selector ) ) {
				parents.push( elem );
			}
			break;
		}

		parents.push( elem );

	}

	return parents;

};
```

And to use it:

```javascript
var elem = document.querySelector('#some-element');
var parentsUntil = getParentsUntil(elem, '.some-class');
var parentsUntilByFilter = getParentsUntil(elem, '.some-class', '[data-something]');
var allParentsUntil = getParentsUntil(elem);
var allParentsExcludingElem = getParentsUntil(elem.parentNode);
```

## Climbing down the DOM tree

In jQuery, the `.find()` method provides an easy way to match elements down the DOM tree by selector. In vanilla JS, climbing down the DOM tree is actually a lot easier than going up, and can be achieved with the `querySelector` family of web API's.

### Getting the first match down the tree

```javascript
var elem = document.querySelector('#example');
var firstElem = elem.querySelector('.sample-class');
```

### Getting all matches down the tree

```javascript
var elem = document.querySelector('#example');
var allElems = elem.querySelectorAll('[data-sample]');
```

Enjoy!

[snippet id="8397"]