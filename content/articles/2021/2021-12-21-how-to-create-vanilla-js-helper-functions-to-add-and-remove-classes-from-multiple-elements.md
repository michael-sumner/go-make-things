---
title: How to create vanilla JavaScript helper functions to add and remove classes from multiple elements
date: 2021-12-21T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [to add and remove a CSS class from multiple elements with the classList API](/how-to-add-and-remove-a-css-class-from-multiple-elements-with-vanilla-javascript/). Today, we're going to create some helper functions we can use to work with multiple classes on multiple elements.

Let's dig in.

## Creating a helper function

To get started, let's create `addClass()` and `removeClass()` helper functions.

Each one will accept the elements to add or remove classes from, as well as or more classes to add or remove.

```js
function addClass(elems, classes) {
	// ...
}

function removeClass(elems, classes) {
	// ...
}
```

While we could accept an array for the `classes` parameter, I think it would be more useful to let users pass in multiple classes as a comma-separated list, like this.

```js
let p = document.querySelectorAll('p');
addClass(p, 'color-blue', 'text-large');
```

We can use [rest parameters](/rest-parameters-in-javascript-functions/) to get an array from whatever arguments are passed in beyond a certain point, like this.

```js
function addClass(elems, ...classes) {
	// ...
}

function removeClass(elems, ...classes) {
	// ...
}
```

Now, the `classes` parameter will be an array of whatever classes are passed in.

## Looping through the elements

Next, lets loop through the `elems` NodeList in our `addClass()` and `removeClass()` functions, and add or remove the `classes`, respectively.

We'll use a `for...of` loop to loop through each element.

```js
function addClass(elems, ...classes) {
	// Add the .color-blue class
	for (let elem of elems) {
		elem.classList.add(classes);
	}
}

function removeClass(elems, ...classes) {
	for (let elem of elems) {
		elem.classList.remove(classes);
	}
}
```

Right now, `classes` is an array, but the `classList` API methods accept a comma-separated list of classes. We can use [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/) to convert our array of `classes` into a comma-separated list while passing it in.

```js
function addClass(elems, ...classes) {
	// Add the .color-blue class
	for (let elem of elems) {
		elem.classList.add(...classes);
	}
}

function removeClass(elems, ...classes) {
	for (let elem of elems) {
		elem.classList.remove(...classes);
	}
}
```

And with that, we're done!

[Here's a demo you can play with.](https://codepen.io/cferdinandi/pen/oNGeomj)