---
title: "A custom event helper function"
date: 2021-04-26T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [how to create custom events with vanilla JS](/custom-events-in-vanilla-js/), and [how to cancel custom events with `event.preventDefault()`](/canceling-custom-events-with-vanilla-js/).

Today, I'm going to share a helper function I use to make emitting custom events a little bit easier.

## Creating an `emitEvent()` helper function

To get started, let's create an `emitEvent()` function.

When emitting custom events, there are three things we may need: an event type, any details we may want to attach to the event, and an element to emit the event on.

We'll add parameters for each of those to our function as well.

```js
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Object} detail Any details to pass along with the event
 * @param  {Node}   elem   The element to attach the event to
 */
function emitEvent (type, detail, elem) {
	// code goes here...
}
```

We don't want to _always_ have to pass in a `detail` or `elem` argument.

Sometimes an event will have no `detail`. Often, emitting the event on the `document` instead of a specific element is all we need.

Let's add some [default parameters](/default-parameter-values-in-vanilla-js/) to our function: an empty object for `detail` and the `document` for `elem`.

```js
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Object} detail Any details to pass along with the event
 * @param  {Node}   elem   The element to attach the event to
 */
function emitEvent (type, detail = {}, elem = document) {
	// code goes here...
}
```

The only required parameter is `type`, so let's make sure one is provided and bail if there's not.

```js
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Object} detail Any details to pass along with the event
 * @param  {Node}   elem   The element to attach the event to
 */
function emitEvent (type, detail = {}, elem = document) {

	// Make sure there's an event type
	if (!type) return;

}
```

## Emitting the custom event

Now, we're ready to actually emit a custom event.

We'll [use the `new CustomEvent()` constructor](/custom-events-in-vanilla-js/) to create a new custom event, passing in the `type` and `detail` parameters as arguments.

Then, we'll call the `Element.dispatchEvent()` method on the `elem`, and return the result so that we can [detect if the event was canceled](/canceling-custom-events-with-vanilla-js/).

```js
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {Object} detail Any details to pass along with the event
 * @param  {Node}   elem   The element to attach the event to
 */
function emitEvent (type, detail = {}, elem = document) {

	// Make sure there's an event type
	if (!type) return;

	// Create a new event
	let event = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail
	});

	// Dispatch the event
	return elem.dispatchEvent(event);

}
```

## A demo

[Here's a demo you can play around with.](https://codepen.io/cferdinandi/pen/XWpGpdp) You can also [download the helper function on the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/emitevent/).