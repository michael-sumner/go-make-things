---
title: Climbing up the DOM tree with vanilla JavaScript
date: 2022-03-17T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, I wanted to look at two ways to climb up the DOM tree with vanilla JavaScript. Let's dig in!

## The `Element.parentNode` property

You can use the  `Element.parentNode` property to get the parent of an element.

```html
<div id="app">
	<h1>Hello, world!</h1>
</div>
```

```javascript
let h1 = document.querySelector('h1');

// returns the #app element
let parent = h1.parentNode;
```

You can also string them together to go several levels up.

```javascript
let levelUpParent = h1.parentNode.parentNode;
```

## The `Element.closest()` method

You can use the `Element.closest()` method to get the closest parent up the DOM tree that matches against a selector.

The `Element.closest()` method starts with the element itself. You can start with the first parent element by pairing it with the `Node.parentNode` property.

```html
<main>
	<div class="hero">
		<div id="app">
			<h1 data-sandwich>Hello, world!</h1>
		</div>
	</div>
</main>
```

```javascript
let h1 = document.querySelector('h1');

// returns the .hero element
let hero = h1.closest('.hero');

// returns the h1 element itself
let sandwich = h1.closest('[data-sandwich]');

// Start with the element's parent
// returns null
let sandwich2 = h1.parentNode.closest('[data-sandwich]');
```

## Creative uses for the `Element.closest()` method

I like to use the `Element.closest()` method to check if an element is _or is inside of_ some parent element.

This is particularly useful when paired with [event delegation](/why-is-javascript-event-delegation-better-than-attaching-events-to-each-element/) for my event listeners.

For example, let's say you have some buttons with some nested HTML in them, like this.

```html
<button class="click-me">
	<span class="text-large">Click Me!</span>
	<br>
	<span class="text-small">(limited time offer)</span>
</button>
```

And your JavaScript to listen for clicks on those buttons looks like this.

```js
document.addEventListener('click', function (event) {

	// Only run on .click-me buttons
	if (!event.target.matches('.click-me')) return;

	// Do stuff...

});
```

This will never run, because the `target` of the click event will almost always be the `.text-large` or `.text-small` elements. It only works if you click outside of the text in the button.

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZEvQQdd?editors=1011)

To get around this, we can use the `Element.closest()` method instead.

```js
document.addEventListener('click', function (event) {

	// Only run on .click-me buttons
	if (!event.target.closest('.click-me')) return;

	// Do stuff...

});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/QWayyeJ?editors=1011)

There are a lot of uses for the `Element.closest()` method, but this is one of my favorites.