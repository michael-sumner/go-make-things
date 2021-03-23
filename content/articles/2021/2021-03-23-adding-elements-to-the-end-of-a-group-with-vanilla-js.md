---
title: "Adding elements to the end of a group with vanilla JS"
date: 2021-03-23T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Last week, we looked at [how to create an element with vanilla JS](/creating-a-new-element-with-vanilla-js/), and how to add it [before](/injecting-one-element-before-another-with-vanilla-js/) or [after](/injecting-one-element-after-another-with-vanilla-js/) another element.

Today, I wanted to look at how we can add one or more elements to the end of a group of elements inside a parent.

## The `ParentNode.append()` method

The `ParentNode.append()` method lets you insert one or more elements or strings at the end of a set elements inside a shared parent. Call the `ParentNode.append()` method on the target node, and pass in one or more new elements or strings as arguments.

For example, let's say you had a collection of list items, like this.

```html
<ul id="list">
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ul>
```

You want to create a new list item, and add to the end of the list.

Instead of targeting the last list item and using the `Element.after()` method, you can use the `ParentNode.append()` method to add it to the end of the list.

```js
// Create a new element
let li = document.createElement('li');
li.textContent = 'I am new here.';

// Get the parent node
let list = document.querySelector('#list');

// Insert the new node after the last element in the parent node
// ...<li>Item 3</li><li>I am new here.</li>
list.append(li);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/wvgBWPZ)

## Appending multiple elements

The `ParentNode.append()` method can accept multiple elements as arguments.

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
// ...<li>Item 3</li><li>I am new here.</li><li>I'm new, too!</li>
list.append(li, liToo);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/abpzZEW)