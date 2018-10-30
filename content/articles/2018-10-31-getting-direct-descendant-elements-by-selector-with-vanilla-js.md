---
title: "Getting direct descendant elements by selector with vanilla JS"
date: 2018-10-31T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, you're going to learn how to get direct descendant elements, but only the ones that match a selector.

## The challenge

The `querySelector()` and `querySelectorAll()` browser APIs are amazing and super versatile. They even let you search within a specific element instead of the entire document, if you want.

```js
// Get the #sandwich element
var sandwiches = document.querySelector('#sandwiches');

// Get all elements inside #sandwich with the .tuna class
var tuna = sandwiches.querySelectorAll('.tuna');
```

In the example above, `tuna` will return a NodeList of an element inside `#sandwich` with the `.tuna` class, no matter how many levels down in the DOM hierarchy it is.

```html
<div id="sandwiches">
	<div id="one" class="tuna">This will match</div>
	<div>
		Hello, world!

		<div id="two" class="tuna">This will, too!</div>
	</div>
	<div id="three" class="tuna">So will this</div>
</div>
```

What if you only wanted to get items `#one` and `#three`, but not `#two`? The `.children` property provides a list of all direct descendant elements, but you can't restrict it to only certain selectors.

Let's look at simple approach to getting only direct descendants by a selector.

## Combining methods

The trick here is to combine three approaches:

1. Use the `.children` property to get *all* direct descendant elements.
2. Use the `Array.filter()` method to filter out elements that don't match the selector.
3. Use the `Element.matches()` method to check if each element matches a selector.

It would look something like this:

```js
// Get the #sandwich element
var sandwiches = document.querySelector('#sandwiches');

// Get all elements inside #sandwich with the .tuna class
var tuna = sandwiches.children.filter(function (sandwich) {
	return sandwich.matches('.tuna');
});
```

**There's a problem with this code, though.** The `filter()` method only works on arrays, and `.children` returns an HTML collection.

You *could* use `Array.from()` to turn it into an array, but browser support isn't great and it requires a polyfill.

```js
var tuna = Array.from(sandwiches.children).filter(function (sandwich) {
	return sandwich.matches('.tuna');
});
```

Another approach would be to use the `call()` method to apply the `Array.prototype.filter()` method to a non-array, like this.

```js
var tuna = Array.prototype.filter.call(sandwiches.children, function (sandwich) {
	return sandwich.matches('.tuna');
});
```

It does the same thing, but without the need for an `Array.from()` polyfill.

## A helper function

Instead of writing that out every time, let's create a small helper function, `childrenMatches()`.

It will accept the element to get direct descendants for and a selector to match against as arguments.

```js
/*!
 * Get all direct descendant elements that match a selector
 * Dependency: the matches() polyfill: https://vanillajstoolkit.com/polyfills/matches/
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   elem     The element to get direct descendants for
 * @param  {String} selector The selector to match against
 * @return {Array}           The matching direct descendants
 */
var childrenMatches = function (elem, selector) {
	return Array.prototype.filter.call(elem.children, function (child) {
		return child.matches(selector);
	});
};
```

You would use it like this.

```js
var sandwiches = document.querySelector('#sandwiches');
var tuna = childrenMatches(sandwiches, '.tuna');
```

This works in all modern browsers, and IE9 and up. [The `Element.matches()` method does require a tiny polyfill](https://vanillajstoolkit.com/polyfills/matches/) to deal with some vendor-specific prefixing in some browsers, though.

[Here's a demo to play with.](https://codepen.io/cferdinandi/pen/qJGLyy)