---
title: "Getting all of an elements siblings with vanilla JS"
date: 2020-07-01T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Let's say you have an element, and you want to get all of that element's sibling elements&mdash;all of the elements that have the same parent and are in the same level in the DOM tree.

```html
<ul>
	<li id="item-1">
		Item 1
		<span id="span-1">Has some sub-content</span>
	</li>
	<li id="item-2">Item 2</li>
	<li id="item-3">Item 3</li>
	<li id="item-4">Item 4</li>
	<li id="item-5">Item 5</li>
</ul>
```

In the markup above, `#item-1` is a sibling of `#item-2`, but `#span-1` is not.

So, let's say you have one of the elements already.

```js
var elem = document.querySelector('#item-3');
```

How do you get all of the sibling elements, excluding the item you already have? There are a few ways, but here's how I would approach it:

1. Get the element's parent.
2. Get all of the `.children` of the parent. This property gets elements one level down only, and excludes text nodes.
3. Convert the `.children` into an array (it's an `HTMLCollection`) with `Array.from()`
4. Use the `Array.filter()` method to remove the element you have from the list.

Here's the verbose version:

```js
var elem = document.querySelector('#item-3');

// Step 1
var parent = elem.parentNode;

// Step 2
var parentNodes = parent.children;

// Step 3
var parentNodesArray = Array.from(parent.children);

// Step 4
var siblings = parentNodesArray.filter(function (sibling) {
	return sibling !== elem;
});
```

And here's what it looks like when you put it all together.

```js
var elem = document.querySelector('#item-3');
var siblings = Array.from(elem.parentNode.children).filter(function (sibling) {
	return sibling !== elem;
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOWaxwo)

This works in all modern browsers, but needs [a polyfill for `Array.from()`](https://vanillajstoolkit.com/polyfills/arrayfrom/) for IE support.

You can grab [a helper function for this on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/getsiblings/) that works back to IE9 out-of-the-box.