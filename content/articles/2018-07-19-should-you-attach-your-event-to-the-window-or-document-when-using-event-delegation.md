---
title: "Should you attach your event to the window or document when using event delegation?"
date: 2018-07-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Event bubbling is an approach to listening for events that’s better for performance and gives you a bit more flexibility.

Instead of adding event listeners to specific elements, you listen to all events on a parent element (often the `document` or `window`). Events within that element “bubble up,” and you can check to see if the element that triggered the event (the `event.target`) matches the selector you really care about.

```js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {
	var clickedElem = event.target;
	// Check if the event.target matches some selector, and do things...
}, false);
```

You can [learn more about the approach here](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/), but student [Kieran Barker](https://github.com/kieranbarker) asked (shared with permission):

> When listening for an event on multiple elements, is it best to do it on `window` or `document`? The former is higher in the chain than the latter, right? I’ve seen you do both.

I personally choose the option that's closest to the elements I care about and still works.

That's usually the `document`, but certain events, like `scroll` and `resize`, only happen on the `window`, so you have to listen to the `window` instead.