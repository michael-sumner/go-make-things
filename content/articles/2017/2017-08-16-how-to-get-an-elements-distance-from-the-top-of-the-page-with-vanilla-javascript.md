---
categories:
- Code
- JavaScript
date: '2017-08-16'
url: /how-to-get-an-elements-distance-from-the-top-of-the-page-with-vanilla-javascript/
title: How to get an element&#8217;s distance from the top of the page with vanilla JavaScript
---

Getting an element's distance from the top of the page seems like it should be fairly straightforward.

A quick Google search turns up the `Element.offsetTop` property, which seems like it should do the trick. Unfortunately, `offsetTop` doesn't get the distance to the top of the page, but rather to the top of the closest parent element that has a specified position.

*Sometimes* that's the `body` element, but often times it's another element that you've assigned a position with CSS.

Today, I'm going to show you a simple approach you can use to get the distance to the top of the page with vanilla JS.

## Climbing and adding

The approach is actually pretty simple: climb up the DOM, get the `offsetTop` distance of each element as you go, and add them all together.

We'll start by creating a placeholder variable for our distance to the top.

```javascript
var distance = 0;
```

We're going to use a `do...while` loop to climb the DOM. A `do...while` loop runs our specified code as long as the `while` statement evaluates as `true`. Once it's `false`, our loop ends.

The `Element.offsetParent` property gets us the next parent element up the DOM that has an assigned position.

On each loop, we'll add the `offsetTop` value to our `distance` counter. Then we'll get the element's `offsetParent`, update our element variable, and repeat.

```javascript
// Our element
var elem = document.querySelector('#some-element');

// Set our distance placeholder
var distance = 0;

// Loop up the dom
do {
	// Increase our distance counter
	distance += elem.offsetTop;

	// Set the element to it's parent
	elem = elem.offsetParent;

} while (elem);
```

Because of rounding errors, it's possible for the final `distance` to be less than `0`. We can use a [ternary operator](/ternary-operators/) to use `0` if our `distance` is negative, and the `distance` if it's not.

```javascript
// Our element
var elem = document.querySelector('#some-element');

// Set our distance placeholder
var distance = 0;

// Loop up the DOM
do {
	// Increase our distance counter
	distance += elem.offsetTop;

	// Set the element to it's parent
	elem = elem.offsetParent;

} while (elem);

distance = distance < 0 ? 0 : distance;
```

## A helper method

This sort of thing is perfect for a small helper method.

We'll move our code into a function called `getOffsetTop()`, and pass in our element as an argument.

When our loop is done, we'll return our `distance`.

```javascript
var getOffsetTop = function (elem) {

	// Set our distance placeholder
	var distance = 0;

	// Loop up the DOM
	if (elem.offsetParent) {
		do {
			distance += elem.offsetTop;
			elem = elem.offsetParent;
		} while (elem);
	}

	// Return our distance
	return distance < 0 ? 0 : distance;
};

// Example
var elem = document.querySelector('#some-element');
var offset = getOffsetTop(elem);
```

You can [download this helper method on GitHub](https://github.com/cferdinandi/getOffsetTop).