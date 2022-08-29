---
title: Creating a progressively enhanced accordion with the details and summary elements (and 11 lines of JavaScript)
date: 2022-08-29T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- Design and UX
- HTML
- JavaScript
---

The `details` and `summary` elements create a simple show/hide disclosure element with _only HTML_. Today, I wanted to show you how you can use a touch of JavaScript to extend them into a progressively enhanced accordion component.

Let's dig in!

## How `details` and `summary` work

You put your entire accordion content inside a `details` element. The heading that should act as a toggle goes inside a `summary` element.

```html
<details>
	<summary>Toggle me</summary>
	I'm the content
</details>
```

<details>
	<summary>Toggle me</summary>
	I'm the content
</details>

Because it's just HTML, the `details` and `summary` elements are progressively enhanced by default. Browsers that support them get the interactivity, but older browsers see the content full expanded and accessible.

When the component is open or expanded, it has an `open` attribute on it. You can also add the `open` attribute to make your accordion expanded by default.

```html
<details open>
	<summary>Toggle me, too</summary>
	I'm open by default.
</details>
```

<details open>
	<summary>Toggle me, too</summary>
	I'm open by default.
</details>

## Creating an accordion group

We can create a simple, progressively enhanced accordion group with a collection of `details` and `summary` elements.

```html
<details>
	<summary>Merlin</summary>
	Dancing Teacups
</details>

<details>
	<summary>Ursula</summary>
	Stealing Voices
</details>

<details>
	<summary>Radagast</summary>
	Talks to Animals
</details>
```

With accordions, its common for only one item to be open at a time. Opening a collapsed component closes any currently open component. With a bit of JavaScript, we can expand our collection of `details` and `summary` elements to add this functionality.

To make this into a component group, let's wrap our elements in a parent with a `[data-accordion]` attribute.

```html
<div data-accordion>
	<details>...</details>
	<details>...</details>
	<details>...</details>
</div>
```

## Detecting `toggle` events

When a `details` element is opened or closed, it emits a `toggle` event. We can listen for it with the `addEventListener()` method.

The `toggle` event doesn't bubble, so we need to set [the optional third argument, `useCapture`](/what-is-that-third-argument-on-the-vanilla-js-addeventlistener-method-and-when-do-you-need-it/), to `true`.

```js
document.addEventListener('toggle', toggleHandler, true);
```

The `toggle` event fires when a `details` element is opened _or_ closed. We only need to run our code if an element was opened.

We'll use the `Element.hasAttribute()` method to check for the `open` attribute on the element that was toggled, the `event.target`. If the element doesn't have the attribute, we'll `return` to end our function early.

```js
/**
 * Handle toggle events
 * @param  {Event} event The Event object
 */
function toggleHandler (event) {

	// Only run if accordion is open
	if (!event.target.hasAttribute('open')) return;

}
```

We also only want to run our code if the toggled element is inside a `[data-accordion]` wrapper element.

Let's use the `Element.closest()` method to look for a `parent` element with the `[data-accordion]` attribute. If no matching element is found, we'll again use the `return` operator to end early.

```js
/**
 * Handle toggle events
 * @param  {Event} event The Event object
 */
function toggleHandler (event) {

	// Only run if accordion is open
	if (!event.target.hasAttribute('open')) return;

	// Only run on accordions inside our selector
	let parent = event.target.closest('[data-accordion]');
	if (!parent) return;

}
```

## Closing open elements

We can use the `Element.querySelectorAll()` method to look for `details` elements with the `[open]` attribute inside the `parent` element, and assign them to the `opened` variable.

Then, we'll use a `for...of` loop to loop through each open `accordion`.

```js
/**
 * Handle toggle events
 * @param  {Event} event The Event object
 */
function toggleHandler (event) {

	// Only run if accordion is open
	if (!event.target.hasAttribute('open')) return;

	// Only run on accordions inside our selector
	let parent = event.target.closest('[data-accordion]');
	if (!parent) return;

	// Get all open accordions inside parent
	let opened = parent.querySelectorAll('details[open]');

	// Close open ones that aren't current accordion
	for (let accordion of opened) {
		// ...
	}

}
```

We can use the `Element.removeAttribute()` method to remove the `[open]` attribute and close the `details` element.

But, we don't want to close the one that was just opened. We can use the _strict equals_ operator (`===`) to check if the current `accordion` is the `event.target`. If so, we'll use the `continue` operator to skip to the next item instead.

```js
/**
 * Handle toggle events
 * @param  {Event} event The Event object
 */
function toggleHandler (event) {

	// ...

	// Close open ones that aren't current accordion
	for (let accordion of opened) {
		if (accordion === event.target) continue;
		accordion.removeAttribute('open');
	}

}
```

Now, we have a simple, progressively enhanced accordion component with just a few lines of JS.

[Here's a demo.](https://codepen.io/cferdinandi/pen/NWYZOWy)