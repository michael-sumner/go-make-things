---
title: "How to copy or clone an element with vanilla JS"
date: 2019-10-25T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I'm going to show you how to grab an existing element in the DOM and make an exact copy of it that you can manipulate however you want.

## An example

To make this tangible, let's imagine you have an element with an ID of `#elem1` and a class of `.bg-blue`.

```html
<div class="bg-blue" id="elem1">
	This node has some content.
</div>
```

We want to make a copy of it, update the ID, add a `.text-large` class, and then inject it back into the DOM.

In the end, we want our HTML to look like this.

```html
<div class="bg-blue" id="elem1">
	This node has some content.
</div>

<div class="bg-blue text-large" id="elem2">
	This node has some content.
</div>
```

Let's dig in.

## Copying an element

First, let's use the `querySelector()` method to get our `#elem1` element.

```js
// Get the element
var elem = document.querySelector('#elem1');
```

Now, we can use the `Element.cloneNode()` method to create a copy.

You call the `cloneNode()` method on the element you want to copy. If you want to also copy elements nested inside it, pass in `true` as an argument.

```js
// Get the element
var elem = document.querySelector('#elem1');

// Create a copy of it
var clone = elem.cloneNode(true);
```

Now, `clone` is an identical copy of our `elem` element.

We can modify the ID, and [use `classList` to update the class](https://vanillajstoolkit.com/reference/classes/classlist/). Then, we can use [the `Element.after()` method](https://vanillajstoolkit.com/reference/dom-injection/element-after/) to inject it into the DOM after our `elem`.

```js
// Get the element
var elem = document.querySelector('#elem1');

// Create a copy of it
var clone = elem.cloneNode(true);

// Update the ID and add a class
clone.id = 'elem2';
clone.classList.add('text-large');

// Inject it into the DOM
elem.after(clone);
```

[Here's a demo on CodePen.](https://codepen.io/cferdinandi/pen/RwwVmyO)