---
categories:
- Code
- JavaScript
date: '2017-10-25'
title: Detecting clicks inside an element with vanilla JavaScript
---

Yesterday, we learned about the `closest()` method, a super versatile function that [finds the closest matching parent of an element based on a selector](https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/#closest).

It has a ton of uses, and it's particularly useful for detecting whether or not a click event happened inside a particular element.

Imagine you were writing a modal script, and you wanted to close the modal whenever someone clicked or tapped outside of the modal window. How would you do that?

The simplest way is to detect every click that happens on the document, and then check if it's inside the modal window or not.

```js
// Detect all clicks on the document
document.addEventListener('click', function (event) {

	// If the click happened inside the modal, do nothing
	if (event.target.closest('.modal')) return;

	// Otherwise, close any open modal windows
	// You would add the code for that here...

}, false);
```

Browser support for `closest()` is a bit spotty, but a small polyfill adds support back to IE9.

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