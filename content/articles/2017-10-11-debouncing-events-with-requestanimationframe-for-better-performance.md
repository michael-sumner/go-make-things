---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-10-11'
permalink: /debouncing-events-with-requestanimationframe-for-better-performance/
title: Debouncing events with requestAnimationFrame() for better performance
url: /2017/10/11/debouncing-events-with-requestanimationframe-for-better-performance
---

Earlier this year, I wrote an article about [how `scroll` and `resize` event listeners can be crippling for performance](/event-listener-performance-with-vanilla-js/) on certain browsers.

The solution is a technique known as debouncing.

> Debouncing is a way of forcing an event listener to wait a certain period of time before firing again.

At the time, I recommended using `setTimeout()` with a wait time of 66 milliseconds (the approximate refresh rate of modern monitors) to maximize jank and maximize performance.

```lang-js
// Setup a timer
var timeout;

// Listen for scrolling events
window.addEventListener('scroll', function ( event ) {
    console.log( 'no debounce' );

    // If timer is null, reset it to 66ms and run your functions.
    // Otherwise, wait until timer is cleared
    if ( !timeout ) {
        timeout = setTimeout(function() {

            // Reset timeout
            timeout = null;

            // Run our scroll functions
            console.log( 'debounced' );

        }, 66);
    }
}, false);
```

## A better approach

There's a better way to do this, though: `requestAnimationFrame()`. Just like `setTimeout()`, the `requestAnimationFrame()` sets up a callback function. Instead of running after a certain period of time, though, it runs the next time a page paint is requested.

```lang-js
window.requestAnimationFrame(function () {
    console.log('paint!');
});
```

This provides a better way to loop over events, because it runs when the browser paint is actually happening, rather than when we guestimate it will (ever 66 milliseconds).

Here's the same approach, but with `requestAnimationFrame()` instead.

```lang-js
// Setup a timer
var timeout;

// Listen for resize events
window.addEventListener('scroll', function ( event ) {

	console.log( 'no debounce' );

	// If there's a timer, cancel it
	if (timeout) {
		window.cancelAnimationFrame(timeout);
	}

    // Setup the new requestAnimationFrame()
	timeout = window.requestAnimationFrame(function () {

        // Run our scroll functions
		console.log( 'debounced' );

	});

}, false);
```

## Browser Compatibility

`requestAnimationFrame()` works in all modern browsers, and IE10 and up. You can push support back to older browsers with [this polyfill from Paul Irish](https://gist.github.com/paulirish/1579671), which falls back to `setTimeout()`.

```lang-js
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
```