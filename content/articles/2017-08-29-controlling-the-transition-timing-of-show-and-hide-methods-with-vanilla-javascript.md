---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-29'
permalink: /controlling-the-transition-timing-of-show-and-hide-methods-with-vanilla-javascript/
title: Controlling the transition timing of show and hide methods with vanilla JavaScript
url: /2017/08/29/controlling-the-transition-timing-of-show-and-hide-methods-with-vanilla-javascript
---

Over the last few days, we've [created `show()` and `hide()` methods with vanilla JavaScript](/how-to-show-and-hide-elements-with-vanilla-javascript/), added [a transition animation](/how-to-add-transition-animations-to-vanilla-javascript-show-and-hide-methods/), and [added a fade-in animation](/how-to-a-fade-in-to-vanilla-javascript-show-and-hide-methods/).

The methods we wrote work great if you want to use the same animation timing every time. But what if you wanted to vary it? What if you wanted show content to reveal slowly, and other content to reveal fast?

Today, let's look at how to adjust the animation timing.

## Updating our CSS

Since we use CSS to control our animations, the first thing we need to do is add slow and fast animation options.

As a refresher, here's our starting CSS.

```css
.toggle-content {
    display: none;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height 350ms ease-in-out, opacity 750ms ease-in-out;
}

.toggle-content.is-visible {
    display: block;
    height: auto;
    opacity: 1;
}
```

 We'll add `.show-fast` and `.show-flow` classes to modify the default animations in our `.toggle-content` class.

```css
.toggle-content {
	display: none;
	height: 0;
	opacity: 0;
	overflow: hidden;
	transition: height 350ms ease-in-out, opacity 750ms ease-in-out;
}

.show-fast {
	transition: height: 100ms ease-in-out, opacity 300ms ease-in-out;
}

.show-slow {
	transition: height: 2000ms ease-in-out, opacity 2500ms ease-in-out;
}

.toggle-content.is-visible {
	display: block;
	height: auto;
	opacity: 1;
}
```

## Updating the HTML

We'll modify our markup as well, adding our `.show-fast` or `.show-slow` classes as desired to control the animation speed.

```markup
<div class="toggle-content">
	This content reveals at normal speed.
</div>

<div class="toggle-content show-fast">
	This content reveals quickly.
</div>

<div class="toggle-content show-slow">
	This content reveals at slowly.
</div>
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/qgpxvhhb/39/)

## Updating our JavaScript

You'll notice in the demo that all three content areas reveal at the same speed.

We've adjusted our CSS, but our script is still assuming a 350ms transition time. We need a way to vary that by animation.

As a refresher, here's our starting JavaScript.

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
	elem.style.height = height; // Update the height

	// Once the transition is complete, remove the inline height so the content can scale responsively
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

Let's look at two different ways to approach it.

### Option 1: Pass in the timing as an argument

The easiest way to write (but the hardest to maintain) is to pass in the timing as an argument in our methods.

We'll use a [ternary operator](/ternary-operators/) to check if the `timing` variable is set. If it is, we'll use it. If not, we'll fallback to `350`.

```javascript
// Show an element
var show = function (elem, timing) {

	// Get the transition timing
	timing = timing ? timing : 350;

	// ...

	// Once the transition is complete, remove the inline max-height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, timing);

};

// Hide an element
var hide = function (elem, timing) {

	// Get the transition timing
	timing = timing ? timing : 350;

	// ...

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, timing);

};

// Toggle element visibility
var toggle = function (elem, timing) {

	// If the element is visible, hide it
	if (elem.classList.contains('is-visible')) {
		hide(elem, timing);
		return;
	}

	// Otherwise, show it
	show(elem, timing);

};
```

[Here's a demo with the timing passed in as an argument.](https://jsfiddle.net/cferdinandi/qgpxvhhb/40/)

### Option 2: Detect the class

A more automatic approach is to detect if our content area has a `.show-fast` or `.show-slow` class on it and adjust our `setTimeout()` delay accordingly.

```javascript
var timing = 350;
if (elem.classList.contains('show-fast')) {
	timing = 100;
}
if (elem.classList.contains('show-slow')) {
	timing = 2000;
}

// ...

// Once the transition is complete, remove the inline max-height so the content can scale responsively
window.setTimeout(function () {
	elem.style.height = '';
}, timing);
```

Since we use this in both the `show()` and `hide()` methods, let's assign it to a helper function.

```javascript
// Get the transition timing
var getTiming = function (elem) {
	var timing = 350;
	if (elem.classList.contains('show-fast')) {
		timing = 100;
	}
	if (elem.classList.contains('show-slow')) {
		timing = 2000;
	}
	return timing;
};

// Show an element
var show = function (elem) {

	// Get the transition timing
	var timing = getTiming(elem);

	// ...

	// Once the transition is complete, remove the inline height so the content can scale responsively
	window.setTimeout(function () {
		elem.style.height = '';
	}, timing);

};

// Hide an element
var hide = function (elem) {

	// Get the transition timing
	var timing = getTiming(elem);

	// ...

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, timing);

};
```

[Here's a demo using automatic class detection.](https://jsfiddle.net/cferdinandi/qgpxvhhb/41/)