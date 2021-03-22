---
title: "Rest parameters in JavaScript functions"
date: 2021-03-22T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

On Friday, we looked at [the `arguments` object in JavaScript functions](/the-arguments-object-in-javascript-functions/). Today, we're going to look at _rest parameters_.

_Rest parameters_ work a lot like the `arguments` object, but with two notable advantages.

1. You can give them to any name you'd like.
2. You can start at any parameter you want.

You define *rest parameters* by creating a parameter prefixed with `...`. Any arguments provided at or beyond the rest parameter on a function get combined into an array that's assigned to the rest parameter's name.

In the example below, `...moreArgs` is a _rest parameter_.

```js
function logStuff (arg1, arg2, ...moreArgs) {

	// Logs arg1
	console.log(arg1);

	// Logs arg2
	console.log(arg2);

	// Logs an array of any other arguments you pass in after arg2
	console.log(moreArgs);

}

// In this example...
// arg1 = 'chicken'
// arg2 = 'tuna'
// moreArgs = ['chips', 'cookie', 'soda', 'delicious']
logStuff('chicken', 'tuna', 'chips', 'cookie', 'soda', 'delicious');
```

Unlike the `arguments` object, rest parameters are traditional arrays that can be used with all of the array methods. [Here's a demo.](https://codepen.io/cferdinandi/pen/rNjBdBW)

Here's a function you can use to `add()` two or more numbers together, written with a rest parameter.

```js
function add (...nums) {

	// Set a starting total
	let total = 0;

	// Add each number to the total
	nums.forEach(function (num) {
		total += num;
	});

	// Return to the total
	return total;

}
```

One other notable benefit of rest parameters over the `arguments` object: they work in ES6 arrow functions (the `arguments` object does not).