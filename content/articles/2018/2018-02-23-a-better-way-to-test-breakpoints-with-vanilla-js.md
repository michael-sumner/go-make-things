---
title: "A better way to test breakpoints with vanilla JavaScript"
date: 2018-02-23T10:30:00-05:00
draft: false
categories:
- Code
- CSS
- JavaScript
---

Yesterday, we looked at [a simple way to run code conditionally based on different breakpoints](/breakpoint-conditional-javascript-in-vanilla-js/).

Today, let's look at a more robust way to handle breakpoints: `window.matchMedia()`.

## How it works

The `window.matchMedia()` method let's you test anything you would include in a media query in CSS.

```js
window.matchMedia('screen and (min-width: 40em)');
```

The `window.matchMedia()` method returns an object with three items:

- `matches`, a boolean indicating whether or not your media query currently matches.
- `media`, the media query you passed in.
- `onchange`, an event listener you can hook into to run when a change in the viewport causes your media query to match.

## Some examples

For example, let’s log `Wide viewport` into the console if the width is greater than 640px, and `Small viewport` if it’s smaller than that.

We'll use `matches` to check if that's the case or not.

```js
if (window.matchMedia('(min-width: 640px)').matches) {
	console.log('Wide viewport');
} else {
	console.log('Small viewport');
}
```

[Here's a demo.](https://jsfiddle.net/cferdinandi/qh9958oy/) Adjust the layout and reload to see how the logged value changes (it’s using the results window, not your browser, in this example).

You could also use it to check for things like device orientation.

```js
if (window.matchMedia('(orientation: portrait)').matches) {
	console.log('Portrait');
} else {
	console.log('Landscape');
}
```

Want to run a function when the orientation switches to portrait. Use the `onchange` event for that.

```js
window.matchMedia('(orientation: portrait)').onchange = function (event) {
	console.log('The orientation is portrait now');
};
```

*__Quick note on this:__ in my own testing, the `onchange` event ran whenever the viewport crossed the threshold. For example, dipping below `640px` and rising above it both triggered the event to run. Use with caution and/or run a `matches` check inside the function for best results.*

## Browser compatibility

The `window.matchMedia()` method works in all modern browsers, and IE10 and above.

That's pretty solid support, but [a polyfill](https://vanillajstoolkit.com/polyfills/matchmedia/) from Scott Jehl, Paul Irish, Nicholas Zakas, and David Knight pushes that back to IE6. If you want to polyfill the `onchange` event, there's [a separate polyfill extension](https://vanillajstoolkit.com/polyfills/matchmediaaddeventlistener/) for that.

```js
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. MIT license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
```