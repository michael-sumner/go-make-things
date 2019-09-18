---
title: "Setting a date input to today's date with vanilla JS"
date: 2019-04-29T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

On Friday, [Dave Rupert tweeted](https://twitter.com/davatron5000/status/1121882969650675712):

> I'm gonna write a country western song about trying to use vanilla JavaScript to set the default value of an `<input type="date">` to today's date.
>
> Basically everyone dies and you end up using moment.js and a two-ton datepicker.

Challenge accepted, Dave!

Today, I'm going to show you how to do just that.

## The Date Input

HTML5 introduced a bunch of new types you can use on a traditional input.

Browsers can use these types to show you context-specific keyboards (on touch screen devices), provide native input validation, and, in the case things like dates, surface a native date picker.

```html
<input type="date">
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/mggONm)

## Automatically setting today's date

To automatically set a `[type="date"]` input to today's date with vanilla JS, we'll use the JavaScript `Date()` object.

First, we'll get our field (let's assume it has an ID of `#today`) and create a new `Date()` object.

```js
var field = document.querySelector('#today');
var date = new Date();
```

The `[type="date"]` field looks different visually depending on where you live and what browser you're using (it shows dates in local format norms), but the `value` follows a `YYYY-MM-DD` format.

We can get each of those values from our `date`, convert them to a string with `toString()`, and concatenate them into a single value.

- We'll use `getFullYear()` to get the year in a four-character format.
- We'll use `getMonth()` to get the month.
- We'll use `getDate()` to get the day.

For some absurd reason, the `getMonth()` method returns the month as a number starting with `0` (January is `0`, February is `1`, etc.). We need to add `1` to our result to get the correct month.

Because they're numbers and not strings, both `getMonth()` and `getDate()` are missing leading zeros for single digit months/days. We can use the `padStart()` method to add those if missing.

Our finished result looks like this.

```js
field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
```

[And here's a working example.](https://codepen.io/cferdinandi/pen/VNNPPb)

## Browser compatibility

The `[type="date"]` input type works in Chrome, Firefox, and Edge on desktop, and on most mobile browsers. It does *not* work in Internet Explorer or Safari for desktop. Browsers that don't support it treat the input like `[type="text"]`.

The `padStart()` method works in all modern browsers, but not Internet Explorer. [A polyfill pushes support back to IE6.](https://vanillajstoolkit.com/polyfills/stringpadstart/)

## Handling unsupported browsers

So, what do we do about unsupported browsers?

We can test for browser support by creating an `[type="date"]` input, trying to set it to an invalid date value (like `x`), and checking to see what the value actually is.

```js
/**
 * Test if the browser supports input[type="date"]
 * @return {Boolean} Returns true if it's supported
 */
var isDateSupported = function () {
	var input = document.createElement('input');
	input.setAttribute('type', 'date');
	input.setAttribute('value', 'x');
	return (input.value !== 'x');
};
```

[You can find this helper method on the Vanilla JS Toolkit.](https://vanillajstoolkit.com/helpers/isdatesupported/)

Let's do a few things:

1. Add some helper text to our input label on the proper format that we can hide if the `date` input type is supported.
2. Add a `pattern` attribute to validate against for unsupported browsers.
3. Add a `placeholder` attribute with the pattern as well.

```html
<label for="today">
	The Date
	<span class="description"> Please use the YYYY-MM-DD format</span>
</label>
<input
	id="today"
	type="date"
	pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" placeholder="YYYY-MM-DD"
>
```

The JavaScript to set the date won't change, but we can add some additional code to remove the pattern, placeholder, and helper text if not needed.

```js
// Variables
var field = document.querySelector('#today');
var date = new Date();

// If [type="date"] is supported, update the DOM
if (isDateSupported()) {

	// Remove attributes
	field.removeAttribute('pattern');
	field.removeAttribute('placeholder');

	// Remove the helper text
	var helperText = document.querySelector('[for="today"] .description');
	if (helperText) {
		helperText.parentNode.removeChild(helperText);
	}

}

// Set the value
field.value = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);
```

[Here's a demo with the fallbacks for unsupported browsers.](https://codepen.io/cferdinandi/pen/PggWLx)