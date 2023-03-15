---
title: Rest parameters in vanilla JavaScript
date: 2023-03-15T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

In JavaScript, a rest parameter is a function parameter that gets assigned an array with all of the arguments that are passed from that point on in a function.

You define a _rest parameter_ by creating a parameter prefixed with `...`. Any arguments provided at or beyond the rest parameter on a function get combined into an array that's assigned to the rest parameter's name. 

You can only have one _rest parameter_ on a function. In the example below, `...moreArgs` is a _rest parameter_.

```javascript
function logStuff (arg1, arg2, ...moreArgs) {

	// Logs arg1
	console.log(arg1);

	// Logs arg2
	console.log(arg2);

	// Logs an array of any other arguments you pass in after arg2
	console.log(moreArgs);

}

// In this example...
// arg1 = 'chicken'
// arg2 = 'tuna'
// moreArgs = ['chips', 'cookie', 'soda', 'delicious']
logStuff('chicken', 'tuna', 'chips', 'cookie', 'soda', 'delicious');
```

In yesterday's article on [default function parameters](/default-function-parameters-in-vanilla-javascript/), we looked at an `add()` function for adding numbers together.

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

If you wanted to add two _or more_ numbers together, you could use a _rest parameter_ to capture all numbers passed in, regardless of how many there were.

Here's our `add()` function rewritten with a rest parameter.

```js
function add (...nums) {

	// Set a starting total
	let total = 0;

	// Add each number to the total
	for (let num of nums) {
		total += num;
	}

	// Return to the total
	return total;

}
```