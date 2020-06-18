---
title: "How to replace an element and its content using vanilla JS"
date: 2020-06-18T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Let's say you have an element, with some content.

```html
<div id="greeting">
	<h1>Hello, world!</h1>
	<p>It's a lovely day in the neighborhood.</p>
</div>
```

And, let's imagine that you want to completely replace the `#greeting` elements and all it's content with this.

```html
<div id="salutations">
	<h1>Hi, universe!</h1>
	<p>The sun is always shining!</p>
</div>
```

How would you do it? Today, we're going to look at three approaches.

## The `Node.replaceChild()` method

The `Node.replaceChild()` method is called on the parent of the element you want to replace.

It accepts two arguments: the new node, and the current one. It replaces the element you pass in as the second argument with the one you pass in as the first.

With this approach, you would create a new element using the `document.createElement()` method. Then, you would add any properties and content to it before using the `Node.replaceChild()` method to inject it into the DOM.

```js
// Get the current element
var currentNode = document.querySelector('#greeting');

// Create a new element
var newNode = document.createElement('div');

// Add ID and content
newNode.id = 'salutations';
newNode.innerHTML =
	'<h1>Hi, universe!</h1>' +
	'<p>The sun is always shining!</p>';

// Replace the current node with the new node
currentNode.parentNode.replaceChild(newNode, currentNode);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/BajpBNP)

*The `Node.replaceChild()` method works in all modern browsers, and back to IE9.*

## The `Node.replaceWith()` method

The `Node.replaceWith()` method is newer, and aims to bring a bit more simplicity to the process.

You call it directly on the element you want to replace, and pass in the element to replace it with as an argument.

With this approach, you would again create a new element using the `document.createElement()` method. Then, you would add any properties and content to it before using the `Node.replaceWith()` method to inject it into the DOM.

```js
// Get the current element
var currentNode = document.querySelector('#greeting');

// Create a new element
var newNode = document.createElement('div');

// Add ID and content
newNode.id = 'salutations';
newNode.innerHTML =
	'<h1>Hi, universe!</h1>' +
	'<p>The sun is always shining!</p>';

// Replace the current node with the new node
currentNode.replaceWith(newNode);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/RwrKbrx)

*The `Node.replaceWith()` method works in all modern browsers, but has no IE support.*

## The `Element.outerHTML` property

The `Element.outerHTML` property has been around for a long time, but I only recently learned about it.

If you're familiar with `Element.innerHTML`, it works the same way, except it includes the element itself. You can use it to both get the HTML of an element, and set it.

With this approach, you get the current element, and use the `outerHTML` property to replace it with the desired HTML string.

```js
// Get the current element
var currentNode = document.querySelector('#greeting');

// Logs the element and it's content into the console
console.log(currentNode.outerHTML);

// Replace the element
currentNode.outerHTML =
	'<div id="salutations">' +
		'<h1>Hi, universe!</h1>' +
		'<p>The sun is always shining!</p>' +
	'</div>';
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/dyGNbpz)

*The `Element.outerHTML` property works in all modern browsers, and back to IE4 (yes, IE4!!!).*

## Which approach should you use?

Personally, I love `Element.outerHTML` for it's simplicity and broad browser support.

There may be situations where the other methods make more sense, but that's the one I'd use 99% of the time.