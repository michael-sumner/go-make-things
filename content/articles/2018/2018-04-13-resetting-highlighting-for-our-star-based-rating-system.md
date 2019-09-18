---
title: "Resetting highlighting for our star-based rating system"
date: 2018-04-13T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

Earlier this week, we added the ability to [show what a rating would look for our star-based rating system when a user hovers or tabs over stars](/showing-star-based-ratings-on-hover-or-focus-with-vanilla-javascript/).

There's a problem, though: it also removes highlighting when a star is already selected. Today, let's look at how to fix it.

## Resetting the selected star after hover or focus

When we stop hovering on or tab off of a `.star`, we should reset the highlighting.

If there's a selected star, we should highlight it. If there isn't, we should remove all highlighting.

We can use the same function to handle both situations. Let's setup a function called `resetSelected()`. We'll pass it into a `mouseleave` event listener for when we mouse off of a `.star`, and a `blur` event for when we tab off of a `.star`.

Both of these events require `useCapture` to be set to `true` to force bubbling.

```js
var resetSelected = function (event) {
	// Our code will go here...
};

// Reset selected on mouse off and blur
document.addEventListener('mouseleave', resetSelected, true);
document.addEventListener('blur', resetSelected, true);
```

In our `resetSelected()` method, let's first make sure that the event happened on a `.rating` form.

The `mouseleave` event will also fire on the `document` if you move your mouse out of the viewport, and `closest()` isn't a method on that element, so it will throw an error. To prevent that, let's also make sure `event.target.closest` exists before running it.

```js
var resetSelected = function (event) {

	// Only run our code on .rating forms
	if (!event.target.closest) return;
	var form = event.target.closest('.rating');
	if (!form) return;

};
```

Next, we want to get all of the stars in our `form`, and the selected star if one exists.

We'll pass `.star[aria-pressed="true"]` into `form.querySelector()` to find a selected star if one exists. If it does, we'll get it's `[data-star]` value as our selected index. Otherwise, we'll use `0`. For brevity, we'll [use a ternary operator](/ternary-operators/) to set this variable.

```js
var resetSelected = function (event) {

	// Only run our code on .rating forms
	if (!event.target.closest) return;
	var form = event.target.closest('.rating');
	if (!form) return;

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(form.querySelectorAll('.star'));

	// Get an existing rating if there is one
	var selected = form.querySelector('.star[aria-pressed="true"]');
	var selectedIndex = selected ? parseInt(selected.getAttribute('data-star'), 10) : 0;

};
```

Finally, we'll loop through each star, adding or removing highlighting as needed.

```js
var resetSelected = function (event) {

	// Only run our code on .rating forms
	if (!event.target.closest) return;
	var form = event.target.closest('.rating');
	if (!form) return;

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(form.querySelectorAll('.star'));

	// Get an existing rating if there is one
	var selected = form.querySelector('.star[aria-pressed="true"]');
	var selectedIndex = selected ? parseInt(selected.getAttribute('data-star'), 10) : 0;

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

And that's it!

As always, [you can find the full source code on GitHub](https://github.com/cferdinandi/project-star-rating-system).

## What next?

Currently, users can change their rating, but not remove it altogether.

For next week, try to come up with a way to remove a rating. If you want, send me what you come up with. I'd love to see it.