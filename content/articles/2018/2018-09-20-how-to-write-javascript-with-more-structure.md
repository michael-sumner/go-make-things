---
title: "How to write JavaScript with more structure"
date: 2018-09-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

When most people learn JavaScript, their initial code is very *procedural*.

This is where your script literally just works its way through what you're trying to do, in order, in one big block of code.

Today, we're going to look at how to start writing code that's more structured and *functional* in nature.

## A starting point

Imagine you're trying to build an accordion plugin. You have markup like this.

```html
<p><a class="accordion-toggle" href="#content-1">Show More 1</a></p>
<div class="accordion-content" id="content-1">
	Content 1
</div>

<p><a class="accordion-toggle" href="#content-2">Show More 2</a></p>
<div class="accordion-content" id="content-2">
	Content 2
</div>

<p><a class="accordion-toggle" href="#content-3">Show More 3</a></p>
<div class="accordion-content" id="content-3">
	Content 3
</div>
```

Here's the working *procedural* JavaScript that toggles your accordion open and closed.

```js
// Listen for clicks on the document
document.addEventListener('click', function (event) {

	// Bail if our clicked element doesn't have the .accordion-toggle class
	if (!event.target.classList.contains('accordion-toggle')) return;

	// Get the target content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Prevent default link behavior
	event.preventDefault();

	// If the content is already expanded, collapse it and quit
	if (content.classList.contains('active')) {
		content.classList.remove('active');
		return;
	}

	// Get all accordion content, loop through it, and close it
	var accordions = document.querySelectorAll('.accordion-content.active');
	accordions.forEach(function (accordion) {
		accordion.classList.remove('active');
	});

	// Open our target content area
	content.classList.add('active');

}, false);
```

Here's the supporting CSS that enables this.

```css
.accordion-content {
	display: none;
}

.accordion-content.active {
	display: block;
}
```

[And here's a working demo.](https://codepen.io/cferdinandi/pen/WgYyaa)

<p data-height="265" data-theme-id="light" data-slug-hash="WgYyaa" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="WgYyaa" class="codepen"></p>

## Working in phases

Let's look at how we can progressively add more structure to what is currently procedural code to something with more *functional* structure.

We'll pass over the code multiple times, cleaning it up and adding more structure with each pass.

The truth is, even for me today, my code doesn't just come out perfectly structured. I get something working and messy down first, and then refine it after.

Let's dig in.

### First Pass

First, we'll pull the click handler out into its own named function.

```js
var clickHandler = function (event) {

	// Bail if our clicked element doesn't have the .accordion-toggle class
	if (!event.target.classList.contains('accordion-toggle')) return;

	// Get the target content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Prevent default link behavior
	event.preventDefault();

	// If the content is already expanded, collapse it and quit
	if (content.classList.contains('active')) {
		content.classList.remove('active');
		return;
	}

	// Get all accordion content, loop through it, and close it
	var accordions = document.querySelectorAll('.accordion-content.active');
	accordions.forEach(function (accordion) {
		accordion.classList.remove('active');
	});

	// Open our target content area
	content.classList.add('active');

};

// Listen for clicks on the document
document.addEventListener('click', clickHandler, false);
```

### Second Pass

Next, we'll move the code that actually toggles the accordion open and closed out into its own helper function.

The basic checks and `event.preventDefault()` can remain in the event handler.

```js
var toggleAccordion = function (content) {

	// If the content is already expanded, collapse it and quit
	if (content.classList.contains('active')) {
		content.classList.remove('active');
		return;
	}

	// Get all accordion content, loop through it, and close it
	var accordions = document.querySelectorAll('.accordion-content.active');
	accordions.forEach(function (accordion) {
		accordion.classList.remove('active');
	});

	// Open our target content area
	content.classList.add('active');

};

var clickHandler = function (event) {

	// Bail if our clicked element doesn't have the .accordion-toggle class
	if (!event.target.classList.contains('accordion-toggle')) return;

	// Get the target content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Prevent default link behavior
	event.preventDefault();

	// Toggle the accordion
	toggleAccordion(content);

};

// Listen for clicks on the document
document.addEventListener('click', clickHandler, false);
```

### Third Pass

In our third pass, we'll pull some of the more tedious stuff out into it's own functions with really obvious naming conventions.

We'll check if the target content is already expanded with the `isExpanded()` helper. We'll collapse our accordion in the `collapseAccordion()` method. We'll get all of the accordion content with the `getAccordions()` helper.

```js
var isExpanded = function (content) {
	return content.classList.contains('active');
};

var collapseAccordion = function (content) {
	content.classList.remove('active');
};

var getAccordions = function () {
	return document.querySelectorAll('.accordion-content.active');
};

var toggleAccordion = function (content) {

	// If the content is already expanded, collapse it and quit
	if (isExpanded(content)) {
		collapseAccordion(content);
		return;
	}

	// Get all accordion content, loop through it, and close it
	getAccordions().forEach(function (accordion) {
		accordion.classList.remove('active');
	});

	// Open our target content area
	content.classList.add('active');

};

var clickHandler = function (event) {

	// Bail if our clicked element doesn't have the .accordion-toggle class
	if (!event.target.classList.contains('accordion-toggle')) return;

	// Get the target content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Prevent default link behavior
	event.preventDefault();

	// Toggle the accordion
	toggleAccordion(content);

};

// Listen for clicks on the document
document.addEventListener('click', clickHandler, false);
```

### Fourth Pass

Next, we'll add helpers to do things like close all open accordions and open the target one.

You'll notice that with each step, we end up with more functions that do less stuff. The goal is to have more small functions that are focused on one task over fewer large functions that do a lot.

This makes debugging and testing easier, and code easier to read.

```js
var isExpanded = function (content) {
	return content.classList.contains('active');
};

var collapseAccordion = function (content) {
	content.classList.remove('active');
};

var getAccordions = function () {
	return document.querySelectorAll('.accordion-content.active');
};

var closeAccordions = function () {
	getAccordions().forEach(function (accordion) {
		accordion.classList.remove('active');
	});
};

var expandAccordion = function (content) {
	content.classList.add('active');
};

var toggleAccordion = function (content) {

	// If the content is already expanded, collapse it and quit
	if (isExpanded(content)) {
		collapseAccordion(content);
		return;
	}

	// Get all accordion content, loop through it, and close it
	closeAccordions();

	// Open our target content area
	expandAccordion(content);

};

var clickHandler = function (event) {

	// Bail if our clicked element doesn't have the .accordion-toggle class
	if (!event.target.classList.contains('accordion-toggle')) return;

	// Get the target content
	var content = document.querySelector(event.target.hash);
	if (!content) return;

	// Prevent default link behavior
	event.preventDefault();

	// Toggle the accordion
	toggleAccordion(content);

};

// Listen for clicks on the document
document.addEventListener('click', clickHandler, false);
```

### Final Pass

On our final pass, we'll wrap our code in a named function, add `use strict` to it, and make sure that an accordion toggle is actually on the page before initializing it. No sense in running an event listener on a page without accordions.

```js
var accordion = function () {

	'use strict';

	var isExpanded = function (content) {
		return content.classList.contains('active');
	};

	var collapseAccordion = function (content) {
		content.classList.remove('active');
	};

	var getAccordions = function () {
		return document.querySelectorAll('.accordion-content.active');
	};

	var closeAccordions = function () {
		getAccordions().forEach(function (accordion) {
			accordion.classList.remove('active');
		});
	};

	var expandAccordion = function (content) {
		content.classList.add('active');
	};

	var toggleAccordion = function (content) {

		// If the content is already expanded, collapse it and quit
		if (isExpanded(content)) {
			collapseAccordion(content);
			return;
		}

		// Get all accordion content, loop through it, and close it
		closeAccordions();

		// Open our target content area
		expandAccordion(content);

	};

	var clickHandler = function (event) {

		// Bail if our clicked element doesn't have the .accordion-toggle class
		if (!event.target.classList.contains('accordion-toggle')) return;

		// Get the target content
		var content = document.querySelector(event.target.hash);
		if (!content) return;

		// Prevent default link behavior
		event.preventDefault();

		// Toggle the accordion
		toggleAccordion(content);

	};

	// Listen for clicks on the document
	document.addEventListener('click', clickHandler, false);

};

// If there are accordions on the page, initialize
if (document.querySelector('.accordion-toggle')) {
	accordion();
}
```

[And here's a working demo of the finalized code.](https://codepen.io/cferdinandi/pen/yxQqBm)

<p data-height="265" data-theme-id="light" data-slug-hash="yxQqBm" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="yxQqBm" class="codepen"></p>

## What now?

There's probably further areas for optimization, and that's ok!

The goal isn't to get this perfect on the first try. It's a gradual progression towards more manageable code.