---
title: The vanilla JS Class pattern
date: 2022-07-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

The other day, we looked at [the JavaScript Constructor Pattern](/the-vanilla-js-constructor-pattern/), and how you can use it to create JS libraries.

Today, I wanted to look at the JavaScript Class Pattern: what it is, how it's different, and how to use it. This article is excerpt from [my completely updated Writing JS Libraries course and ebook](https://vanillajsguides.com/writing-js-libraries/). 

Let's dig in!

(_If you didn't read the [constructor pattern article](/the-vanilla-js-constructor-pattern/), you should do that first. Otherwise, a lot of today's article won't make much sense._)

## What are JavaScript classes?

_JavaScript classes_ provide an alternative way to implement _constructor pattern_ libraries.

They use prototypes under-the-hood, but include some features and syntax that a traditional _constructor pattern_ does not have.

To create a _JavaScript class_, you use the `class` keyword followed by the name of your class. Just like with the _constructor pattern_, the class name should be in title case.

Let's create a new `Calculator` class.

```javascript
class Calculator {
	// ...
}
```

Inside a class, the constructor function is always named `constructor()` (with a _lowercase_ "c").

We can copy/paste the code from the `Constructor()` function in our _constructor pattern_ library into our class.

```javascript
class Calculator {
	
	/**
	 * Create the Constructor object
	 * @param {Number} num     The starting total
	 * @param {Object} options Options and settings
	 */
	constructor (num = 0, options = {}) {

		// Combine user options with defaults
		let {max, min} = Object.assign({
			max: Infinity,
			min: -Infinity
		}, options);

		// Define properties
		Object.defineProperties(this, {
			total: {
				value: num,
				writable: true
			},
			_max: {value: max},
			_min: {value: min}
		});

	}

}
```

Now, we have a library that we can instantiate the same way we did with our _constructor pattern_ library.

```javascript
// Create a new instance of our library
let age = new Calculator(30);
```

## Adding methods to our Class Pattern library

To attach methods to an instance's prototype, all you have to do is include them inside the class. You can omit the `function` keyword. 

With this approach, every function gets attached to the instance (`this`). Accordingly, we need to update all of our `validate()` functions to `this.validate()`.

```javascript
/**
 * Add two or more numbers together
 * @param {...Number} nums The numbers to add
 */
add (...nums) {

	// Loop through each number and do math
	for (let num of nums) {
		this.total = this.total + num;
	}

	// Validate the total
	this.validate(this);

	// Return the instance
	return this;

}
```

Now, we can run our instance methods just like with our _constructor pattern_.

```javascript
// Do some math
// age.total is now 72
age.add(1, 2, 3).multiply(2);
```

## Static properties

In our class pattern, the `random()` method is now attached to each instance rather than the `Calculator` object.

```javascript
// This throw an error
// Uncaught TypeError: Calculator.random is not a function
Calculator.random();

// This works
let age = new Calculator(30);
age.random();
```

In a JavaScript class, you can use the `static` keyword to mark a property or function as static. 

This will attach it directly to the class object rather than to the prototype.

```javascript
/**
 * Generate a random whole number
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @return {Number} A random number
 */
static random (max = 100) {
	return Math.floor(Math.random() * max);
}
```

Now, we can run the `Calculator.random()` method just like before.

```javascript
// This works again
Calculator.random();
```

Tomorrow, we're going to look at one of my favorite things about JS classes: private Class features.