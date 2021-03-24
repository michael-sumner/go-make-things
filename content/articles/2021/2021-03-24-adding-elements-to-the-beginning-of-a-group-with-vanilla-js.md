---
title: "Adding elements to the beginning of a group with vanilla JS"
date: 2021-03-24T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Yesterday, we looked at how to add elements to the end of a group with the `ParentNode.append()` method. Today, we're going to learn how to add an element to the beginning of a group instead.

Let's dig in.

## The `ParentNode.prepend()` method

The `ParentNode.prepend()` method lets you insert one or more elements or strings at the beginning of a set elements inside a shared parent. Call the `ParentNode.prepend()` method on the target node, and pass in one or more new elements or strings as arguments.

For example, let’s say you had a collection of list items, like this.

```html
<ul id="list">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>
```

You want to create a new list item, and add to the beginning of the list.

Instead of targeting the first list item and using the `Element.before()` method, you can use the `ParentNode.prepend()` method to add it to the beginning of the list.

```js
// Create a new element
let li = document.createElement('li');
li.textContent = 'I am new here.';

// Get the parent node
let list = document.querySelector('#list');

// Insert the new node before the first element in the parent node
// <li>I am new here.</li><li>Item 1</li>...
list.prepend(li);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWJweGw)

## Prepending multiple items

The `ParentNode.prepend()` method can accept multiple elements as arguments.

If you wanted to add two list items, you could do something like this instead.

```js
// Create a new element
let li = document.createElement('li');
li.textContent = 'I am new here.';

// Create another new element
let liToo = document.createElement('li');
liToo.textContent = `I'm new, too!`;

// Get the parent node
let list = document.querySelector('#list');

// You can inject more than one item by passing in multiple arguments
// <li>I am new here.</li><li>I'm new, too!</li><li>Item 1</li>...
list.prepend(li, liToo);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/abpOZKp)