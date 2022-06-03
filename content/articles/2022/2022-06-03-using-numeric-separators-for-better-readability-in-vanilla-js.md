---
title: Using numeric separators for better readability in vanilla JS
date: 2022-06-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've looked at [how to format numbers into strings](/how-to-create-a-formatted-string-from-a-number-with-the-intl.numberformat-api/), and [how to format numbers as currency](/how-to-format-a-number-as-currency-with-the-intl.numberformat-api-in-vanilla-javascript/).

Today, we're going to wrap things up by looking at a simple trick for making big numbers easier to read in your code with the _numeric separator_.

Let's imagine you have a really big number, like this.

```js
let num = 1234567890987654321;
```

Because it's a number and not a string, you can't add commas (or dots, depending on where you live) as "thousands" indicators.

```js
// THIS THROWS AN ERROR
let num = 1,234,567,890,987,654,321;
```

However, modern JavaScript gives us the _numeric seperator_, an underscore (`_`) placed between numeric characters in a number to make it easier to read.

```js
let num = 1_234_567_890_987_654_321;
```

_Numeric separators_ make big numbers easier to read, but are ignored by all of the `Number` object functions and operators.

For example, you could still do something like this.

```js
// returns 1234567890.9876544
let smallNum = num / 1_000_000_000;
```