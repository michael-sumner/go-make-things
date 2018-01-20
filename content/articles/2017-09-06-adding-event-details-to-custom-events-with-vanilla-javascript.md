---
categories:
- Code
- JavaScript
date: '2017-09-06'
permalink: /adding-event-details-to-custom-events-with-vanilla-javascript/
title: Adding event details to custom events with vanilla JavaScript
url: /2017/09/06/adding-event-details-to-custom-events-with-vanilla-javascript
---

Yesterday, we looked at [how to create custom events with vanilla JavaScript](/custom-events-with-vanilla-javascript/).

Today, let's look at how to add event details that you can access in your event listeners.

## Standard Options

There are two standard options on events that you're likely to change. Both are booleans with a default of `false`.

- If `bubbles` is `true`, an event will "bubble up" or propagate through all of the element's parent elements. [Learn more about event bubbling here.](/attaching-multiple-elements-to-a-single-event-listener-in-vanilla-js/)
- If `cancelable` is `true`, the event can be cancelled via `preventDefault()`.

These options are passed in as an object for the second argument in `new CustomEvent()`.

```js
// Create a new event
var event = new CustomEvent('myCustomEventName', {
	bubbles: true,
	cancelable: true
});

// Dispatch the event
elem.dispatchEvent(event);
```

## Custom Details

There's a good chance you may also want to pass in custom details. For example, in an show/hide script, you might want to pass along which button or link triggered the content to become visible.

To do this, you can add a `detail` key to the options object, which stores all of your custom details. (It *has* to be named `detail`.)

```js
// Create a new event
var event = new CustomEvent('contentShown', {
	bubbles: true,
	cancelable: true,
	detail: {
		toggleId: '#the-toggle'
	}
});

// Dispatch the event
elem.dispatchEvent(event);
```

In your event listener, you can access the information through `event.detail`. You can also access the event that triggered the event (when event bubbling is enabled) using `event.target`.

```js
document.addEventListener('contentShown', function (event) {

	// The element that triggered the event
	var elem = event.target;

	// The toggle ID
	var toggleID = event.detail.toggleId;

}, false);
```