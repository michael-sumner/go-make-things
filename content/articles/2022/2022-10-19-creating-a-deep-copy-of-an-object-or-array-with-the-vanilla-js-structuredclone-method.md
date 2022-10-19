---
title: Creating a deep copy of an object or array with the structuredClone() method in vanilla JavaScript
date: 2022-10-19T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Today, I want to look at a newer JavaScript method that you can use to create a deep copy of an array or object: `structuredClone()`.

Let's dig in!

## Arrays, objects, and variables

In JavaScript, when you assign an existing array or object to a new variable, it _does not_ create a new array or object with the same properties. 

Instead, it creates a _reference_ to the original.

```javascript
// Original object
let lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};

// This creates a reference to the original
let moreLunch = lunch;

// Remove "chips" from lunch
delete lunch.chips;

// logs {sandwich: "turkey", drink: "soda"}
console.log(moreLunch);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/jOxogzj?editors=1111)

## Creating a copy of an array or object

To prevent this from happening, you need to create a _copy_ of your array or object.

For objects, you can use the `Object.assign()` method, with an empty object as the first argument.

```js
let moreLunch = Object.assign({}, lunch);
```

For arrays, you can use the `Array.from()` or `Array.slice()` methods.

```js
// Original array
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];

// Create a copy
let moreSandwiches = Array.from(sandwiches);
let alsoMoreSandwiches = sandwiches.slice();
```

And for either one, you can [use the _spread operator_](/the-spread-syntax-operator-in-vanilla-js/).

```js
let evenMoreLunch = {...lunch};
let evenMoreSandwiches = [...sandwiches];
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/rNvgXZe?editors=1111)

Now, if you modify the originals, the copies remain unchanged (and vice versa).

## These methods don't work with nested or multidimensional arrays and objects

These approaches work great for simple arrays and objects. But they have some shortcomings when working with _multidimensional arrays and objects_.

A _multidimensional array or object_ is one that has one or more nested arrays or objects as property values.

```js
// A multidimensional array
let wizards = [{
	name: 'Radagast',
	color: 'brown'
}, {
	name: 'Gandalf',
	color: 'gray'
}];

// A multidimensional object
let movies = {
	studio: 'Pixar',
	films: ['Soul', 'Onward', 'Up', 'WALL-E'],
	directors: ['Brad Bird', 'Pete Docter', 'Andrew Stanton'],
	details: {
		founded: '1986',
		founders: ['Edwin Catmull', 'Alvy Ray Smith']
	}
};
```

With multidimensional arrays and objects, `Array.from()`, `Array.slice()`, `Object.assign()`, and the spread operator all create a copy of the parent array or object only. Any nested arrays or objects inside it still reference the original.

This is what's called a _shallow copy_ or _shallow clone_.

```javascript
// Create a copy of the wizards array
let wizardsCopy = Array.from(wizards);

// Update a nested property
wizards[0].druid = true;

// logs {name: "Radagast", color: "brown", druid: true}
console.log(wizardsCopy[0]);
```

[Here's a demo with multidimensional objects.](https://codepen.io/cferdinandi/pen/yLjWmrY?editors=1111)

Fortunately, there's a newer JavaScript method that addresses this issue!

## The `structuredClone()` method

The `structuredClone()` method accepts an array or object as an argument, and returns a _deep copy_ or _deep clone_.

That means that any nested arrays or objects in it are also copies and not references to the original.

```js
// Create a copy of the wizards array
let wizardsCopy = structuredClone(wizards);

// Update a nested property
wizards[0].druid = true;

// The copy is not updated
console.log(wizardsCopy[0]);
```

[Here's one last demo showing the `structuredClone()` method.](https://codepen.io/cferdinandi/pen/zYjVOYw?editors=1111)

Browser support was spotty for a while, but this method now works in all major browsers on both desktop and mobile.