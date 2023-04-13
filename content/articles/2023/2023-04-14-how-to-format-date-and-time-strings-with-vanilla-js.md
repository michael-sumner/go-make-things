---
title: How to format Date and Time strings with vanilla JavaScript
date: 2023-04-14T10:30:00-04:00
draft: false
---

_Today’s article is adapted from my new [Vanilla JS Shorts](https://vanillajsshorts.com) on [the Internationalization API](https://vanillajsshorts.com/intl/)._

Yesterday, we looked at [how to get Date values with JavaScript](/how-to-get-date-values-with-vanilla-javascript/). Today, we're going to learn how to format date and time strings.

Let's dig in!

## The `Intl.DateTimeFormat` Object

The `Intl.DateTimeFormat` object can be used to format `Date` objects into a variety of string outputs. You can use the `new Intl.DateTimeFormat()` constructor to create a new `Intl.DateTimeFormat` object. 

Pass in the _locale_ to use, either as a string or array of strings.

There are a variety of acceptable formats for the _locale_:

- A two-digit string. For example, `en` for English.
- A tag and subtag. For example `en-US` for United States English or `en-GB` for Great Britain English.
- Multiple subtags. For example, `de-CH-1996` for the modern Swiss variant of German.

You can find a full list of tags and subtags on the [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

```javascript
// Create a new Intl.DateTimeFormat object
let formatter = new Intl.DateTimeFormat('en-US');
```

## Formatting Options

The `new Intl.DateTimeFormat()` constructor also accepts an optional second argument, an object of options that define how the `Date` should be formatted.

You can mix-and-match them, or use none of them. If the `dateStyle` or `timeStyle` properties are defined, they can be used with each other but not with any other options.

```javascript
// Define how the Date should be formatted
let formatter = new Intl.DateTimeFormat('en-US', {

	// The formatting style to use for the date
	// Can be used with timeStyle, but not with other options
	// 'full' (default), 'long', 'medium', 'short'
	dateStyle: 'full',

	// The formatting style to use for the time
	// Can be used with dateStyle, but not with other options
	// 'full' (default), 'long', 'medium', 'short'
	timeStyle: 'full',

	// If true, use 12-hour clock
	// Default is locale dependent
	hour12: true,

	// How to format the time of day (am, morning, etc.)
	// Only works if a 12-hour clock is used
	// 'narrow', 'short', or 'long'
	dayPeriod: 'narrow',

	// How to format the day of the week
	// 'long' ("Thursday"), 'short' ("Thu"), 'narrow' ("T")
	weekday: 'long',

	// How to format the era
	// 'long' ("Anno Domini"), 'short' ("AD"), 'narrow' ("A")
	era: 'short',

	// How to format the year
	// 'numeric' ("2023"), '2-digit' ("23")
	year: 'numeric',

	// How to format the month
	// 'numeric' ("3"), '2-digit' ("03"), 'long' ("March"), 'short' ("Mar"), 'narrow' ("M")
	month: 'long',

	// How to format the day of the month
	// 'numeric' ("1"), '2-digit' ("01")
	day: 'numeric',

	// How to format the hour of day
	// 'numeric', '2-digit'
	hour: 'numeric',

	// How to format the minutes
	// 'numeric', '2-digit'
	minute: 'numeric',

	// How to format the seconds
	// 'numeric', '2-digit'
	second: 'numeric',

	// Number of digits to include for fractions of second
	// 0 to 3
	fractionalSecondDigits: 0,

	// How to format the timezone
	// 'long' ("Eastern Standard Time"), 'short' ("EST"), 'shortOffset' ("GMT-5"), 'longOffset' ("GMT-0500"), 'shortGeneric' ("ET"), 'longGeneric' ("Eastern Time")
	timeZoneName: 'short'

});
```

## Actually formatting the `Date` object into a string

Once you have an `Intl.DateTimeFormat` object with your formatting options defined, you can run the `format()` method on it, and pass in your `Date` object as an argument.

```javascript
// Create an Intl.DateTimeFormat object
let formatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
	timeStyle: 'short' 
});

// Create a Date object
let date = new Date('2023-10-31T22:00:00');

// Format a Date to a string
// returns "Oct 31, 2023, 10:00 PM"
let halloween = formatter.format(date);
```