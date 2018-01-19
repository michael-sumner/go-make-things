---
categories:
- Code
- JavaScript
date: '2016-01-27'
permalink: /updates-to-smooth-scroll/
title: Updates to Smooth Scroll
url: /2016/01/27/updates-to-smooth-scroll
---

Last week I released [version 10 of Smooth Scroll](https://github.com/cferdinandi/smooth-scroll), easily my most popular open source project.

Version 10 brings with it a few meaningful changes to make it more accessible and resilient:

- Instead of preventing default behaviors on click, it now temporarily removes the id from the target element to prevent scroll jumping, then adds it back after the hashchange. This provides built in browser history and forward/backward button support, instead of having to recreate that stuff with JS.
- This new approach also allows for animated scrolling on page load, out of the box (an often asked for feature).
- `animateScroll()` now supports scrolling to a number, not just an element, for greater developer flexibility.