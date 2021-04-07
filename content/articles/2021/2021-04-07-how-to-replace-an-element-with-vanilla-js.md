---
title: "How to replace an element with vanilla js"
date: 2021-04-07T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Let's say you have a `h1` element with a greeting, like this.

```html
<h1>Good evening</h1>
```

You want to replace it with a paragraph that says, "Good morning."

You can use the `Node.replaceWith()` method to replace an element (and all of its HTML elements and content) with another. Call the `Node.replaceWith()` method on the target node, and pass in one or more elements or strings as arguments.

```js
// Get the target element
let h1 = document.querySelector('h1');

// Create a new element
let p = document.createElement('p');
p.textContent = 'Good morning';

// Replace the target with the new element
// <p>Good morning</p>
h1.replaceWith(p);
```

The `Node.replaceWith()` method can accept more than one element as well as string content as arguments. You could also do something like this.

```js
// You can replace it with more than one item by passing in multiple arguments
// <p>Good morning</p>How are you today?
h1.replaceWith(p, 'How are you today?');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/QWdqpmR)