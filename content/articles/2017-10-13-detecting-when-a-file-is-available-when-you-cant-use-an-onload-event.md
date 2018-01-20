---
categories:
- Code
- JavaScript
date: '2017-10-13'
permalink: /detecting-when-a-file-is-available-when-you-cant-use-an-onload-event/
title: Detecting when a file is available when you can&#8217;t use an onload event
url: /2017/10/13/detecting-when-a-file-is-available-when-you-cant-use-an-onload-event
---

Sometimes you need to run a script only after another script was done loading (for example, waiting for jQuery to load before trying to run jQuery methods).

If you use an async loader like [loadJS](https://github.com/filamentgroup/loadJS/), you can use an `onload` event to detect when the script is loaded and setup a callback. However, that's not always an option&mdash;particularly if you're working with a rigid CMS or on a corporate site where you don't have control over how everything works.

Today, we're going to learn how to detect when a file is loaded even when you can't use an `onload` event.

## Loop and test

Yesterday, we looked at [how to create a loop with `requestAnimationFrame()` to check when the DOM is ready](/the-quickest-way-to-detect-when-the-dom-is-ready/). We can modify that technique to detect when a file is loaded.

This will only work if the script in question has a public method or namespace that you can hook into.

Instead of checking that `document.body` exists like we did yesterday, we'll look to see if the function name is available in the `window`. For example, to check for when jQuery is available, you'd do this.

```js
var isLoaded = function () {

    // If our file is loaded
    if ('jQuery' in window) {
        // Run your code here...

        // Return so that we don't call requestAnimationFrame() again
        return;
    }

    // If the body element isn't found, run ready() again at the next pain
    window.requestAnimationFrame(isLoaded);
};

// Initialize our isLoaded() function
window.requestAnimationFrame(isLoaded);
```

## What about when there's not a global function to hook into?

If your script is scoped in such a way that there's no global variables or function names to check for, you're not *completely* out of luck.

If your script does any sort of DOM manipulation, you could also check for those changes.

Perhaps it adds a class to `document.body` or to a specific element. You could do something like this:

```js
var isLoaded = function () {

    // If our file is loaded
    if (document.body.classList.contains('some-class-to-check-for')) {
        // Run your code here...

        // Return so that we don't call requestAnimationFrame() again
        return;
    }

    // If the body element isn't found, run ready() again at the next pain
    window.requestAnimationFrame(isLoaded);
};

// Initialize our isLoaded() function
window.requestAnimationFrame(isLoaded);
```

Or maybe it injects and element into the DOM that didn't exist before. You can check to see if it exists yet using `querySelector()`, like this.

```js
var isLoaded = function () {

    // If our file is loaded
    if (document.querySelector('#some-selector')) {
        // Run your code here...

        // Return so that we don't call requestAnimationFrame() again
        return;
    }

    // If the body element isn't found, run ready() again at the next pain
    window.requestAnimationFrame(isLoaded);
};

// Initialize our isLoaded() function
window.requestAnimationFrame(isLoaded);
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