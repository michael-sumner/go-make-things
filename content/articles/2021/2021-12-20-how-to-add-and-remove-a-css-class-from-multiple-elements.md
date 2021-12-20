---
title: How to add and remove a CSS class from multiple elements with vanilla JavaScript
date: 2021-12-20T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

For the next few weeks, I want to go back-to-basics and look at JavaScript fundamentals. Today, we're going to look at how to add and remove classes from multiple elements.

Let's dig in!

## An example

Let's imagine you have some CSS that affects the color of some text, like this.

```css
.color-blue {
	color: blue;
}

.color-purple {
	color: rebeccapurple;
}
```

And you've got some HTML like this.

```html
<p class="color-purple">Hello</p>
<p>there!</p>
<p class="color-purple">How</p>
<p>are</p>
<p class="color-purple">you?</p>
```

You want to add the `.color-blue` class to each paragraph element (`p`), and remove the `.color-purple` class from an element that has it.

Let's look at a few techniques that we can combine to do just that.

## Getting all of the elements

To get all of the elements we want to modify, we can use the `document.querySelectorAll()` method. You pass in a CSS selector string (any valid CSS selector, including complex ones, will work), and it returns a `NodeList` of matching elements.

```js
// Get all paragraph elements
let p = document.querySelectorAll('p');

// Get all paragraph elements with the .color-purple class
let purple = document.querySelectorAll('p.color-purple');
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/dyVRLxe?editors=1111)

## Adding and removing classes

You can add and remove classes from an element using the `Element.classList` API. 

It provides a handful of methods you can use to add, remove, toggle, and check for classes on an element. We can use the `add()` method to add a class, and the `remove()` method to remove a class. Do _not_ include the leading dot (`.`) when passing in the class name.

This method only works on a single element, _not_ a collection of them.

```js
let elem = document.querySelector('p.color-purple');

// Add the .color-blue class
elem.classList.add('color-blue');

// Remove the color-purple class
elem.classList.remove('color-purple');
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/yLzXWjX?editors=1111)

You can also add or remove multiple classes by passing them in as a comma-separate list.

```js
// Add the .color-blue and .text-large classes
elem.classList.add('color-blue', 'text-large');
```

## Looping through each element

To add and remove classes from multiple elements, we need to loop through each one in the `NodeList` we get back from the `document.querySelectorAll()` method and use the `Element.classList` API with it.

There are many ways to do that, but the two easiest are with the `NodeList.forEach()` method and the `for...of` loop.

Here's a `for...of` loop.

```js
// Add the .color-blue class
for (let elem of p) {
	elem.classList.add('color-blue');
}

// Remove the .color-purple class
for (let elem of purple) {
	elem.classList.remove('color-purple');
}
```

[Here's a demo of the `for...of` loop.](https://codepen.io/cferdinandi/pen/gOGRJBb)

And here's how you'd do it with the `NodeList.forEach()` method.

```js
// Add the .color-blue class
p.forEach(function (elem) {
	elem.classList.add('color-blue');
});

// Remove the .color-purple class
purple.forEach(function (elem) {
	elem.classList.remove('color-purple');
});
```

[And here's a demo of the `NodeList.forEach()` method.](https://codepen.io/cferdinandi/pen/abLwrRj)

I generally prefer the `for...of` loop as I think it's simpler to write.

However, the `NodeList.forEach()` method can also be called directly on the `NodeList` returned from the `document.querySelectorAll()` method, without saving it to a variable. That might be useful on occasion.

```js
// Add the .color-blue class
document.querySelectorAll('p').forEach(function (elem) {
	elem.classList.add('color-blue');
});
```