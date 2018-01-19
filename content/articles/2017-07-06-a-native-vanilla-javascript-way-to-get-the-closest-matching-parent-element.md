---
categories:
- Code
- JavaScript
date: '2017-07-06'
title: A native vanilla JavaScript way to get the closest matching parent element
---

Back in June, I showed you how to create a helper method, `getClosest()`, to [find the closest parent element with a certain selector](https://gomakethings.com/how-to-get-the-closest-parent-element-with-a-matching-selector-using-vanilla-javascript/).

One of my readers told me about `.closest()`, a native element property that does the same thing.

```javascript
var elem = document.querySelector('#some-element');
var closestParent = elem.closest('.pick-me');
```

The catch? [It's poorly supported by browsers.](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Browser_compatibility)

*But...* there's [a polyfill you can use](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill), and it's less code than my helper function.

```javascript
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest =
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}
```

I'll be using this instead of `getClosest()` on all future projects.