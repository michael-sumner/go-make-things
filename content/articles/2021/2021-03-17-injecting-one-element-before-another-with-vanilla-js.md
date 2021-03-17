---
title: "Injecting one element before another with vanilla js"
date: 2021-03-17T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to create an element using the `document.createElement()` method](/creating-a-new-element-with-vanilla-js/). Today, we're going to learn how to inject one element before another in the DOM.

This is another short and sweet one.

You can use the `Node.before()` method to insert elements and strings before another element. Call the `Node.before()` method on the node you want to insert before, and pass in one or more new elements or strings as arguments.

```html
<div id="app">Good evening</div>
```

```javascript
// Create a new element
let p = document.createElement('p');
p.textContent = 'Hello!';

// Get the target node
let app = document.querySelector('#app');

// Insert the new node before the target node
// <p>Hello!</p><div id="elem">Good evening</div>
app.before(p);

// You can inject more than one item by passing in multiple arguments
// <p>Hello!</p>What's poppin'<div id="elem">Good evening</div>
app.before(p, `What's poppin?`);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/dyOEzYO)