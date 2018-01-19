---
categories:
- Code
- JavaScript
date: '2017-10-03'
title: Adding an element to the beginning of a set of elements with vanilla JavaScript
---

Previously, we looked at [how to insert an element before another one with vanilla JavaScript](/how-to-insert-an-element-before-another-one-in-the-dom-with-vanilla-javascript/). Today, we'll learn how to insert an element to the beginning of a set elements inside a shared parent with vanilla JS.

We're going to look at two ways to do this:

1. The traditional way.
2. The ES6 way.

## The traditional way

Traditionally, you would get the first element in your parent node with `firstChild`, and use the `insertBefore()` method to add your new content before it.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the parent node
var parentNode = document.querySelector('#some-element');

// Insert the new node before the reference node
parentNode.insertBefore(newNode, parentNode.firstChild);
```

## The ES6 Way

With ES6, we can now use `prepend()` to do the same thing.

```js
// Create a new element
var newNode = document.createElement('div');

// Get the parent node
var parentNode = document.querySelector('#some-element');

// Insert the new node before the reference node
parentNode.prepend(newNode);
```

### Browser Compatibility

The `prepend()` method works in newer versions of Chrome, Firefox, and Opera, but lacks IE or Edge support.

Fortunately, you can bolt support back to IE7 with this polyfill, taken from the [polyfill.io](http://polyfill.io) service.

```js
var _mutation = (function () {

	function isNode(object) {
		// DOM, Level2
		if (typeof Node === 'function') {
			return object instanceof Node;
		}
		// Older browsers, check if it looks like a Node instance)
		return object &&
			typeof object === "object" &&
			object.nodeName &&
			object.nodeType >= 1 &&
			object.nodeType <= 12;
	}

	// http://dom.spec.whatwg.org/#mutation-method-macro
	return function mutation(nodes) {
		if (nodes.length === 1) {
			return isNode(nodes[0]) ? nodes[0] : document.createTextNode(nodes[0] + '');
		}

		var fragment = document.createDocumentFragment();
		for (var i = 0; i < nodes.length; i++) {
			fragment.appendChild(isNode(nodes[i]) ? nodes[i] : document.createTextNode(nodes[i] + ''));

		}
		return fragment;
	};
}());

Document.prototype.prepend = Element.prototype.prepend = function prepend() {
	this.insertBefore(_mutation(arguments), this.firstChild);
};
```