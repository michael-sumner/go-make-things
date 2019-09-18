---
title: "Showing star-based ratings on hover or focus with vanilla JavaScript"
date: 2018-04-11T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Last week, we [built a star-based rating system with vanilla JavaScript](/setting-a-star-rating-on-click-or-enter-with-vanilla-js/).

As a follow-up challenge, I asked you to highlight stars on hover and focus so that user can see what their selection would look like. I was supposed to dive into this on Friday but didn't have time to put together a proper article, so we're going to look at that today.

## Listening for hover events

For this to work, we can't just use a `:hover` selector in our CSS. We need to highlight not just the hovered on star, but the ones before it, and for that, we need JavaScript.

Let's first setup an event listener for hover events. The event we want for this is `mouseover`. A `hover` event does not exist.

```js
document.addEventListener('mouseover', function (event) {
	// Our code will go here...
}, false);
```

This is going to [bubble up all hover events in the DOM](/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/), so we want to check if the event has happened in our `.rating` form.

We'll use the `closest()` method on our `event.target` to first make sure the event happened on a `.star`, and to get the `.rating` form, which we'll need later in our script.

Why `closest()` instead of `matches()`? Our stars are wrapped in a `span aria-hidden="true"` element, and that's the element the `event.target` will map to in most cases, so we need an easy way to check if a parent element has the `.star` class.

```js
document.addEventListener('mouseover', function (event) {

	// Only run our code on .rating forms
	var star = event.target.closest('.star');
	var form = event.target.closest('.rating');
	if (!star || !form) return;

}, false);
```

## Highlight up to the hovered element

The process of highlighting up to our hovered star is pretty much the same as highlighting up to the selected one.

We'll use `getAttribute()` on our `star` to get the hovered star index, and `parseInt()` to convert it to an integer. We'll use `querySelectorAll()` on the `form` to get all stars in that `.ratings` form.

Finally, we'll loop over each one with `forEach()` and compare it's index against the hovered star index, adding or removing the `.selected` class as needed.

```js
document.addEventListener('mouseover', function (event) {

	// Only run our code on .rating forms
	var star = event.target.closest('.star');
	var form = event.target.closest('.rating');
	if (!star || !form) return;

	// Get the selected star
	var selectedIndex = parseInt(star.getAttribute('data-star'), 10);

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(form.querySelectorAll('.star'));

	// Loop through each star, and add or remove the `.selected` class to toggle highlighting
	stars.forEach(function (star, index) {
		if (index < selectedIndex) {
			// Selected star or before it
			// Add highlighting
			star.classList.add('selected');
		} else {
			// After selected star
			// Remove highlight
			star.classList.remove('selected');
		}
	});

}, false);
```

Not bad!

Now let's add the same feature for `focus` events, too.

## Highlighting the focused star

The great news here is that we can use the same exact function on `focus` events.

To avoid writing the same code twice, let's pull the function out of our `mouseover` event into a standalone function.

```js
// Highlight the hovered or focused star
var highlight = function (event) {

	// Only run our code on .rating forms
	var star = event.target.closest('.star');
	var form = event.target.closest('.rating');
	if (!star || !form) return;

	// Get the selected star
	var selectedIndex = parseInt(star.getAttribute('data-star'), 10);

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(form.querySelectorAll('.star'));

	// Loop through each star, and add or remove the `.selected` class to toggle highlighting
	stars.forEach(function (star, index) {
		if (index < selectedIndex) {
			// Selected star or before it
			// Add highlighting
			star.classList.add('selected');
		} else {
			// After selected star
			// Remove highlight
			star.classList.remove('selected');
		}
	});

};
```

Now, we can run that function both `mouseover` and `focus` events. The `event` is automatically passed in as an argument.

By default, `focus` events don't bubble, but if we pass in `true` for `useCapture`, the last argument in `addEventListener()`, we can get event bubbling for the event.

```js
// Listen for hover and focus events on stars
document.addEventListener('mouseover', highlight, false);
document.addEventListener('focus', highlight, true);
```

Excellent!

[You can find the full source code for this on GitHub.](https://github.com/cferdinandi/project-star-rating-system)

## One small problem

There's one small problem, though: this removes highlighting when a star is already selected.

For Friday, try to figure out how to reset the highlighting for the selected star, if one exists, or remove all highlighting if nothing has been selected yet.