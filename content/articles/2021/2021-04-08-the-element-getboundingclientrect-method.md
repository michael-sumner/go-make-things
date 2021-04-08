---
title: "The Element.getBoundingClientRect() method in vanilla JS"
date: 2021-04-08T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

You can use the `Element.getBoundingClientRect()` to get information about the size of an element and its position relative to the viewport.

For example, let's say you have an element with the `#app` ID somewhere in the DOM.

```html
<div id="app">Looking for me?</div>
```

You can call the `Element.getBoundingClientRect()` method on the element to get details about its position in the viewport.

```js
let app = document.querySelector('#app');
let details = app.getBoundingClientRect();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/GRrOZNP)

**Property details:**

- `y`/`top` - the distance from the top of the element to the top of the viewport.
- `x`/`left` - the distance from the left side of the element to the left side of the viewport.
- `right` - the distance from the right side of the element to the left side of the viewport.
- `bottom` - the distance from the bottom of the element to the top of the viewport.
- `width` - the width of the element, including padding and border
- `height` - the height of the element, including padding and border