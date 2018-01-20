---
categories:
- Code
- JavaScript
date: '2017-10-26'
url: /detecting-clicks-outside-of-an-element-with-vanilla-javascript/
title: Detecting clicks outside of an element with vanilla JavaScript
---

Yesterday, we looked at [how to detect clicks inside of an element](/detecting-clicks-inside-an-element-with-vanilla-javascript/) with vanilla JavaScript.

Today, I'm going to show you how to check if a click was *outside* of an element. It uses more or less the same technique.

Once again, we'll listen for all clicks on the `document` and use the `closer()` method to see if the click happened inside the element we're interested in. We'll use a bang (`!`) to make our `if` statement a negative check. If there's no parent with the matching selector, the click was outside of our element.

```html
<div class="dont-click-me">
    We want to listen for clicks that are outside of this container.
</div>
```

```js
// Listen for all clicks on the document
document.addEventListener('click', function (event) {

    // If the click happened inside the the container, bail
    if (!event.target.closest('.dont-click-me')) return;

    // Otherwise, run our code...

}, false);
```

As a reminder, browser support for `closest()` is a bit spotty, but a small polyfill adds support back to IE9.

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