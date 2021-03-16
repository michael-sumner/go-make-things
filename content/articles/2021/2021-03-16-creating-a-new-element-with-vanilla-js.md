---
title: "Creating a new element with vanilla JS"
date: 2021-03-16T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today's article is a short one.

You can use the `document.createElement()` to create an element. Pass in the element to create, without angled brackets (`<>`), as an argument

```js
let div = document.createElement('div');
let link = document.createElement('a');
let article = document.createElement('article');
```

You can use any valid HTML tag, and even create custom ones, too. For example, these also work.

```js
let chicken = document.createElement('chicken'); // <chicken></chicken>
let placeholder = document.createElement('_'); // <_></_>
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/YzpMLjL)

You can manipulate an element created with `document.createElement()` like you would any other element in the DOM.

Add classes, attributes, styles, and more.

```js
let div = document.createElement('div');
div.textContent = 'Hello, world!';
div.className = 'new-div';
div.id = 'new-div';
div.setAttribute('data-div', 'new');
div.style.color = '#fff';
div.style.backgroundColor = 'rebeccapurple';
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/jOVRxvO)