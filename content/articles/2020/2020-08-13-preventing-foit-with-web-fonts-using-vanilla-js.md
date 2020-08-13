---
title: "Preventing FOIT with web fonts using the vanilla JS fonts.load() method"
date: 2020-08-13T10:30:00-04:00
draft: false
categories:
- Code
- CSS
- Design and UX
- JavaScript
---

Over the last few days, we've looked at [how to self-host Google fonts](/how-to-self-host-google-fonts/), [how to load web font CSS asynchronously](/how-to-load-css-asynchronously/), and [how to use service workers to speed up font loading time](/improving-web-font-performance-with-service-workers/).

Today, we're going to learn how to prevent *FOIT*, a *Flash of Invisible Text*, with a dash of vanilla JS.

## WTF is FOIT?

In many browsers, if a custom web font (as in, a font that's not already on your computer) is declared but hasn’t finished downloading and parsing yet, browsers will leave space for the text but not render it until the file is ready.

This is often called a *Flash Of Invisible Text* (or *FOIT*).

[Designer Malthe Milthers explains...](https://www.malthemilthers.com/font-loading-strategy-acceptable-flash-of-invisible-text/)

> If you simply load your web font in an `@font-face` block and style some text with it, you’re essentially letting the browser decide how to handle this gap between the page load and the font load. Chrome, Opera and Firefox will hide your text for up to 3 seconds before falling back on a system font. They will then swap it with the web font as soon as it is ready...
>
> Lastly, Safari will hide your text for as long as it takes to download the font — potentially forever.

This can result in a big gap between when your content is ready and when it can actually be read by your visitors.

And famously, back in 2015, before Mitt Romney decided to run for President, a headline in Slate Magazine appeared to indicate he *was* running [because the word "not" was in a different typeface that didn't load quickly and showed up as blank text](https://www.zachleat.com/web/mitt-romney-webfont-problem/).

So, what can we do about this?

## The vanilla JS `fonts.load()` method

The `fonts.load()` method is a browser-native (aka vanilla JS) method that returns a Promise that resolves a font loads.

It requires a font size and typeface name, passed in as a string, as an argument.

```js
// When PT Serif loads
document.fonts.load('1em PT Serif').then(function () {
	// The font is loaded
	// Do something
	console.log('The font is loaded!');
});
```

We can use this method to prevent FOIT.

First, in our CSS, we declare a system font as our main typeface.

```css
body {
	font-family: Georgia, Times, serif;
}
```

Once our font is loaded, we can add a class to the `document.documentElement`.

```js
// When PT Serif loads
document.fonts.load('1em PT Serif').then(function () {
	// The font is loaded
	// Add our loaded class
	document.documentElement.className += ' fonts-loaded';
});
```

Finally, in our CSS, we can hook into that class to switch over to our custom typeface.

```css
body {
	font-family: Georgia, Times, serif;
}

.fonts-loaded body {
	font-family: "PT Serif", serif;
}
```

By default, our site will immediately render content with a system font. Once our custom font is ready, we'll swap it out. This was, the user is never stuck waiting for access to content.

## Waiting for multiple font files

Many custom web fonts include separate font files for different weights. PT Serif, for example, requires separate files for regular, bold, italic, and bold with italic.

The `fonts.load()` method allows you to specify weight and style along with the font size and typeface. We can use the `Promise.all()` method to detect when all weights and styles have finished loading.

```js
// When all PT Serif styles are loaded
Promise.all([
	document.fonts.load('1em PT Serif'),
	document.fonts.load('700 1em PT Serif'),
	document.fonts.load('italic 1em PT Serif'),
	document.fonts.load('italic 700 1em PT Serif')
]).then(function () {
	// The font is loaded
	// Add our loaded class
	document.documentElement.className += ' fonts-loaded';
});
```

## Browser compatibility

Both the `fonts.load()` method and `Promise.all()` method work in all modern browsers, but not IE.

While [Bram Stein's `fontFaceObserver` library provides a backwards compatible workaround](https://github.com/bramstein/fontfaceobserver), I would personally treat this is a progressive enhancement that only newer browsers get.

To prevent errors, you should check that the browser supports `fonts.load()` before trying to run it.

```js
// If the browser supports the fonts.load() method
if ('fonts' in document) {

	// When all PT Serif styles are loaded
	Promise.all([
		document.fonts.load('1em PT Serif'),
		document.fonts.load('700 1em PT Serif'),
		document.fonts.load('italic 1em PT Serif'),
		document.fonts.load('italic 700 1em PT Serif')
	]).then(function () {
		// The font is loaded
		// Add our loaded class
		document.documentElement.className += ' fonts-loaded';
	});

}
```