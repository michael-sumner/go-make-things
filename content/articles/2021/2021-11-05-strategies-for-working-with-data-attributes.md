---
title: Strategies for working with data attributes in vanilla JavaScript
date: 2021-11-05T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- HTML
- JavaScript
---

Over the last two days, we've learned [how to get, set, and remove data attributes using a handful of native methods](/how-to-get-set-and-remove-data-attributes-with-vanilla-javascript/), as well as [with the `Element.dataset` property](/managing-data-attributes-with-the-dataset-property-in-vanilla-javascript/). Today, we're going to look at some different strategies for working with data attributes.

Let's dig in!

## As JavaScript selectors

One of my favorite ways to use data attributes in projects is as selectors for my JavaScript.

For example, if I had a JavaScript dropdown menu component, I might target it with the `[data-dropdown]` element.

```html
<li>
	<button data-dropdown>About</button>
	<ul>
		<li><a href="/about">Who We Are</a></li>
		<li><a href="/history">Our Story</a></li>
		<li><a href="/contact">Contact Us</a></li>
	</ul>
</li>
```

```js
document.addEventListener('click', function (event) {

	// Only run if a [data-dropdown] button was clicked
	if (!event.target.matches('[data-dropdown]')) return;

	// Show or hide the dropdown menu...

});
```

JavaScript lets you target elements with a variety of selectors. In the past, I've seen people advocate for prefixing classes with `.js-*` if they're intended for use by JavaScript (as opposed to be used for styling).

```html
<li>
	<button class="js-dropdown">About</button>
	<!-- ... -->
</li>
```

While I like this approach, I think it muddles concerns a bit.

Data attributes are used almost exclusively by JavaScript, which makes them a natural choice for selectors for JavaScript components.

## Abstracting code with target elements

Let's say you have a button that exposes a modal window when clicked.

```html
<button data-modal>Show Modal</button>

<!-- The rest of the page... -->

<div id="hey-there" hidden>
	<p>👋 Hi!</p>
</div>
```

Many scripts require you to specify which modal is opened by which button.

```js
// Get the button
let btn = document.querySelector('[data-modal]');
let target = document.querySelector('#hey-there');

// When clicked, show the modal
// (This is NOT accessible. DO NOT implement this!)
btn.addEventListener('click', function (event) {
	target.removeAttribute('hidden');
});
```

But, you can instead use the data attribute as a general selector for modal toggles that includes information about which element to show when clicked.

```html
<button data-modal="#hey-there">Show Modal</button>

<!-- The rest of the page... -->

<div id="hey-there" hidden>
	<p>👋 Hi!</p>
</div>
```

Then, you can abstract your JavaScript like this.

```js
// When clicked, show the modal
// (This is NOT accessible. DO NOT implement this!)
document.addEventListener('click', function (event) {

	// Get the ID from the clicked button
	let id = event.target.getAttribute('data-modal');

	// If it's not a [data-modal] button, bail
	if (!id) return;

	// Get and show the target element
	let target = document.querySelector(id);
	target.removeAttribute('hidden');

});
```

Now, you can drop as many `[data-modal]` buttons as you want onto the page and they'll behave similarly, without changing or adding to your JavaScript.

## Abstracting event listeners and handlers

To take this a step further, you can use data attributes to abstract event listeners and event handlers.

For this approach, I'll use a `[data-{eventType}]` naming approach: `[data-click]`, `[data-submit]`, and so on. Then, I'll assign the event handler as the value of the attribute.

```html
<button data-click="logout">Log Out</button>

<!-- ... -->

<form data-submit="login">
	<!-- ... -->
</form>
```

Inside my JavaScript, I'll have listeners attached to the `document` for the different types of events.

```js
document.addEventListener('click', function (event) {
	// Handle click events
});

document.addEventListener('submit', function (event) {
	// Handle submit events
});
```

Next, I create an object with my event handlers. Each handler name corresponds to the value of one of the data attributes.

Sometimes, it's a single object. Other times, it's one for each event type. It largely depends on how many event handlers I have.

```js
let handlers = {
	logout: function (event) {
		// Do logout stuff...
	},
	login: function (event) {
		// Do login stuff...
	}
};
```

Inside my listener callback functions, I'll check the data attribute, get the callback value, and make sure it exists in my `handlers` object.

Otherwise, I'll run it, passing in the `event` object as an argument.

```js
document.addEventListener('click', function (event) {
	
	// Get the event handler
	let handler = event.target.getAttribute('data-click');

	// If the handler doesn't exist, bail
	if (!handler || !handlers[handler]) return;

	// Run the event
	handlers[handler](event);

});
```

This lets me use a single event listener per event type to handle a wide range of events. It also [pairs nicely with ES imports](/an-intro-to-import-and-export-with-es-modules/), allowing me to keep all of my handlers in one file, and import them as an object.

```js
// handlers.js

function logout (event) {
	// Do logout stuff...
}

function login (event) {
	// Do login stuff...
}

export {logout, login};
```

```js
// My events.js file
import * as handlers from './handlers.js';

document.addEventListener('click', function (event) {
	
	// Get the event handler
	let handler = event.target.getAttribute('data-click');

	// If the handler doesn't exist, bail
	if (!handler || !handlers[handler]) return;

	// Run the event
	handlers[handler](event);

});
```