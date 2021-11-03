---
title: How to get, set, and remove data attributes with vanilla JavaScript
date: 2021-11-03T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

Today, we're going to look at how to get, set, remove, and check for data attributes on an element. Let's dig in!

## What is a data attribute?

A data attribute is a custom attribute on an element that starts with `data-*`. It can be used to store information (or "state") about the element, or even just [as a selector for JavaScript components](/how-to-approach-javascript-selectors-with-vanilla-js/).

In this example, the `button` has a data attribute named `[data-click]`. It has a value of `count`.

```html
<button data-click="count">Count Up</button>
```

Data attributes don't _have_ to have values, though. In this example, the `button` has a data attibute of `[data-count]`, without a value.

```html
<button data-count>Count Up</button>
```

Now, let's look at how to manipulate them with vanilla JavaScript.

## Manipulating data attributes with JavaScript

The `Element.getAttribute()`, `Element.setAttribute()`, `Element.removeAttribute()`, and `Element.hasAttribute()` methods are used to get, set, remove, and check for the existence of attributes (including data attributes) on an element.

If an attribute does not exist on an element, the `Element.getAttribute()` method returns `null`.

```javascript
let btn = document.querySelector('button');

// Get the value of the [data-click] attribute
// returns "count"
let click = btn.getAttribute('data-click');

// Set a value for the [data-count] attribute
// <button data-count="up">Count Up</button>
btn.setAttribute('data-count', 'up');

// Remove the [data-click] attribute
btn.removeAttribute('data-click');

// Check if an element has the `[data-toggle]` attribute
if (btn.hasAttribute('data-toggle')) {
	console.log('Toggle something, dude!');
}
```

## Data attributes and CSS

Data attributes are also valid CSS selectors. Wrap attribute selectors in square brackets, like this. 

```css
/**
 * Style the [data-count] button
 */
[data-count] {
	background-color: #0088cc;
	border-color: #0088cc;
	color: #ffffff;
}
```

You can also use with JavaScript methods that accept CSS selectors as an argument, like `document.querySelector()`, `document.querySelectorAll()`, `Element.matches()`, and `Element.closet()`.

```js
// Get elements with a data attribute
let count = document.querySelector('[data-count]');
let allCounts = document.querySelectorAll('[data-count]');

// Check if an element has a data attribute
if (count.matches('[data-click]')) {
	console.log('We have a match!');
}
```

There are [some advanced ways to target data attributes](/attribute-selectors-in-css/), too.

## Custom attributes

While data attributes (starting with `data-*`) are a common convention, you can create custom attributes, too. Some libraries do this. 

For example, Vue does this with `v-*` attributes.

```html
<div id="app-3">
	<span v-if="seen">Now you see me</span>
</div>
```

You can use the `Element.*Attribute()` methods to manipulate custom attributes as well.

```js
let span = document.querySelector('[v-if]');

// Update the value of the [v-if] attribute
span.setAttribute('v-if', 'invisible');
```

Tomorrow, we'll look at another way to get and set data attributes: the `Element.dataset` property. And on Friday, we'll explore different strategies for working with data attributes.