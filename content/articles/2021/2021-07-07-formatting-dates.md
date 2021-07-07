---
title: "Formatting dates and times with vanilla JS"
date: 2021-07-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to format dates and times into a variety of outputs. Let's dig in!

## The `Date.toLocaleString()` method

The `Date.toLocaleString()` method can be used to create a formatted date and time string from a Date object.

It accepts two arguments: the `locale` to format the string with, and an object of formatting `options`.

The `locale` is typically a language code. For example, for American English, you would use `en-US`. The `options` object includes settings like `dateStyle` and `timeStyle` (both of which accept values of `full`, `long`, `medium`, and `short`).

[You can view a full list of options on MDN.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#syntax)

```js
let now = new Date();

// Get a formatted string
// returns something like "July 6, 2021 at 1:42 PM"
let formatDate = now.toLocaleString('en-US', {
	dateStyle: 'long',
	timeStyle: 'short',
	hour12: true
});
```

## Formatting varies by location

The `locale` argument controls the formatting conventions.

For example, if we used British English (`en-UK`) instead, our date and time would return formatted a bit differently. The day comes before the month, the time had a leading `0`, the date and time are separated by a comma, and `am`/`pm` are in lowercase.

```js
// returns something like "6 July 2021, 01:42 pm"
let formatDate = now.toLocaleString('en-UK', {
	dateStyle: 'long',
	timeStyle: 'short',
	hour12: true
});
```

You can automatically format a date string to the user's `locale` with the `navigator.language` property.

```js
// This will automatically use the user's browser language for formatting
let formatDate = now.toLocaleString(navigator.language, {
	dateStyle: 'long',
	timeStyle: 'short',
	hour12: true
});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/bGWpwra?editors=1112)