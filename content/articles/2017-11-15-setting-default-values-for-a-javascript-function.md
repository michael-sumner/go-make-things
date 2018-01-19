---
categories:
- Code
- JavaScript
date: '2017-11-15'
title: Setting default values for JavaScript function arguments
---

If you don't pass in a value for an argument, your script will use `undefined`. This can result in some unexpected results.

```javascript
// Add two numbers together
var add = function (num1, num2) {
	return num1 + num2;
};

// returns "NaN"
add(3);
```

You can handle this one of two ways:

1. Make sure an argument exists before using it.
2. Set a default value for an argument.

## Checking that an argument exists

To check that an argument exists, you'd set up an `if` statement, and use a bang (`!`) to test of the variable exists. If it fails, call `return` to end the function.

```javascript
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, bail
	if (!num1 || !num2) return;

	// Add the numbers
	return num1 + num2;

};
```

## Set default values

To set a default value for an argument, you can redefine it (without the `var` prefix). For ease, we'll use a ternary or conditional operator.

```javascript
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

Liked this post? You might also enjoy my [vanilla JS pocket guide on variables, functions, and scope](/guides/variables-functions-and-scope/).