---
title: "Going full screen with vanilla JS"
date: 2018-08-09T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

One of my students asked how to make an element (or entire web page) toggle into full screen mode when a button is clicked.

Fortunately, there's a browser-native API for that!

## The Fullscreen API

The [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) exposes two methods, two events, and a property.

- The `Element.requestFullscreen()` method puts an element into full screen mode.
- The `document.exitFullscreen()` method exits full screen mode (it's always called on the `document`).
- The `fullscreenchange` event fires when the browser goes in or out of full screen mode.
- The `fullscreenerror` event fires when an element fails to enter full screen mode.
- The `document.fullscreenElement` property tells you which element is currently in full screen mode.

## An example

Let's say you have a button that, when clicked, should put the whole page into full screen mode.

```html
<button data-toggle-fullscreen>Toggle Fullscreen</button>
```

First, you'll create an event listener, and ignore any clicks that aren't on the button.

```js
document.addEventListener('click', function (event) {

	// Ignore clicks that weren't on the toggle button
	if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

}, false);
```

Then, you'll use `document.fullscreenElement` to check if something is already in full screen mode. If it is, you'll use the `exitFullscreen()` method to exit. Otherwise, you'll use the `requestFullscreen()` on the `document.documentElement` to enter it.

```js
document.addEventListener('click', function (event) {

	// Ignore clicks that weren't on the toggle button
	if (!event.target.hasAttribute('data-toggle-fullscreen')) return;

	// If there's an element in fullscreen, exit
	// Otherwise, enter it
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}

}, false);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/ZjVEER)

<p data-height="265" data-theme-id="light" data-slug-hash="ZjVEER" data-default-tab="js,result" data-user="cferdinandi" data-pen-title="Fullscreen API Demo" class="codepen"></p>

## Browser Compatibility

The Fullscreen API works with all modern browsers, and IE11 and up. *However...* many browsers use namespaced implementations (like `webkitRequestFullscreen()`) instead of the standard.

I have [polyfills on the Vanilla JS Toolkit](https://vanillajstoolkit.com/polyfills) for [`requestFullscreen()`](https://vanillajstoolkit.com/polyfills/elementrequestfullscreen/), [`exitFullscreen()`](https://vanillajstoolkit.com/polyfills/documentexitfullscreen/), and [`fullscreenElement`](https://vanillajstoolkit.com/polyfills/documentfullscreenelement/), that eliminate the need for vendor prefixes.

If you need support for events, too, I'd instead recommend using the full featured [Fullscreen API Polyfill](https://github.com/neovov/Fullscreen-API-Polyfill).