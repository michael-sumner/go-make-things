---
title: Converting numbers to strings with vanilla JavaScript
date: 2022-01-26T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [a few ways to convert strings to numbers](/three-ways-to-convert-strings-to-numbers-and-modify-existing-numbers-with-vanilla-javascript/). Today, we're looking at how to convert numbers to strings with JavaScript.

Let's dig in!

## The `Number.toFixed()` method

You can use the `Number.toFixed()` method to format a number to a fixed number of decimal places. Pass in the number of decimal places as an argument.

It returns a string.

```js
let pi = 3.14159;
let eleven = 11;

// returns 3.14
pi.toFixed(2);

// returns 11.000
eleven.toFixed(3);
```

In yesterday's article, I noted:

> You can also pass existing numbers into the parseFloat() method, though it won’t add decimals to an integer. It gets returned out as-is.

You can combine `parseFloat()` with `Number.toFixed()` to add decimals.

```js
// returns 42.00
let answer = parseFloat('42').toFixed(2);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/yLPyeoq?editors=0011)

## The `Number.toString()` method

Convert a number to a string.

```js
let pi = 3.14;
let eleven = 11;

// returns "3.14"
pi.toString();

// returns "11"
eleven.toString();
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/rNYaxzo?editors=0011)