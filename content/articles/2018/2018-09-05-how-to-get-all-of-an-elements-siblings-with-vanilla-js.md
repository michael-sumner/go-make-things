---
title: "How to get all of an element's siblings with vanilla JS"
date: 2018-09-05T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [how to get an element's next and previous sibling elements](/how-to-get-the-next-and-previous-siblings-of-an-element-with-vanilla-js/).

Today, we'll learn how to get *all* sibling elements with vanilla JS.

## The Setup

Here's a simple example we're going to work with.

```html
<ul>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
	<li>Item 4</li>
	<li id="find-me">Item 5</li>
	<li>Item 6</li>
	<li>Item 7</li>
	<li>Item 8</li>
	<li>Item 9</li>
</ul>
```

We want to get the `#find-me` element, and then locate all of its sibling elements.

## The approach

Here's the approach we'll use to achieve this:

1. Get the parent of the element who's siblings we want to find.
2. Get the first element inside that parent element.
3. Push the first element to an array of siblings.
4. Get the next sibling element of the first element.
5. Repeat steps 3 and 4 until there are no sibling elements left. Skip step 3 if the "sibling" is the original element, though.

Let's create a helper function for this.

## A helper function

We'll create a helper function called `getSiblings()`.

```js
var getSiblings = function (elem) {
	// Do stuff...
};
```

### Create our variables

First, we'll create a `siblings` array to push our sibling elements into.

We'll also get our element's `parentNode`, grab the `firstChild` element in it, and assign that as our first `sibling`.

```js
var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

};
```

### Loop over the siblings

Next, we want to loop through each sibling element, pushing it to our array.

To do this, we'll setup a `while` loop that will run as long as we have a `sibling` element.

```js
var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		// Do stuff...
	}

};
```

Our `sibling` might be a text fragment or whitespace, and we only want elements.

We'll make sure the `sibling` has a `nodeType` of `1`. We'll also check that it's *not* the original element. Then, we'll push it to the `siblings` array.

```js
var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
	}

};
```

Finally, we'll assign the `sibling.nextSibling` to our `sibling` variable.

When our loop runs again, the `sibling` will now be the next sibling of our element, or won't exist and the loop will end. Once the loop is done, we'll return our `siblings` array.

```js
var getSiblings = function (elem) {

	// Setup siblings array and get the first sibling
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;

};
```

## Using it

To use the helper method, you find the element in the DOM, then pass it in to the `getSiblings()` method.

```js
var elem = document.querySelector('#find-me');
var siblings = getSiblings(elem);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/rZzMoX) You can also find this helper method in [the Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/).

## Browser Compatibility

Our helper method works in all modern browsers, and IE9 and up.