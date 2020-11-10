---
title: "How to get a parent element with vanilla JS"
date: 2020-11-10T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at two ways to get a parent element with vanilla JS.

Let's dig in.

## The `parentNode` property

Every element in the DOM has a `parentNode` property on it. This returns the parent of the element.

Let's look at a list of items.

```html
<ul id="list">
	<li id="a">A</li>
	<li id="b">B</li>
	<li id="c">C</li>
	<li id="d">D</li>
</ul>
```

Using the `parentNode` property, we can get the parent element (`#list`) of our `#c` list items.

```js
var c = document.querySelector('#c');

// Returns the #list element
c.parentNode;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RwRqGmj)

## Finding the first parent that matches a selector with the `closest()` method

Let's say you had a nested list, and you wanted to find the first parent element with a class of `.top`.

```html
<ul class="top" id="list">
	<li class="a">A</li>
	<li class="b">
		B
		<ul class="nested" id="sublist">
			<li class="a">A2</li>
			<li class="b">B2</li>
			<li class="c" id="c2">C2</li>
			<li class="d">D2</li>
		</ul>
	</li>
	<li class="c">C</li>
	<li class="d">D</li>
</ul>
```

You can call the `closest()` method on the element you want to find the matching parent for, and pass in the selector as an argument.

```js
var c2 = document.querySelector('#c2');

// Returns the `#list` element
c2.closest('.top');
```

The `closest()` method will _also_ check the element it's called on, so if the `#c2` element had the `.top` class on it, that would be the matching result.

You can start with the first parent element by combining the `parentNode` property and `closest()` method together.

```js
// Will start by checking the parent element of #c2 instead of #c2 itself
c2.parentNod.closest('.top');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/rNLQWNO)

## Browser compatibility

The `parentNode` property works in all modern browsers, and back to at least IE6.

The `closest()` method works in all modern browsers, but has no IE support. [You can push support back to IE9 with a polyfill.](https://codepen.io/cferdinandi/pen/rNLQWNO)