---
title: "Default function arguments with vanilla JavaScript"
date: 2018-02-16T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [two different approaches for passing arguments into a function](/how-to-manage-multiple-arguments-in-a-function/). Today, let's look at how to set default values for your arguments.

## Why you might want to do this

If you don't pass in a value for an argument, your script will use `undefined`. This can result in some unexpected results.

For example, in the `add()` function below, `num1` and `num2` are arguments.

```js
var add = function (num1, num2) {
	return num1 + num2;
};

// returns 12
add(4, 8);
```

Here's what happens if you only pass in one number.

```js
// returns "NaN"
add(3);
```

You can handle this one of two ways:

1. Make sure an argument exists before using it.
2. Set a default value for an argument.

## Check for arguments before running your code

To check that an argument exists, you'd set up an `if` statement, and use a bang (`!`) to test of the variable exists. If it fails, call `return` to end the function.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, bail
	if (!num1 || !num2) return;

	// Add the numbers
	return num1 + num2;

};
```

## Set a default argument value with JavaScript

To set a default value for an argument, you can redefine it (without the `var` prefix). For ease, we'll use a [ternary](/ternary-operators/) or conditional operator.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

With the modified function above, you can now pass in a single argument and still get a valid number back.

```js
// returns 2
add(2);
```

On Monday, we'll look at [an easier way to handle this with ES6 default parameters](/default-function-arguments-with-es6-default-parameters/).