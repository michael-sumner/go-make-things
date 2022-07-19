---
title: The vanilla JS constructor pattern
date: 2022-07-08T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

This week, we've been looking at ways to build vanilla JS libraries based on [my newly updated course on the topic](https://vanillajsguides.com/writing-js-libraries/).

Yesterday, we looked at [the revealing module pattern](the-vanilla-js-revealing-module-pattern/). Today, we're going to learn about the constructor pattern. 

Let's dig in!

## What is the constructor pattern?

The _constructor pattern_ is useful when you want to define specific information and use it repeatedly with your library methods. 

This pattern is used in libraries like [jQuery](https://jquery.com/), where you get some nodes from the DOM, and then can run various methods to manipulate them.

```javascript
// Get all elements with the .sandwich class
let sandwiches = $('.sandwich');

// Add .mayo and remove .mustard
// You don't have to pass in the collection of nodes as argument
// That information is already saved as a library property
sandwiches.addClass('mayo');
sandwiches.removeClass('mustard');
```

The _constructor pattern_ also allows you to create multiple instances, each with their own unique properties, but access to the same collection of utility methods.

```javascript
// Each of these creates a unique instance of the jQuery library
let sandwiches = $('.sandwich');
let wizards = $('.wizard');

// Calling addClass() on sandwiches has no affect on wizards
sandwiches.addClass('mayo');
```

## How to create a constructor pattern

With the _constructor_ pattern, we'll again create an IIFE and assign it to a variable. In JavaScript, constructor libraries always use title case (they start with a capital letter).

We'll call our library `Calculator` (with a capital "C").

```javascript
let Calculator = (function () {
	// ...
})();
```

Inside the IIFE, we'll create a _constructor function_.

You can name this function anything you want, but I typically name it `Constructor()` for simplicity. It needs to start with a capital letter.

```javascript
let Calculator = (function () {

	/**
	 * Create the Constructor object
	 */
	function Constructor () {
		// ...
	}

})();
```

You can add any parameters you want to `Constructor()` function. In our case, let's accept a starting `num`, with a default value of `0`.

To save unique data to each instance, assign it as a property of `this`, which in a `Constructor()` function is the current instance. Here, we'll assign `num` to the `this.total` property.

```javascript
let Calculator = (function () {

	/**
	 * Create the Constructor object
	 * @param {Number} num The starting total
	 */
	function Constructor (num = 0) {
		this.total = num;
	}

})();
```

At the end of the IIFE, `return` the `Constructor()`.

```javascript
let Calculator = (function () {

	/**
	 * Create the Constructor object
	 * @param {Number} num The starting total
	 */
	function Constructor (num = 0) {
		this.total = num;
	}

	return Constructor;

})();
```

Now, you can create new instances of your `Calculator()` library by using the `new` keyword.

Pass in a starting `num` value, or pass in nothing to use the default value of `0`.

```javascript
// Create a new instance
let age = new Calculator(30);
let weight = new Calculator(175);
let startAtZero = new Calculator();
```

Each instance has a `total` property equal to the number you passed in (or `0`).

This property can be accessed and modified inside any functions that we add to our library.

```javascript
// logs 30
console.log(age.total);

// logs 175
console.log(weight.total);

// logs 0
console.log(startAtZero.total);
```

## How to add methods to a constructor pattern library

To add public methods to our library, we'll add them as properties of the `Constructor.prototype` object.

Functions attached to the `Constructor.prototype` have access to the instance itself using the `this` keyword. They also exist only once in the browser's memory, no matter how many instances you create, which is good for performance.

Let's attach our `add()`, `subtract()`, `multiply()`, and `divide()` functions to the `Constructor.prototype`.

```javascript
/**
 * Add two or more numbers together
 * @param {...Number} nums The numbers to add
 */
Constructor.prototype.add = function (...nums) {

	// Get the first number and remove it from the array
	let total = getTotal(nums);

	// Loop through each number and do math
	for (let num of nums) {
		total = total + num;
	}

	// Return the total
	return total;

};
```

Because they now have access to `this.total`, we no longer need our `getTotal()` helper function. We can remove it.

We should also update all references to `total` in our functions to `this.total`. We'll access the property and update it in each of our functions.

```javascript
/**
 * Add two or more numbers together
 * @param {...Number} nums The numbers to add
 */
Constructor.prototype.add = function (...nums) {

	// Loop through each number and do math
	for (let num of nums) {
		this.total = this.total + num;
	}

	// Return the total
	return this.total;

};
```

Now, we can create a `new` instance of our `Calculator()`.

Then, we can use the `add()`, `subtract()`, `multiply()`, and `divide()` methods to modify the `total`.

```javascript
// Create a new instance
// age.total is 30
let age = new Calculator(30);

// Do some math
// age.total is now 36
age.add(1, 2, 3);

// Do more math
// age.total is now 72
age.multiply(2);
```

## How to create static constructor methods

Sometimes, your library might have public methods that aren't part of a specific instance.

For example, imagine if we wanted to add a `Calculator.random()` function that generates a random number. We don't want to create an instance for that. We just want to be able to run it directly on the `Calculator` object.

To do that, we can attach the method directly to the `Constructor` _instead of_ attaching it to the `Constructor.prototype`.

```javascript
/**
 * Generate a random whole number
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @return {Number} A random number
 */
Constructor.random = function (max = 100) {
	return Math.floor(Math.random() * max);
};
```

Functions attached directly to the `Constructor` _do not_ have access to instance properties.

They also _cannot_ be called as instance methods. Doing so will throw an error.

```javascript
// This works
let random = Calculator.random();

// This throws an error
// Uncaught TypeError: age.random is not a function
let age = new Calculator(30);
let randomAge = age.random();
```

## What's next?

In [my course and guide on Writing JS Libraries](https://vanillajsguides.com/writing-js-libraries/), I dig deeper into things like chaining library methods, providing users with options and settings, creating custom events, and the JavaScript class syntax.