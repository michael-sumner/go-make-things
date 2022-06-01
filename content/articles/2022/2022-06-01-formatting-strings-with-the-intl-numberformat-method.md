---
title: How to create a formatted string from a number with the Intl.NumberFormat API
date: 2022-06-01T10:30:00-04:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

The browser-native `Intl` API was designed to help developer _internationalize_ their content more easily.

Today, we're going to be looking at the `Intl.NumberFormat()` constructor, which can be used to format numbers. Let's dig in!

## Formatting a number into a string

Let's imagine you have a big number, like this.

```js
let num = 1234567890987654321;
```

To display it in the UI, you want to convert it to a formatted string with thousands separators so that it's easier to read. This is what the `Intl.NumberFormat()` object was made for! 

First, we'll create a `formatter` object. The `Inte.NumberFormat()` constructor requires the `locale` you want to use as an argument. For this example, let's use `en-US` for US English.

```js
let formatter = Intl.NumberFormat('en-US');
```

Now, we can run the `Intl.NumberFormat.format()` method on our `formatter` object and pass the number into it to get back a formatted string.

```js
// returns '1,234,567,890,987,654,400'
let str = formatter.format(num);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOZxaZN?editors=1111)

## Different locales use location-aware formatting

In our previous example, I used `en-US` as the `locale`. But in some languages, periods are used instead of commas to separate thousands.

For example, if we passed `es-ES` in (for Spanish as spoken in Spain), we would get a different string.

```js
let formatterEs = Intl.NumberFormat('es-ES');

// returns '1.234.567.890.987.654.400'
let strEs = formatterEs.format(num);
```

## Defaulting to the user's default browser language

The `locale` parameter is required with the `Intl.NumberFormat()` constructor, but if you pass in `undefined` for its value (not `null` or `false`, it has to be `undefined`), it will use the default language specified by the user's browser.

For example, this would use `en-US` for me, but might use something different for you depending on where in the world you are.

```js
let formatter = Intl.NumberFormat(undefined);
```

## Chaining and reusing the `formatter`

You don't _need_ to assign the `Intl.NumberFormat()` constructor to a variable before running the `format()` method. You can chain them if you want.

```js
let str = Intl.NumberFormat(undefined).format(num);
```

If you're only formatting one number, chaining is probably the cleanest way to write this.

However, if you're going to format multiple numbers the same way, I would recommend creating a `formatter` object and running it multiple times. 

For larger data sets this can be more performant, and also saves you from having to repeat yourself.

```js
let numbers = [
	1234,
	5678,
	9098,
	7654,
	4321
];

let formatter = Intl.NumberFormat(undefined);

let formattedNumbers = numbers.map(function (num) {
	return formatter.format(num);
});
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/yLvjPqY?editors=1111)

## Formatting strings in different ways

The `Intl.NumberFormat()` constructor accepts a second argument, an object of `options` that you can use to format strings in different ways.

Tomorrow, we'll take a look at how that works.