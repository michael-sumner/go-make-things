---
title: A vanilla JS custom event helper function
date: 2022-08-11T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to create custom events with vanilla JS](/custom-events-with-vanilla-js/). Today, we're going to look at a little helper function for emitting custom events. 

Let's dig in!

(_Today's article is an excerpt from my [ebook and course on Writing Libraries with Vanilla JS](https://vanillajsguides.com/writing-js-libraries/)._)

## A simple `emit()` function

If you're going to emit custom events in multiple places in your library, it might be helpful to create a helper function to do most of the heavy lifting.

Here's an example `emit()` function.

It accepts the custom event `type` and any event `detail` you want to include as options.

```javascript
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {*}      detail Any details to pass along with the event
 */
function emit (type, detail) {

	// Create a new event
	let event = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail
	});

	// Dispatch the event
	return document.dispatchEvent(event);

}
```

You can use it like this.

```javascript
// Emit a custom event
emit('my-custom-event');

// Emit a custom event with details
emit('my-custom-event', {
	name: 'Merlin'
});
```

## Emitting on different elements

If your event might be emitted on different elements, you might add another parameter for the element to attach it to.

Let's add a third parameter, `elem`, with a default value of `document`. Then, we'll run `dispatchEvent()` on that.

```javascript
/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {*}      detail Any details to pass along with the event
 * @param  {Node}   elem   The element to emit the event on
 */
function emit (type, detail, elem = document) {

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

Now, you can run it like this.

```js
let app = document.querySelector('#app');

emit('my-custom-event', {
	name: 'Merlin'
}, app);
```