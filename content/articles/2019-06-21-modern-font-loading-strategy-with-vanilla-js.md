---
title: "A modern font loading strategy with the vanilla JS FontFaceSet.load() method"
date: 2019-06-21T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- JavaScript
- Web Performance
---

Custom typefaces make the web gorgeous. But, they can also be a major bottleneck for perceived performance, particularly on mobile devices and in developing nations with less reliable internet connections.

Let's dig in.

## The problem

In many browsers, if a custom typeface is declared but hasn't finished downloading and parsing yet, browsers will leave space for the text but not render it until the file is ready.

This is often called a *Flash Of Invisible Text* (or FOIT).

In a now slightly outdated article, [Ilya Grigorik, a web performance engineer at Google, reports](https://www.igvita.com/2015/04/10/fixing-the-blank-text-problem/):

> 29% of page loads on Chrome for Android displayed blank text: the user agent knew the text it needed to paint, but was blocked from doing so due to the unavailable font resource. In the median case the blank text time was ~350 ms, ~750 ms for the 75th percentile, and a scary ~2300 ms for the 95th.

To make matters worse, some mobile browsers never timeout a failed font file, and therefore never show text in a fallback typeface if the custom one fails to load. You get nothing at all.

Let's talk about how to fix that.

## The ideal behavior

Ideally, if there's a custom typeface, you want your text to render in a system font by default while the font file downloads, and "cut over" to the custom typeface while it's ready.

This is sometimes called a *Flash of Unstyled Text*, or FOUT. Some designers hate it, but from a user perspective, it's better to have a usable but less pretty page now than have to wait several seconds before you can do anything.

## The technique

To get this behavior, you define a system font to use by default. Then, you make your custom typeface conditional on some class being present on the `html` element.

```css
body {
	font-family: Georgia, Times, serif;
}

.fonts-loaded body {
	font-family: "PT Serif", serif;
}
```

Load the CSS file for your custom typeface with a `link` element like you normally would.

```html
<link href="https://fonts.googleapis.com/css?family=PT+Serif&display=swap" rel="stylesheet">
```

Then, you use a touch of vanilla JS to detect when the custom typeface is ready and add the `.fonts-loaded` class to the `html` element.

### The JavaScript

Historically, this required using [Bram Stein's amazing `fontFaceObserver` utility](https://github.com/bramstein/fontfaceobserver).
Today, there's a browser native method you can use instead: `FontFaceSet.load()`.

*Huge shoutout to [Zach Leatherman for teaching me this](https://www.zachleat.com/web/the-compromise/)!*

First, let's make sure the method is supported. If not, we'll bail.

```js
;(function () {
	if (!('fonts' in document)) return;
})();
```

This method uses promises to run a function after the font is loaded.

We'll pass in the font-size and name as an argument, and use `.then()` to setup our function that will run after the font is loaded. For ease, pass in `1em` as the font size.

In the function, we'll add a `.fonts-loaded` class to the `html` element, which will activate the custom typeface.

```js
;(function () {
	if (!('fonts' in document)) return;
	document.fonts.load('1em PT Serif').then(function () {
		document.documentElement.className += ' fonts-loaded';
	});
})();
```

### Subsequent page views

Depending on whether or not the server has far future expires headers set, the browser may cache the font file. For example, Google Fonts are cached for two weeks.

For two weeks after that first page load, we can safely assume the CSS file for the custom typeface is already there and skip the `document.fonts.load()` method.

To do that, we'll first set a cookie with an expiration of two weeks.

```js
;(function () {
	if (!('fonts' in document)) return;
	document.fonts.load('1em PT Serif').then(function () {
		var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = 'fontsLoaded=true; expires=' + expires;
		document.documentElement.className += ' fonts-loaded';
	});
})();
```

On page load, if the cookie exists we'll immediately add our `.fonts-loaded` class and call it a day. Working with cookies can be annoying, so I use a[ tiny helper function](https://vanillajstoolkit.com/helpers/getcookie/) for that.

```js
;(function () {

	if (!('fonts' in document)) return;

	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	};

	if (getCookie('fontsLoaded')) {
		document.documentElement.className += ' fonts-loaded';
		return;
	}

	document.fonts.load('1em PT Serif').then(function () {
		var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = 'fontsLoaded=true; expires=' + expires;
		document.documentElement.className += ' fonts-loaded';
	});

})();
```

## Browser Compatibility

The `FontFaceSet.load()` method works in all modern browsers, but not Edge or IE. Edge support will add support once they move over to Blink.

I'm comfortable letting those browsers get the system font. If you want to use the custom typeface for them, too, Zach recommends using `fontFaceObserver` as a fallback when `FontFaceSet.load()` isn't supported.

```js
;(function () {

	// Native behavior
	if ('fonts' in document) {
		document.fonts.load('1em PT Serif').then(function () {
			var expires = new Date(+new Date() + (7 * 24 * 60 * 60 * 1000)).toUTCString();
			document.cookie = 'fontsLoaded=true; expires=' + expires;
			document.documentElement.className += ' fonts-loaded';
		});
	}

	// Fallback for IE/Edge
	else {
		// Use fontFaceObserver
	}

})();
```