---
categories:
- Code
- JavaScript
date: '2017-05-03'
url: /event-listener-performance-with-vanilla-js/
title: Event listener performance with vanilla JS
---

Events like `scroll` and `resize` can cause huge performance issues on certain browsers. [Paul Irish explains:](https://www.paulirish.com/2009/throttled-smartresize-jquery-event-handler/)

> If you’ve ever attached an event handler to the window’s resize event, you have probably noticed that while Firefox fires the event slow and sensibly, IE and Webkit go totally spastic.

Debouncing is a way of forcing an event listener to wait a certain period of time before firing again. To use this approach, we'll setup a `timeout` element. This is used as a counter to tell us how long it's been since the event was last run.

When our event fires, if `timeout` has no value, we'll assign a `setTimeout` function that expires after 66ms and contains our the methods we want to run on the event.

If it's been less than 66ms from when the last event ran, nothing else will happen.

```javascript
// Setup a timer
var timeout;

// Listen for resize events
window.addEventListener('resize', function ( event ) {
	console.log( 'no debounce' );

	// If timer is null, reset it to 66ms and run your functions.
	// Otherwise, wait until timer is cleared
	if ( !timeout ) {
		timeout = setTimeout(function() {

			// Reset timeout
			timeout = null;

			// Run our resize functions
			console.log( 'debounced' );

		}, 66);
	}
}, false);
```

To see that in action, copy/paste that into the console on this page using Chrome or Safari, then resize the window.