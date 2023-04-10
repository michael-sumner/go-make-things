---
title: How to convert numbers into currency strings with vanilla JavaScript and the Internationalization API
date: 2023-04-10T10:30:00-04:00
draft: false
categories:
- Accessibility
- Art and Science
- Business and Leadership
- Careers
- Code
- CSS
- Design and UX
- HTML
- JavaScript
- Technology
- Web Performance
- WordPress
- Vanilla Framework Demos
---

_Today's article is adopted from [a new series of tutorials I've created on JavaScript's coolest modern features](https://vanillajsshorts.com/). Each one is longer than a blog post but shorter than a course. [Learn more at VanillaJSShorts.com.](https://vanillajsshorts.com)_

The `Intl` object is the parent object for a handful of objects that comprise the Internationalization API.

Each object is focused on a specific task, can be instantiated with a constructor function, and surfaces one or more methods for converting numbers, strings, and dates into a location-aware format.

Today, we're going to look at how to convert a number into a localized currency string using the `Intl.NumberFormat` object. Let's dig in!

## The `Intl.NumberFormat` object and locales

The `Intl.NumberFormat` object can be used to format numbers into a variety of outputs, including currencies, percentages, and units of measure.

You can use the `new Intl.NumberFormat()` constructor to create a new `Intl.NumberFormat` object. The first argument is a _locale_, a string or array of strings that identifies the localized language you want to use for formatting.

There are a variety of acceptable formats for the _locale_...

- A two-digit string. For example, `en` for English.
- A tag and subtag. For example `en-US` for United States English or `en-GB` for Great Britain English.
- Multiple subtags. For example, `de-CH-1996` for the modern Swiss variant of German.

You can find a full list of tags and subtags on the [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry).

Here, I'm create a new `Intl.NumberFormat` object with United States English as my _locale_.

```javascript
// Create a new Intl.NumberFormat object
let formatCurrency = new Intl.NumberFormat('en-US');
```

## Getting a localized currency string

The `new Intl.NumberFormat()` constructor accepts an object of options that define how the number should be formatted.

For our purposes today, the most important one is `style`, which defines how to format the string. By default, it has a value of `decimal`. We want to set it to `currency` to format our number as money.

When the `style` is set to `currency`, you also need to define a `currency` property with the ISO 4217 currency code to use (like `USD` or `EUR`).

```javascript
// Define how the number should be formatted
let formatCurrency = new Intl.NumberFormat('en-US', {

	// The formatting style to use
	style: 'currency',

	// The currency to use when "style" is set to "currency" (required)
	// An ISO 4217 currency codes
	currency: 'USD'

});
```

Once we have our `Intl.FormatNumber` object, we can run the `Intl.FormatNumber.format()` method on it, passing in the number to format as an argument.

```javascript
// Create an Intl.NumberFormat object
let formatCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

// Format a number to a string
// returns "$42.00"
let price = formatCurrency.format(42);
```

## More options and settings

The `new Intl.NumberFormat()` constructor accepts some additional options we can use to customize how the currency string is formatted.

The `currencyDisplay` controls the currency symbol. By default, it has a value of `symbol` (like `$`). Other options include `narrowSymbol` (like using `$` instead of `US$`), `code` (which displays the ISO currency code), and `name` (which displays something like `dollar`).

Depending on the chosen locale and currency, `symbol` and `narrowSymbol` may display the same output.

```javascript
// Define how the number should be formatted
let formatCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',

	// How to display the currency type
	// 'symbol' (default) - use a local currency symbol like $
	// 'narrowSymbol' - use a narrow symbol like "$" instead of "US$" (depending on locale may be the same as 'symbol')
	// 'code' - the ISO currency code
	// 'name' - the local currency name like "dollar"
	currencyDisplay: 'symbol'

});
```

The `currencySign` property defines whether to use a `standard` currency sign for negative numbers, or to use the `accounting` style and wrap them in parentheses (if that's typical in the defined _locale_).

The `maximumFractionDigits` defaults to whatever the normal practice is for the _locale_ and `currency` you've specified. You can change to it a value between `0` and `3`. 

In this example, we're not going to use any fractions.

```javascript
// Define how the number should be formatted
let formatCurrency = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'symbol',

	// How to display the currency sign
	// 'standard' (default) or 'accounting' (for displaying negative numbers)
	currencySign: 'standard',

	// Maximum number of fraction digits to use
	maximumFractionDigits: 0

});
```

This updated example would output `$42` instead of `$42.00`.

```js
// returns "$42"
let price = formatCurrency.format(42);
```

## More internationalization

You can use the [Internationalization API](https://vanillajsshorts.com/intl/) to to do all sorts of things, including formatting units of measure and `Date` objects.

If you want to learn more about it, or a bunch of other cool modern JavaScript APIs, check out [my new Vanilla JS Shorts series](https://vanillajsshorts.com).