---
title: "How to round to the nearest number with vanilla JS"
date: 2019-07-02T10:30:00-04:00
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

JavaScript has native methods for rounding numbers, but they only round floats (numbers with decimals) to the nearest whole number.

I recently needed a way to round a whole number to the nearest 10, 100, and so on. Let me show you what I did.

## The background

On the signup form for my newsletter, I display the number of current subscribers as a bit of *social proof* that the newsletter is dope and you should totally sign up.

I was manually updating it every few weeks, but that was kind of pain. So I decided to use the Mailchimp API to automatically show that number.

*But...*, showing exact subscriber numbers felt a bit... weird.

I wanted to round down to the nearest 100. In other words, `6,842` should display as `6, 800`.

## What vanilla JS does out-of-the-box

With vanilla JS, you can round decimals to the nearest integer. The `Math.floor()` method rounds down, the `Match.ceil()` method rounds up, and `Math.round()` rounds down for decimals below `.5` and up for ones above it.

```js
// Returns 1
Math.floor(1.42);

// Returns 2
Math.ceil(1.42);

// Returns 1
Math.round(1.42);
```

## How to round by the nearest whole number

First, let's create a helper function. We'll accept the number to round and the *precision*&mdash;whole number position to round to&mdash;as arguments

The precision needs to be a *ten value*: `10`, `100`, `1000`, etc.

```js
var round = function (num, precision) {
	// Do stuff...
};
```

The number might get passed in as a number or a string, so let's parse it into a number with the `parseFloat()` method first.

```js
var round = function (num, precision) {
	num = parseFloat(num);
};
```

If no `precision` is provided, we can just return the number outright.

```js
var round = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num;
};
```

### Doing math

Now we need to do math.

We're still going to use `Math.round()`. To force it to run on an integer and not a decimal value, we'll convert our number to a decimal by dividing it by the `precision`.

For example, if we want to round 9,842 to the nearest `10`, we'd divide it by `10` to get a decimal: `984.2`.

Then, we can use `Math.round()` on *that* number, and multiply the result by our `precision` again to return it to it's correct value/length.

Continuing with our example, `Match.round()` would turn `984.2` into `984`. When we multiply it by `10`, it turns into `9840`.

```js
var round = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num;
	return (Math.round(num / precision) * precision);
};
```

### Adding number delimiters

One thing that's missing: commas at the thousand, million, etc. spots. I want `9,840`, not `9840`.

The `toLocaleString()` method adds those in based on the local conventions for the user's location. And even better, it has amazing browser support. It works back to at least IE6!

Let's add that in.

```js
var round = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.round(num / precision) * precision).toLocaleString();
};
```

## Rounding down

Our helper method rounds up or down based on the number value. But what if you always want to round down?

Let's create another helper function, but use `Math.floor()` instead of `Math.round()`.

```js
var roundDown = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.floor(num / precision) * precision).toLocaleString();
};
```

## Rounding up

Similarly, if you always want to round up, we can do the same thing, but use `Math.ceil()` instead.

```js
var roundUp = function (num, precision) {
	num = parseFloat(num);
	if (!precision) return num.toLocaleString();
	return (Math.ceil(num / precision) * precision).toLocaleString();
};
```

## Demos

[Here's a demo.](https://codepen.io/cferdinandi/pen/wLmyKB)

You can find all three of these helper functions on the [Vanilla JS Toolkit](https://vanillajstoolkit.com/helpers/).