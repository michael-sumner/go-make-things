---
title: A few neat things you can do with the vanilla JS spread syntax operator
date: 2021-12-13T10:30:00-05:00
draft: false
categories:
- Code
- JavaScript
---

The spread syntax operator (`...`) takes an array or object (or other iterable) and expands its items into their own individual values.

```js
let sandwiches = ['tuna', 'turkey', 'pb&j'];

// logs ["tuna", "turkey", "pb&j"]
console.log(sandwiches);

// logs tuna turkey pb&j
console.log(...sandwiches);
```

The spread operator can only be used inside of functions, arrays and objects. You _cannot_ use it on its own.

This, for example, would throw an error.

```js
// Uncaught SyntaxError: Unexpected token '...'
...sandwiches;
```

The spread operator can be really useful for some specific situations.

## Passing an array of arguments into a function as individual arguments

Imagine you have a function, `add()`, that accepts two numbers as arguments and adds them together.

```js
// Add two numbers together
function add (num1, num2) {
	return num1 + num2;
}
```

And, you have an array of numbers.

```js
let numbers = [4, 2];
```

Instead of using bracket notation to get each number and pass it in individually, you can use the spread operator to break the `numbers` array into individual items.

```js
// Instead of this...
// returns 6
add(numbers[0], numbers[1]);

// You can do this...
// returns 6
add(...numbers);
```

## Combine or copy an array or object

You can use the spread operator to combine or copy arrays or objects.

```js
/**
 * Arrays
 */

// Some arrays
let sandwiches1 = ['tuna', 'turkey', 'pb&j'];
let sandwiches2 = ['chicken', 'pb&j'];

// Copy an array
// Works like Array.from(sandwiches)
let sandwichesCopy = [...sandwiches1];

// Combine two arrays
// Works like sandwiches1.concat(sandwiches2)
let moreSandwiches = [...sandwiches1, ...sandwiches2];


/**
 * Objects
 */

// Some objects
let radagast1 = {
	color: 'brown',
	druid: true
};
let radagast2 = {
	skills: 'Talks with animals',
	druid: false
};

// Copy an object
// Works like Object.assign({}, radagst1);
let radagastCopy = {...radagast1};

// Combine two objects
// Works like Object.assign({}, radagast1, radagast2);
let moreRadagast = {...radagast1, ...radagast2};
```

For situations like this, the spread operator can provide a simpler syntax that makes the intent of your code more clear and obvious.

These approaches aren't inherently better than using methods like `Array.from()` or `Object.assign()`, so ultimately, use whichever approach you find most comfortable and easy to work with.