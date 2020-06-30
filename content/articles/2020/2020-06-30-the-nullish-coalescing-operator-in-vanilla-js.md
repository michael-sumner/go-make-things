---
title: "The nullish coalescing operator in vanilla JS (sorry, the what now?)"
date: 2020-06-30T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The *nullish coalescing operator*... really rolls off the tongue, doesn't it?

I just learned about this operator yesterday, while looking up browser support for my article on [optional chaining in vanilla JS](/optional-chaining-in-vanilla-js/).

Let's look at what it does.

## Conditional variable values

Let's say I wanted to use a variable, but I can't be sure the variable actually has a value.

```js
var logCount = function (num) {
	console.log(`There are ${num} widgets left.`);
};

// logs "There are 42 widgets left."
logCount(42);

// logs "There are undefined widgets left."
logCount();
```

Before logging `num`, I want to make sure it exists, and if not, use a fallback value.

You might use an `if...else` statement, a [ternary operator](/ternary-operators/), or an *or operator* (`||`).

```js
// if...else
var logCount = function (num) {
	if (num) {
		console.log(`There are ${num} widgets left.`);
	} else {
		console.log('There are 42 widgets left.');
	}
};

// Ternary operator
var logCount = function (num) {
	console.log(`There are ${num ? num : 42} widgets left.`);
};

// or operator
var logCount = function (num) {
	console.log(`There are ${num || 42} widgets left.`);
};
```

This works great if a value isn't provided. But... what happens if the value is `0`?

```js
logCount(0);
```

Because `0` is *falsy*, it causes "There are 42 widgets left." to be logged, but that's not what we want.

## If `null` or `undefined`

We don't want to ignore *all* falsy values, just `null` and `undefined`. But checking for both of those gets a bit too verbose.

```js
// if...else
var logCount = function (num) {
	if (num !== null && num !== undefined) {
		console.log(`There are ${num} widgets left.`);
	} else {
		console.log('There are 42 widgets left.');
	}
};


// Ternary operator
var logCount = function (num) {
	console.log(`There are ${num !== null && num !== undefined ? num : 42} widgets left.`);
};
```

Here's where the *nulllish coalescing operator* (`??`) (damn, does this thing need a better name or what?) shines.

It works a lot like the *or operator*, but instead of checking for *all falsy values*, it only runs if the value on the left side is `null` or `undefined`.

```js
// nullish coalescing operator
var logCount = function (num) {
	console.log(`There are ${num ?? 42} widgets left.`);
};
```

Now, our function works the way we'd expect.

```js
// logs "There are 42 widgets left."
logCount();

// logs "There are 0 widgets left."
logCount(0);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/RwrjPad)

## Browser compatibility

The nullish operator (seriously, it's just to many damn letters) works in all modern browsers, but has no IE support. Unfortunately, it can't be polyfilled, either.