---
categories:
- Code
- JavaScript
date: '2017-08-08'
title: Targeting focusable links with vanilla JavaScript
---

A few weeks ago I shared a trick for [getting the first and last focusable element in the DOM](https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/).

```javascript
var focusable = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
var firstFocusable = focusable[0];
var lastFocusable = focusable[focusable.length - 1];
```

Reader [Csaba Varszegi](http://littlebigthings.be/) asked (shared with permission):

> A small question: what is the reason that you are using `[href]` instead of `a`? Because if an anchor has no `href`, it is not focusable? Or because you want other elements with an `href` (valid?) to be selected? Or both?

Great question!

Simply put, links are only focusable if they have an `href`. Otherwise, tabbing through the DOM just skips right over them.