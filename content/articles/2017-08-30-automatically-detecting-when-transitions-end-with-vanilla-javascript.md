---
categories:
- Code
- CSS
- JavaScript
date: '2017-08-30'
url: /automatically-detecting-when-transitions-end-with-vanilla-javascript/
title: Automatically detecting when transitions end with vanilla JavaScript
---

Yesterday, we looked at [two techniques for adjusting the timing of transitions](/controlling-the-transition-timing-of-show-and-hide-methods-with-vanilla-javascript/) for our vanilla JS `show()` and `hide()` methods. Both of approaches involved hard-coding timing values into our script.

Imagine if you had multiple transition types: some with a fade-in, some without; some with an animation, some without; some fast, some slow, others somewhere in-between. Controlling all of that logic with manual JS arguments or `if...else` logic would quickly become unmanageable.

Reader [Diego Versiani](https://diegoversiani.me/about/) sent me an email with a really cool technique for automatically detecting when transitions end. His approach makes scaling larger projects much more maintainable.

***Side Note:*** *I love getting emails like this. If you have a tip or technique you want to share with the rest of my readers, please [reach out](/about/) and let me know about it!*

## A Quick Recap

Just to quickly recap, here's our current working script.

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
	}, timing);

};

// Hide an element
var hide = function (elem) {

	// Get the transition timing
	var timing = getTiming(elem);

	// Give the element a height to change from
	elem.style.height = elem.scrollHeight + 'px';

	// Set the height back to 0
	window.setTimeout(function () {
		elem.style.height = '0';
	}, 1);

	// When the transition is complete, hide it
	window.setTimeout(function () {
		elem.classList.remove('is-visible');
	}, timing);

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

Here's our CSS.

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

And here's the markup to go with it.

```markup
<p>
	<a class="toggle" href="#example">Toggle Div (normal speed)</a>
</p>

<div class="toggle-content" id="example">
	This content reveals at normal speed.
</div>

<p>
	<a class="toggle" href="#example-fast">Toggle Div (fast)</a>
</p>

<div class="toggle-content show-fast" id="example-fast">
	This content reveals quickly.
</div>

<p>
	<a class="toggle" href="#example-slow">Toggle Div (slow)</a>
</p>

<div class="toggle-content show-slow" id="example-slow">
	This content reveals at slowly.
</div>
```

## Replacing `setTimeout()` with `addEventListener()`

For this technique, we'll remove `setTimeout()` from our scripts, and replace it with `addEventListener()`. Specifically, we're listening for the `transitionend` event on our element.

So in our `show()` method, this...

```javascript
// Once the transition is complete, remove the inline height so the content can scale responsively
window.setTimeout(function () {
	elem.style.height = '';
}, timing);
```

Becomes this...

```javascript
// Once the transition is complete, remove the inline height so the content can scale responsively
window.addEventListener('transitionend', function () {
	elem.style.height = '';
}, false);
```

And in our `hide()` method, this...

```javascript
// When the transition is complete, hide it
window.setTimeout(function () {
	elem.classList.remove('is-visible');
}, timing);
```

Becomes this...

```javascript
// When the transition is complete, hide it
window.addEventListener('transitionend', function () {
	elem.classList.remove('is-visible');
}, false);
```

We can also remove our `getTiming()` method, since we're automatically detecting the transition end now.

[Here's a demo of what we've got so far.](https://jsfiddle.net/cferdinandi/qgpxvhhb/63/)

## Removing our event listeners after they run

One thing you might notice about the demo above is that if you open some content, close it, and then try to open it again, it automatically closes itself.

Each click is adding an event listener, so we have multiple listeners running and competing with each other. We need to remove our listener after it runs.

To do that, we'll give our listener a named function instead of an anonymous one.

```javascript
// Once the transition is complete, remove the inline height so the content can scale responsively
window.addEventListener('transitionend', function removeHeight () {
	elem.style.height = '';
}, false);
```

Then we'll remove it with `removeEventListener()` after it runs. `removeEventListener()` requires a named function and all of the same exact parameters to work properly.

```javascript
// Once the transition is complete, remove the inline height so the content can scale responsively
window.addEventListener('transitionend', function removeHeight () {
	elem.style.height = '';
	window.removeEventListener('transitionend', removeHeight, false);
}, false);
```

We'll do the same thing under our `hide()` method.

```javascript
// When the transition is complete, hide it
window.addEventListener('transitionend', function removeVisibility () {
	elem.classList.remove('is-visible');
	window.removeEventListener('transitionend', removeVisibility, false);
}, false);
```

[Here's a demo with our updated script.](https://jsfiddle.net/cferdinandi/qgpxvhhb/64/)

## Checking for the transition type

In our simple demo, we know exactly what transitions are happening on the element and can be certain the first one is what we want to trigger our behavior.

In a real website or app, that might not be the case. To make our code more resilient, we should check to see which transition type is happening and only run it if it's for `height`.

To accomplish this, we'll pass in `event` as an argument into our function and check the `propertyName` property.

```javascript
// Once the transition is complete, remove the inline max-height so the content can scale responsively
window.addEventListener('transitionend', function removeHeight (event) {
	if (!event.propertyName === 'height') return;
	elem.style.height = '';
	window.removeEventListener('transitionend', removeHeight, false);
}, false);
```

Here, we're checking to see if the `propertyName` is `height`. If not, we bail on our function. We'll do the same thing with our `hide()` method.

```javascript
// When the transition is complete, hide it
window.addEventListener('transitionend', function removeVisibility (event) {
	if (!event.propertyName === 'height') return;
	elem.classList.remove('is-visible');
	window.removeEventListener('transitionend', removeVisibility, false);
}, false);
```

[Here's a demo with the transition type check in place.](https://jsfiddle.net/cferdinandi/qgpxvhhb/66/)

## Event Prefixes

Older versions of Chrome, Android, Webkit, Safari, and Opera used vendor-prefixed versions of `transitionend` (ex. `webkitTransitionEnd`).

The affected browsers are many versions old at this point, but if you want to ensure that even someone using a version of Chrome or Opera that's dozens of versions behind can use your code, there's a method we can add to determine which event to listen for (shoutout to Diego for sharing this part, as well).

```javascript
// Get the event name
// Adapted from Modernizr: https://modernizr.com
var whichTransitionEvent = function () {
	var el = document.createElement('fakeelement');
	var transitions = {
		'transition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'MozTransition': 'transitionend',
		'WebkitTransition': 'webkitTransitionEnd'
	}

	for (var t in transitions) {
		if (el.style[t] !== undefined) {
			return transitions[t];
		}
	}
};
```

Then in our `show()` and `hide()` methods, we'll do this.

```javascript
// Get transition type
var transition = whichTransitionEvent();

// Once the transition is complete, remove the inline max-height so the content can scale responsively
window.addEventListener(transition, function removeHeight (event) {
	if (!event.propertyName === 'height') return;
	elem.style.height = '';
	window.removeEventListener(transition, removeHeight, false);
}, false);
```

Given how old the affect browsers are, I'll personally stick to the standard event names only, but your use case may vary.

## Putting it all together

Here's our completed script (without vendor prefixes).

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
	window.addEventListener('transitionend', function removeHeight (event) {
		if (!event.propertyName === 'height') return;
		elem.style.height = '';
		window.removeEventListener('transitionend', removeHeight, false);
	}, false);

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
	window.addEventListener('transitionend', function removeVisibility (event) {
		if (!event.propertyName === 'height') return;
		elem.classList.remove('is-visible');
		window.removeEventListener('transitionend', removeVisibility, false);
	}, false);

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