---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-25'
permalink: /how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/
title: How to add transition animations to vanilla JavaScript show and hide methods
url: /2017/08/25/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods
---

Yesterday, we looked at [how to show and hide elements with vanilla JavaScript](/how-to-show-and-hide-elements-with-vanilla-javascript/).

To recap, we can either add an inline `display` style with the `style` property, or toggle a class that controls visibility using `classList`.

Today, let's learn how to add transitions.

## Adding transitions

Adding transitions is where things get just a bit more complicated.

Let's say you wanted to animate the expansion or collapse of your content like jQuery does. You might try adding a `height` property of `0`, and changing it to `auto` when `.is-visible` is added.

```css
.toggle-content {
	display: none;
	height: 0;
	transition: height 350ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
}
```

Unfortunately, that won't work. CSS transitions require fixed values, and will not animate `auto` values.

One commonly proposed solution is to use `max-height` instead of height, and set the expanded value to something really large like `999em`.

```css
.toggle-content {
	display: none;
	max-height: 0;
	overflow: hidden;
	transition: max-height 350ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	max-height: 999em;
}
```

[If you check out this demo, you'll notice that the `max-height` isn't animating.](https://jsfiddle.net/cferdinandi/qgpxvhhb/10/)

The problem is with the `display` property.

Because the `display` property is set to `none`, and then changes to `block`, the change in `max-height` is never triggered in the browser. From the browser's perspective, it has no set `max-height` until it's displayed.

If we remove the `display` property, you'll notice it works, sort of ([here's a demo](https://jsfiddle.net/cferdinandi/qgpxvhhb/17/)).

```css
.toggle-content {
	max-height: 0;
	overflow: hidden;
	transition: max-height 2000ms ease-in-out;
}

.toggle-content.is-visible {
	max-height: 999em;
}
```

There are two problems with this approach.

1. The animation is barely visible.
2. There's a weird lag before the element collapses.

Both of these are caused by large `max-height` property with the `.is-visible` class.

Regardless of the rendered height of the element, the browser runs the animation over the full height of the `max-height`.

For short pieces of content, the animation is barely perceptible because it happens so fast. And when closing the content, the animation first runs over the non-existent extra height in that `max-height` before getting to the real content.

You could make that height smaller, but you run the risk of having content clipped if it's too tall for the container on smaller viewports. And there's accessibility issues with having content with a `max-height` of `0` but still displayed in the DOM.

We need a more elegant solution.

## Using JavaScript to dynamically calculate our height

To make this all work, we want to do two things:

1. Dynamically calculate the height of our element, so that the browser has an actually `height` value to animate. We'll [add this inline](/two-ways-to-set-an-elements-css-with-vanilla-javascript/) to our element
2. Delay changing the `display` property until after the animation is complete.

First, let's update our CSS.

We'll add the `display` back. We'll switch `max-height` back to `height`, and give it a value of `auto` when the content is visible. We'll be using JavaScript to add this as content-specific inline CSS for us.

```css
.toggle-content {
	display: none;
	height: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
}
```

## Showing an element

To show an element, we first need to get it's natural height (it's height when it's not hidden). Let's create a function named `getHeight()` to handle this for us.

First, we'll set the element's `display` to `block`.

Then we'll get it's height using `scrollHeight`, which tells you the height of an element's content, and store it to a variable. This returns an integer, so we'll need to add `px` to the end to use with our inline style.

Finally, we'll hide our element again by removing the `display` property, and return our `height` value.

```javascript
// Get the natural height of the element
var getHeight = function () {
	elem.style.display = 'block'; // Make it visible
	var height = elem.scrollHeight + 'px'; // Get it's height
	elem.style.display = ''; //  Hide it again
	return height;
};
```

Even though we're showing and then re-hiding our content, it never shows visibly for users because the function runs so quickly (just a few milliseconds) and thus never actually renders visually in the DOM.

Next, we want to do three things:

1. Actually run `getHeight` to calculate the element's natural height.
2. Add the `.is-visible` class to our element to update it's `display` property.
3. Set it's `height` as an inline property.

```javascript
var show = function (elem) {

	// Get the natural height of the element
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};

	var height = getHeight(); // Get the natural height
	elem.classList.add('is-visible'); // Make the element visible
	elem.style.height = height; // Update the max-height

};
```

There's one last thing we should do: remove the inline `height` property after the animation is complete. If we leave it and someone resizes the browser, the content container could be too tall, or worse, too short and clip the content.

We'll use `setTimeout()` to create a function that we run *after* our animation finishes. The first argument in `setTimeout()` is our function, where we'll remove the inline `height` property. The second is how far out, in milliseconds, to run that function.

```javascript
var show = function (elem) {

	// Get the natural height of the element
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};

	var height = getHeight(); // Get the natural height
	elem.classList.add('is-visible'); // Make the element visible
	elem.style.height = height; // Update the max-height

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, 350);

};
```

So far, so good!

## Hiding and element

Visible elements, once animated, have a `height` of `auto`. To animate hiding them, we need to give them a fixed height to animate down to `0`.

Let's again calculate the natural height of the element with `scrollHeight` and add it as an inline style.

```javascript
var hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

};
```

Next, we want to set our `height` *back* to `0`. *But*, if we run it too quickly, the browser won't detect the change at all and won't run. We'll use `setTimeout()` with a 1 millisecond delay to make sure the change registers.

```javascript
var hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

};
```

When the animation completes, we can remove our `.is-visible` class to set `display` to `none` again.

```javascript
var hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, 350);

};
```

## Toggling an element's visibility

The last thing we need to do is add a method to toggle visibility.

For this one, we'll check to see if our element has the `.is-visible` class. If it does, it's already visible and we'll run our `hide()` method. Otherwise, we'll run our `show()` method.

```javascript
var toggle = function (elem, timing) {

	// If the element is visible, hide it
	if (elem.classList.contains('is-visible')) {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};
```

## Putting it all together

Here's the whole thing together.

```javascript
// Show an element
var show = function (elem) {

	// Get the natural height of the element
	var getHeight = function () {
		elem.style.display = 'block'; // Make it visible
		var height = elem.scrollHeight + 'px'; // Get it's height
		elem.style.display = ''; //  Hide it again
		return height;
	};

	var height = getHeight(); // Get the natural height
	elem.classList.add('is-visible'); // Make the element visible
	elem.style.height = height; // Update the max-height

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, 350);

};

// Hide an element
var hide = function (elem) {

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, 350);

};

// Toggle element visibility
var toggle = function (elem, timing) {

	// If the element is visible, hide it
	if (elem.classList.contains('is-visible')) {
		hide(elem);
		return;
	}

	// Otherwise, show it
	show(elem);

};
```

[Check out a working demo here.](https://jsfiddle.net/cferdinandi/qgpxvhhb/18/)