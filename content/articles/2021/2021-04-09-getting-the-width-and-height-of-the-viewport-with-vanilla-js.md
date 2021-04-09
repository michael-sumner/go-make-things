---
title: "How to get the width and height of the viewport with vanilla JS"
date: 2021-04-09T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [the `Element.getBoundingClientRect()` method](/the-element.getboundingclientrect-method-in-vanilla-js/), and how you can use it to get details about an element's position in the viewport.

Today, let's look at how to get the height and width of the viewport itself. This one is short-and-sweet.

You can use the `window.innerHeight` property to get the viewport height, and the `window.innerWidth` to get its width.

```js
let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWJOMyv)