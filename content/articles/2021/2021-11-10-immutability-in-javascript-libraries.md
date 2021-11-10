---
title: Immutability in JavaScript libraries
date: 2021-11-10T10:30:00-05:00
draft: false
categories:
- Code
- Design and UX
- JavaScript
---

Earlier this year, I wrote about [immutability with objects and arrays in vanilla JavaScript](/immutability-with-multidimensional-arrays-and-objects-in-vanilla-js/). Today, I want to talk about immutability in JS libraries.

Let's dig in!

## An example

Let's imagine you have a library that lets you define a temperature, and then add or subtract from that temperature. It uses [a constructor pattern](https://vanillajstoolkit.com/boilerplates/constructor/), letting you create different instances.

```js
let Temp = (function () {

	/**
	 * The Constructor object
	 * @param {Number} temp The temperature
	 */
	function Constructor (temp) {
		this.temp = temp;
	}

	Constructor.prototype.adjust = function (n) {
		this.temp = this.temp + n;
		return this;
	};

	return Constructor;

})();
```

To use it, you might do something like this.

```js
// Define some temperatures
let california = new Temp(72);
let vermont = new Temp(54);

// Increase the temp 3 degrees
california.adjust(3);

// Decrease the temp 7 degrees
vermont.adjust(-7);

// log the temperature
// Will log 75 and 47, respectively
console.log(california.temp);
console.log(vermont.temp);
```

## The problem

This approach works great, but whenever you adjust a temperature, you replace (or mutate) the originally defined value.

For example, lets imagine you were trying to track changes to a temperature over time.

```js
let monday = new Temp(54);
let tuesday = monday.adjust(3);
let wednesday = tuesday.adjust(-2);
```

Here, `monday`, `tuesday`, and `wednesday` will all have the same value for the `temp` property: `55`. The returned value from the `adjust()` method is always the same instance.

Someone can also override the temperature entirely by directly setting the value of the `temp` property.

```js
monday.temp = 42;
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/OJjwMjj?editors=1111)

## Immutable JavaScript libraries

To fix this, we can make two simple changes to our library.

First, we'll use the `Object.defineProperties()` method to define our instance properties. Unless we give them the `writable` property with a value of `true`, they can be read but _not_ overwritten.

```js
let Temp = (function () {

	/**
	 * The Constructor object
	 * @param {Number} temp The temperature
	 */
	function Constructor (temp) {
		Object.defineProperties(this, {
			temp: {value: temp}
		});
	}

	Constructor.prototype.adjust = function (n) {
		this.temp = this.temp + n;
		return this;
	};

	return Constructor;

})();
```

Now, the `temp` property can be read but not overwritten.

```js
// logs 54
console.log(monday.temp);

// still logs 54
monday.temp = 42;
console.log(monday.temp);
```

But, it also can't be adjusted with the `adjust()` method.

```js
// this won't work now, either
monday.adjust(5);
```

[Here's an updated demo.](https://codepen.io/cferdinandi/pen/MWvBKVL?editors=1111)

To make this all work, we also need to return a _new instance_ whenever we run the `adjust()` method.

```js
let Temp = (function () {

	/**
	 * The Constructor object
	 * @param {Number} temp The temperature
	 */
	function Constructor (temp) {
		Object.defineProperties(this, {
			temp: {value: temp}
		});
	}

	Constructor.prototype.adjust = function (n) {
		let temp = this.temp + n;
		return new Constructor(temp);
	};

	return Constructor;

})();
```

Now, `monday`, `tuesday`, and `wednesday` are all unique instances with unique `temp` properties.

```js
let monday = new Temp(54);
let tuesday = monday.adjust(3);
let wednesday = tuesday.adjust(-2);
```

[Here's one last demo.](https://codepen.io/cferdinandi/pen/PoKBZBJ?editors=1111)