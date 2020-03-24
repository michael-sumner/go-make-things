---
title: "How to replace one element with another with vanilla JavaScript"
date: 2020-03-25T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to make a copy of an element with vanilla JS](/how-to-make-an-exact-copy-of-an-element-with-vanilla-javascript/). Today, we're going to learn how to replace one element with another.

Let's dig in.

## An example

Let's build on [yesterday's article](/how-to-make-an-exact-copy-of-an-element-with-vanilla-javascript/) a bit. We have a paragraph element with a greeting.

```html
<p id="node1" class="text-blue">Hello, world!</p>
```

Now let's say we want to make a copy of it, change the ID, change the class, and change the text.

```js
// Get the original
var elem = document.querySelector('#node1');

// Make a copy
var copy = elem.cloneNode(true);

// Change all the things
copy.id = 'node2';
copy.className = 'text-purple';
copy.textContent = 'Hi, universe!';
```

Now let's imagine that we want to replace the original `elem` with the new `copy`.

## The `replaceChild()` method

You call the `replaceChild()` method on the target element's `parentNode`. Then, pass in the new element and the one to replace as arguments.

```js
// Replace the original with the copy
elem.parentNode.replaceChild(copy, elem);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/XWbxbLb)

*The `replaceChild()` method works in all modern browsers, and back to IE9.*

## The `replaceWith()` method

The `replaceWith()` method uses a simpler syntax.

Call it on the original element, and pass in the copy as an argument. And that's it.

```js
// Replace the original with the copy
elem.replaceWith(copy);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/rNVqOBV)

*The `replaceWith()` method works in all modern browsers, but has no IE support.*

## Which one should you use?

If you're using [polyfill.io](https://polyfill.io) on your site, I would use `replaceWith()`. It has a nicer syntax.

Otherwise, I would use `replaceChild()`. The browser support on `replaceWith()` just isn't good enough yet without a polyfill.