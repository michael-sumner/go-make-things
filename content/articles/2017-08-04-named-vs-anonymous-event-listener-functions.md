---
categories:
- Code
- JavaScript
date: '2017-08-04'
title: Named vs. anonymous event listener functions
---

This is a pretty typical way of setting up an event listener:

```javascript
// Listen for scroll events
window.addEventListener('scroll', function (event) {
	// Do something on scroll...
}, false);
```

In the example above, we'll listen for `scroll` events and run some code.

Your function doesn't have to be included explicitly in the event listener, though. You can also set it up as a named, standalone function that you pass in, like this.

(*The `event` is automatically passed in as an argument to your function.*)

```javascript
// Do stuff on scroll
var onScrollHandler = function (event) {
	// Do something on scroll...
};

// Listen for scroll events
window.addEventListener('scroll', onScrollHandler, false);
```

Why would you want to do that, though? Two reasons.

First, on bigger projects, it lets you separate your functions, which actually do things, from your event listeners, which trigger things.

You may also want to run some code in multiple instances (on `scroll` *and* on `resize`, for example). A named function helps keep your code more DRY (an acronym for Don't Repeat Yourself).

Second, you can remove them later if you want using `removeEventListener()`. You cannot do this with anonymous functions.

For example, imagine if you wanted to terminate your scroll event after the user scroll 500px or more down your site. Here's how you'd do that.

```javascript
// Do stuff on scroll
var onScrollHandler = function (event) {
	// Do something on scroll...

	// End event listener after visitor scrolls past 500px
	if (window.pageYOffset > 500) {
		window.removeEventListener('scroll', onScrollHandler, false);
	}
};

// Listen for scroll events
window.addEventListener('scroll', onScrollHandler, false);
```

To use `removeEventListener()`, your event, handler, and useCapture (that last argument of `true` or `false`) must be identical to the original.