---
title: Three ways to structure utility libraries with vanilla JS
date: 2023-03-21T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to look at three different ways to structure utility libraries. Let's dig in!

## What's a utility library

For today's article, we're talking specifically about utility libraries: collections of useful functions.

These are _not_ libraries where you create an instance and run methods on it. Utility libraries include things like [lodash](https://lodash.com/) and [underscore](https://underscorejs.org/).

```js
let wizard = {name: 'Merlin', luckyNumbers: [13, 27, 34]};
let witch  = {name: 'Merlin', luckyNumbers: [13, 27, 34]};

_.isEqual(stooge, clone);
```

In these types of libraries, you have a collection of functions that are scoped to a specific namespace (in this case, `_`).

## Approach 1: Plain Objects

The simplest way to handle this is to create an object (`{}`), assign it to a variable, and create your utility functions as properties of the object.

In this example, I'm using [object function shorthand properties](/object-property-shorthand-values-with-vanilla-javascript/#object-function-shorthands).

```js
let calculator = {

	/**
	 * Add two numbers
	 * @param {Number} num1 The first number
	 * @param {Number} num2 The second number
	 */
	add (num1, num2) {
		return num1 + num2;
	},

	/**
	 * Subtract two numbers
	 * @param {Number} num1 The first number
	 * @param {Number} num2 The second number
	 */
	subtract (num1, num2) {
		return num1 - num2;
	}

};
```

To use the `add()` and `subtract()` methods, you run them as properties of `calculator`.

```js
// returns 6
calculator.add(4, 2);
```

## Approach 2: Revealing Module Patterns

With this pattern, you scope all of your functions inside an anonymous function. Then, you return an object with the public functions.

It's useful when you have private functions or variables that _aren't_ part of the public library methods. 

For example, here, we have an `isValid()` function that validates that the values for `num1` and `num2` are actually numbers. It's not intended for use outside of the library as a public function.

```js
let calculator = (function () {

	/**
	 * Are both numbers valid numbers
	 * @param {Number}   num1 The first number
	 * @param {Number}   num2 The second number
	 * @return {Boolean}      If true, both are valid numbers
	 */
	function isValid (num1, num2) {
		return !Number.isNaN(num1) && !Number.isNaN(num2);
	}

	/**
	 * Add two numbers
	 * @param {Number} num1 The first number
	 * @param {Number} num2 The second number
	 */
	function add (num1, num2) {
		if (!isValid(num1, num2)) return;
		return num1 + num2;
	}

	/**
	 * Subtract two numbers
	 * @param {Number} num1 The first number
	 * @param {Number} num2 The second number
	 */
	function subtract (num1, num2) {
		if (!isValid(num1, num2)) return;
		return num1 - num2;
	}

	return {add, subtract};

})();
```

Once again, you run methods as properties of `calculator`. You cannot run private functions that are not part of the returned object.

```js
// returns 6
calculator.add(4, 2);

// Uncaught TypeError: calculator.isValid is not a function
calculator.isValid(4, 2);
```

## Approach 3: ES Modules

ES modules give you same scoping benefits of a revealing module pattern, but let you selectively choose which functions you want to import and use.

And if you add in a build step, you can "tree shake" them and only include the functions you need in the compiled file that gets sent to the browser.

(_[You can learn more about that here.](https://vanillajsguides.com/es-modules/)_)

To setup your library as an ES module, `export` an object with your public functions.

```js
/**
 * Are both numbers valid numbers
 * @param {Number}   num1 The first number
 * @param {Number}   num2 The second number
 * @return {Boolean}      If true, both are valid numbers
 */
function isValid (num1, num2) {
	return !Number.isNaN(num1) && !Number.isNaN(num2);
}

/**
 * Add two numbers
 * @param {Number} num1 The first number
 * @param {Number} num2 The second number
 */
function add (num1, num2) {
	if (!isValid(num1, num2)) return;
	return num1 + num2;
}

/**
 * Subtract two numbers
 * @param {Number} num1 The first number
 * @param {Number} num2 The second number
 */
function subtract (num1, num2) {
	if (!isValid(num1, num2)) return;
	return num1 - num2;
}

export {add, subtract};
```

In the file that you want use the functions in, `import` them. [Use object destructuring](https://gomakethings.com/destructuring-in-javascript/) to define the variables and functions you want, and specify the file `from` which you want to import them.

File paths _must_ either start with a leading dot (`.`, or two dots if you're climbing up the directory tree), or use an absolute path to the file you're trying to import.

Here, we only need the `add()` function.

```js
import {add} from './calculator.js';

// returns 6
add(4, 2);
```

You can alternatively import all of the public functions from an ES module file and assign all of the imported items to a variable, just like with our plain object and revealing module pattern.

Instead of using object destructuring, `import *`, then, assign it to a variable using the `as` opertor. In our case, let's use an underscore (`_`), common with helper libraries.

```js
import * as calculator from './calculator.js';

// returns 6
calculator.add(4, 2);
```

To use a script that uses ES modules natively in the browser, you need to tell the browser that the file is a module and not a normal script. Add to the `type="module"` attribute to your `script` element.

```html
<script type="module" src="index.js"></script>
```