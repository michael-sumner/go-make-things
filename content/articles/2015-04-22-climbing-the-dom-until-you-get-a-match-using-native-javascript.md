---
categories:
- Code
- JavaScript
date: '2015-04-22'
permalink: /climbing-the-dom-until-you-get-a-match-using-native-javascript/
title: Climbing the DOM until you get a match using native JavaScript
url: /2015/04/22/climbing-the-dom-until-you-get-a-match-using-native-javascript
---

In jQuery, <code>.parentsUntil()</code> climbs the DOM tree and returns all parent elements until a matching parent is found. If you include a selector, it will only return those that match. Here's the vanilla JavaScript equivalent:

<!--more-->

```lang-javascript
var getParentsUntil = function (elem, parent, selector) {

	var parents = [];
	if ( parent ) {
		var parentType = parent.charAt(0);
	}
	if ( selector ) {
		var selectorType = selector.charAt(0);
	}

	// Get matches
	for ( ; elem && elem !== document; elem = elem.parentNode ) {

		// Check if parent has been reached
		if ( parent ) {

			// If parent is a class
			if ( parentType === '.' ) {
				if ( elem.classList.contains( parent.substr(1) ) ) {
					break;
				}
			}

			// If parent is an ID
			if ( parentType === '#' ) {
				if ( elem.id === parent.substr(1) ) {
					break;
				}
			}

			// If parent is a data attribute
			if ( parentType === '[' ) {
				if ( elem.hasAttribute( parent.substr(1, parent.length - 1) ) ) {
					break;
				}
			}

			// If parent is a tag
			if ( elem.tagName.toLowerCase() === parent ) {
				break;
			}

		}

		if ( selector ) {

			// If selector is a class
			if ( selectorType === '.' ) {
				if ( elem.classList.contains( selector.substr(1) ) ) {
					parents.push( elem );
				}
			}

			// If selector is an ID
			if ( selectorType === '#' ) {
				if ( elem.id === selector.substr(1) ) {
					parents.push( elem );
				}
			}

			// If selector is a data attribute
			if ( selectorType === '[' ) {
				if ( elem.hasAttribute( selector.substr(1, selector.length - 1) ) ) {
					parents.push( elem );
				}
			}

			// If selector is a tag
			if ( elem.tagName.toLowerCase() === selector ) {
				parents.push( elem );
			}

		} else {
			parents.push( elem );
		}

	}

	// Return parents if any exist
	if ( parents.length === 0 ) {
		return null;
	} else {
		return parents;
	}

};
```

And to use it:

```lang-javascript
var elem = document.querySelector('#some-element');
var parentsUntil = getParentsUntil(elem, '.some-class');
var parentsUntilByFilter = getParentsUntil(elem, '.some-class', '[data-something]');
var allParentsUntil = getParentsUntil(elem);
var allParentsExcludingElem = getParentsUntil(elem.parentNode);
```