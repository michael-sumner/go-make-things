---
title: "How to get the next and previous sibling elements with vanilla JS"
date: 2021-05-12T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at [how to get the first and last elements inside a parent](/how-to-get-the-first-and-last-elements-inside-a-parent-with-vanilla-js/). Today, we're going to look at how to get the next and previous sibling elements.

Once again, we're going to use some sample markup for today's article.

```html
<ul>
	<!-- The gray wizard -->
	<li>Gandalf</li>
	<li>Radagast</li>
	<li id="hermione">Hermione</li>
	<!-- The surprise hero -->
	<li>Neville</li>
</ul>
```

Let's dig in!

## The `Node.nextSibling` and `Node.previousSibling` properties

The `Node.nextSibling` and `Node.previousSibling` properties get the next and previous sibling node of an element, including nodes that aren't elements (such as comments and text fragments).

```javascript
let hermione = document.querySelector('#hermione');

// returns <!-- The surprise hero -->
let next = hermione.nextSibling;

// returns <li>Radagast</li>
let previous = hermione.previousSibling;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/PopZprW)

## The `Node.nextElementSibling` and `Node.previousElementSibling` properties

The `Node.nextElementSibling` and `Node.previousElementSibling` properties work a lot like `Node.nextSibling` and `Node.previousSibling`, but they get the next and previous sibling that's _an element_ of the target element.

Looking at our example markup again, the `nextElementSibling` property would get the list item (`li`) with `Neville` instead of the comment node.

```javascript
let hermione = document.querySelector('#hermione');

// returns <li>Neville</li>
let next = hermione.nextElementSibling;

// returns <li>Radagast</li>
let previous = hermione.previousElementSibling;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/dyvGvxP)