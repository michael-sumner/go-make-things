---
title: Private class features in vanilla JS Classes
date: 2022-07-20T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Yesterday, we learned about [how to create libraries with the vanilla JS Class pattern](/the-vanilla-js-class-pattern/). Today, I wanted to share my favorite JavaScript class features: private class properties.

Let's dig in!

(_Today's post is an except from [my updated course and ebook on Writing JS Libraries](https://vanillajsguides.com/writing-js-libraries/)._)

## What is a private class feature?

In our _constructor pattern_ library, the `validate()` function was a _private function_.

It wasn't attached to the `Constructor` _or_ to the `Constructor.prototype`, and could only be run from inside the IIFE. With our _class pattern_, `validate()` is now a public method that developers can run. That's not what we want.

```javascript
let age = new Calculator(30);

// We don't want developers to be able to do this
age.validate();
```

In a JavaScript class, you can prefix properties and functions with a hash (`#`) to denote them as private.

They're still attached to the prototype (or the constructor, if you use the `static` keyword), but cannot be accessed or run from outside of the `class` object.

Because they're attached to the prototype, we also have access to the `this` operator, and no longer need to pass the `instance` in as an argument.

```javascript
/**
 * Validate total before setting it
 */
#validate () {

	// Avoid infinite loops
	if (this._min > this._max) return;

	// If below the minimum
	if (this.total < this._min) {
		this.total = this._min;
	}

	// If above the total
	if (this.total > this._max) {
		this.total = this._max;
	}

}
```

We need to prefix it with a hash when running it as well.

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
	this.#validate();

	// Return the instance
	return this;

}
```

## Private instance properties

We can also use this approach instead of the `Object.defineProperties()` method to create read-only instance properties.

First, we'll define our read-only properties, prefixed with a hash, _outside_ of the `contructor()`. Then, we'll assign them as instance properties with a value _inside_ the `constructor()` function.

```javascript
class Calculator {

	#max;
	#min;

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
		this.total = num;
		this.#max = max;
		this.#min = min;

	}

	// ...

}
```

Inside the `#validate()` function, we'll access them using the hash prefix instead of an underscore.

```javascript
/**
 * Validate total before setting it
 */
#validate () {

	// Avoid infinite loops
	if (this.#min > this.#max) return;

	// If below the minimum
	if (this.total < this.#min) {
		this.total = this.#min;
	}

	// If above the total
	if (this.total > this.#max) {
		this.total = this.#max;
	}

}
```

Now, when someone tries to overwrite _or_ access those properties, they get an error message.

```javascript
// Create a new instance
let age = new Calculator(30, {
	max: 50
});

// Uncaught SyntaxError: Private field '#max' must be declared in an enclosing class
age.#max;
```