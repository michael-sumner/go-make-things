---
title: How to format a number as currency with the Intl.NumberFormat API in vanilla JavaScript
date: 2022-06-02T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Yesterday, we looked at [how to create a formatted string from a number with the `Intl.NumberFormat` API](/how-to-create-a-formatted-string-from-a-number-with-the-intl.numberformat-api/). 

Today, we're going to learn how to use that same API to format currency. Let's dig in!

(_If you haven't yet, go read yesterday's article first or this one won't make any sense._)

## The `options` parameter on the `Intl.NumberFormat()` constructor

The `new Intl.NumberFormat()` constructor accepts a second optional argument: an object of `options`. We can use that to format a number into a currency.

For example, let's imagine that you have an amount of money as a number.

```js
let total = 67123.45;
```

You want to display this as a currency, like `$67,123.45`.

First, we'll create a `new Intl.NumberFormat()` constructor. We'll pass in `undefined` as the `locale` to use the visitors default language. We'll also include an object of `options`.

For the `options` object, we'll include a `style` property with a value of `currency`, and a `currency` property with a value of `USD`.

```js
let formatCurrency = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD'
});
```

Now, when we run the `Intl.NumberFormat.format()` method, our number gets formatted into a currency string.

```js
// returns "$67,123.45"
let money = formatCurrency.format(total);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWQXwyG?editors=1111)

## Changing the currency type

Unfortunately, there is no default value for the `currency` property in the `options` object.

If `style` is `currency`, the `currency` property must be included. There's also currently no browser-native way to get the user's local currency. It has to be set manually.

In this example, a string of `£67,123.45` for British Pounds is returned.

```js
let formatPounds = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'GBP'
});

// returns "£67,123.45"
let pounds = formatPounds.format(total);
```

## Changing the formatting

The `options` object for the `new Intl.NumberFormat()` surfaces a few additional properties we can use to customize the formatting of our currency string.

The `currencyDisplay` property controls how the currency symbol is formatted.

The default is `symbol`. Using a value of `code` uses the ISO code (for example, `USD`), while a value of `name` writes the full currency name out (such as `US dollars`).

```js
// returns "USD 67,123.45"
let code = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'code'
}).format(total);

// returns "67,123.45 US dollars"
let name = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD',
	currencyDisplay: 'name'
}).format(total);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/ZErRGeM?editors=1111)

The `currencySign` property can be used to change the format from using a normal negative number indicator to using parentheses, a common practice by accountants in many locales.

```js
// returns "($123.00)"
let accounting = new Intl.NumberFormat(undefined, {
	style: 'currency',
	currency: 'USD',
	currencySign: 'accounting'
}).format(-123);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/xxYzGrN?editors=1111)