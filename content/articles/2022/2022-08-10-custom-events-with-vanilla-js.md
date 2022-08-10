---
title: Custom events with vanilla JS
date: 2022-08-10T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

JavaScript provides developers with a way to emit _custom events_ that developers can listen for with the `Element.addEventListener()` method.

We can use _custom events_ to let developers hook into the code that we write and run more code in response to when things happen. They provide a really flexible way to extend the functionality of a library or code base.

Today, we're going to learn how they work. Let's dig in!

_Today's article is an excerpt from my [ebook and course on Writing Libraries with Vanilla JS](https://vanillajsguides.com/writing-js-libraries/)._

## How to create a custom event

You can create a _custom event_ with the `new CustomEvent()` constructor.

Pass in the name of the event as an argument. You can optionally pass in an object of `options`: whether or not the event `bubbles`, whether or not it's `canceable`, and any `detail` you want shared with the `event` object.

The `options.detail` property can be any type of data, including an array or object.

```javascript
// Create the event
let event = new CustomEvent('my-custom-event', {
	bubbles: true,
	cancelable: true,
	detail: 'This is awesome. I could also be an object or array.'
});
```

## Emitting a custom event on an element

After creating your `event`, you pass it into the `Element.dispatchEvent()` method to emit it.

You can emit your event on any element. For utility libraries, the `document` is a good choice. In a DOM manipulation library (a photo gallery library, for example), you might emit it on a specific element in the UI instead.

```javascript
// Emit the event
document.dispatchEvent(event);
```

## Listening for custom events

You can listen for custom events with the `Element.addEventListener()` method, just like browser-native events.

```javascript
document.addEventListener('my-custom-event', function (event) {
	console.log(event.detail);
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rNdrQwW?editors=1111)