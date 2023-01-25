---
title: Object property shorthand values with vanilla JavaScript
date: 2023-01-25T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Object property shorthand values are a newer, simpler way to define properties and functions in an object. Today, we're going to learn how they work. 

Let's dig in!

## How object property shorthand values work

If you want to define a property in an object, and that key name already exists as a variable within the object's scope, you don't have to explicitly assign a value. You can use just the key name, and that variable's value is used automatically.

```js
// Some details
let name = 'Merlin';
let job = 'wizard';
let age = 'old AF';

// The object
let wizard = {
	name: name, // The old way
	job,        // ES6 shorthand
	age         // ES6 shorthand
};
```

Historically, we needed to do things like `name: name`. With ES6 shorthand values, you can include the key name without the colon (`:`) or value.

## Object function shorthands

Let's imagine we wanted to add a few functions to our `wizard` object. ES6 provides a simpler way to do that as well.

Instead of creating a key name and then writing `function () {}`, you can add a named function _without_ the `function` keyword.

```js
let wizard = {

	// Values
	name: name, // The old way
	job,        // ES6 shorthand
	age,        // ES6 shorthand

	// The old way of adding functions
	summon: function () {
		console.log('From out of thin air, watch me make a bear');
	},

	// The ES6 shorthand way
	vanish () {
		console.log(`Now you see me, now you don't.`);
	}

};
```