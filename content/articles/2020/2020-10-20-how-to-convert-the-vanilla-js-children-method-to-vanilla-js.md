---
title: "How to convert the jQuery children() method to vanilla JS"
date: 2020-10-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Over the last few days, I've been converting various jQuery methods and plugins into vanilla JS. Today, we're going to look at the jQuery `children()` method, and how to convert it to vanilla JS.

Let's dig in!

## What the jQuery `children()` method does

The jQuery `children()` method gets the direct child elements of each element in the set.

For example, let's say you have HTML that looks like this.

```html
<ul id="list">
	<li id="one">One</li>
	<li id="two" class="blue">
		Two
		<ul>
			<li id="a">A</li>
			<li id="b" class="blue">B</li>
			<li id="c" class="red">C</li>
			<li id="d">D</li>
		</ul>
	</li>
	<li id="three">Three</li>
	<li  id="four" class="blue">Four</li>
</ul>
```

The `children()` method called on the `#list` element would return `#one`, `#two`, `#three`, and `#four`, but _not_ `#a`, `#b`, `#c`, or `#d`.

```js
// Returns the `#one`, `#two`, `#three`, and `#four` elements
$('#list').children();
```

You can optionally filter by a selector.

Passing in the `.blue` class would return just the `#two` and `#four` elements.

```js
$('#list').children('.blue');
```

Let's look at how to do this with vanilla JS.

## Getting child elements with vanilla JS

You can get the direct child elements of any element in vanilla JS with the `.children` property.

This example would return `#one`, `#two`, `#three`, and `#four`, but _not_ `#a`, `#b`, `#c`, or `#d`.

```js
var list = document.querySelector('#list');

// Returns the `#one`, `#two`, `#three`, and `#four` elements
list.children;
```

_**Note:** The `.children` property only returns elements. To get non-element nodes like text fragments and comments, [use the `.childNodes` property instead](/whats-the-difference-between-the-parentnode.children-and-node.childnodes-properties-in-vanilla-js/)._

### Filtering results

What about filtering? There are a few ways to go about this.

First, we could [convert the returned `HTMLCollection` into an array](/using-array-methods-with-nodelists-in-vanilla-js/) (with `Array.from()` or the `Array.prototype.slice.call()` hack) and use the `Array.filter()` method.

```js
// Returns just the `#two` and `#four` elements
Array.from(list.children).filter(function (child) {
	return child.classList.contains('blue');
});
```

Alternatively, we could use `querySelectorAll()` on the `list` element instead.

Normally, `querySelectorAll()` will find all matching elements inside a parent, _not just_ direct descendants. But, we can use the _descendant selector_ (`>`) with the `:scope` property to look for direct child elements.

```js
// Returns just the `#two` and `#four` elements
list.querySelectorAll(':scope > .blue');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/yLJaVzB)

## Browser compatibility

The `.children` property and `querySelectorAll()` method work back to IE9.

The `Array.from()` method works in all modern browsers, but not IE. [It can be polyfilled](https://vanillajstoolkit.com/polyfills), or you can use the `Array.prototype.slice.call()` hack instead.

The `Array.filter()` method works back to IE9. The `:scope` property works in all modern browsers, but not IE, and it _cannot_ be polyfilled, unfortunately.