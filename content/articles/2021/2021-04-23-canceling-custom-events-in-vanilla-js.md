---
title: "Canceling custom events with vanilla JS"
date: 2021-04-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to create custom events for your libraries, components, and scripts](/custom-events-in-vanilla-js/). Today, I wanted to explore how to _cancel_ custom events.

Let's dig in.

## What is canceling an event?

If your custom event has the `cancelable` option set to `true`, you can use the `Event.preventDefault()` method to _cancel_ it.

```js
document.addEventListener('my-custom-event', function (event) {

	// Cancel the event
	event.preventDefault();

});
```

Inside the bit of code that emitted the event, you can then detect if the event was canceled or not, and change the behavior of your code accordingly.

The `Element.dispatchEvent()` method returns `false` if the event was canceled, and true if it was not.

```javascript
let canceled = !document.dispatchEvent(event);
```

Let's look at an example.

## An example

Let's imagine you have a function that emits a custom event, then alerts a message. But, if the custom event is `canceled`, you don't want to run the `alert()` method.

You would check if the event was `canceled`, and if so, end your function.

```javascript
function sayHi () {

	// Create the event
	let event = new CustomEvent('my-custom-event', {
		bubbles: true,
		cancelable: true,
		detail: 'This is awesome. I could also be an object or array.'
	});

	// Emit the event
	let canceled = !document.dispatchEvent(event);

	// If cancelled, end the function
	if (canceled) return;

	// Otherwise, alert a message
	alert('Hi there!');

}

sayHi();
```

Inside an event listener, you could cancel the event like this.

```javascript
document.addEventListener('my-custom-event', function (event) {
	console.log('The event was emitted');
	event.preventDefault();
});
```

This is generally reserved for events that are emitted _before_ any actions take place in your library.

[Here's a demo.](https://codepen.io/cferdinandi/pen/WNRLyMV)