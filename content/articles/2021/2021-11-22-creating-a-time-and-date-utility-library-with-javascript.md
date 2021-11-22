---
title: Creating a time and date utility library with JavaScript
date: 2021-11-22T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Last week, we learned [how to add and manipulate time with the vanilla JS `Date()` object](/adding-time-with-vanilla-javascript/). Today, we're going to build a simple time and date utility library.

Let's dig in!

## A vanilla JS utility library

We're going to use a [revealing module pattern](https://vanillajstoolkit.com/boilerplates/revealing-module-pattern/) for this.

We'll create an Immediately Invoked Function Expression (IIFE), and assign it to the `time` variable. Inside, we'll return an empty object (`{}`) that will eventually hold our public methods.

```js
let time = (function () {

	// Public methods
	return {};

})();
```

Next, we'll add methods to add seconds, minutes, hours, days, months, and years. Each one will accept a `Date()` object to modify and the units of time to add as arguments.

```js
let time = (function () {

	/**
	 * Add seconds to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of seconds to add
	 */
	function addSeconds (date, n) {
		date.setSeconds(date.getSeconds() + n);
	}

	/**
	 * Add minutes to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of minutes to add
	 */
	function addMinutes (date, n) {
		date.setMinutes(date.getMinutes() + n);
	}

	/**
	 * Add hours to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of hours to add
	 */
	function addHours (date, n) {
		date.setHours(date.getHours() + n);
	}

	/**
	 * Add days to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of days to add
	 */
	function addDays (date, n) {
		date.setDate(date.getDate() + n);
	}

	/**
	 * Add months to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of months to add
	 */
	function addMonths (date, n) {
		date.setMonth(date.getMonth() + n);
	}

	/**
	 * Add years to a date
	 * @param {Date}    date The date object
	 * @param {Integer} n    The number of years to add
	 */
	function addYears (date, n) {
		date.setFullYear(date.getFullYear() + n);
	}

	// Public methods
	return {};

})();
```

Finally, we'll add each of the methods to the returned object.

```js
let time = (function () {

	// ...

	// Public methods
	return {addSeconds, addMinutes, addHours, addDays, addMonths, addYears};

})();
```

Now, we can use the library like this.

```js
// Create a Date() object for right now
let now = new Date();

// Add two days and one month
time.addDays(now, 2);
time.addMonths(now, 1);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/abyrowy)

## Modularizing the library with ES Modules

There may be projects where you only need a few helper functions from a library. Rather than having to load the whole thing, you can use ES modules to import just the functions you need.

(_If you're new to ES modules, [my pocket guide is a great primer on the topic](https://vanillajsguides.com/es-modules/)._)

To convert our library to ES modules, we'll remove the IIFE/Revealing Module Pattern wrapper, so we have just the plain old functions.

```js
/**
 * Add seconds to a date
 * @param {Date}    date The date object
 * @param {Integer} n    The number of seconds to add
 */
function addSeconds (date, n) {
	date.setSeconds(date.getSeconds() + n);
}

// ...

/**
 * Add years to a date
 * @param {Date}    date The date object
 * @param {Integer} n    The number of years to add
 */
function addYears (date, n) {
	date.setFullYear(date.getFullYear() + n);
}

// Public methods
return {addSeconds, addMinutes, addHours, addDays, addMonths, addYears};
```

Next, we'll replace the `return` statement with `export`. This will export all of our public functions, which can then be imported into other projects.

```js
// Public methods
export {addSeconds, addMinutes, addHours, addDays, addMonths, addYears};
```

Now, to use the library you might do something like this.

```js
import {addDays, addMonths} from './time.js';

// Create a Date() object for right now
let now = new Date();

// Add two days and one month
addDays(now, 2);
addMonths(now, 1);
```

Because the methods are being imported as standalone functions, you don't need to reference them on the `time` object. If you wanted to, you could still import the whole thing and associate it with an object like this.

```js
import * as time from './time.js';

// Create a Date() object for right now
let now = new Date();

// Add two days and one month
time.addDays(now, 2);
time.addMonths(now, 1);
```

## Want to learn more stuff like this?

[My brand new Vanilla JS Academy workshop, _Advanced JS: Structure & Scale_](https://vanillajsacademy.com/advanced), digs into topics just like this. It starts on January 10, and registration opens today.

This week only, you can [save 50% on registration](https://vanillajsacademy.com/advanced) _and_ get $436 in free bonus content with the code `BLACKFRIDAY2021` at checkout.