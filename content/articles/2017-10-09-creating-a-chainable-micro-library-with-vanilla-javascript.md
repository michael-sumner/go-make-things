---
categories:
- Code
- JavaScript
date: '2017-10-09'
permalink: /creating-a-chainable-micro-library-with-vanilla-javascript/
title: Creating a chainable micro-library with vanilla JavaScript
url: /2017/10/09/creating-a-chainable-micro-library-with-vanilla-javascript
---

Over the weekend, reader Kumar asked me how to create a micro-library (a super tiny, personal jQuery) with chainable functions using vanilla JavaScript (shared with permission).

Today, let's look at how to do that.

## Setting up your micro-library

The first step is to setup your micro-library.

Depending on your user case, there a few different patterns you can use, but to keep things simple, we'll just create a basic function.

To avoid conflicts with other libraries and frameworks that use the `$` shorthand, we'll call ours `m` (for "micro").

```lang-js
var m = function () {
    // Codes will go here...
};
```

## Creating a selector function

In Kumar's case, he wanted to be able to select elements in the DOM and then do things with them, so we'll need to create a selector function to handle that.

We're going to use `querySelectorAll()` to get our elements. We'll set the returned value as the `nodes` property of our selector function. This is going to help power our chaining functionality later.

```lang-js
var m = function (selector) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = document.querySelectorAll(selector);
	};

};
```

You may not always want to search the whole document, though. `querySelectorAll` also let's you search inside a specific element. Let's provide a way to do that by adding an optional `context` argument.

```lang-js
var m = function (selector, context) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

};
```

### Setting up a new function

In order to use this, we need to return our selector engine so it can be accessed with the `m` function.

```lang-js
var m = function (selector, context) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	// Setup our new constructor
	return new Micro();

};
```

This creates a new instance of our selector engine with it's own unique `nodes` property. Now we can use it like this.

```lang-js
var headers = m('h2');
headers.nodes; // returns all h2 elements

var mainHeadings = m('h2', document.querySelector('#main'));
mainHeadings.nodes; // returns all h2 headings inside the `#main` element
```

## Adding functions to the micro-library

To add functions to our library, we're going to extend the `Micro` function's prototype.

Every time we use it with a new selector, instead of creating an entirely new set of properties that eat up a bunch of browser memory, it will reference the prototype functions. This is much better for performance.

For example, if we wanted to add a class to every node we selected, we could do this.

```lang-js
var m = function (selector, context) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	// Add a class to our elements
	Micro.prototype.addClass = function (className) {

		// Loop through each element and use classList to add our class
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].classList.add(className);
		}

	};

	// Setup our new constructor
	return new Micro();

};
```

You'll notice that the function references `this.nodes` in the loop. Because we've attached our nodes to our selector function, any other properties you add to it can easily access them.

Now you can do this.

```lang-js
// Add the `.heading-small` class to all H2 elements
u('h2').addClass('heading-small');
```

### Adding additional functions

We can also add a `removeClass()` function using the same approach.

```lang-js
var m = function (selector, context) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	// Add a class to our elements
	Micro.prototype.addClass = function (className) {

		// Loop through each element and use classList to add our class
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].classList.add(className);
		}

	};

	// Remove a class from our elements
	Micro.prototype.removeClass = function (className) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].classList.remove(className);
		}
	};

	// Setup our new constructor
	return new Micro();

};
```

Then you could do this.

```lang-js
// Remove the `.heading-small` class from all H2 elements
m('h2').removeClass('heading-small');
```

## Chaining Functions

One nice thing about libraries like jQuery is the ability to chain methods. Our micro-libary currently does *not* allow you to do something like this.

```lang-js
m('h2').addClass('heading-small').addClass('text-gray').removeClass('.text-uppercase');
```

We can easily support this, though, by returning our selector function at the end of each function in our library.

```lang-js
// Add a class to our elements
Micro.prototype.addClass = function (className) {

	// Loop through each element and use classList to add our class
	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].classList.add(className);
	}

	// Return our selector engine
	return this;

};

// Remove a class from our elements
Micro.prototype.removeClass = function (className) {
	for (var i = 0; i < this.nodes.length; i++) {
		this.nodes[i].classList.remove(className);
	}
	return this;
};
```

For every property that you add to your library, include `return this` at the end of it to make it chainable.

## Putting it all together

Here's the finished micro-library.

```lang-js
var m = function (selector, context) {

	// Get all elements that match our selector
	var Micro = function () {
		this.nodes = context ? context.querySelectorAll(selector) : document.querySelectorAll(selector);
	};

	// Add a class to our elements
	Micro.prototype.addClass = function (className) {

		// Loop through each element and use classList to add our class
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].classList.add(className);
		}

		// Return our selector engine
		return this;

	};

	// Remove a class from our elements
	Micro.prototype.removeClass = function (className) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].classList.remove(className);
		}
		return this;
	};

	// Setup our new constructor
	return new Micro();

};
```

And now you have a small, chainable library with vanilla JavaScript that you can use on projects. Feel free to tweak it as you see fit.