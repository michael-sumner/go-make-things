---
title: "How to get all direct descendants that match a test condition with vanilla JS"
date: 2021-04-20T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Let's say you have some HTML like this.

```html
<div id="sandwiches">
	<div id="one" class="tuna">This will match</div>
	<div>
		Hello, world!

		<div id="two" class="tuna">This will not</div>
	</div>
	<div id="three" class="tuna">So will this</div>
</div>
```

You want to get only direct descendants of the `#sandwich` element that have the `.tuna` class: `#one` and `#three`. The `#two` element also has the `.tuna` class but is nested inside another element, so we don't want that one.

You can use the `Element.querySelectorAll()` method to get all elements by a certain selector inside another element, but it will search the entire tree in that element and return `#one`, `#two`, and `#three`.

```js
let sandwiches = document.querySelector('#sandwiches');

// Not what we want
let tuna = sandwiches.querySelectorAll('.tuna');
```

We could also try using the `Node.children` property, but that returns _all_ direct descendants, regardless of class.

```js
// Not what we want, either
let tuna = sandwiches.children;
```

To do this, we need to combine `Node.children` with a few other techniques.

We can use `Array.from()` to turn the NodeList that `Node.children` returns into an array, and then use the `Array.filter()` method to remove an elements that don't match a test we specify.

```js
// This WILL work
let tuna = Array.from(sandwiches.children).filter(function (elem) {
	return elem.matches('.tuna');
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxgyqdE)