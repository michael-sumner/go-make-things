---
title: "Custom events in vanilla JS"
date: 2021-04-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In your JavaScript libraries, components, and snippets, you can emit a custom event that developers can listen for with the `Element.addEventListener()` method.

This provides a way for developers to hook into your code in ways that you didn't expect or plan for.

Let's look at how it works.

## The `CustomEvent` object

The `CustomEvent` object provides a way to create and emit custom events, as well as pass in custom event details.

Create a custom event using the `new CustomEvent()` constructor, and pass in the name of your event as an argument.

As an optional second argument, pass in an object of options, including whether or not the event `bubbles` and is `cancelable`. Both booleans, and both are `false` by default.

```js
// Create a custom event
let event = new CustomEvent('my-custom-event', {
	bubbles: true,
	cancelable: true
});
```

To emit the event, run the `Element.dispatchEvent()` method, and pass in the `event` as an argument.

```js
// Create a custom event
let event = new CustomEvent('my-custom-event', {
	bubbles: true,
	cancelable: true
});

// Emit the event
document.dispatchEvent(event);
```

Then, you can listen for the custom event like you would any other event.

```js
document.addEventListener('my-custom-event', function (event) {
	console.log('The event happened!');
});
```

You emit your custom event on any element, not just the `document` or `window`.

For example, if we were adding custom events to a DOM library, it might make sense to attach an event to the element the library was attached to.

## Including additional information with your event

The `options` object also accepts another property, `detail`, that you can use to include additional information about the event.

```js
let event = new CustomEvent('my-custom-event', {
	bubbles: true,
	cancelable: true,
	detail: 'This is awesome. I could also be an object or array.'
});
```

Inside the event listener, you can access the event details with the `event.detail` property.

```js
document.addEventListener('my-custom-event', function (event) {
	console.log(event.detail);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RwKqXJZ)