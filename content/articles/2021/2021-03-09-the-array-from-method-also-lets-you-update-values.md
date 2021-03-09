---
title: "The Array.from() method in vanilla JS also lets you update values"
date: 2021-03-09T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, one of my students tipped me off to something that had somehow escaped my notice until now: [the `Array.from()` method ](https://vanillajstoolkit.com/reference/arrays/array-from/) accepts an optional second argument that [runs an `Array.map()`](https://vanillajstoolkit.com/reference/arrays/array-map/) over the thing you're converting into an array.

For example, let's say you were trying to create a table of contents for your site based on the H2 headings on the page.

You could use `document.querySelectorAll()` to get a NodeList of all the H2 headings. And you can [use the `Array.map()` and `Array.join()` methods](/two-different-ways-to-create-html-from-an-array-of-data-with-vanilla-js/#using-array-map-and-array-join) to take each heading, create a new array with HTML strings, and join them together into one string.

But first, you have to convert the NodeList into an array.

```js
let toc = document.querySelector('#table-of-contents');
let headings = document.querySelectorAll('h2');

toc.innerHTML =
	'<ul>' +
		Array.from(headings).map(function (heading) {
			return `<li><a href="#${heading.id}">${heading.textContent}</a></li>`;
		}).join('') +
	'</ul>';
```

But, you can actually skip the separate `Array.map()` method and map the new values _while_ converting the NodeList with `Array.from()`.

```js
toc.innerHTML =
	'<ul>' +
		Array.from(headings, function (heading) {
			return `<li><a href="#${heading.id}">${heading.textContent}</a></li>`;
		}).join('') +
	'</ul>';
```

Neat trick! Situational, but useful.