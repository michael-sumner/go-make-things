---
title: "An introduction to the vanilla JS Intersection Observer API"
date: 2021-02-04T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

The Intersection Observer API can be used to observe and element and run a callback function when it enters or leaves the viewport (or another element).

It's far more performant than using a `scroll` event listener with [the `Element.getBoundingClientRect()` method](/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/).

Today and tomorrow, we're going to look at how the API works. Today, we'll tackle the basics. Tomorrow, we'll get into some of the nitty gritty details.

Let's dig in.

## Creating an Intersection Observer

To setup an Intersection Observer, use the `new IntersectionObserver()` constructor, and pass in a callback function. The callback accepts two arguments: `entries`, an array of the attached items that triggered the callback, and the `observer` itself.

After creating an observer, use the `IntersectionObserver.observe()` method to attach a specific element to the observer.

```javascript
// Create a new observer
let observer = new IntersectionObserver(function (entries) {
	entries.forEach(function (entry) {
		// Log if the element and if it's in the viewport
		console.log(entry.target);
		console.log(entry.isIntersecting);
	});
});

// The element to observe
let app = document.querySelector('#app');

// Attach it to the observer
observer.observe(app);
```

In this example, whenever the `#app` element enters or leaves the viewport, the callback function will run. With only one element being observed, the `entries` array will always contain just one item: the `#app` element.

Each `entry` includes a handful of properties. The `isIntersecting` property has a value of `true` if the element is in the viewport, and `false` when it's not. The `target` property is the element itself.

[Here's a demo for you to play with.](https://codepen.io/cferdinandi/pen/ZEBQEor)

## Unobserving an element

You can use the `IntersectionObserver.unobserve()` to stop observing an attached element on an Intersection Observer.

For example, let's imagine that you want to lazy load some text into an element after it enters the viewport. Once that happens, you never need to do it again.

Inside the callback function, we can pass in the observer itself as a second argument, `obs`. If the `entry.isIntersecting` is `true`, we'll add our text, then use the `obs.unobserve()` method on the `entry.target` to stop observing it.

```javascript
// Create a new observer
let observer = new IntersectionObserver(function (entries, obs) {
	entries.forEach(function (entry) {

		// If the entry is not in the viewport, do nothing
		if (!entry.isIntersecting) return;

		// Stop observing
		obs.unobserve(entry.target);

		// Add text
		entry.target.textContent += ` I'm in the viewport now.`;

	});
});

// The element to observe
let app = document.querySelector('#app');

// Attach it to the observer
observer.observe(app);
```

Alternatively, you can stop observing _all_ elements for an observer with the `IntersectionObserver.disconnect()` method.

```javascript
observer.disconnect();
```

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/RworwJw)

That's it for today. Tomorrow, we'll take a look at some options and settings you can use to configure your observer, as well as two different patterns for observing multiple elements.