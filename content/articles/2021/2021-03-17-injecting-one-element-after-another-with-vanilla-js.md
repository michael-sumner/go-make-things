---
title: "Injecting one element after another with vanilla JS"
date: 2021-03-17T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we learned [how to inject one element before another with the `Node.before()` method](/injecting-one-element-before-another-with-vanilla-js/). Today, we're going to look at how to inject an element _after_ another instead.

The `Node.after()` method works just like the `Node.before()` method, but injects your elements _after_ the target element instead of before it.

Call the `Node.after()` method on the node you want to insert after, and pass in one or more new elements or strings as arguments.

```html
<div id="app">Good morning</div>
```

```js
// Create a new element
let p = document.createElement('p');
p.textContent = 'Hello!';

// Get the target node
let app = document.querySelector('#app');

// Insert the new node after the target node
// <div id="app">Good morning</div><p>Hello!</p>
app.after(p);

// You can inject more than one item by passing in multiple arguments
// <div id="app">Good morning</div><p>Hello!</p>What's poppin'
app.after(p, `What's poppin?`);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/WNoBLaW)