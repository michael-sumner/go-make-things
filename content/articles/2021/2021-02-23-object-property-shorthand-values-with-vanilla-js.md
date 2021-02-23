---
title: "Object property shorthand values with vanilla JS"
date: 2021-02-23T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

In yesterday's article on [destructuring function parameters](/destructuring-function-parameters-with-vanilla-js-for-better-developer-ergonomics/), I mentioned the _ES6 object property shorthand_.

> If you prefer, you can also use the ES6 object property shorthand approach (which I haven’t written about yet but will soon).

Well, today's the today. Let's dig in!

## How object property shorthand values work

Unlike most things in JavaScript, this one is actually pretty straightforward.

If you want to define a property in an object, and that key name already exists as a variable within the object's scope, you don't have to explicitly assign a value. You can use just the key name, and that variable's value is used automatically.

Here's an example.

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

[You can play around with a demo here.](https://codepen.io/cferdinandi/pen/jOVamZX)

Historically, we needed to do things like `name: name`. With ES6 shorthand values, you can include the key name without the color (`:`) or value.

It's pretty useful!

## Function shorthands

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

[Here's another demo for you.](https://codepen.io/cferdinandi/pen/VwmrbXp)