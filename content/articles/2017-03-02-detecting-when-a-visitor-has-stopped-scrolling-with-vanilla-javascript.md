---
categories:
- Code
- JavaScript
date: '2017-03-02'
title: Detecting when a visitor has stopped scrolling with vanilla JavaScript
---

For one of my open source projects, I was recently asked if there's a way to delay running something until after scrolling has finished.

There's no native JavaScript event for when scrolling stops, but it is something you can detect pretty easily with just a few lines of code.

## The Approach

We want to listen for scroll events using `addEventListener`. We'll set a delayed timeout function to run a few milliseconds after the event, **but** with each scroll event we'll clear that timeout function so it doesn't run.

When scrolling has stopped, the delayed function *doesn't* get cleared and runs.

## The Code

```javascript
// Setup isScrolling variable
var isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {

	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {

		// Run the callback
		console.log( 'Scrolling has stopped.' );

	}, 66);

}, false);
```

## A Helper Function

I've thrown together a [really lightweight helper function, `scrollStop.js`](https://github.com/cferdinandi/scrollStop), that you can use on your projects.

Add the function to your script and then pass in the code to run when scrolling stops as a callback.

```javascript
var scrollStop = function (callback) {
    ...
}

scrollStop(function () {
    console.log( 'Scrolling has stopped.' );
});
```

You can [download `scrollStop` on GitHub.](https://github.com/cferdinandi/scrollStop) or [view the demo](https://cferdinandi.github.io/scrollStop/).