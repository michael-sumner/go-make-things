---
categories:
- Accessibility
- Code
- CSS
- Design and UX
date: '2016-12-13'
url: /a11y-and-text-just-for-screen-readers/
title: a11y and text just for screen readers
---

In [Kraken](https://cferdinandi.github.io/kraken/), [Keel](https://keel.gomakethings.com/), and pretty much any site I build, I use the `.screen-reader` class to visually hide content that I still want available to screen readers. It's an approach I adapted from the HTML5 Boilerplate.

You can also set content to reappear if in focus (useful for things like [skip nav links](/hidden-content-for-better-a11y/) for sighted keyboard users).

```css
/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
.screen-reader {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	width: 1px;
}

/**
 * Extends the .screen-reader class to allow the element to be focusable when navigated to via the keyboard
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link https://www.drupal.org/node/897638
 */
.screen-reader-focusable:active,
.screen-reader-focusable:focus {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	width: auto;
}
```

However, I just learned that on some screen readers, that `width: 1px` setting [can cause all of the text inside to collapse into a single word](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe#.a4reakhtm). For example:

```markup
<a class="screen-reader" href="#main">Skip to the main content</a>
```

Would get read aloud as:

```
Skiptothemainnav
```

Fortunately, J. Renée Beach has fix! Just add `white-space: nowrap;` to prevent the collapse:

```css
/**
 * Visually hide an element, but leave it available for screen readers
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link http://snook.ca/archives/html_and_css/hiding-content-for-accessibility
 */
.screen-reader {
	border: 0;
	clip: rect(0 0 0 0);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
}
```

And for focus visible text, I set it back to normal.

```css
/**
 * Extends the .screen-reader class to allow the element to be focusable when navigated to via the keyboard
 * @link https://github.com/h5bp/html5-boilerplate/blob/master/dist/css/main.css
 * @link https://www.drupal.org/node/897638
 */
.screen-reader-focusable:active,
.screen-reader-focusable:focus {
	clip: auto;
	height: auto;
	margin: 0;
	overflow: visible;
	position: static;
	white-space: normal;
	width: auto;
}
```