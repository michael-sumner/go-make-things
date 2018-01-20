---
categories:
- Code
- JavaScript
- Web Performance
date: '2018-01-02'
url: /conditionally-loading-javascript-only-when-the-browser-supports-it/
title: Conditionally loading JavaScript only when the browser supports it
---

One trick I use to reduce bandwidth consumption on older devices is to conditionally load my JavaScript files.

When a page on my site loads, I do a quick little check to make sure the browser and device support the JavaScript methods and browser APIs that I use in my scripts. If it does, I load my JavaScript file asynchronously. If not, the visitor gets a more basic experience.

Here's how it all works...

## Feature Testing

In the footer of my site, I include a little bit of inline JavaScript that runs a small feature test.

This determines the capabilities of the visitor's browser and device. I usually test support for two or three JavaScript methods or Browser APIs that have the least amount of browser support.

That typically means things like `addEventListener()` and `querySelector()`.

```js
if ('querySelector' in document && 'addEventListener' in window) {
	// The browser supports these methods.
	// We can load our JS.
}
```

You could also check for things like the existence of particular DOM element.

For example, if you had a syntax highlighting script, you might only want to load that on pages with code to be highlighted. You could check for `pre` or `code` elements before loading it.

```js
if ('querySelector' in document && document.querySelector('pre')) {
	// There's code on the page to highlight.
	// We can load our syntax highlighter.
}
```


## Loading and external JavaScript file

If the browser and device pass the test, I'll use a little bit of JavaScript to load my external JS file with all of my scripts.

This involves a few steps:

1. Create a new script element using `document.createElement()`.
2. Add the URL for my external JavaScript file as the script element `src` attribute.
3. Inject the script element into the DOM using `insertBefore()`.

```js
if ('querySelector' in document && 'addEventListener' in window) {

	// Create a script tag
	var script = document.createElement('script');

	// Assign a URL to the script element
	script.src = '/path/to/my/scripts.js';

	// Get the first script tag on the page (we'll insert our new one before it)
	var ref = document.querySelector('script');

	// Insert the new node before the reference node
	ref.parentNode.insertBefore(script, ref);

}
```

## A helper method

If you find yourself doing this a lot (or at least more than once on a site), there's a useful helper method you can use to make it easier: [loadJS from Filament Group](https://github.com/filamentgroup/loadJS/).

Inside your feature test, you'd call `loadJS('/path/to/my/scripts.js')` instead of manually creating a new element, getting the first script element, and so on.

```js
if ('querySelector' in document && 'addEventListener' in window) {

	// Load our scripts
	loadJS('/path/to/my/scripts.js');

}
```