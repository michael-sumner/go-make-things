---
title: "How to get the next and previous siblings of an element with vanilla JS"
date: 2018-09-04T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

It's "siblings week" here at Go Make Things. This week, I'll be looking at various ways to get and work with sibling elements using vanilla JS.

Today, we're going to start simple and look at how to get the next and previous sibling of an element.

## An example

Let's say you've got a list of items.

```html
<ul>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>
	<li id="find-me">Item 5</li>
	<li>Item 6</li>
	<li>Item 7</li>
	<li>Item 8</li>
	<li>Item 9</li>
</ul>
```

You want to get the list item immediately before and after `#find-me`.

To get the sibling *before* an element, use the `previousElementSibling` property. To get the sibling immediately *after* an element, use the `nextElementSibling` property.

```js
var item = document.querySelector('#find-me');
var prev = item.previousElementSibling;
var next = item.nextElementSibling;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rZwWyM)

## What about `nextSibling` and `previousSibling`?

You may have seen or heard of `nextSibling` and `previousSibling`.

They do more-or-less the same thing, *but* they can return whitespace before and after your element instead of an element. For that reason, I prefer `previousElementSibling` and `nextElementSibling`.

## Browser Compatibility

The `previousElementSibling` and `nextElementSibling` properties work in all modern browsers, and IE9 and up.