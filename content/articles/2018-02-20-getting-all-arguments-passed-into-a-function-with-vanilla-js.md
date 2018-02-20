---
title: "Getting all arguments passed into a function with vanilla JavaScript"
date: 2018-02-20T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we looked at [different approaches to passing arguments into a function](/how-to-manage-multiple-arguments-in-a-function/), and how to [set default arguments for a function](/default-function-arguments-with-vanilla-javascript/). And yesterday, we looked at [an even easier way to do handle defaults with ES6](/default-function-arguments-with-es6-default-parameters/).

Today, I wanted to show you a super useful trick for getting all arguments passed into a function, whether you setup named variables for them or not.

## The `arguments` variable

Within any function, you can use the `arguments` variable to get an array-like list of all of the arguments passed into the function.

Here's the function we used last week to add two numbers together.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	// Add the numbers
	return num1 + num2;

};
```

You could also write it this way.

```js
var add = function (num1, num2) {

	// If num1 or num2 aren't defined, set them to 0
	arguments[0] = arguments[0] || 0; // conditional operator
	arguments[1] = arguments[1] ? arguments[1] : 0; // ternary operator

	// Add the numbers
	return arguments[0] + arguments[1];

};
```

## When to use this

The `arguments` variable has limited use when you have a handful of arguments of differing values and types.

*But*, if you wanted to accept a non-specific number of arguments of a similar type, it's *very* useful.

Let's look at our `add()` function for a minute.

First, we can completely eliminate the need to name arguments in our function.

```js
var add = function () {

	// If num1 or num2 aren't defined, set them to 0
	arguments[0] = arguments[0] || 0; // conditional operator
	arguments[1] = arguments[1] ? arguments[1] : 0; // ternary operator

	// Add the numbers
	return arguments[0] + arguments[1];

};
```

That's cool, but not particularly useful. If anything, our code is *more* verbose.

A more useful application of the `arguments` variable here would be to let us pass in any amount of numbers to add together instead of just two.

To handle this, we'll setup a starting number of `0`. Then, we'll loop through the `arguments` array and add it to this number, and return the total at the end. This also eliminates the need for default variable values.

```js
var add = function () {

	var total = 0;

	for (var i = 0; i < arguments.length; i++) {
		total += arguments[i];
	}

	return total;

};

// Returns 1
add(1);

// Returns 6
add(1, 2, 3);

// Returns 0
add();
```

Cool, right?

Tomorrow, we'll look at how to use the `arguments` value but *also* accept an optional boolean as the first argument.