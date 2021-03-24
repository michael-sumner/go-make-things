---
title: "How to remove an element from the DOM with vanilla JS"
date: 2021-03-25T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

The `Node.remove()` method lets you remove an element from the DOM. Call it on the element you want to remove.

For example, let's say you had a heading and paragraph, like this.

```html
<h1>Hello, world!</h1>
<p>How are you today?</p>
```

To remove the `h1` element, you would do this.

```javascript
let h1 = document.querySelector('h1');
h1.remove();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWJwePa)