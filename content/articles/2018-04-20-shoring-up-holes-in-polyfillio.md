---
title: "Shoring up holes in polyfill.io"
date: 2018-04-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
- Web Performance
---

I'm a **huge** fan of [polyfill.io](https://polyfill.io), the automatic polyfilling service.

But, there is one caveat to using it that you should be aware of: not every JavaScript method and browser API is polyfilled.

## What's included?

The most commonly used and easy to polyfill methods and APIs are included by default. Less commonly used ones, and ones that are harder to polyfill, are not.

One of my students recently noticed that `NodeList.forEach()` wasn't working in IE11, despite using polyfill.io on the project.

Turns out, it's not only not included by default. It's actually not available at all. In his case, he can either [add his own polyfill](https://vanillajstoolkit.com/polyfills/nodelistforeach/), or wrap the results of his `querySelectorAll()` method in `Array.from()` (both of which *are* polyfilled).

```js
var someNodes = Array.from(document.querySelectorAll('.some-selector-class'));
```

If you're curious about what's included by default and what's not, [head over to the feature list](https://polyfill.io/v2/docs/features/) and look for items with a star next to them.

If a polyfill is available but not included by default, you can request it be part of your bundle by adding the `features` parameter with a comma-separated list of features to the URL.

```http
https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.prototype.contains
```