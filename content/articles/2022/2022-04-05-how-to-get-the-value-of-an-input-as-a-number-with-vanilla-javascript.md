---
title: How to get the value of an input as a number with vanilla JavaScript
date: 2022-04-05T10:30:00-04:00
draft: false
categories:
- Code
- HTML
- JavaScript
---

Today, we're going to look at how to get the value of an `input` element as a number using vanilla JS. 

We'll look at the traditional way of doing that, and an awesome modern property that makes it even easier. Let's dig in!

## An example

Let's imagine you have an `input` element with a `type` of `number`.

```html
<label for="num">Pick a number</label>
<input type="number" id="num" value="0">
```

Whenever the user updates the value of the field, you want to get the value of the `num` field as a number.

```js
let num = document.querySelector('#num');

// Handle number changes
num.addEventListener('input', function () {
	// ...
});
```

Let's look at two ways you can do that.

## Convert the `value` property string to a number

The `num.value` property returns a string, even when the field `type` is `number`. 

We can [use a number-to-string method, like `parseInt()` or `parseFloat()`](/three-ways-to-convert-strings-to-numbers-and-modify-existing-numbers-with-vanilla-javascript/), to convert the `num.value` into a number.

```js
// Handle number changes
num.addEventListener('input', function () {
	
	// As a string
	let val = num.value;

	// As a number
	let valAsNumber = parseFloat(num.value);

});
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/popabLX?editors=1111)

## Use the `valueAsNumber` property

As a modern alternative, you can use the `HTMLInputElement.valueAsNumber` property ([I _just_ learned this trick from Steve Sewell](https://twitter.com/Steve8708/status/1509653389453324299)).

As its name implies, it returns the value of an `input` element as a number instead of a string.

```js
// Handle number changes
num.addEventListener('input', function () {
	
	// As a number
	let val = num.valueAsNumber;

});
```

This works in all modern browsers. [Here's another demo.](https://codepen.io/cferdinandi/pen/WNdMxym?editors=1111)