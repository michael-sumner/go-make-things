---
title: "How arguments work in JavaScript functions"
date: 2020-06-23T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I wanted to bring it back to basics and talk about something that sometimes trips people up when they're first learning JavaScript: function arguments.

## What's an argument?

In a function, an argument is a value you can pass into the function. When setting up your function, you can assign names to the arguments, and whatever value you specify will automatically be assigned as a variable accessible inside the function.

Here's an example.

```js
var add = function (num1, num2) {
	return num1 + num2;
};
```

In the `add()` function, `num1` and `num2` are function arguments.

In this example below, `1` is automatically assigned to `num1` and `3` is assigned to `num2` inside the `add()` function. When it adds `num1` and `num2` together, it's really added `1` and `3`, and returns a value of `4`.

```js
add(1, 3);
```

## Default values

If you don't pass in a value for an argument, your script will use `undefined`. This can result in some unexpected results.

```js
// returns "NaN"
add(3);
```

You can handle this one of two ways:

1. Make sure an argument exists before using it.
2. Set a default value for an argument.

To check that an argument exists, you can set up an `if` statement, and use the *not operator* (`!`) to test of the variable exists. If it fails, call `return` to end the function.

```javascript
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, bail
	if (!num1 || !num2) return;

	// Add the numbers
	return num1 + num2;

};
```

To set a default value for an argument, you can redefine it (without the `var` prefix). For ease, we'll use a [ternary or conditional operator](/ternary-operators/).

```javascript
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

## Get all arguments passed in to a function

Within any function (except [arrow functions](/an-introduction-to-es6-arrow-functions/)), you can use the `arguments` variable to get an array-like list of all of the arguments passed into the function.

You don't need to define it ahead of time. It's a native JavaScript object.

```javascript
var add = function (num1, num2) {

	// returns [num1, num2]
	console.log(arguments);

	// returns the value of `num1`
	console.log(arguments[0]);

	// returns the value of `num2`
	console.log(arguments[1]);

	// ...

};
```

This is particularly useful if you would rather allow an unlimited number of arguments to be passed in to your function.

Let's say you wanted to be able to pass an unlimited amount of numbers into `add()` and add them together. The `arguments` object is perfect for this!

```javascript
var add = function () {

	// Set a starting total
	var total = 0;

	// Add each number to the total
	for (var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}

	// Return to the total
	return total;

};
```

In the example above, we're defining a default variable `total` with a value `0`. We use a `for` loop to iterate over each argument and add it to the `total`. Then we `return` the `total`.

(*We can't use the `Array.forEach()` loop here because while `arguments` is "array-like," it's not actually an array.*)

If someone passes in no arguments, it returns `0`. Otherwise, it adds any numbers passed in together.