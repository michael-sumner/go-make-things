---
title: "Finding the next and previous sibling elements that match a selector with vanilla JS"
date: 2018-09-06T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Earlier this week, we looked at [how to get the next and previous sibling of an element with vanill JS](/how-to-get-the-next-and-previous-siblings-of-an-element-with-vanilla-js/).

But what if you want to get the next or previous sibling that matches a specific selector?

## An example

Let's say you have a list of items, like this.

```html
<ul>
	<li>Item 1</li>
	<li class="stop-here">Item 2</li>
	<li>Item 3</li>
	<li class="skip-me">Item 4</li>
	<li id="find-me">Item 5</li>
	<li class="skip-me">Item 6</li>
	<li>Item 7</li>
	<li class="stop-here">Item 8</li>
	<li>Item 9</li>
</ul>
```

You have the `#find-me` item.

You can use the `previousElementSibling` and `nextElementSibling` properties to get the elements immediately before and after it. But what if you wanted to find the next element with a `.stop-here` class? Or the first previous element *without* a `.skip-me` class?

Let's dig in!

## Getting the next element that matches a selector

To make this work, we're going to...

1. Get the `nextElementSibling` of our element.
2. If it matches our selector, use it. If not, skip the next sibling and try again.

```js
var getNextSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.nextElementSibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}

};
```

One other thing we can do to make this more usable: if a `selector` isn't provided, return the first `nextElementSibling`.

```js
var getNextSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.nextElementSibling;

	// If there's no selector, return the first sibling
	if (!selector) return sibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.nextElementSibling
	}

};
```

You can use it like this.

```js
var findMe = document.querySelector('#find-me');

// Returns '<li class="skip-me">Item 6</li>'
var next = getNextSibling(findMe);

// Returns '<li class="stop-here">Item 8</li>'
var nextStop = getNextSibling(findMe, '.stop-here');

// Returns '<li data-filter>Item 7</li>'
var nextSkip = getNextSibling(findMe, ':not(.skip-me)');
```

The helper function uses `matches()` to see if the element matches your selector, and you can use any valid CSS selector with it.

That means you can use `:not()` to skip certain selectors.

[Here's a demo.](https://codepen.io/cferdinandi/pen/mGBOpX)

## Getting the first previous element that matches a selector

To work in the other direction, we'll do the same thing, but use `previousElementSibling` instead of `nextElementSibling`.

```js
var getPreviousSibling = function (elem, selector) {

	// Get the next sibling element
	var sibling = elem.previousElementSibling;

	// If there's no selector, return the first sibling
	if (!selector) return sibling;

	// If the sibling matches our selector, use it
	// If not, jump to the next sibling and continue the loop
	while (sibling) {
		if (sibling.matches(selector)) return sibling;
		sibling = sibling.previousElementSibling;
	}

};
```

And you would use it the same way.

```js
var findMe = document.querySelector('#find-me');

// Returns '<li class="skip-me">Item 4</li>'
var prev = getPreviousSibling(findMe);

// Returns '<li class="stop-here">Item 2</li>'
var prevStop = getPreviousSibling(findMe, '.stop-here');

// Returns '<li>Item 3</li>'
var prevSkip = getPreviousSibling(findMe, ':not(.skip-me)');
```

[And here's another demo for you.](https://codepen.io/cferdinandi/pen/dqVOKz)

## Browser Compatibility

These helper methods work in all modern browsers, and back to IE9.

*But...* the `matches()` method was implemented inconsistently with vendor prefixes across many browsers for a while. You should [include a polyfill for it](https://vanillajstoolkit.com/polyfills/matches/) to make sure these work properly.

You can download both helper methods at the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers), too.