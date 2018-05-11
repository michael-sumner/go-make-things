---
title: "How to check if a browser supports native input date pickers"
date: 2018-05-11T10:30:00-04:00
draft: false
categories:
- Accessibility
- Code
- CSS
- Design and UX
- HTML
- JavaScript
---

One of the  more useful newish `input` types to emerge with HTML5 is `type="date"`, which provides a browser-native date picker.

Unfortunately, while it works in most modern browsers, it's not supported by all of them. Firefox just added support with Quantum. IE doesn't support it at all. It, at the time of writing, only works in Safari on mobile, not desktop.

[Here's a demo you can check out.](https://jsfiddle.net/cferdinandi/za7sLd3p/1/)

Its appearance varies a bit from browser to browser. In unsupported browsers, it falls back to an empty text field.

Today, I want to show you how to test if a browser supports `input[type="date"]` so that you can provide an appropriate fallback or guidance when it doesn't.

## Testing for `input[type="date"]` support

When supported, the `date` input type will discard any value that's not part of a valid date.

We can use this to test support by creating an input with `type="date"`, trying to set it's value to an invalid date, and checking to see if it was discarded or not.

We'll use `document.createElement()` to create an input, and `setAttribute()` to give a type of `date` and a `value` equal to `a`. Then, we'll check if the value of the input still equals `a` or not and return a boolean accordingly.

```js
var isDateSupported = function () {
	var input = document.createElement('input');
	var value = 'a';
	input.setAttribute('type', 'date');
	input.setAttribute('value', value);
	return (input.value !== value);
};
```

You can test the browser like this.

```js
if (isDateSupported()) {
	// Browser native date pickers are supported!
}

if (!isDateSupported()) {
	// No support. Let's fallback to something else...
}
```

## How to handle fallbacks

What should you do when a browser doesn't support `input[type="date"]`?

One simple approach is to provide guidance around the input format. The `date` input type returns a value of `YYYY-MM-DD`. We can add a description to our form label indicating that, and hide it if `input[type="date"]` is supported.

```html
<label for="date">Date <span class="date-description">(in YYYY-MM-DD format please)</span></label>
<input type="date" name="date" id="date">
```

```css
/**
 * Date description styling
 */
.date-description {
	color: #808080;
	font-size: 0.8em;
}

/**
 * Hide when input[type="date"] is supported
 */
.supports-date .date-description {
	display: none;
}
```

```js
// Add a class to the HTML element if supported
if (isDateSupported()) {
	document.documentElement.className += ' supports-date';
}
```

Alternative, you could [use something like loadJS to conditionally load a fallback plugin](/how-to-only-load-your-javascript-file-if-the-browser-supports-your-code/) when `input[type="date"]` isn't supported.

```js
// Load a fallback when input[type="date"] is not supported
if (!isDateSupported()) {
	loadJS('path/to/some/fallback/plugin.js');
}
```