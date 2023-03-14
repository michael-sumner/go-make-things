---
title: Default function parameters in vanilla JavaScript
date: 2023-03-14T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at how you can set default values for function parameters when none are provided.

Let's dig in!

## The danger of missing parameters

Let's imagine you have an `add()` function that adds two numbers together.

```js
/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The sum of both numbers
 */
function add (num1, num2) {
	return num1 + num2;
}
```

If you don't pass in a value for a function parameter, the parameter has a value of `undefined`. This can result in unexpected behavior. 

For example, passing just a single number into our `add()` functions results in a returned value of `NaN`, which stands for _Not a Number_.

```js
// returns "NaN"
add(3);
```

Default function parameters provide an easy way to handle this.

## Default function parameters

You can set a default value for each parameter by adding `= default value` when defining it.

In this example, both `num1` and `num2` will get a value of `0` is no argument is supplied.

```js
/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The sum of both numbers
 */
function add (num1 = 0, num2 = 0) {

	// Add the numbers
	// If num1 or num2 is not provided, 0 will be used
	return num1 + num2;

}

// returns 4
add(4);
```

## Default function parameters and assignment order

One best practice with default function parameters is that any parameter that has one should appear after regularly assigned parameters (ones _without_ a default value).

Don't do this, for example.

```js
/**
 * Add two numbers together
 * @param  {Number} num1 The first number
 * @param  {Number} num2 The second number
 * @return {Number}      The sum of both numbers
 */
function add (num1 = 0, num2) {
	return num1 + num2;
}
```

Browsers will still run the code just fine, but many JavaScript linters will throw a warning or error.

The logic behind it is that parameters with a default values are likely optional, and should appear _after_ parameters that are not.