---
title: "How to check if an element contains another one with the vanilla JS Node.contains() method"
date: 2020-09-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to check if an element contains another one.

Let's dig in.

## An example

Let's say you have some markup like this.

```html
<main>

	<h1>Hi, friend</h1>

	<p>How are you today?</p>

	<ul id="list">
		<li>Eat</li>
		<li>Sleep</li>
		<li>Be Merry</li>
	</ul>

</main>

<footer>
	<p id="copyright">Copyright Me.</p>
</footer>
```

And you have a few elements saved to variables, like this.

```js
var main = document.querySelector('main');
var list = document.querySelector('#list');
var copyright = document.querySelector('#copyright');
```

You want to check if `list` and `copyright` are inside the `main` element or not.

## The `Node.contains()` method

The `Node.contains()` method checks if an element is inside another, and returns a boolean: `true` if it is, and `false` if it's not.

Call it on the parent element, and pass the element you want to check for in as an argument.

```js
// returns true
main.contains(list);

// returns false
main.contains(copyright);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rNeYNbm)

## Couldn't you use the `Element.closest()` method for this?

Yes and no.

[The `Element.closest()` method](https://vanillajstoolkit.com/reference/traversal/element-closest/) checks if an element contains a parent with a selector. For the example above, we *could* do something like this.

```js
// returns the main element
list.closest('main');

// returns null
copyright.closest('main');
```

But because it uses a selector instead of a specific element, if there's a different parent element with the same selector, that would get returned instead.

The `Node.contains()` method will give you more predictable results.

## Browser compatibility

The `Node.contains()` method works in all modern browsers, and IE9 and above. It doesn't work with SVG elements in IE9, but does in IE10 and up.