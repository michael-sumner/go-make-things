---
categories:
- Code
- JavaScript
- Web Performance
date: '2017-10-12'
title: The quickest way to detect when the DOM is ready
---

A couple of years ago, I shared [a native equivalent of jQuery's `ready()` method](/a-native-javascript-equivalent-of-jquerys-ready-method/). It's one of the most popular articles on my site.

Today, I wanted to share an approach that detects DOM ready state faster [using the `requestAnimationFrame()` method](/debouncing-events-with-requestanimationframe-for-better-performance/) that we looked at yesterday.

## Different types of ready

The old method I shared used `addEventListener()` to detect when the document was ready. There are two events you can listen for:

1. `interactive`, which runs when content on the page is interactive but all assets are not necessarily loaded.
2. `complete`, which runs when all content is fully loaded.

`interactive` happens first, and if an assets hangs, sometimes `complete` never fires.

But what if you wanted to to run a task as soon as the `body` element was available, before it was even interactive? This could be useful if you're, for example, trying to suppress the DOM to replace it with other content, or if you want to get an element as soon as possible.

## A different approach

We can use `requestAnimationFrame()` to repeatedly check if the `body` element exists, and then run a function once it does.

```js
var ready = function () {

	// If the body element exists
	if (document.body) {
		// Run your code here...

		// Return so that we don't call requestAnimationFrame() again
		return;
	}

	// If the body element isn't found, run ready() again at the next pain
	window.requestAnimationFrame(ready);
};

// Initialize our ready() function
window.requestAnimationFrame(ready);
```

I've found on certain browsers, most notably iOS, just because the `body` is available doesn't mean elements inside it are, so if you're looking for one in particular, you should check for that, too.

Here's an example checking to see if an element with the ID `#main` exists.

```js
var ready = function () {

	// If the body element and the #main element exist
	if (document.body && document.querySelector('#main')) {
		// Run your code here...

		// Return so that we don't call requestAnimationFrame() again
		return;
	}

	// If the body element isn't found, run ready() again at the next pain
	window.requestAnimationFrame(ready);
};

// Initialize our ready() function
window.requestAnimationFrame(ready);
```

## Browser Compatibility

`requestAnimationFrame()` works in all modern browsers, and IE10 and up. You can push support back to older browsers with [this polyfill from Paul Irish](https://gist.github.com/paulirish/1579671).

```js
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