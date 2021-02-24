---
title: "Immutable arrays and objects in vanilla JS"
date: 2021-02-24T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

Today, we're going to talk about _immutability_ in JavaScript. Let's dig in.

## What is immutability?

In JavaScript, things that are _immutable_ don’t change in value when you use them, and things that are _mutable_ do.

For example, lets create a variable, `age1`, and assign its value to another variable, `age2`. If we update `age2`, the original variable, `age1`, is unaffected.

```js
// Create a variable
let age1 = 42;

// Assign it to a new variable
let age2 = age1;

// Update the new variable
age2 = 84;

// logs 42
console.log(age1);
```

[Here's a demo.](https://codepen.io/cferdinandi/pen/MWbrwgX)

In JavaScript, when you assign an existing array or object to a new variable, it _does not_ create a new array or object with the same properties. Instead, it creates a _reference_ to the original.

It is _not immutable_.

```js
// Original array and object
let sandwiches = ['turkey', 'tuna', 'ham', 'pb&j'];
let lunch = {
	sandwich: 'turkey',
	chips: 'cape cod',
	drink: 'soda'
};

// These create references to the original
let moreSandwiches = sandwiches;
let moreLunch = lunch;

// Remove "tuna" from sandwiches
// Remove "chips" from lunch
sandwiches.splice(1, 1);
delete lunch.chips;

// logs ["turkey", "ham", "pb&j"]
console.log(moreSandwiches);

// Logs {sandwich: "turkey", drink: "soda"}
console.log(moreLunch);
```

[Here's another demo.](https://codepen.io/cferdinandi/pen/abBEOox)

Strings and numbers are naturally _immutable_, but arrays and objects are not.

## How to create an immutable array

You can create an *immutable* copy of an array using `Array.slice()` with no arguments, or with the `Array.from()` method. It's considered a best practice to do so before manipulating an array.

```js
// Create an immutable copy
let evenMoreSandwiches = Array.from(sandwiches);

// Add a few sandwiches
sandwiches.push('italian', 'blt');

// logs ["turkey", "ham", "pb&j", "italian", "blt"]
console.log(sandwiches);

// logs ["turkey", "ham", "pb&j"]
console.log(evenMoreSandwiches);
```

[Here's a demo of how to create an immutable array.](https://codepen.io/cferdinandi/pen/jOVYPOZ)

## How to create an immutable object

You can create an *immutable* copy of an object using `Object.assign()`. Pass in an empty object (`{}`) as the first argument and the object you want to copy as the second.

It's considered a best practice to do so before manipulating an object.

```js
// Create an immutable copy
let evenMoreLunch = Object.assign({}, lunch);

// Add a snack
lunch.snack = 'cookies';

// Logs {sandwich: 'turkey', drink: soda, snack: 'cookies'}
console.log(lunch);

// Logs {sandwich: 'turkey', drink: soda}
console.log(evenMoreLunch);
```

[Here's a demo of how to create an immutable object.](https://codepen.io/cferdinandi/pen/QWGabwa)

## You can use the spread operator for this, too

Last month, we learned about [the spread syntax operator](/the-spread-syntax-operator-in-vanilla-js/). You can use the spread operator to create immutable copies of arrays and objects instead of use `Array.from()` or `Object.assign()`.

```js
let moreSandwiches = [...sandwiches];
let moreLunch = {...lunch};
```

[Here's a demo with an array](https://codepen.io/cferdinandi/pen/XWNVbdG), and [here's one with an object](https://codepen.io/cferdinandi/pen/ZEBvGpm).

I personally prefer the more verbose `Array.from()` and `Object.assign()`, but many folks like the spread operator for it's brevity. I suspect I will in time as well.

Tomorrow, we'll look at immutability in nested or multidimensional arrays and objects.