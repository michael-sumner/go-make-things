---
title: "Truthiness in JavaScript"
date: 2019-04-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, truthiness is whether something returns `true` or `false` in an `if` statement.

```js
if (true) {
	// truthy!
}

if (false) {
	// not truthy...
}
```

You can check truthiness a bunch of different ways depending on what you're trying to do. Let's look at some examples.

## Checking explicit values

If you want to check for truthiness, you can check it's value explicitly.

```js
// Falsey
var isNull = null;
var isUndef = undefined;
var isFalse = false;
var isZero = 0;

// Truthy
var isDef = 'Hello, world!';
var isTrue = true;
var isNotZero = 1;

if (isNull === null) {
	console.log('This will log to the console');
}

if (isUndef === null) {
	console.log('This will not, because it is undefined, not null');
}

if (isfalse === true) {
	console.log('This, of course, will not log either');
}
```

## Simpler `if` statements

But you can also check general truthiness without doing a type comparison.

```js
// These all will NOT log
if (null) {
	console.log('no');
}

if (undefined) {
	console.log('no');
}

if (false) {
	console.log('no');
}

// These all will
if ('Hello world') {
	console.log('yes');
}

if (true) {
	console.log('yes');
}

if (42) {
	console.log('yes');
}
```

It's important to keep in mind with these simple checks that `0` is falsey, and `1` is truthy.

```js
// This will NOT log
if (0) {
	console.log('no');
}

// This will
if (1) {
	console.log('yes');
}
```

This approach is particularly useful when paired with things like `querySelector()` to check if an element is in the DOM.

```js
var form = document.querySelector('form');
if (form) {
	// Initialize validation script
}
```

## Negative Checks

You can prefix a simple check with a bang (`!`) to make it a negative check.

```js
// This logs to the console
if (!null) {
	console.log('yep!');
}
```

Wait, what? `null` returns falsey, and the bang reverses it to truthy.

You can also prefix items with a double bang (`!!`) to force them into a strict `true`/`false` boolean.

```js
// Logs null
console.log(null);

// Logs false
console.log(!!null);
```

## Which should use and when?

I personally tend to use simpler `if` statements most of the time so that I don't have to specify if it's `null`, `undefined`, etc. If I know a number might be returned, though, and that the number could be `0`, I'll use a more specific falsey check.