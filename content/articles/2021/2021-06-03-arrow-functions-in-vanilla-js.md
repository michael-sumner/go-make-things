---
title: "Arrow functions in vanilla JS"
date: 2021-06-03T10:30:00-04:00
draft: false
categories:
- Code
- JavaScript
---

Arrow functions were introduced to JavaScript in ES6.

Their intent was to provide a shorter syntax for writing functions and eliminate some of the confusion that exists around `this`. Because they look so dramatically different from traditional functions, though, they often make scripts _more_ confusing.

However, more and more scripts and tutorials are being written with arrow functions, so it's important that you at the very least understand how they work and can read code written with them.

## Basic Syntax

A basic arrow function isn't all that different from a traditional function. The word `function` gets dropped, and a fat arrow (`=>`) is added between the parentheses and brackets (`()` and `{}`, respectively).

```js
// A traditional function
function add (num1, num2) {
	return num1 + num2;
}

// The arrow function version
let add = (num1, num2) => {
	return num1 + num2;
};
```

*__Note:__ Named arrow functions have to be written as a function expression. There's no way to write one as a function declaration.*

## A simpler way to return a value

If your function is only returning a value, as is the case with our `add()` function, you can simplify the function even further by dropping the curly brackets (`{}`) and `return` operator.

```js
// returns the value of `num1 + num2`
let add = (num1, num2) => num1 + num2;
```

This only works if the only thing you're doing is returning a value. If you need to do more stuff with your function, you have to include curly brackets.

## `arguments` doesn't work

Earlier this year, [I wrote about the `arguments` object](/the-arguments-object-in-javascript-functions/). With a traditional function, you could use it to get all of the arguments passed in to our function and add them together.

```js
function add () {

	// Set a starting total
	let total = 0;

	// Add each number to the total
	Array.from(arguments).forEach(function (num) {
		total += num;
	});

	// Return to the total
	return total;

}
```

**In arrow functions, `arguments` doesn't exist.**

[Rest parameters](/rest-parameters-in-javascript-functions/) _do_ work, however. Here's the `add()` function rewritten as an arrow function with rest parameters.

```js
let add = (...nums) => {

	// Set a starting total
	let total = 0;

	// Add each number to the total
	nums.forEach(function (num) {
		total += num;
	});

	// Return to the total
	return total;

};
```

## Should you use arrow functions or traditional functions?

A few years back, I wrote about [why I don't like arrow functions](/why-i-dont-use-let-const-or-fat-arrow-functions-and-you-shouldnt-either/).

> Simply put, they don’t work in older browsers and can’t be polyfilled. And I don’t think the value you gain from them makes that tradeoff worth it.

Today, that argument no longer holds. [Now that IE support is ending](/its-time-to-drop-ie-support/), we can lean harder into all of the modern JS goodness, without polyfills or transpiling.

That said, I personally still don't like or use arrow functions in my own projects.

I find them harder to read, because of the various ways they can be written. The shorter syntaxes, implicit returns, and the lack of a `function` keyword makes it harder for my brain to quickly grasp what's happening with them.

I personally find traditional functions easier to read, even if they're more verbose. And I always [favor clarity and readability over brevity](/readability-is-more-important-than-brevity/).

That said, if you like them and they work for you, use them! Lots of people do.