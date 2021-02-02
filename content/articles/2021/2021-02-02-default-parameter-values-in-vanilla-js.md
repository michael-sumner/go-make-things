---
title: "Default parameter values in vanilla JS"
date: 2021-02-02T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to learn how to assign default parameter values with vanilla JS.

Let's imagine you have a function that adds two numbers together.

```js
function add (num1, num2) {
	return num1 + num2;
}

// Add 4 and 2
// returns 6
add(4, 2);
```

If you don't pass in a value for an argument, your script will use `undefined`. This can result in some unexpected results.

```javascript
// returns "NaN"
add(3);
```

To address this, you historically needed to either make sure all required parameters were assigned an argument, or check for values in your function and reassign values to them.

```js
// Approach 1: Make sure values are assigned
function add (num1, num2) {

	// If num1 or num2 aren't defined, throw an error
	if (!num1 || !num2) {
		throw 'Please provide two numbers to add together';
	}

	// Add the numbers
	return num1 + num2;

}

// Approach 2: Reassign values
function add (num1, num2) {

	// Reassign values if none are provides
	num1 = !num1 ? 0 : num1;
	num2 = !num2 ? 0 : num2;

	// Add the numbers
	return num1 + num2;

}
```

But ES6 introduced a powerful new way to handle this: default parameters.

You can set a default value for each parameter by adding `= default value` when defining it. In this example, both `num1` and `num2` will get a value of `0` is no argument is supplied.

```js
function add (num1 = 0, num2 = 0) {

	// Add the numbers
	// If num1 or num2 is not provided, 0 will be used
	return num1 + num2;

}

// returns 4
add(4);
```