---
title: "How to simulate mouse and keyboard events with vanilla JS"
date: 2020-08-24T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

In the past, I've written about [how to create custom events with vanilla JS](/custom-events-with-vanilla-javascript/).

Today, we're going to look at how to simulate [native browser events](https://developer.mozilla.org/en-US/docs/Web/Events), things like `click` and `keydown`, instead.

Let's dig in.

## The `new Event()` constructor

You can create a new event using the `new Event()` constructor.

Pass in the `type` of event to create, and an object of options, such as whether or not it `bubbles` or is `cancelable`. Then, call the `dispatchEvent()` method on the element you want to dispatch the event on, and pass the event in as an argument.

```js
// Create a new event
var event = new Event('click', {
	bubbles: true,
	cancelable: true
});

// Dispatch the event
document.body.dispatchEvent(event);
```

## A helper function

If you need to do this a lot with different types of events, you can create a simple helper function.

In the `simulateEvent()` function, we'll accept the `elem` to simulate the event on, and the `type` of event to dispatch, as arguments.

```js
var simulateEvent = function (elem, type) {

	// Create a new event
	var event = new Event(type, {
		bubbles: true,
		cancellable: true
	});

	// Dispatch the event
	elem.dispatchEvent(event);

};
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/GRZryRy)

## Browser compatibility

The `new Event()` constructor works in all modern browsers, but not IE.