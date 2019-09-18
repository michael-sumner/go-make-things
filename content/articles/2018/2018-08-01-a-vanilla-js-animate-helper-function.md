---
title: "A vanilla JS animation helper function"
date: 2018-08-01T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

Yesterday, we looked at [a simple technique for creating show-and-hide animations without jQuery](/show-and-hide-animations-with-vanilla-js/).

A few folks asked me:

> What about animating fade outs?

Today, I wanted to share a more flexible helper function that makes doing that sort of thing easier.

## A quick recap

The approach here involves adding a class to an element that triggers CSS animations on the element instead of relying on complex JS to calculate and handle it.

```html
<h1 id="elem">Animate</h1>

<button class="show">Show</button>
<button class="hide">Hide</button>
```

```js
var elem = document.querySelector('#elem');
document.addEventListener('click', function (event) {

	if (event.target.matches('.show')) {
		elem.removeAttribute('hidden');
		elem.classList.add('fadeInDown');
	}

	if (event.target.matches('.hide')) {
		elem.setAttribute('hidden', 'true');
		elem.classList.remove('fadeInDown');
	}

}, false);
```

Let's create a helper function that abstracts some of this away and makes it easier to get things done.

## Getting setup

We'll create a helper function, `animate()`, that will accept three arguments.

The `elem` argument is the element to animate, the `animation` argument is the animation class to add to the element, and `hide` is a boolean that, when true, will apply the `[hidden]` attribute to the element when the animation is complete.

```js
/**
 * Apply a CSS animation to an element
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
var animate = function (elem, animation, hide) {
	// Do stuff...
};
```

If no `elem` or `animation` were provided, we'll end the function immediately.

```js
/**
 * Apply a CSS animation to an element
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
var animate = function (elem, animation, hide) {

	// If there's no element or animation, do nothing
	if (!elem || !animation) return;

};
```

## Handling the Animation

First up, if the element has a `[hidden]` attribute on it, we need to remove it using `removeAttribute()` so that the animation will actually be visible.

Then, we can add the animation class to the element with the `classList.add()` method.

```js
/**
 * Apply a CSS animation to an element
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
var animate = function (elem, animation, hide) {

	// If there's no element or animation, do nothing
	if (!elem || !animation) return;

	// Remove the [hidden] attribute
	elem.removeAttribute('hidden');

	// Apply the animation
	elem.classList.add(animation);

};
```

When the animation is complete, we want to do two things:

1. Remove the animation class so that future animations have a "fresh start."
2. If the element should be hidden after the animation, add the `[hidden]` attribute to it.

We'll setup an event listener to detect the `animationend` event on the element.

When it runs, we'll use the `classList.remove()` method to remove the animation class from the element. If `hide` is set to `true`, we'll also use the `setAttribute()` method to add the `[hidden]` attribute to the element.

Finally, we want to remove this event listener when it's complete (to avoid it running on future animations). To do this, we'll pass in a named instead of anonymous function. This will allow us to use `removeEventListener()` inside the callback to remove itself.

```js
/**
 * Apply a CSS animation to an element
 * @param  {Node}    elem      The element to animate
 * @param  {String}  animation The type of animation to apply
 * @param  {Boolean} hide      If true, apply the [hidden] attribute after the animation is done
 */
var animate = function (elem, animation, hide) {

	// If there's no element or animation, do nothing
	if (!elem || !animation) return;

	// Remove the [hidden] attribute
	elem.removeAttribute('hidden');

	// Apply the animation
	elem.classList.add(animation);

	// Detect when the animation ends
	elem.addEventListener('animationend', function endAnimation (event) {

		// Remove the animation class
		elem.classList.remove(animation);

		// If the element should be hidden, hide it
		if (hide) {
			elem.setAttribute('hidden', 'true');
		}

		// Remove this event listener
		elem.removeEventListener('animationend', endAnimation, false);

	}, false);

};
```

## Running the helper method

Just like yesterday, we'll setup a click event listener on the `document`.

This time, instead of manually adding/removing classes and attributes, we'll pass the element and it's animation into our `animate()` method.

```js
var elem = document.querySelector('#elem');
document.addEventListener('click', function (event) {

	// Show the element
	if (event.target.matches('.show')) {
		animate(elem, 'fadeInDown');
	}

	//  Hide the element
	if (event.target.matches('.hide')) {
		animate(elem, 'fadeOutUp', true);
	}

}, false);
```

And that's it! [Here's a demo.](https://codepen.io/cferdinandi/pen/RBQvZe)

<p data-height="265" data-theme-id="light" data-slug-hash="RBQvZe" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Vanilla JS Animations Helper Function" class="codepen"></p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>