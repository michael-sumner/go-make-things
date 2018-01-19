---
categories:
- Code
- JavaScript
date: '2017-04-04'
permalink: /adding-a-new-element-to-the-dom-with-vanilla-js/
title: Adding a new element to the DOM with vanilla JS
url: /2017/04/04/adding-a-new-element-to-the-dom-with-vanilla-js
---

Yesterday, we looked at [how to add markup to an element with vanilla JavaScript](https://gomakethings.com/adding-markup-to-an-element-with-vanilla-js/). As a follow-up, one of the students in my [Vanilla JS Slack channel](https://gomakethings.com/guides/) asked me how to inject a new element into the DOM with JavaScript.

We can do this using the `createElement()` method, which let's us, as the name implies, create a new element. This is a fully manipulatable DOM node, and we can add classes and attributes to it. When we're ready, we'll use `insertBefore()` to inject it into the DOM.

Here's what I mean...

```lang-javascript
// Get the element you want to add your new element before or after
var target = document.querySelector('#some-div');

// Create the new element
// This can be any valid HTML element: p, article, span, etc...
var div = document.createElement('div');

// Add content to the new element
div.innerHTML = 'Your content, markup, etc.';

// You could also add classes, IDs, and so on
// div is a fully manipulatable DOM Node

// Insert the element before our target element
target.parentNode.insertBefore( div, target );

// Insert the element after our target element
target.parentNode.insertBefore( div, target.nextSibling );
```

Even after added to the DOM, you can continue to use the `div` variable to manipulate the element.

Next, learn [how to remove elements from the DOM with vanilla JS](https://gomakethings.com/removing-an-element-from-the-dom-with-vanilla-js/).