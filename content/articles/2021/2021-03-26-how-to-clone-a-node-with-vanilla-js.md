---
title: "How to clone a node or element with vanilla JS"
date: 2021-03-26T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

The `Node.cloneNode()` method creates a copy of a node. You call on the node to clone.

For example, let's say you had an `#app` element with some properties and nested content, like this.

```html
<div id="app" class="background" data-app>
	<h1>Hello, world!</h1>
	<p>How are you today?</p>
	Nice to see you again.
</div>
```

You would get the `#app` element (in this example, using the `document.querySelector()` method), and call the `Node.cloneNode()` method on it.

By default, the `Node.cloneNode()` method creates a shallow copy. That is, it copies the element, but none of it's child nodes.

```js
// returns <div id="app" class="background" data-app>
let app = document.querySelector('#app');

// Create a shallow clone
// returns <div id="app" class="background" data-app></div> as an empty node
let clone = app.cloneNode();
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/GRrJqzY)

If you want all of a node's child nodes to also be copied, pass in `true` as an argument.

```js
// Create a deep clone
// returns <div id="app" class="background" data-app></div> with the h1, p, and text nodes
let deepClone = app.cloneNode(true);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/zYNGBbN)