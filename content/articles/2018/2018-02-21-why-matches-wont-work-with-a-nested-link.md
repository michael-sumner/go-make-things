---
title: "Why the vanilla JS matches() method won't work with event listeners and nested links"
date: 2018-02-21T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

I often use [event delegation](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/) with click event listeners in my scripts, with the `matches()` method to check which element was clicked.

For example, if I wanted to do something whenever a link with the class `.click-me` was clicked, I'll often do this.

```js
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the class, bail
	if (!event.target.matches('.click-me')) return;

	// Otherwise, do whatever...

}, false);
```

## When this works and when it doesn't

That works great when your links look like this.

```html
<a class="click-me" href="#">Click Me!</a>
```

But what about when your links look like this?

```html
<a class="click-me" href="#">
	<span class="click-me-text">Click Me!</span>
	<span class="click-me-icon">+</span>
</a>
```

With a markup structure like that, `event.target.matches('.click-me')` will fail pretty much every time. [Try it yourself.](https://jsfiddle.net/cferdinandi/xn9d1ry4/)

## Why doesn't that work?

Because the markup structure is nested, the element your clicking is actually either the `.click-me-text` element or the `.click-me-icon` element. The `matches()` method only checks the class of the actual element itself.

Fortunately, there's an easy way to keep the markup structure *and* the same simple event delegation technique: the `closest()` method.

```js
document.addEventListener('click', function (event) {

	// If the clicked element doesn't have the class, bail
	if (!event.target.closest('.click-me')) return;

	// Otherwise, do whatever...

}, false);
```

The `closest()` method checks to see if the element *or* any parent of the element have the selector you're trying to match. This makes it really flexible.

You can use it with a simple markup structure like this.

```html
<a class="click-me" href="#">Click Me!</a>
```

Or something more complex like this.

```html
<a class="click-me" href="#">
	<span class="click-me-text">Click Me!</span>
	<span class="click-me-icon">+</span>
</a>
```

[Here's a working demo.](https://jsfiddle.net/cferdinandi/xn9d1ry4/2/)

## Browser Compatibility

Support for the `closest()` method is a bit spotty. [This polyfill](https://vanillajstoolkit.com/polyfills/closest/) gives you consistent support back to IE9.

```js
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