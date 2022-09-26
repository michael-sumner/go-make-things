---
title: How to get all sibling elements of a link or button with vanilla JavaScript
date: 2022-09-26T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

A student of mine asked me how I would get a navigation link’s siblings when it’s clicked. Today, we're going to figure that out.

Let's dig in!

## Sample navigation menu

For example, let's imagine that we have a navigation menu that looks like this.

```html
<ul class="nav">
	<li><a href="#1">Link 1</a></li>
	<li><a href="#2">Link 2</a></li>
	<li><a href="#3">Link 3</a></li>
</ul>
```

Whenever someone clicks a link in that menu, you want to get all of the sibling elements and modify them in some way.

## Checking for clicked navigation elements

First, I'd [use event delegation to listen for all clicks on the document](/listening-for-events-on-multiple-elements-using-javascript-event-delegation/), and run a `clickHandler()` callback function in response.

```js
document.addEventListener('click', clickHandler);
```

We only want to run our callback function if a link inside the `.nav` element was clicked.

We could use something like [the `Element.matches()` method](https://vanillajstoolkit.com/reference/selectors/element-matches/) to do that. But if the link has child elements inside it (like SVGs), [our check would fail if the SVG and not the parent link element were clicked](/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/).

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run on .nav a elements
	// This would fail if an SVG inside the link was clicked
	if (!event.target.matches('.nav a')) return;

}
```

Let's instead use [the `Element.closest()` method](/a-native-vanilla-javascript-way-to-get-the-closest-matching-parent-element/) to look for a parent `.nav a` element.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run on .nav a elements
	let link = event.target.closest('.nav a');
	if (!link) return;

}
```

## Getting all sibling elements

There are a handful of ways to do this, including [stepping through each sibling one-by-one](/how-to-get-the-next-and-previous-sibling-elements-with-vanilla-js/).

But I think the easiest approach is to get all `.nav a` elements inside the parent using the `Element.querySelectorAll()`, and then skip the one that was currently clicked.

We'll use the `Element.closest()` method to get the parent `.nav`, and then search for links within it.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run on .nav a elements
	let link = event.target.closest('.nav a');
	if (!link) return;

	// Get all sibling elements
	let siblings = link.closest('.nav').querySelectorAll('a');

}
```

## Toggling the attribute

Now, we can use [a `for...of` loop](/the-for...of-loop-in-vanilla-js/) to loop through each sibling.

```js
/**
 * Handle click events
 * @param  {Event} event The event object
 */
function clickHandler (event) {

	// Only run on .nav a elements
	let link = event.target.closest('.nav a');
	if (!link) return;

	// Get all sibling elements
	let siblings = link.closest('.nav').querySelectorAll('a');

	// Loop through each sibling
	for (let sibling of siblings) {

		// Skip the currently clicked link
		if (sibling === link) continue;

		// Otherwise, do something
		console.log(sibling);

	}

}
```

[Here's a working demo.](https://codepen.io/cferdinandi/pen/eYreovM?editors=1111)