---
title: "Options, settings, and approaches with the vanilla JS Intersection Observer API"
date: 2021-02-05T10:30:00-05:00
draft: false
categories:
- Code
- HTML
- JavaScript
- Web Performance
---

Yesterday, we learned [how to use the Intersection Observer API](/an-introduction-to-the-vanilla-js-intersection-observer-api/). Today, I wanted to take a look at some options and settings you can use when setting up an observer, as well as two different approaches for observing multiple elements.

Let's dig in.

## Options and settings

The Intersection Observer API has a few options and settings you can configure when setting up your observer. You can pass in an array of options (all of them optional) as the second argument on the `new IntersectionObserver()` constructor.

- **`root`** - The parent element to observe target elements within. By default, this is the viewport, but it could also be another scrollable element.
- **`rootMargin`** - The margins to use for the `root` element when detecting intersection. It follows the same conventions as the `margin` property in CSS, and by default has a value of `0px 0px 0px 0px`. Setting this to a positive number will cause the observed elements to have an `isIntersecting` value of `true` before they're visibly in the viewport (or other `root` element).
- **`threshold`** - How much of the element needs to be in the viewport (or other `root` element) to count as visible. A value of `0` means a single pixel counts, a value of `1` means all pixels need to be visible, and a value of `0.25` means 25% of the pixels need to be visible. You can pass in a single number, or an array of numbers. The default value is `0`.

For example, let's imagine that we wanted to lazy load text into our elements when they're 150 pixels away from entering the viewport.

We would do this. For readability, lets also pull the callback function out into its own named function.

```js
// Lazy load text
function loadText (entries, obs) {
	entries.forEach(function (entry) {

		// If the entry is not in the viewport, do nothing
		if (!entry.isIntersecting) return;

		// Stop observing
		obs.unobserve(entry.target);

		// Log the console when it happens
		console.log('Entered the viewport');

		// Add text
		entry.target.textContent += ' In the viewport now';

	});
}

// Setup our observer options
let options = {
	rootMargin: '150px'
};

// Create a new observer
let observer = new IntersectionObserver(loadText, options);

// The element to observe
let app = document.querySelector('#app');

// Attach it to the observer
observer.observe(app);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWbKPEY)

## Observing multiple elements

If you have multiple elements you want to observe, and want to run the same callback function on each of them, you can `observe()` multiple elements with the same Intersection Observer.

```js
// Create a new observer
let observer = new IntersectionObserver(function (entries) {
	console.log(entries);
	entries.forEach(function (entry) {
		console.log(entry.target);
		console.log(entry.isIntersecting);
	});
});

// The elements to observe
let div1 = document.querySelector('#div-1');
let div2 = document.querySelector('#div-2');

// Attach them to the observer
observer.observe(div1);
observer.observe(div2);
```

With multiple elements being observed, the `entries` array may (or may not) contain multiple items.

If `#div-1` and `#div-2` are right next to each other, one may leave the viewport at the same time that the other enters. In that situation, the one leaving would be in the `entries` array with an `isIntersecting` value of `false`, while the one entering would have a value of `true`.

**That said, only elements that have changed show up in the `entries` array.**

If they weren't near each other on the page, or if only one element's intersection with the viewport changed, only that item would be in the `entries` array in the callback function.

[Here's another demo.](https://codepen.io/cferdinandi/pen/QWGyZqR)

## Alternative pattern: one observer per element

Attaching multiple elements to a single observer can create a bit of a clunky developer experience, especially if you're working on a team with multiple developers.

As an alternative, you can use a single observer per element.

With this approach, it's helpful to use a named function for your callback and an external variable for your options. I also like to setup [a helper function](https://vanillajstoolkit.com/helpers/createintersectionobserver/) that will create a `new IntersectionObserver()` constructor, start observing the element, and return the observer.

Using this pattern, the `entries` array will always contain just a single item. For ease, you can use the destructuring pattern to assign the first item to a variable.

```js
/**
 * Create an intersection observer
 * @param  {Node}     elem     The element to observe
 * @param  {Function} callback The callback function to run
 * @param  {Object}   options  The options, if any
 */
function createIntersectionObserver (elem, callback, options) {
	let observer = new IntersectionObserver(callback, options || {});
	observer.observe(elem);
	return observer;
}

/**
 * Log the entry and if it's in the viewport
 * @param  {Array} entries The intersecting elements
 */
function log (entries) {
	let [entry] = entries;
	console.log(entries);
	console.log(entry.target);
	console.log(entry.isIntersecting);
}

// Setup our observer options
let options = {
	rootMargin: '150px'
};

// The elements to observe
let div1 = document.querySelector('#div-1');
let div2 = document.querySelector('#div-2');

// Create an observer for each one
createIntersectionObserver(div1, log, options);

// This uses the same callback, but no options
createIntersectionObserver(div2, log);
```

A few years ago, there was [a discussion about the performance implications of using this approach](https://github.com/w3c/IntersectionObserver/issues/81) on the w3c GitHub repository for this specification.

The general conclusion was that using many observers with one element each and one observer with many elements should be about equally performant, so choose the one that's the best fit for you.

[And here's a demo of that approach.](https://codepen.io/cferdinandi/pen/dyOGgJV)