---
title: The vanilla JS revealing module pattern
date: 2022-07-07T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we looked at [what a JavaScript library is](/whats-a-javascript-library/). Today, we're going to look at a common JS library pattern: the revealing module pattern.

Let's dig in!

(_Today's article is an excerpt from my [newly updated Writing JS Libraries course/guide](https://vanillajsguides.com/writing-js-libraries/)._)

## A collection of helper functions

To make this guide a bit more tangible, we're going to build a few different libraries around a set of helper functions that perform basic math.

The `add()`, `subtract()`, `multiply()`, and `divide()` methods accept two or more numbers as arguments, and add, subtract, multiply, or divide them together, respectively.

```javascript
/**
 * Add two or more numbers together
 * @param {...Number} nums The numbers to add
 */
function add (...nums) {

	// Make sure there are numbers
	if (!nums.length) return 0;

	// Get the first number and remove it from the array
	let total = nums.shift();

	// Loop through each number and do math
	for (let num of nums) {
		total = total + num;
	}

	// Return the total
	return total;

}

// returns 6
let added = add(1, 2, 3);
```

We'll create a few libraries from these functions, using different programming patterns and techniques.

The _revealing module pattern_ is typically used for helper or utility libraries, collections of utility or helper methods (like [lodash](https://lodash.com/) and [underscore](https://underscorejs.org/)).

This pattern lets you scope all of your functions to a specific namespace, which helps prevent naming collisions with other functions. Here's an example using the `_.eq()` method from lodash.

```javascript
let wizards = ['Merlin', 'Gandalf'];
let witches = ['Ursula', 'Yennefer'];

// The eq() function is scoped to the _ namespace
let isEqual = _.eq(wizards, witches);
```

## How to create a revealing module pattern

To create a _revealing module pattern_, you assign an _[immediately invoked function expression(IIFE)](https://gomakethings.com/the-many-ways-to-write-an-immediately-invoked-function-expression-iife-in-javascript/)_ to a variable.

You place all of your functions inside the IIFE. Let's call ours `calculator`.

```javascript
let calculator = (function () {

	/**
	 * Add two or more numbers together
	 * @param {...Number} nums The numbers to add
	 */
	function add (...nums) {
		// ...
	}

	/**
	 * Subtract two or more numbers from each other
	 * @param {...Number} nums The numbers to subtract
	 */
	function subtract (...nums) {
		// ...
	}

	/**
	 * Multiply two or more numbers
	 * @param {...Number} nums The numbers to multiply
	 */
	function multiply (...nums) {
		// ...
	}

	/**
	 * Divide two or more numbers
	 * @param {...Number} nums The numbers to divide
	 */
	function divide (...nums) {
		// ...
	}

})();
```

At the end of your code, you `return` an object with any of the functions that you want to make publicly available. 

For simplicity, you can use [the ES6 shorthand notation](/object-property-shorthand-values-with-vanilla-js/).

```javascript
let calculator = (function () {

	// ...

	/**
	 * Divide two or more numbers
	 * @param {...Number} nums The numbers to divide
	 */
	function divide (...nums) {
		// ...
	}

	return {add, subtract, multiply, divide};

})();
```

Now, you can access any of the utility functions by calling them on the `calculator` namespace.

```javascript
let added = calculator.add(1, 2, 3);
let subtracted = calculator.subtract(10, 1, 1);
let multiplied = calculator.multiply(5, 2, 2);
let divided = calculator.divide(10, 2, 2);
```

## Private variables and functions

You might be wondering, "Why not just use a plain old object?"

```javascript
let calculator = {
	add: function (...nums) {},
	subtract: function (...nums) {},
	multiply: function (...nums) {},
	divide: function (...nums) {},
};
```

One advantage of the _revealing module pattern_ is that you can include functions and variables that are _private_, and cannot be accessed or used outside of the library.

For example, all four of our `calculator` functions include a bit of code that checks how many numbers were passed in. Then removes the first one and uses it as the starting `total`.

```javascript
// Make sure there are numbers
if (!nums.length) return 0;

// Get the first number and remove it from the array
let total = nums.shift();
```

This violates DRY coding principles (_Don't Repeat Yourself_).

We can abstract that bit of code into a `getTotal()` helper function.

```javascript
/**
 * Get the starting total
 * @param  {Array} nums The numbers to do math on
 * @return {Number}     The starting total
 */
function getTotal (nums) {

	// Make sure there are numbers
	if (!nums.length) return 0;

	// Get the first number and remove it from the array
	return nums.shift();

}
```

Then, we can use it in our math functions, like this.

```javascript
// Get the first number and remove it from the array
let total = getTotal(nums);
```

The `getTotal()` function is not a library function. It's only intended to be used inside other functions in our library.

With a plain object, the `getTotal()` function would be a public method as part of the library. With a _revealing module pattern_, we can keep it private and for internal use only.

Any functions we don't explicitly `return` can only be accessed inside the IIFE itself.

```javascript
// Return public functions
// Because we don't return getTotal(), it can only be used internally
return {add, subtract, multiply, divide};
```

Tomorrow, we'll look at another JavaScript pattern from my [Writing JS Libraries course](https://vanillajsguides.com/writing-js-libraries/): the constructor pattern (and object oriented programming).