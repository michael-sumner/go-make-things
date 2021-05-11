---
title: "How to get the first and last elements inside a parent with vanilla JS"
date: 2021-05-11T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, we're going to look at a few different ways that you can get the first and last elements inside a parent.

We'll be using the following markup for our examples.

```html
<ul>
	<!-- The gray wizard -->
	<li>Gandalf</li>
	<li>Radagast</li>
	<li>Hermione</li>
	<!-- The surprise hero -->
	<li>Neville</li>
</ul>
```

Let's dig in.

## The `Node.firstChild` and `Node.lastChild` properties

You can use the `Node.firstChild` and `Node.lastChild` properties to get the first and last child nodes of a parent element, respectively. This includes nodes that aren't elements (such as comments and text fragments).

For example, looking at our example HTML above, the `firstChild` property called on the parent unordered list (`ul`) would return the comment node inside the list, _not_ the list item.

```javascript
let wizards = document.querySelector('ul');

// returns the comment node <!-- The gray wizard -->
let firstDescendant = wizards.firstChild;

// returns <li>Neville</li>
let lastDescendant = wizards.lastChild;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/xxqwzBR)

## The `Node.firstElementChild` and `Node.lastElementChild` properties

The `Node.firstElementChild` and `Node.lastElementChild` properties work a lot like `Node.firstChild` and `Node.lastChild`, but they get the first and last child that's _an element_ inside a parent element.

Looking at our example markup again, the `firstElementChild` property would get the list item (`li`) instead of the comment node.

```javascript
let wizards = document.querySelector('ul');

// returns <li>Gandalf</li>
let firstDescendant = wizards.firstElementChild;

// returns <li>Neville</li>
let lastDescendant = wizards.lastElementChild;
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/BaWoVbq)

## The `Element.querySelector()` and `Element.querySelectorAll()` methods

The `document.querySelector()` and `document.querySelectorAll()` methods aren't limited to just running on the `document`. They can be run on any element to search for elements inside of it.

If you want the first child element _that matches a specific selector_, the `Element.querySelector()` method is an excellent choice. Similarly, to get the last child element that matches a selector, you can use the `Element.querySelectorAll()` method and then get the last item in the list.

```javascript
let wizards = document.querySelector('.wizards');

// Find the first li element inside `.wizards`
// returns <li>Gandalf</li>
let firstListItem = wizards.querySelector('li');

// Get the last li element inside `.wizards`
// returns <li>Neville</li>
let allWizards = wizards.querySelectorAll('li');
let lastListItem = allWizards[allWizards.length - 1];
```

One caveat with this approach: it will return all matching elements inside the parent, no matter how deeply they're nested. You can work around that by using the `:scope` selector with your real selector, like this.

```javascript
let wizards = document.querySelector('.wizards');

// Find the first li element inside `.wizards`
// returns <li>Gandalf</li>
let firstListItem = wizards.querySelector(':scope > li');

// Get the last li element inside `.wizards`
// returns <li>Neville</li>
let allWizards = wizards.querySelectorAll(':scope > li');
let lastListItem = allWizards[allWizards.length - 1];
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/LYWprvL)