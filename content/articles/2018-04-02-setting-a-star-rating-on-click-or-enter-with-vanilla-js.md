---
title: "Setting a star rating on click or enter with vanilla js"
date: 2018-04-02T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- HTML
- JavaScript
---

On Friday, I challenged you to [create a star-based rating app with JavaScript](/creating-a-star-based-rating-app-with-vanilla-javascript/).

> Over the weekend, try to write some JavaScript that detects when a user has clicked a star. Make it look different from the other stars, and add some text for visually impaired users so that they know which star is selected, too.

Today, I want to share some of the solutions provided by other readers, and walk you through how I would approach it.

## What others did

View source any of these to dig into the code.

[Dave Buchholz](https://twitter.com/Buchholz_Dave) sent me [this working demo](https://www.i-cre8.co.uk/test-cases/javascript/ratings/index.html). On click, he's checking to see if a `.star` was clicked, then looping through all of them and adding the `.selected` class to items before and up to the selected star.

Maxx Heth sent me [this approach](http://edfx.co/star-rating-exercise.html). He applies styling on hover, too, and included an undo button.

And [Paul Allen](https://github.com/SketchBookkeeper) sent me [this example on CodePen](https://codepen.io/sketchbookkeeper/pen/XEqPLG). He also added hover styling, and you can update your selection by clicking another star.

## How I approached this

Let me start this off by saying that there are no right or wrong approaches here.

There are approaches that are *better*, in the sense that they use less code, are easier to maintain, or run more efficiently. But other approaches are not wrong. The way I'd approach this is highly opinionated.

### Using what the browser gives you

For bonus points, I issued a challenge:

> Make it also work if a keyboard-only user uses the tab key to move over to their desired rating and hits enter instead of using a mouse.

Instead of listening for when the button is clicked, I listen for `submit` events. This will capture both clicks, since clicking the button submits the `.rating` form, and someone hitting the `enter` key after tabbing over to their desired button.

This allows you to capture both approaches with one listener.

I'll listen for all form submissions on the document (in case there are several rating forms), and check to make sure the `event.target` has the `.rating` class. If it does, I'll stop it from submitting with `event.preventDefault()`. Otherwise, I'll bail.

```js
// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

}, false);
```

### Getting the selected star

With a click event listener, you the `event.listener` *is* the selected star.

With a form submission, it's the form itself. To get the clicked or entered star, we instead to need to see find the element on the page that's current in focus (since clicking on the button also brings it into focus) with the `document.activeElement` property.

I like to double check that there's an element in focus, and if there is, I'll use the `getAttribute()` method to get the `[data-star]` attribute value, which tells us the rating. Then I convert that from a string into an integer with the `parseInt()` function.

```js
// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

	// Get the selected star
	var selected = document.activeElement;
	if (!selected) return;
	var selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

}, false);
```

### Highlighting our selected star

I like to rely on CSS for styling whenever possible, so I added a `.star.selected` class to change the color of our selected star.

```css
.star.selected {
	color: gold;
}
```

I could just apply that class to the `selected` element, but I also issued this challenge:

> Highlight all of the stars before the selected one, too. For example, if you click the third star, stars one and two should also look different.

To make that work, we need to grab every star in our rating form and loop through them. To only get stars from the submitted form, we'll run `querySelectorAll()` on our `event.target` instead of the `document`.

Then, we'll use `Array.from()` to [convert it from a NodeList into an array](https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/) so I can use newer array methods like `forEach()` on it.

```js
// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

	// Get the selected star
	var selected = document.activeElement;
	if (!selected) return;
	var selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(event.target.querySelectorAll('.star'));

}, false);
```

### Looping through all of the stars

Now, I'll use `Array.forEach()` to loop through the stars, passing in arguments for both the star and its index in the array.

If the `index` (which starts at `0`, not `1`) is lower than the `selectedIndex`, the item is either the selected star or before it, so I'll add the `.selected` class. Otherwise, I'll remove it.

```js
// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

	// Get the selected star
	var selected = document.activeElement;
	if (!selected) return;
	var selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(event.target.querySelectorAll('.star'));

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

Now, we've got a form that we'll highlight the selected star with a mouse or keyboard, and lets you change your rating.

We're *almost* done.

### Accessibility for visually impaired users

One important part of this script is that visually impaired users need to know which star is selected, since they can't see the highlighted color.

I had originally suggested:

> add some text for visually impaired users so that they know which star is selected, too.

My friend and [accessibility expert Scott O'Hara](http://www.scottohara.me/) reached out to me and suggested I instead [use the `aria-pressed` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Toggle_buttons). This role is specific to buttons, and indicates whether it's pressed or not.

To do this, I'll first locate any previously selected star by looking for `[aria-pressed="true"]` inside our `event.target`. If one exists, I'll remove the role. Then I'll add it to our `selected` element.

```js
// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

	// Get the selected star
	var selected = document.activeElement;
	if (!selected) return;
	var selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

	// Get all stars in this form (only search in the form, not the whole document)
	// Convert them from a node list to an array
	// https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/
	var stars = Array.from(event.target.querySelectorAll('.star'));

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

	// Remove aria-pressed from any previously selected star
	var previousRating = event.target.querySelector('.star[aria-pressed="true"]');
	if (previousRating) {
		previousRating.removeAttribute('aria-pressed');
	}

	// Add aria-pressed role to the selected button
	selected.setAttribute('aria-pressed', true);

}, false);
```

Scott also pointed out that with our current setup, assistive technology like Voice Over will read "Black Star" on each button because of the icon we've used.

You can avoid this by using something like an SVG icon instead, or you can wrap the item in a `span` with the `aria-hidden="true"` attribute.

```html
<button type="submit" class="star" data-star="1">
	<span aria-hidden="true">&#9733;</span>
	<span class="screen-reader">1 Star</span>
</button>
```

Now we're officially done. The whole thing is about 40 lines of code, including whitespace and comments.

[You can find the updated source code for this on GitHub.](https://github.com/cferdinandi/project-star-rating-system)

## Next challenge:

This is a great start, but most star-rating systems also adjust highlighting on hover. As in, if you hover over a star, it will highlight it to show you what the rating *will* be before you've made your selection.

I'd like to you to build off what I've got so far to highlight stars on hover, and also if a user tabs through the selection with their keyboard instead of using a mouse.

We'll come back to this on Friday to give you some time to work on it. If you finish before then, send me your work! I'd love to share it with everyone.