---
categories:
- Code
- JavaScript
date: '2017-05-17'
url: /how-to-simulate-a-click-event-with-javascript/
title: How to simulate a click event with vanilla JavaScript
---

The other day on Twitter, [Oliver Williams](https://twitter.com/css_grid) asked me:

> How would I write a vanilla equivalent of jQuery `.click()` (with no arguments) to trigger a click event even when a real click hasn't occurred?

If you Google this, you might get excited to discover that [vanilla JavaScript has a `click()` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

> The `HTMLElement.click()` method simulates a mouse click on an element.

However, that excitement will quickly fade when you discover that it doesn't work on the thing you'd probably most frequently use it for, links.

> However, the `click()` method will not initiate navigation on an `<a>` element.

WTF??

Fortunately, there's a way to get this behavior using the `MouseEvent` API. Here's a small little helper method you can use.

```javascript
/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};
```

To use it, call the function, passing in the element you want to simulate the click on.

```javascript
var someLink = document.querySelector('a');
simulateClick(someLink);
```

This works in IE9 and above.