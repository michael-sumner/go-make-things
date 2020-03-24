---
title: "How to make an exact copy of an element with vanilla JavaScript"
date: 2020-03-24T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I want to show you how to create a copy of an element with vanilla JavaScript.

Let's get to it!

## The `Node.cloneNode()` method

The `cloneNode()` method creates a copy of an element.

For example, let's say you had a paragraph with an ID and a class on it, like this.

```html
<p id="node1" class="text-blue">Hello, world!</p>
```

First, get the element in the DOM (using `querySelector()` or some other method).

Then, you can call the `cloneNode()` method on it. The `cloneNode()` method accepts an optional boolean argument, `deep`. If true, the child elements (including text nodes) are copied, too.

```js
// The original
var elem = document.querySelector('#node1');

// The copy
var copy = elem.cloneNode(true);
```

Then, you can modify it however you want. In our case, we'll change the ID, then [insert it into the DOM before the original](/how-to-insert-an-element-before-another-one-in-the-dom-with-vanilla-javascript/).

```js
// Modify the ID
copy.id = 'node2';

// Insert into the DOM
elem.parentNode.insertBefore(copy, elem);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ExjdjrV)

## Shallow cloning

If you leave the optional `deep` argument empty (or set it to `false`), no child nodes are copied.

That includes text nodes. Using our example from before, that means that the result would be an empty paragraph, but with all of the IDs, classes, and other attributes still on it.

```js
// Make a shallow copy
var copy = elem.cloneNode();

// Insert into the DOM
elem.parentNode.insertBefore(copy, elem);
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/jOPePRd)

## Browser Compatibility

The `cloneNode()` method works in all modern browsers, and back to at least IE 6.