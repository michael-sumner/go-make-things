---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-10-24'
permalink: /checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/
title: Checking event target selectors with event bubbling in vanilla JavaScript
url: /2017/10/24/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript
---

Event bubbling is an approach is to listening for events that's better for performance and gives you a bit more flexibility.

Instead of adding event listeners to specific elements, you listen to all events on a parent element (often the `document` or `window`). Events within that element "bubble up," and you can check to see if the element that triggered the event (the `event.target`) matches the selector you really care about.

```lang-js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {
	var clickedElem = event.target;
	// Check if the event.target matches some selector, and do things...
}, false);
```

There are two benefits to this approach:

1. It's better for performance than have a ton of individual event listeners.
2. You can add elements dynamically within the parent container and it still works.

So, how do you check if the `event.target` matches the selector you care about?

## Selector-specific approaches

Depending on the selector, you might be able to use selector-specific methods. For example, if the selector is a class, you might use `classList.contains()`.

```lang-js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {

	// If the event target doesn't match bail
	if (!event.target.classList.contains('my-selector-class')) return;

	// Otherwise, run your code...

}, false);
```

Or if it's a data attribute, you might use `hasAttribute()`.

```lang-js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {

	// If the event target doesn't match bail
	if (!event.target.hasAttribute('data-some-attribute')) return;

	// Otherwise, run your code...

}, false);
```

There is another way, though, that you can use with any selector.

## `matches()`

The `matches()` method checks to see if an element matches any CSS selector pattern you pass in. You can use individual selectors, like in the examples above. For example, here's how you'd check for that `[data-some-attribute]` data attribute.

```lang-js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {

	// If the event target doesn't match bail
	if (!event.target.matches('[data-some-attribute]')) return;

	// Otherwise, run your code...

}, false);
```

But you can also test complex CSS selectors, too.

```lang-js
// Listen to all clicks on the document
document.addEventListener('click', function (event) {

	// If the event target doesn't match bail
	if (!event.target.matches('.click-me[data-sandwhich="chicken salad"]')) return;

	// Otherwise, run your code...

}, false);
```

### Browser compatibility for `matches()`

A few older browsers implemented it with a vendor prefix, so you dropping in this simple polyfill ensures good cross-browser compatibility back to IE9.

```lang-js
/**
 * Element.matches() polyfill (simple version)
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 */
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
```

### One small issue with `matches()`

There is one small hiccup with using `matches()`: the `event.target` may be *inside* the element you care about, and won't match.

Consider a link with the following markup:

```lang-html
<a class="click-me" href="#somewhere">
	<span class="text-large">
		Click me, dude!
	</span>
</a>
```

With that markup, this would fail.

```lang-js
if (!event.target.matches('.click-me')) return;
```

Why? Because the `event.target` will typically be the `span.text-large` element and not the link itself.

## `closest()`

The `closest()` method provides a way around this issue. It looks for the closest matching parent to an element that has a selector that you pass in.

While it's typically used to find parent elements, you can use to check if the clicked element in was the thing you care about or any elements inside it.

```lang-js
if (!event.target.closest('.click-me')) return;
```

It starts by checking the element itself, so if the `event.target` was actually the `a.click-me` link, it will still work.

### Browser compatibility for `closest()`

The `closest()` method is a bit spotty. This polyfill gives you consistent support back to IE9.

```lang-js

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}
	Element.prototype.closest = function (s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
```